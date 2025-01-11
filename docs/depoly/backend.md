# 后端部署

配置 `src/main/resources/config/application.yml` 里面的配置信息:

::: code-group
```yml [application.yml]
server:
  port: 8081 # 后端端口

handsock:
  port: 5120 # 通信端口
  host: 192.168.0.1 # 通信主机
  name: HandSock # 应用名称
  admin: admin@163.com # 管理员邮箱
  origin: http://192.168.0.1:5173 # 跨域设置
  reportMail: true # 是否发送举报邮件
  pingTimeout: 6000000 # PING超时
  pingInterval: 25000 # PING间隔
  upgradeTimeout: 1000000 # 更新超时

spring:
  data:
    redis:
      port: 6379 # Redis端口
      host: localhost # Redis主机
  mail:
    port: 25 # 邮件服务器端口
    host: smtp.163.com # 邮件服务器地址
    password: password # 邮箱密码
    username: admin@163.com # 邮箱账号

  servlet:
    multipart:
      max-file-size: 5MB # 文件上传最大大小
      max-request-size: 5MB # 网络请求最大大小
  datasource:
    username: root #数据库用户
    password: 12345678 # 数据库密码
    url: jdbc:mysql://localhost:3306/handsock?useSSL=false&serverTimezone=UTC # 数据库连接URL（handsock为数据库名，必须为handsock）
```
:::

其中 `192.168.0.1` 请替换为实际的IP地址或域名，数据库名称暂时只能使用 `handsock`，`origin` 这一项请跟前端的地址一致，否则将导致无法连接（很多人在这里踩了坑）。