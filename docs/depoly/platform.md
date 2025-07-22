# 平台支持

YunChat客户端提供了Android和Windows两个版本，Android版本支持Android9.0及以上版本，Windows版本支持Windows 10及以上版本。

## Android
打包或运行Android版本需要安装Android Studio，下载地址：https://developer.android.google.cn/studio
，以下是环境要求：

- JDK：1.8.0
- AGP：8.7.0
- Gradle：8.10.2
- Android SDK：30及以上

```kt
package com.android.yunchat.config

object AppConfig {
    const val animationSpec: Long = 150 // 基础动画时长
    const val tencentAppId: String = "..." // 腾讯QQ互联AppId
    const val socketVersion: String = "2.3.2-B21" // 后端版本
    const val secretKey: String = "..." // 服务保护密钥（配置为16位长度的字符串）
    const val socketUrl: String = "http://localhost:5120" // 通信地址
    const val serverUrl: String = "http://localhost:8081" // 后端地址
}
```

请先在 `YunChat-Android/com/app/src/main/kotlin/com/android/yunchat/config/AppConfig.kt` 中配置信息后直接按照正常打包流程打包即可。

其中 `localhost` 请替换为实际的IP地址或域名，`...` 请替换为实际的配置信息，若不配置，请替换为任意字符串，否则部署时将报错。

其中 `tencentAppId` 为腾讯QQ互联AppId，若无可填写为空字符串，申请地址为：https://connect.qq.com/manage.html
，其余互联信息配置请参考：https://wiki.connect.qq.com


## Windows
Windows版本基于Tauri框架开发，打包或运行Windows版本需要安装Visual Studio 2022，下载地址：https://visualstudio.microsoft.com/zh-hans/downloads
，以下是环境要求：

- Tarui：2.0
- Windows SDK：10.0及以上

```bash
cd YunChat-Client

# 运行命令
npm run tauri:dev

# 打包命令
npm run tauri:build
```

如果在本地开发且前后端协议均使用HTTP的情况下，请将 `YunChat-Client/src-tauri/tauri.conf.json` 中的 `useHttpsScheme` 改为 `false`