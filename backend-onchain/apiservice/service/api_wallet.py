from service.service import *
from fastapi import (
    Body,
    Response,
)
from Crypto.PublicKey import RSA
from Crypto.Cipher import PKCS1_OAEP
import base64
from dao.mongo import *
from service.logging import logger
import config
from fastapi import (
    Form,
    Depends,
    UploadFile,
    HTTPException,
    status,
    Body,
    APIRouter,
    Request,
    Response,
)
from urllib.parse import urljoin
 
@router.get('/Ping', name='检测服务端当前状态')
async def ping():
    return STDResponse({})
