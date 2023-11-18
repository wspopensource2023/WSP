from config import *
from dao.mongo import *
import dao.chain_mongo
from web3 import Web3
import json
import time
from service.logging import logger

# read abi from file
ABISBTv1 = json.loads(open('abis/SBTv1.abi', 'r').read())

def get_timestamp():
    return int(time.time())

def get_mongodb_upsert_data(data: dict):
    timestamp = get_timestamp()
    data['updated_at'] = timestamp
    return {
        "$set": data,
        "$setOnInsert": {
            'created_at': timestamp
        },
    }

def save_preparing_transction(
        achievement_id: str,
        account_id: str,
        transaction_hash: str,
        contract_address: str
    ):
    achievement_chain_db.update_one(
        {
            'achievement_id': achievement_id,
            'account_id': account_id,
        },
        get_mongodb_upsert_data({
            'achievement_id': achievement_id,
            'account_id': account_id,
            'chain': Chain.CONFLUX.value,
            'contract_address': contract_address,
            'transaction_hash': transaction_hash,
            'transaction_block_number': 0,
            'transaction_status': TransactionStatus.PREPARING.value,
            'transaction_prepare_timestamp': get_timestamp(),
            'transaction_send_timestamp': 0,
            'transaction_confirm_timestamp': 0,
            'transaction_error_msg': '',
            'token_id': 0
        }),
        upsert=True
    )

def update_confirming_transction(
        achievement_id: str,
        account_id: str,
        contract_address: str,
        transaction_hash: str,
    ):
    achievement_chain_db.update_one(
        {
            'achievement_id': achievement_id,
            'account_id': account_id,
        },
        get_mongodb_upsert_data({
            'transaction_status': TransactionStatus.CONFIRMING.value,
            'transaction_send_timestamp': get_timestamp(),
        }),
        upsert=True
    )

def update_success_transction(
        achievement_id: str,
        account_id: str,
        contract_address: str,
        transaction_hash: str,
        transaction_block_number: int,
        transaction_block_timestamp: int,
        token_id: str
    ):
    achievement_chain_db.update_one(
        {
            'achievement_id': achievement_id,
            'account_id': account_id,
        },
        get_mongodb_upsert_data({
            'transaction_status': TransactionStatus.SUCCESS.value,
            'transaction_block_number': transaction_block_number,
            'transaction_block_timestamp': transaction_block_timestamp,
            'transaction_confirm_timestamp': get_timestamp(),
            'token_id': token_id
        }),
        upsert=True
    )

def update_failed_transction(
        achievement_id: str,
        account_id: str,
        contract_address: str,
        transaction_hash: str,
        transaction_block_number: int,
        transaction_block_timestamp: int,
        transaction_error_msg: str,
    ):
    achievement_chain_db.update_one(
        {
            'achievement_id': achievement_id,
            'account_id': account_id,
        },
        get_mongodb_upsert_data({
            'transaction_status': TransactionStatus.FAILED.value,
            'transaction_block_number': transaction_block_number,
            'transaction_block_timestamp': transaction_block_timestamp,
            'transaction_confirm_timestamp': get_timestamp(),
            'transaction_error_msg': transaction_error_msg,
        }),
        upsert=True
    )

def update_account_achievement_onchain_time(
    achievement_id: str,
    account_id: str,
    timestamp: int
):
    account_achievement_db.update_one(
        {
            'achievement_id': achievement_id,
            'account_id': account_id,
        },
        get_mongodb_upsert_data({
            'onchain_time': timestamp,
        }),
        upsert=True
    )

def parse_tokenId(contract, receipt):
    transfer_logs = contract.events.Transfer().process_receipt(receipt)
    for log in transfer_logs:
        if log.address == receipt.to:
            return log.args.tokenId
    return -1

