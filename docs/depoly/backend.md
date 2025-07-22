# 后端部署

配置 `src/main/resources/config/application.yml` 里面的配置信息:

::: code-group
```yml [application.yml]
server:
  port: 8081 # 后端端口

yunchat:
  port: 5120 # 通信端口
  host: localhost # 通信主机
  origin: http:/localhost:5173 # 跨域设置
  openapi: ... # 开放接口密钥 https://doc.handsock.xiaokolomi.cn/depoly/openapi.html
  secretKey: ... # 服务保护密钥（配置为16位长度的字符串）
  storageMod: 0 # 存储模式 0:本地 1:腾讯云COS 2: 阿里云OSS

storage: # 存储配置，若为本地可以不配置
  ali:
    bucket: ... # 阿里云存储桶名称
    endPoint: ... # 阿里云存储桶区域
    secretId: ... # 阿里云SecretId
    secretKey: ... # 阿里云SecretKey
  tencent:
    region: ... # 腾讯云存储桶区域
    bucket: ... # 腾讯云存储桶名称
    secretId: ... # 腾讯云SecretId
    secretKey: ... # 腾讯云SecretKey

spring:
  data:
    redis:
      port: 6379 # Redis端口
      host: localhost # Redis主机
      url: redis://localhost:6379 # Redis连接URL

  servlet:
    multipart:
      max-file-size: 10MB # 文件上传最大大小
      max-request-size: 10MB # 网络请求最大大小
  datasource:
    username: root # 数据库用户
    password: 12345678 # 数据库密码
    url: jdbc:mysql://localhost:3306/yunchat?useSSL=false&serverTimezone=UTC # 数据库连接URL
```
:::

申请DeepSeek大模型密钥：https://ppinfra.com/user/register?invited_by=UUC4HY

其中 `localhost` 请替换为实际的IP地址或域名，`...` 请替换为实际的配置信息，若不配置，请替换为任意字符串，否则部署时将报错。