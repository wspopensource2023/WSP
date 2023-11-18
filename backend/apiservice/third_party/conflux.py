from web3 import Web3
from .SBTV1 import Sbt1
from .utils import *



def conflux_base(address_to):
    web3 = Web3(Web3.HTTPProvider('https://evmtestnet.confluxrpc.com'))
    CONTRACT_ADDRESS = ''
    address_from = ""
    # address_to = ""

    checksum_address_from = web3.to_checksum_address(address_from)
    checksum_address_to = web3.to_checksum_address(address_to)
    CONTRACT_ADDRESS_ = web3.to_checksum_address(CONTRACT_ADDRESS)

    balance_from = web3.from_wei(web3.eth.get_balance(checksum_address_from), "ether")
    balance_to = web3.from_wei(web3.eth.get_balance(checksum_address_to), "ether")
    contract = web3.eth.contract(address=CONTRACT_ADDRESS_, abi=Sbt1)
    SENDER_PRIVATE_KEY = ''

    nonce = web3.eth.get_transaction_count(checksum_address_from)
    account = web3.eth.account.from_key(SENDER_PRIVATE_KEY)
    SENDER_ADDRESS = account.address

    # 构建交易数据
    transaction = {
        'from': SENDER_ADDRESS,
        'to': CONTRACT_ADDRESS_,
        'value': 0,
        'gas': 2000000,
        'gasPrice': web3.eth.gas_price,
        'nonce': nonce,
        'data': contract.encodeABI(fn_name='attest', args=[checksum_address_to])
    }

    signed_transaction = web3.eth.account.sign_transaction(transaction, SENDER_PRIVATE_KEY)
    transaction_hash = web3.eth.send_raw_transaction(signed_transaction.rawTransaction)
    transaction_receipt = web3.eth.wait_for_transaction_receipt(transaction_hash)
    print(transaction_receipt)
    if transaction_receipt['status'] == 1:
        print("Transaction successful")
        return True
    else:
        print("Transaction failed")
        return False


def read_database_and_upload_conflux():
    try:
        receive_record = db.get_collection("receive_record").find({"on_chain": False})
        if receive_record:
            for item in receive_record:
                account = db.get_collection("account").find_one({"phone": item["phone"]})
                print(item["wallet_address"])
                conflux_base(account["wallet_address"])
        else:
            print("no")
        return True
    except Exception as e:
        print(e)
