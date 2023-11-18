from pymongo import DESCENDING, ASCENDING
from pymongo import MongoClient, database
from pymongo.typings import _DocumentType
import config
from service.log import logger


def get_mongo_db() -> database.Database[_DocumentType]:
    client = MongoClient(
        config.MongoDbDSN, username=config.MongoDbUser, password=config.MongoDbPassword
    )
    return client.get_database(config.MongoDbName)


db = get_mongo_db()
account_db = db.get_collection("account")
sms_code_db = db.get_collection("sms_code")
profile_db = db.get_collection("profile")
upload_files_db = db.get_collection("upload_files")
binding_db = db.get_collection("account_3rd_binding")
feedback_db = db.get_collection("feedback")

account_3rd_binding_db = db.get_collection("account_3rd_binding")
campaign_db = db.get_collection("campaign")
achievement_db = db.get_collection("achievement")
invitation_code_db = db.get_collection("invitation_code")
account_achievement_db = db.get_collection("account_achievement")
achievement_condition_status_db = db.get_collection("achievement_condition_status")
achievement_condition_db = db.get_collection("achievement_condition")
condition_template_db = db.get_collection("condition_template")

premium_social_media_desc = db.get_collection("premium_social_media_desc")

def migrate_index():
    logger.info("starting migrate index")
    account_db.create_index("account_id", unique=True)
    account_db.create_index("phone", unique=True)

    sms_code_db.create_index("phone", unique=True)

    profile_db.create_index("profile_id", unique=True)
    profile_db.create_index("slug", unique=True)

    binding_db.create_index("weibo_uid", unique=True)
    binding_db.create_index("account_id", unique=True)
    
    premium_social_media_desc.create_index("account_id", unique=True)


migrate_index()
