from pymongo import DESCENDING, ASCENDING
from pymongo import MongoClient, database
from pymongo.typings import _DocumentType
import config
from service.log import logger
from pydantic import BaseModel, validator


class TableAccountWallet(BaseModel):
    wallet_id: str
    account_id: str
    wallet_address: str
    wallet_private_key: str


def get_chain_mongo_db() -> database.Database[_DocumentType]:
    client = MongoClient(
        config.ChainMongoDbDSN,
        username=config.ChainMongoDbUser,
        password=config.ChainMongoDbPassword,
    )
    return client.get_database(config.ChainMongoDbName)


chain_db = get_chain_mongo_db()
chain_account_wallet_db = chain_db.get_collection("account_wallet")


def migrate_index():
    logger.info("starting migrate index")
    chain_account_wallet_db.create_index("wallet_id", unique=True)
    chain_account_wallet_db.create_index("wallet_address", unique=True)


migrate_index()
