import oss2
import hashlib
from posixpath import join as pathjoin
import mimetypes
import requests
import os

import urllib.parse
import config


def create_oss_client():
    auth = oss2.Auth(config.AliYunOssAK, config.AliYunOssSK)
    return oss2.Bucket(auth, config.AliYunOssEndpoint, config.AliYunOssBucket)


oss_client = create_oss_client()


def calculate_file_name(data):
    return hashlib.sha256(data).hexdigest()


def get_ext_from_uri(uri: str = ""):
    path = urlparse(uri).path
    filename = os.path.basename(path)
    parts = os.path.splitext(filename)
    if len(parts) > 1:
        return parts[1]
    return ''


def upload_file_from_uri(uri, dirname: str = ""):
    try:
        extension = get_ext_from_uri(uri)
        if not extension:
            extension = ".jpg"
        parsed_url = urlparse(uri)
        referer = 'https://' + parsed_url.netloc + '/'
        response = requests.get(uri, headers={
            'user-agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1',
            'referer': referer,
        })
        if response.status_code != 200:
            return ''
        return upload_file(response.content, extension, dirname)
    except Exception:
        return ''


def upload_file(data, ext: str = "", dirname: str = ""):
    file_name = calculate_file_name(data) + ext
    file_path = pathjoin(dirname, file_name)
    headers = {}
    if ext != "":
        mimetype, _ = mimetypes.guess_type(file_name)
        headers['Content-Type'] = mimetype
        headers['Content-Disposition'] = 'inline'
    oss_client.put_object(file_path, data, headers)
    return file_path


def upload_local_file(local_path: str = "", file_name: str = "", dirname: str = ""):
    file_path = pathjoin(dirname , file_name)
    oss_path = oss_client.put_object_from_file(file_path, local_path).resp.response.url
    parsed_url = urllib.parse.urlparse(oss_path)
    return parsed_url.path
