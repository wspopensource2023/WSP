import oss2
import hashlib
from posixpath import join as pathjoin
import mimetypes
import requests
from urllib.parse import urlparse
import os
import argparse

AliYunOssAK = ""
AliYunOssSK = ""
AliYunOssBucket = ""
AliYunOssEndpoint = ""
AliYunOssQueryURI = "https://static.xxxxxx.com"

def create_oss_client():
    auth = oss2.Auth(AliYunOssAK, AliYunOssSK)
    return oss2.Bucket(auth, AliYunOssEndpoint, AliYunOssBucket)

def calculate_sha256(filename):
    with open(filename, 'rb') as f:
        content = f.read()
    return hashlib.sha256(content).hexdigest()

oss_client = create_oss_client()

parser = argparse.ArgumentParser(description='Upload a file to S3 bucket')
parser.add_argument('src', help='Source file path')
parser.add_argument('dirname', nargs='?', help='Destination file dir (optional)')
parser.add_argument('filename', nargs='?', help='Destination file path (optional)')
args = parser.parse_args()
src = args.src
dirname = args.dirname
filename = args.filename

def upload(src, dirname, filename):
    if not filename:
        filename = calculate_sha256(src)
        print(f'using sha256 as filename: {filename}')
    dest = filename
    if dirname:
        dest = pathjoin(dirname , dest)
    oss_client.put_object_from_file(dest, src)
    return f'{AliYunOssQueryURI}/{dest}'

print(f'starting upload {src}')
print(upload(src, dirname, filename))