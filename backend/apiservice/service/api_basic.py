from service.service import *
from fastapi import (
    Body,
    Response,
)
from third_party.aliyun_sms import *
from third_party.aliyun_oss import *
from dao.mongo import *
import dao.chain_mongo
from service.log import logger
from dao.model import *
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
from Crypto.PublicKey import RSA
from Crypto.Cipher import PKCS1_OAEP
import base64
from service.api_premium import *

@router.get("/Ping", name="检测服务端当前状态")
async def api_static_resource():
    return STDResponse({})


@router.post("/GetAchievementMobileBannerInfo", name="获取成就的Banner数据")
async def GetAchievementMobileBannerInfo():
    return STDResponse(
        {
            "state": True,
            "title": "什么是数字成就？一文教你打开新世界大门！",
            "image": "https://static.xxxxxx.com/9eaf762726020cf9f0853348759c53c5ffcb96b350c3c3da92cd5127a1853b3d",
            "content": """ 
                <div class="tw-w-full tw-h-32" style="background: url(https://static.xxxxxx.com/4406548a05a629ce7c375f185c93fcb0362c01cbaa4812541ca29de6efd53478) center center no-repeat; background-size: cover;">
                </div>
                <div class="tw-p-2 tw-mt-2">
                    <div class="tw-p-3 tw-bg-white tw-bg-opacity-5 tw-rounded-lg">
                        <div>xxxxxx是什么?</div>
                        <div class="tw-text-sm tw-text-white tw-text-opacity-60 tw-mt-1">“xxxxxx”
                            是国内领先的综合型数字内容运营公司，具有完整的技术开发与运营团队，在创作者经济和区块链领域积累了丰富的运营经验和技术沉淀。我们的使命是为用户提供高效、安全、可信的数字身份与数字成就系统，推动数字化产业的发展。
                        </div>
                    </div>
                    <div class="tw-p-3 tw-bg-white tw-mt-3 tw-bg-opacity-5 tw-rounded-lg">
                        <div>什么是数字成就？</div>
                        <div class="tw-text-sm tw-text-white tw-text-opacity-60 tw-mt-1">
                            <div>
                                数字成就是一种基于区块链技术的数字藏品，可以用于构建代表社会关系的承诺、证书或从属关系，并将个人或实体的特证和成就以区块链的形式进行标记。以下是数字成就的一些应用场景：
                            </div>
                            <ul class="tw-my-1">
                                <li><span class="tw-text-blue-500 tw-mr-1">教育证书(Proof Of Education)</span>
                                    证明您的受教育经历。</li>
                                <li><span class="tw-text-blue-500 tw-mr-1">工作证明(Proof Of Work)</span>证明您曾经付出过的工作量。</li>
                                <li><span class="tw-text-blue-500 tw-mr-1">出席证明(Proof Of
                                        Attendance)</span>证明您曾经参加过的聚会、活动或会议。
                                </li>
                            </ul>
                            <div>这些数据将会通过区块链技术永久的保存在数字世界中，并具备不可转让和无法篡改等特性。<span
                                    class="tw-text-blue-500">我们坚信，在这个世界上，每个人的存在和付出都是有价值且有意义的，每个人都有机会成为历史的一部分。</span>
                            </div>
                        </div>
                    </div>
                    <div class="tw-p-3 tw-bg-white tw-mt-3 tw-bg-opacity-5 tw-rounded-lg">
                        <div>如何收集数字成就？</div>
                        <div class="tw-text-sm tw-text-white tw-text-opacity-60 tw-mt-1">
                            <div>
                                任何人都可以通过参与各种活动，来完成数字成就的收集。您可以随时关注我们的官方网站（xxxxxx.com），以跟踪最新的活动，也可以直接向您参与的活动组织者发出倡议，为本次活动发行一个数字成就。
                            </div>
                            <div>您收集的数字成就将永久保存在区块链上，记录您曾经付出的努力或参与的事件。</div>
                        </div>
                    </div>
                    <div class="tw-p-3 tw-bg-white tw-mt-3 tw-bg-opacity-5 tw-rounded-lg">
                        <div>如何发行数字成就？</div>
                        <div class="tw-text-sm tw-text-white tw-text-opacity-60 tw-mt-1">
                            <div>任何实体或个人都有机会成为数字成就的发行者。通过发行数字成就，您可以吸引更多的用户或粉丝，增强用户的忠诚度和联系，同时也可以出于非商业目的，去纪念或证明某些事情。</div>
                            <div>目前在xxxxxx上发行数字成就是<span class="tw-text-blue-500">完全免费</span>的。</div>
                        </div>
                    </div>
                    <div class="tw-p-3 tw-bg-white tw-mt-3 tw-bg-opacity-5 tw-rounded-lg">
                        <div>如何联系到官方人员？</div>
                        <div class="tw-text-sm tw-text-white tw-text-opacity-60 tw-mt-1">
                            <div>无论是您想成为数字成就的发行方，还是想加入我们一起改变世界。 <span
                                    class="tw-text-blue-500">欢迎您通过邮箱（contact@xxxxxx.com）与我们联系，无需有任何顾虑。</span>
                            </div>
                        </div>
                    </div>
                    <div class="tw-py-5"></div>
                </div>
            """,
        }
    )