def conflux_sbt_attest(
    achievement_id: str,
    achievement_contract_address: str,
    account_id: str,
    account_address: str,
):
    logger.info(f'starting conflux_sbt_attest for achievement_id={achievement_id}, \
                achievement_contract_address={achievement_contract_address},  \
                account_id={account_id}, account_address={account_address}')
    web3 = Web3(Web3.HTTPProvider(ConfluxEndpoint))
    transaction_from = web3.eth.account.from_key(ConfluxMintPrivateKey).address
    contract_address = web3.to_checksum_address(achievement_contract_address)
    contract = web3.eth.contract(address=contract_address, abi=ABISBTv1)
    nonce = web3.eth.get_transaction_count(transaction_from)
    mint_to = web3.to_checksum_address(account_address)
    transaction = {
        'from': transaction_from,
        'to': contract_address,
        'value': 0,
        'gas': 2000000,
        'gasPrice': web3.eth.gas_price,
        'nonce': nonce,
        'data': contract.encodeABI(fn_name='batchAttest', args=[mint_to])
    }
    signed_transaction = web3.eth.account.sign_transaction(transaction, ConfluxMintPrivateKey)
    transaction_hash = signed_transaction.hash.hex()
    logger.info(f'finish sign transaction={transaction}, transaction_hash={transaction_hash}')

    try:
        gas_estimate = web3.eth.estimate_gas(transaction)
        save_preparing_transction(achievement_id, account_id, transaction_hash, contract_address)
        logger.info(f'starting send_raw_transaction, transaction_hash={transaction_hash}')
        web3.eth.send_raw_transaction(signed_transaction.rawTransaction)
        update_confirming_transction(achievement_id, account_id, contract_address, transaction_hash)
        
        logger.info(f'starting wait_for_transaction_receipt, transaction_hash={transaction_hash}')
        transaction_receipt = web3.eth.wait_for_transaction_receipt(transaction_hash)
        logger.info(f'finish wait_for_transaction_receipt, transaction_hash={transaction_hash}, transaction_receipt={transaction_receipt}')

        token_id = parse_tokenId(contract, transaction_receipt)
        block = web3.eth.get_block(transaction_receipt['blockNumber'])
        if transaction_receipt['status'] == 1:
            update_success_transction(
                achievement_id,
                account_id,
                contract_address,
                transaction_hash,
                transaction_receipt['blockNumber'],
                block.timestamp,
                token_id
            )
            update_account_achievement_onchain_time(achievement_id, account_id, block.timestamp)
            logger.info(f'success to conflux_sbt_attest, achievement_id={achievement_id}, account_id={account_id}, transaction_hash={transaction_hash}')
            return True
        else:
            update_failed_transction(
                achievement_id,
                account_id,
                contract_address,
                transaction_hash,
                transaction_receipt['blockNumber'],
                transaction_receipt['blockTimestamp'],
                transaction_receipt['txExecErrorMsg']
            )
            return False
    except Exception as e:
        logger.error(f'failed to conflux_sbt_attest, achievement_id={achievement_id}, account_id={account_id}, transaction_hash={transaction_hash}, error={e}')
        update_failed_transction(
            achievement_id,
            account_id,
            contract_address,
            transaction_hash,
            0,
            0,
            str(e)
        )
        return False

def scan():
    def get_most_achievement_id():
        cursor = account_achievement_db.aggregate([
            { "$match": {"onchain_time": 0}},
            { '$group': { '_id': "$achievement_id", 'count': { '$sum': 1 } } },
            { '$sort': { 'count': -1 } },
            { '$limit': 1 }
        ])
        if not cursor:
            return
        return cursor.next()['_id']
    def get_account_achievements(achievement_id, limit=100):
        return account_achievement_db.find({
            "achievement_id": achievement_id,
            "onchain_time": 0
        }).limit(limit)
    def get_account_wallets(account_ids):
        return dao.chain_mongo.chain_account_wallet_db.find({
            "account_id": {"$in": account_ids}
        })
    achievement_id = get_most_achievement_id()
    if not achievement_id:
        return
    achievement = achievement_db.find_one({"achievement_id": achievement_id})
    if not achievement:
        return
    account_achievements = get_account_achievements(achievement_id)
    if not account_achievements:
        return
    account_ids = []
    for item in account_achievements:
        account_ids.append(item['account_id'])
    account_wallets = get_account_wallets(account_ids)
    for item in account_wallets:
        conflux_sbt_attest(
            achievement_id,
            achievement['contract_address'],
            item['account_id'],
            item['wallet_address']
        )

scan()