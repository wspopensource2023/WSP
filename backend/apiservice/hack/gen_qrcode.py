import qrcode
from PIL import Image, ImageDraw, ImageOps, ImageFilter
import requests
import io


def generate_qrcode(data_url, image_url):
    # 生成二维码
    qr = qrcode.QRCode(version=1, error_correction=qrcode.constants.ERROR_CORRECT_L, box_size=3, border=10)
    qr.add_data(data_url)
    qr.make(fit=True)
    img_qr = qr.make_image(fill_color="black", back_color="white")

    def get_image_from_uri(uri):
        response = requests.get(uri)
        img_data = response.content
        return Image.open(io.BytesIO(img_data)).convert("RGBA")

    img_image = get_image_from_uri(image_url)
    img_image = img_image.resize((80, 80), resample=Image.LANCZOS)

    # 添加圆角
    mask = Image.new("L", img_image.size, 0)
    draw = ImageDraw.Draw(mask)
    draw.ellipse((0, 0, img_image.size[0], img_image.size[1]), fill=255)
    mask = mask.filter(ImageFilter.GaussianBlur(radius=3))
    img_image = ImageOps.fit(img_image, mask.size, centering=(0.5, 0.5))
    img_image.putalpha(mask)

    # 创建圆角矩形
    img_rect = Image.new("RGBA", (100, 100), (255, 255, 255, 255))
    draw = ImageDraw.Draw(img_rect)
    draw.rounded_rectangle((0, 0, img_rect.size[0], img_rect.size[1]), radius=5, fill=(0, 0, 0, 0),
                           outline=(0, 0, 0, 255), width=5)

    # 将图片放置在圆角矩形中间
    img_rect.paste(img_image, (
        img_rect.size[0] // 2 - img_image.size[0] // 2,
        img_rect.size[1] // 2 - img_image.size[1] // 2),
                   img_image)

    # 将圆角矩形放置在二维码中间
    img_qr.paste(img_rect, (
        img_qr.size[0] // 2 - img_rect.size[0] // 2, img_qr.size[1] // 2 - img_rect.size[1] // 2),
                 img_rect)

    # 添加白边
    border_size = 30
    img_qr = ImageOps.expand(img_qr, border=border_size, fill="white")

    # 保存生成的二维码
    img_qr.save("qrcode.png")


generate_qrcode('https://www.baidu.com',
                'https://xxxxxxxx/images/00e9a0ff6a2df25d5deaee98298d2ac4061ad709f5cd3b7797bc62bc72790f5f.jpg')