@router.post("/GetDIDMobileBannerInfo", name="获取身份的Banner数据")
async def GetDIDMobileBannerInfo():
    return STDResponse(
        {
            "state": True,
            "title": "只需三分钟，创建属于你的数字身份！",
            "image": "https://static.xxxxxx.com/ed4542e7b8a4348f936d5d27f5fcd2f5e77c33c0ba5b4f9bfe3d56ab2960ca61",
            "content": """ 
                <div class="tw-w-full tw-h-32" style="background: url(https://static.xxxxxx.com/ed4542e7b8a4348f936d5d27f5fcd2f5e77c33c0ba5b4f9bfe3d56ab2960ca61) center center no-repeat; background-size: cover;">
                </div>
                <div class="tw-p-2 tw-mt-2">
                    <div class="tw-p-3 tw-bg-white tw-bg-opacity-5 tw-rounded-lg">
                        <div>xxxxxx是什么?</div>
                        <div class="tw-text-sm tw-text-white tw-text-opacity-60 tw-mt-1">“xxxxxx”
                            是国内领先的综合型数字内容运营公司，具有完整的技术开发与运营团队，在创作者经济和区块链领域积累了丰富的运营经验和技术沉淀。我们的使命是为用户提供高效、安全、可信的数字身份与数字成就系统，推动数字化产业的发展。
                        </div>
                    </div>
                    <div class="tw-p-3 tw-bg-white tw-mt-3 tw-bg-opacity-5 tw-rounded-lg">
                        <div>什么是数字成就？</div>
                        <div class="tw-text-sm tw-text-white tw-text-opacity-60 tw-mt-1">
                            <div>
                                数字成就是一种基于区块链技术的数字藏品，可以用于构建代表社会关系的承诺、证书或从属关系，并将个人或实体的特证和成就以区块链的形式进行标记。以下是数字成就的一些应用场景：
                            </div>
                            <ul class="tw-my-1">
                                <li><span class="tw-text-blue-500 tw-mr-1">教育证书(Proof Of Education)</span>
                                    证明您的受教育经历。</li>
                                <li><span class="tw-text-blue-500 tw-mr-1">工作证明(Proof Of Work)</span>证明您曾经付出过的工作量。</li>
                                <li><span class="tw-text-blue-500 tw-mr-1">出席证明(Proof Of
                                        Attendance)</span>证明您曾经参加过的聚会、活动或会议。
                                </li>
                            </ul>
                            <div>这些数据将会通过区块链技术永久的保存在数字世界中，并具备不可转让和无法篡改等特性。<span
                                    class="tw-text-blue-500">我们坚信，在这个世界上，每个人的存在和付出都是有价值且有意义的，每个人都有机会成为历史的一部分。</span>
                            </div>
                        </div>
                    </div>
                    <div class="tw-p-3 tw-bg-white tw-mt-3 tw-bg-opacity-5 tw-rounded-lg">
                        <div>如何收集数字成就？</div>
                        <div class="tw-text-sm tw-text-white tw-text-opacity-60 tw-mt-1">
                            <div>
                                任何人都可以通过参与各种活动，来完成数字成就的收集。您可以随时关注我们的官方网站（xxxxxx.com），以跟踪最新的活动，也可以直接向您参与的活动组织者发出倡议，为本次活动发行一个数字成就。
                            </div>
                            <div>您收集的数字成就将永久保存在区块链上，记录您曾经付出的努力或参与的事件。</div>
                        </div>
                    </div>
                    <div class="tw-p-3 tw-bg-white tw-mt-3 tw-bg-opacity-5 tw-rounded-lg">
                        <div>如何发行数字成就？</div>
                        <div class="tw-text-sm tw-text-white tw-text-opacity-60 tw-mt-1">
                            <div>任何实体或个人都有机会成为数字成就的发行者。通过发行数字成就，您可以吸引更多的用户或粉丝，增强用户的忠诚度和联系，同时也可以出于非商业目的，去纪念或证明某些事情。</div>
                            <div>目前在xxxxxx上发行数字成就是<span class="tw-text-blue-500">完全免费</span>的。</div>
                        </div>
                    </div>
                    <div class="tw-p-3 tw-bg-white tw-mt-3 tw-bg-opacity-5 tw-rounded-lg">
                        <div>如何联系到官方人员？</div>
                        <div class="tw-text-sm tw-text-white tw-text-opacity-60 tw-mt-1">
                            <div>无论是您想成为数字成就的发行方，还是想加入我们一起改变世界。 <span
                                    class="tw-text-blue-500">欢迎您通过邮箱（contact@xxxxxx.com）与我们联系，无需有任何顾虑。</span>
                            </div>
                        </div>
                    </div>
                    <div class="tw-py-5"></div>
                </div>
            """,
        }
    )

