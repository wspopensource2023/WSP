import uuid
import qrcode
from PIL import Image
import matplotlib.pyplot as plt
from PIL import ImageDraw
from PIL import ImageFont
from tools.netfile import download
from third_party.aliyun_oss import upload_local_file
import os

def get_qrcode(path: str, image_url: str):
    qrcode_tmp_filepath = get_tmp_filepath()
    qrcode_tmp_filename = get_tmp_filename() + ".png"
    qrcode_tmp_localpath = os.path.join(qrcode_tmp_filepath, qrcode_tmp_filename)

    # 初始化二维码
    qr = qrcode.QRCode(
        version=1,
        error_correction=qrcode.constants.ERROR_CORRECT_L,
        box_size=12,
        border=4,
    )
    qr.add_data(path)
    qr.make(fit=True)
    qrcode_image = qr.make_image(fill_color="black", back_color="white")
    qrcode_image = qrcode_image.convert("CMYK")

    # 设置中心logo
    if image_url != "":
        qrcode_image = set_logo(image_url, qrcode_image)

    qrcode_image = qrcode_image.convert('RGB')
    qrcode_image.save(qrcode_tmp_localpath)

    qrcode_image = qrcode_image.resize((360, 360))
    draw = ImageDraw.Draw(qrcode_image)

    # 设置文字
    # text = u'text'
    # encoded_text = text.encode('utf-8')
    # draw.text(xy=(170, 345), text=encoded_text, fill=(50, 51, 51), align='center')


    # 上传二维码图片只OSS
    oss_path = upload_local_file(qrcode_tmp_localpath, qrcode_tmp_filename, "qrcode")
    # 删除临时文件
    os.remove(qrcode_tmp_localpath)
    return oss_path


def set_logo(image_url: str, qrcode_image: object):
    logo_tmp_filename = get_tmp_filename()
    logo_tmp_filepath = get_tmp_filepath()
    download(image_url, logo_tmp_filepath, logo_tmp_filename)
    logo_tmp_localpath = os.path.join(logo_tmp_filepath, logo_tmp_filename)
    logo_image = Image.open(logo_tmp_localpath)

    # 重新设置logo的尺寸
    qrcode_w, qrcode_h = qrcode_image.size
    factor = 6
    size_w = int(qrcode_w / factor)
    size_h = int(qrcode_h / factor)
    logo_w, logo_h = logo_image.size
    if logo_w > size_w:
        logo_w = size_w
    if logo_h > size_h:
        logo_h = size_h
    logo_image = logo_image.resize((logo_w, logo_h), Image.ANTIALIAS)
    w = int((qrcode_w - logo_w) / 2)
    h = int((qrcode_h - logo_h) / 2)
    qrcode_image.paste(logo_image, (w, h), None)
    os.remove(logo_tmp_localpath)
    return qrcode_image


def get_tmp_filepath():
    return os.path.join(os.getcwd(), "tmp")

def get_tmp_filename():
    uuid_str = uuid.uuid4().hex
    tmp_filename = 'tmpfile_%s' % uuid_str
    return tmp_filename