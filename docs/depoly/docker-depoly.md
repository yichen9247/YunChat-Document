# 一键部署

使用一键部署，你需要准备一个Docker环境，Docker环境安装请参考[官方文档](https://docs.docker.com/get-docker/)，安装完成后，请在 `docker-compose.yml` 文件中修改以下配置：

```yml
services:
  vue-app:
    build:
      context: .
      target: client-run  # 前端构建阶段
      args:
        VITE_AUTO_SHOW_IMAGE: false # 是否自动展开图片
        VITE_SERVER_IP: 192.168.0.101:5120 # 后端地址
        VITE_SERVER_URL: http://192.168.0.101:8081 # 通信地址
    ports:
      - "8080:80"

  springboot-app:
    build:
      context: .
      target: server-run  # 后端构建阶段
    hostname: HandSock-Linux
    ports:
      - "8081:8081"
      - "5120:5120"
    environment:
      SPRING_DATASOURCE_URL: jdbc:mysql://mysql-db:3306/handsock # 数据库连接URL
      SPRING_DATASOURCE_USERNAME: root # 数据库用户
      SPRING_DATASOURCE_PASSWORD: handsock123 # 数据库密码

      SPRING_SERVLET_MULTIPART_MAX_FILE_SIZE: 5MB # 文件上传最大大小
      SPRING_SERVLET_MULTIPART_MAX_REQUEST_SIZE: 5MB # 网络请求最大大小

      HANDSOCK_PORT: 5120 # 通信端口
      HANDSOCK_HOST: 0.0.0.0 # 通信主机（这项不必改）
      HANDSOCK_ORIGIN: http://192.168.0.101:8080 # 跨域设置

      HANDSOCK_AI_URL: https://api.ppinfra.com # AI接口
      HANDSOCK_AI_PATH: /v3/openai/chat/completions # AI接口路径
      HANDSOCK_AI_MODEL: deepseek/deepseek-r1/community # AI模型
      HANDSOCK_AI_TOKEN: ... # AI Token https://ppinfra.com/user/register?invited_by=UUC4HY
    depends_on:
      - mysql-db
      - redis-cache
      
  mysql-db:
    image: mysql:8.0
    ports:
      - "3306:3306"
    environment:
      MYSQL_DATABASE: handsock
      MYSQL_ROOT_PASSWORD: handsock123
    volumes:
      - mysql-data:/var/lib/mysql
    healthcheck:
      test: ["CMD", "mysqladmin", "ping", "-h", "localhost"]
      interval: 5s
      timeout: 10s
      retries: 10

  redis-cache:
    image: redis:6.2
    command: redis-server --bind 0.0.0.0 --appendonly yes
    ports:
      - "6379:6379"
    volumes:
    - redis-data:/data

volumes:
  mysql-data:
  redis-data:
```

其中 `192.168.0.1` 请替换为实际的IP地址或域名，填写错误将导致无法连接（很多人在这里踩了坑）。

如果你只是想单纯地一键部署后端，请将 `Dockerfile` 文件中的第 `10-12` 和 `34-39` 行注释掉，将 `docker-compose.yml` 文件中的第 `2-11` 行注释掉。

完成配置后，在项目的根目录执行命令 `docker-compose up -d` 即可完成一键部署，期间会安装很多依赖，需要等待一段时间，预计5分钟左右。

完成部署后，访问 `http://IP:8080` 即可进入前端页面，端口号可在配置文件中修改，如果修改了端口号，前端页面的地址也需要相应地修改。