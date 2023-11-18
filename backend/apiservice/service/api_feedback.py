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
from bson import ObjectId


@router.post("/feedback", name="用户留言写入")
def feedback(message: str = Body(embed=True)):
    """
    用户留言,前端把 Emall + 手机号 + account 都传递过来
    未处理 0
    已经处理 1
    """
    feedback_db.insert_one(
        {"create_time": datetime.now(), "status": 0, "message": message}
    )

    return {"code": 0}


@router.post("/handle-feedback")
def handle_feedback(
    account=Depends(get_current_account), doc_id: str = Body(embed=True)
):
    """
    处理留言，点击按钮，保存处理人
    """
    homie(account)
    feedback_db.find_one_and_update({"_id": ObjectId(doc_id)}, {"$set": {"status": 1}})
    return {"code": 0}


@router.post("/list-feedback")
def list_feedback(
    account=Depends(get_current_account),
    limit: int = Body(embed=True),
    skip: int = Body(embed=True),
):
    """
    按照未处理倒序排
    """
    homie(account)
    if limit is None:
        limit = 10
    if skip is None:
        skip = 0
    skip = skip - 1
    l = []
    cursor = feedback_db.find().sort("status", -1).skip(skip).limit(limit)
    for i in cursor:
        l.append(i)
    total_count = db.get_collection("feedback").estimated_document_count()
    return {"code": 0, "data": l, "total": total_count}
