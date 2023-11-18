from Crypto.PublicKey import RSA
from Crypto.Cipher import PKCS1_OAEP
import base64

# 生成 RSA 密钥对
key = RSA.generate(2048)

# 获取公钥和私钥
public_key = key.publickey().export_key()
private_key = key.export_key()
print('public_key', public_key)
print('private_key', private_key)

# 加密文本
message = b"Hello, World!"
cipher = PKCS1_OAEP.new(RSA.import_key(public_key))
encrypted_message = cipher.encrypt(message)
base64_encrypted_message = base64.b64encode(encrypted_message)


# # 解密文本
cipher = PKCS1_OAEP.new(RSA.import_key(private_key))
decrypted_message = cipher.decrypt(base64.b64decode(base64_encrypted_message))

# print("加密前的文本：", message)
# print("加密后的文本：", base64_encrypted_message)
print("解密后的文本：", decrypted_message.hex())