import time
from datetime import datetime, timedelta
from typing import Union
from fastapi import (
    Depends,
    APIRouter,
)
from fastapi.security import OAuth2PasswordBearer
from passlib.context import CryptContext
from eth_account import Account
import random
import config
import uuid
import string
from jose import JWTError, jwt
from service.logging import logger
import re

router = APIRouter()

def STDResponse(data, code=0, msg=""):
    return {'code': code, 'msg':msg,'data': data}
