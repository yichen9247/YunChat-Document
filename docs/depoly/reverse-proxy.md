# 反向代理

如果你使用了反向代理，请修改Nginx或者Apache的配置文件，否则将错误识别客户端的IP

在Nginx的配置文件中，使用 `proxy_set_header` 指令来添加Forwarded头：

```js
server {
    listen 80;
    server_name example.com;

    location / {
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    }
}
```

在Apache的配置文件中，使用 `RequestHeader` 指令来添加Forwarded头：

```xml
<VirtualHost>
    ProxyPreserveHost On
</VirtualHost>
```