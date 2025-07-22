# 前端部署

请分别配置 `.env.production` 和 `.env.development` 这两个配置文件，以下是配置文件说明：

- .env.production: 线上环境
- .env.development：开发环境

请根据实际情况选择对应的环境配置文件：

::: code-group
``` text [.env.production]
VITE_APP_SCAN_LOGIN = false # 是否开启扫码登录方式
VITE_APP_AUTO_SHOWIMAGE = false # 是否自动展开聊天图片
VITE_SERVER_IP = localhost:5120 # 后端地址
VITE_SERVER_URL = http://localhost:8081 # 通信地址
VITE_APP_SECRET_KEY = ... # 服务保护密钥（配置为16位长度的字符串）
```

``` text [.env.development]
VITE_APP_SCAN_LOGIN = false # 是否开启扫码登录方式
VITE_APP_AUTO_SHOWIMAGE = false # 是否自动展开聊天图片
VITE_SERVER_IP = localhost:5120 # 后端地址
VITE_SERVER_URL = http://localhost:8081 # 通信地址
VITE_APP_SECRET_KEY = ... # 服务保护密钥（配置为16位长度的字符串）
```
:::

其中 `localhost` 请替换为实际的IP地址或域名，`...` 请替换为实际的配置信息，若不配置，请替换为任意字符串，否则部署时将报错。