@router.post("/IsPhoneOccupied", name="手机号是否已注册")
async def api_phone_occupied(phone: str = Body(embed=True)):
    user = account_db.find_one({"phone": phone})
    if not user:
        return STDResponse(
            {
                "status": False,
            }
        )
    return STDResponse(
        {
            "status": True,
        }
    )


@router.post("/SendSMSCode", name="获取短信")
async def api_send_sms_code(
    phone: str = Body(embed=True),
):
    sms_code = generate_sms_code()
    send_sms_code(phone, sms_code)
    sms_code_db.update_one(
        {"phone": phone},
        get_mongodb_upsert_data(
            {
                "phone": phone,
                "code": sms_code,
            }
        ),
        upsert=True,
    )
    return STDResponse({"msg": "success"})


@router.post("/Login", name="登陆")
async def api_login(
    phone: str = Body(embed=True),
    sms_code: str = Body(embed=True),
):
    if not validate_sms_code(phone, sms_code):
        raise ERR_INVALID_SMS_CODE
    return login(phone)


def login(phone: str = Body(embed=True)):
    user = account_db.find_one({"phone": phone})
    if not user:
        account_id = str(uuid.uuid4())
        wallet_address = create_account(account_id)
        password = generate_random_string(16)
        timestamp = get_timestamp()
        print("-- insert account --")
        print(account_id)

        d = gen_default_name(account_id)

        account_db.insert_one(
            {
                "account_id": account_id,
                "password": password,
                "wallet_address": wallet_address,
                "phone": phone,
                "created_at": timestamp,
                "updated_at": timestamp,
                "deleted_at": 0,
                "avatar": d.get("default_avatar"),
                "banner": d.get("default_banner"),
                "name": d.get("default_name"),
                "desc": d.get("default_desc"),
                "issuer": False,  # 是否是发行者
            },
        )
    else:
        account_id = user.get("account_id")
    access_token_expires = timedelta(minutes=config.JWTExpiration)
    access_token = create_access_token(
        data={"sub": account_id}, expires_delta=access_token_expires
    )
    return STDResponse(
        {"access_token": access_token, "token_type": "bearer", "account_id": account_id}
    )


