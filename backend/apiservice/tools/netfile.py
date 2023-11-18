import os
import urllib.request


def download(url: str, local_path: str = "", file_name: str = ""):
    if local_path == "":
        local_path = os.path.join(os.getcwd(), "download")
    if not os.path.exists(local_path):
        os.makedirs(local_path)
    local_path = os.path.join(local_path, file_name)
    urllib.request.urlretrieve(url, local_path)
    return local_path