from pymongo import DESCENDING, ASCENDING
from pymongo import MongoClient, database
from pymongo.typings import _DocumentType
import config
from pydantic import BaseModel, validator
from enum import Enum

def get_mongo_db() -> database.Database[_DocumentType]:
    client = MongoClient(config.MongoDbDSN, username=config.MongoDbUser, password=config.MongoDbPassword)
    return client.get_database(config.MongoDbName)

class TransactionStatus(Enum):
    WAITING = 'WAITING'
    PREPARING = 'PREPARING'
    CONFIRMING = 'CONFIRMING'
    SUCCESS = 'SUCCESS'
    FAILED = 'FAILED'

class Chain(Enum):
    UNKNOWN = "UNKNOWN"
    CONFLUX = "CONFLUX"
    POLYGON = "POLYGON"

class TableAccountWallet(BaseModel):
    wallet_id: str
    account_id: str
    chain_address: str
    chain_private_key: str

class TableAcheivementChain(BaseModel):
    achievement_id: str
    account_id: str
    chain: Chain
    contract_address: str
    transaction_hash: str
    transaction_block_number: int
    transaction_block_timestamp: int
    transaction_status: TransactionStatus
    transaction_prepare_timestamp: int
    transaction_send_timestamp: int
    transaction_confirm_timestamp: int
    transaction_error_msg: str
    token_id: str

db = get_mongo_db()
account_db = db.get_collection('account')
sms_code_db = db.get_collection('sms_code')
profile_db = db.get_collection('profile')
upload_files_db = db.get_collection('upload_files')
binding_db = db.get_collection('account_3rd_binding')
feedback_db = db.get_collection('feedback')

account_3rd_binding_db = db.get_collection('account_3rd_binding')
campaign_db = db.get_collection('campaign')
achievement_db = db.get_collection('achievement')
invitation_code_db = db.get_collection('invitation_code')
account_achievement_db = db.get_collection('account_achievement')
achievement_condition_status_db = db.get_collection('achievement_condition_status')
achievement_condition_db = db.get_collection('achievement_condition')
condition_template_db = db.get_collection('condition_template')
achievement_chain_db = db.get_collection('achievement_chain')

def migrate_index():
    account_db.create_index('account_id', unique=True)
    account_db.create_index('phone', unique=True)
    account_db.create_index('eth_address', unique=True)

    sms_code_db.create_index('phone', unique=True)

    profile_db.create_index('profile_id', unique=True)
    profile_db.create_index('slug', unique=True)

    binding_db.create_index('weibo_uid', unique=True)
    binding_db.create_index('account_id', unique=True)

migrate_index()
