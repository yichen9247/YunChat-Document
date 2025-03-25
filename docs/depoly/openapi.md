# 开放接口

以下接口为开放接口，有发送频率限制，可根据需求自行调用

## 发送机器人消息

- 请求方法：`POST`

- 请求路径：`/api/openapi/robot/send`

- 请求参数：
  - `gid`：频道编号
  - `content`：消息内容

- 请求认证：
  - `Authorization`：`<openapi>`