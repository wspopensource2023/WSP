from dotenv import load_dotenv
import os
import re

environment = os.getenv("ENV", "dev")
if environment == "prod":
    print("current env is prod")
    load_dotenv(".env.prod")
else:
    print("current env is dev")
    load_dotenv(".env.dev")

MongoDbDSN = os.getenv("MONGODB_DSN")
MongoDbName = os.getenv("MONGODB_NAME")
MongoDbUser = os.getenv("MONGODB_USER")
MongoDbPassword = os.getenv("MONGODB_PASSWORD")
ChainMongoDbDSN = os.getenv("CHAIN_MONGODB_DSN")
ChainMongoDbName = os.getenv("CHAIN_MONGODB_NAME")
ChainMongoDbUser = os.getenv("CHAIN_MONGODB_USER")
ChainMongoDbPassword = os.getenv("CHAIN_MONGODB_PASSWORD")
ChainEncryptPublicKey = re.sub(r'\\n', '\n', os.getenv("CHAIN_ENCRYPT_PUBLIC_KEY"))
JWTSecretKey = os.getenv("JWT_SECRET_KEY")
JWTAlgorithm = os.getenv("JWT_ALGORITHM")
JWTExpiration = int(os.getenv("JWT_EXPIRATION"))
AliYunOssFileBaseURI = os.getenv("ALIYUN_OSS_FILE_BASE_URI")
AliYunOssEndpoint = os.getenv("ALIYUN_OSS_ENDPOINT")
AliYunOssBucket = os.getenv("ALIYUN_OSS_BUCKET")
AliYunOssAK = os.getenv("ALIYUN_OSS_AK")
AliYunOssSK = os.getenv("ALIYUN_OSS_SK")
AliYunSmsSignName = os.getenv("ALIYUN_SMS_SIGN_NAME")
AliYunSmsTemplateCode = os.getenv("ALIYUN_SMS_TEMPLATE_CODE")
AliYunSmsCodeExpiration = int(os.getenv("ALIYUN_SMS_CODE_EXPIRATION"))
AliYunSmsAccessKeyId = os.getenv("ALIYUN_SMS_ACCESS_KEY_ID")
AliYunSmsAccessKeySecret = os.getenv("ALIYUN_SMS_ACCESS_KEY_SECRET")
WeChatUrl = os.getenv("WECHAT_URL")
WeChatAppID = os.getenv("WECHAT_APP_ID")
WeChatAppSecret = os.getenv("WECHAT_APP_SECRET")
WeChatWebAppID = os.getenv("WECHAT_WEB_APP_ID")
WeChatWebSecret = os.getenv("WECHAT_WEB_SECRET")