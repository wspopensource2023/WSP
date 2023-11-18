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


@router.post("/VerifyFollow")
def verify_follow(
    request: Request,
    account_id: str = Body(embed=True),
    issuer_params: dict = Body(embed=True),
):
    s = request.headers.get("x-xxxxxx-condition-secret")
    if s != "aaad7add-ced9-4b48-8257-3c95fc1b8b2e":
        return {"code": 1, "status": "secret wrong"}
    follow_count = issuer_params.get("follow_count")
    if not follow_count:
        return {"code": 1, "status": "follow_count not found"}
    c = db.get_collection("follow").count_documents(
        {"account_id": account_id, "state": True}
    )
    if c >= follow_count:
        return STDResponse({})
    return STDResponse({}, code=1)
