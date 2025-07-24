# 反向代理

如果你使用了反向代理，请修改Nginx或者Apache的配置文件，否则将错误识别客户端的IP

在Nginx的配置文件中，使用 `proxy_set_header` 指令来添加Forwarded头：

```js
server {
    listen 80;
    server_name example.com;

    location / {
        proxy_pass http://127.0.0.1:5120;

        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";

        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    }
}
```

在Apache的配置文件中，使用 `RequestHeader` 指令来添加Forwarded头：

```xml
<VirtualHost *:80>
    ServerName example.com

    ProxyPreserveHost On
    ProxyPass        "/" "http://127.0.0.1:5120/"
    ProxyPassReverse "/" "http://127.0.0.1:5120/"

    RewriteEngine On
    RewriteCond %{HTTP:Upgrade} websocket [NC]
    RewriteCond %{HTTP:Connection} upgrade [NC]
    RewriteRule ^/(.*) "ws://127.0.0.1:5120/$1" [P,L]

    RequestHeader set Host              "%{HTTP_HOST}s"
    RequestHeader set X-Real-IP         "%{REMOTE_ADDR}s"
    RequestHeader set X-Forwarded-For   "%{REMOTE_ADDR}s"
</VirtualHost>
```