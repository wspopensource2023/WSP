from pymongo import MongoClient

MONGO_DSN = "mongodb://localhost:27017/"
MONGO_DB_NAME = "xxxxxx_test"
MONGO_COLLECTION_NAME = "account"

client = MongoClient(MONGO_DSN)
db = client.get_database(MONGO_DB_NAME)
collection = db.get_collection(MONGO_COLLECTION_NAME)

result = collection.update_many({}, {"$set": {"deleted_at": 0}})

print("Number of documents updated:", result.modified_count)