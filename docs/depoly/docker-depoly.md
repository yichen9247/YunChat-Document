# 一键部署

使用一键部署，你需要准备一个Docker环境，Docker环境安装请参考[官方文档](https://docs.docker.com/get-docker/)，安装完成后，请在 `docker-compose.yml` 文件中修改以下配置：

```yml
services:
  vue-app:
    build:
      context: .
      target: client-run  # 前端构建阶段
      args:
        VITE_SERVER_IP: localhost:5120 # 后端地址
        VITE_APP_SCAN_LOGIN: false # 是否开启扫码登录方式
        VITE_APP_AUTO_SHOWIMAGE: false # 是否自动展开图片
        VITE_SERVER_URL: http://localhost:8081 # 通信地址
        VITE_APP_SECRET_KEY: yichen9247-44052 # 服务保护密钥（配置为16位长度的字符串）
    ports:
      - "8080:80"

  springboot-app:
    build:
      context: .
      target: server-run  # 后端构建阶段
    hostname: YunChat-Linux
    ports:
      - "8081:8081"
      - "5120:5120"
    environment:
      SPRING_DATASOURCE_URL: jdbc:mysql://mysql-db:3306/yunchat # 数据库连接URL
      SPRING_DATASOURCE_USERNAME: root # 数据库用户
      SPRING_DATASOURCE_PASSWORD: yunchat123 # 数据库密码

      SPRING_SERVLET_MULTIPART_MAX_FILE_SIZE: 5MB # 文件上传最大大小
      SPRING_SERVLET_MULTIPART_MAX_REQUEST_SIZE: 5MB # 网络请求最大大小

      YUNCHAT_PORT: 5120 # 通信端口
      YUNCHAT_HOST: 0.0.0.0 # 通信主机（这项不必改）
      YUNCHAT_ORIGIN: http://localhost:8080 # 跨域设置
      YUNCHAT_OPENAPI: ... # 开放接口密钥 https://doc.YunChat.xiaokolomi.cn/depoly/openapi.html
      
      YUNCHAT_STORAGE_ALI_BUCKET: ... # 阿里云存储桶名称
      YUNCHAT_STORAGE_ALI_ENDPOINT: ... # 阿里云存储桶区域
      YUNCHAT_STORAGE_ALI_SECRETID: ... # 阿里云SecretId
      YUNCHAT_STORAGE_ALI_SECRETKEY: ... # 阿里云SecretKey

      YUNCHAT_STORAGE_TENCENT_REGION: ... # 腾讯云存储桶区域
      YUNCHAT_STORAGE_TENCENT_BUCKET: ... # 腾讯云存储桶名称
      YUNCHAT_STORAGE_TENCENT_SECRETID: ... # 腾讯云SecretId
      YUNCHAT_STORAGE_TENCENT_SECRETKEY: ... # 腾讯云SecretKey

      YUNCHAT_SECRET_KEY: ... # 服务保护密钥（配置为16位长度的字符串）
      YUNCHAT_STORAGE_MOD: 0 # 存储模式 0:本地 1:腾讯云COS 2: 阿里云OSS
    depends_on:
      - mysql-db
      - redis-cache
      
  mysql-db:
    image: mysql:8.0
    ports:
      - "3306:3306"
    environment:
      MYSQL_DATABASE: yunchat
      MYSQL_ROOT_PASSWORD: yunchat123
    volumes:
      - mysql-data:/var/lib/mysql
    healthcheck:
      test: ["CMD", "mysqladmin", "ping", "-h", "localhost"]
      interval: 5s
      timeout: 10s
      retries: 10

  redis-cache:
    image: redis:6.2
    command: redis-server --bind 0.0.0.0 --appendonly yes  # 添加 --bind 0.0.0.0
    ports:
      - "6379:6379"
    volumes:
    - redis-data:/data

volumes:
  mysql-data:
  redis-data:
```

其中 `localhost` 请替换为实际的IP地址或域名，`...` 请替换为实际的配置信息，若不配置，请替换为任意字符串，否则部署时将报错。

如果你只是想单纯地一键部署后端，请将 `Dockerfile` 文件中的第 `10-26` 和 `38-43` 行注释掉，将 `docker-compose.yml` 文件中的第 `2-13` 行注释掉。

完成配置后，在项目的根目录执行命令 `docker-compose up -d` 即可完成一键部署，期间会安装很多依赖，需要等待一段时间，预计5分钟左右。

首次部署由于需要下载相关依赖，预计10分钟左右才可以部署完成，根据网络情况而定。

完成部署后，访问 `http://IP:8080` 即可进入前端页面，端口号可在配置文件中修改，如果修改了端口号，前端页面的地址也需要相应地修改。