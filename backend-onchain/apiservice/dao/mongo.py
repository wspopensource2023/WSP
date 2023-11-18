from pymongo import DESCENDING, ASCENDING
from pymongo import MongoClient, database
from pymongo.typings import _DocumentType
import config
from service.logging import logger
import time
from pydantic import BaseModel, validator


def get_common_mongo_db() -> database.Database[_DocumentType]:
    client = MongoClient(config.CommonMongoDbDSN, username=config.CommonMongoDbUser, password=config.CommonMongoDbPassword)
    return client.get_database(config.CommonMongoDbName)

def get_chain_mongo_db() -> database.Database[_DocumentType]:
    client = MongoClient(config.ChainMongoDbDSN, username=config.ChainMongoDbUser, password=config.ChainMongoDbPassword)
    return client.get_database(config.ChainMongoDbName)

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

common_db = get_common_mongo_db()
common_account_db = common_db.get_collection('account')

chain_db = get_chain_mongo_db()
chain_wallet_db = chain_db.get_collection('wallet')