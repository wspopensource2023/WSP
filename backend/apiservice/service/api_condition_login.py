import copy
import datetime
import hashlib

from service.service import *
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
from dao.model import *
from service.log import logger
import uuid


@router.post("/VerifyLogin")
def verify_login(
    request: Request,
    account_id: str = Body(embed=True),
    issuer_params: dict = Body(embed=True),
):
    s = request.headers.get("x-xxxxxx-condition-secret")

    if s != "c3d0d91e-8c07-4cac-8c50-b27ac696c15e":
        return {"code": 1, "status": "secret wrong"}

    if db.get_collection("account").find_one({"account_id": account_id}):
        return STDResponse({})

    return STDResponse({}, code=1)