def gen_default_name(account_id):
    d = {
        "name": "用户" + account_id[0:8],
        "desc": "这个人很懒，什么都没有留下",
        "default_avatar": "https://static.xxxxxx.com/default_avatar.png",
        "default_banner": "https://static.xxxxxx.com/images/9214b8c6b205da3c1ecbd2faf63260bdb8653ddf78373f58584f9a7f751a473c.jpg",
    }
    return d


def create_account(
    account_id: str,
):
    ethereum_account = generate_ethereum_account()
    address = ethereum_account["address"]
    cipher = PKCS1_OAEP.new(RSA.import_key(config.ChainEncryptPublicKey))
    encrypted_private_key = base64.b64encode(
        cipher.encrypt(ethereum_account["account"].key)
    ).decode("utf-8")
    dao.chain_mongo.chain_account_wallet_db.update_one(
        {"account_id": account_id},
        get_mongodb_upsert_data(
            {
                "wallet_id": uuid.uuid4().hex,
                "wallet_address": address,
                "wallet_private_key": encrypted_private_key,
            }
        ),
        upsert=True,
    )
    return address


@router.post("/UploadImage", name="上传图片")
async def api_upload_image(form=Form(...), account=Depends(get_current_account)):
    account_id = account.get("account_id")
    if not account_id:
        raise ERR_INVALID_SESSION
    _, file_ext = os.path.splitext(form.filename)
    if file_ext not in [".png", ".jpg", ".gif", ".jpeg"]:
        raise ERR_INVALID_FILE_TYPE
    file_path = upload_file(await form.read(), file_ext, dirname="images")
    add_upload_files(account_id, file_ext, file_path)
    return {"image_uri": urljoin(config.AliYunOssFileBaseURI, file_path)}


@router.post("/UploadVideo", name="上传视频")
async def api_upload_image(form=Form(...), account=Depends(get_current_account)):
    account_id = account.get("account_id")
    if not account_id:
        raise ERR_INVALID_SESSION
    premium_status = PremiumStatus(**account.get('premium_status', {})) 
    is_premium_activated = premium_status.is_activated()
    if not is_premium_activated:
        raise ERR_ONLY_PREMIUM_CAN_UPLOAD_VIDEO
    _, file_ext = os.path.splitext(form.filename)
    if file_ext not in [".mp4", ".avi", ".mov", ".flv"]:
        raise ERR_INVALID_FILE_TYPE
    file_path = upload_file(await form.read(), file_ext, dirname="videos")
    add_upload_files(account_id, file_ext, file_path)
    return {"video_uri": urljoin(config.AliYunOssFileBaseURI, file_path)}


@router.post("/GetShareQrcode", name="获取分享二维码")
def api_get_share_qrcode(
    account=Depends(get_current_account),
):
    account_id = account.get("account_id")
    if not account_id:
        raise ERR_INVALID_SESSION

    data = profile_db.find_one({"account_id": account_id})
    if not data:
        raise ERR_INVALID_PROFILE_ID

    share_qrcode = data.get("share_qrcode")
    if not share_qrcode is None or share_qrcode == "":
        return STDResponse({"path": share_qrcode})

    profile = ProfileCRD.parse_raw(data.get("profile"))

    share_qrcode = get_share_qrcode(account_id, profile.spec.slug, profile.spec.avatar)
    return STDResponse({"path": share_qrcode})
