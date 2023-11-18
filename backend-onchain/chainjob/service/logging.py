import logging

# 创建日志记录器
logger = logging.getLogger(__name__)
logger.setLevel(logging.DEBUG)

# 创建控制台处理器
console_handler = logging.StreamHandler()
console_handler.setLevel(logging.DEBUG)

# 创建文件处理器
file_handler = logging.FileHandler('apiservice.log')
file_handler.setLevel(logging.DEBUG)

# 创建格式化器
formatter = logging.Formatter('[%(asctime)s][%(levelname)s][%(message)s]')
file_handler.setFormatter(formatter)

# 将文件处理器添加到日志记录器
logger.addHandler(file_handler)
logger.addHandler(console_handler)
