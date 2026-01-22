# 接入模型

将外部的模型服务接入到YunChat中，以便YunChat可以调用这些模型服务进行智能回复。

## 支持模型

当前支持的模型有：[OpenAI](https://openai.com)&nbsp;&nbsp;&nbsp;[QwenAI](https://bailian.console.aliyun.com)&nbsp;&nbsp;&nbsp;[ZhiPuAI](https://bigmodel.cn)&nbsp;&nbsp;&nbsp;[GeminiAI](https://ai.google.dev/gemini-api/docs)

其中OpenAI支持使用基础地址参数，因此大部分模型兼容OpenAI接口，暂不支持深度思考大模型，您可以根据自己的需求选择合适的模型进行接入，例如：[DeepSeek](https://platform.deepseek.com)

## 特殊说明

AI模块（YunChat AI）仅支持使用OpenAI模型，群聊内聊天支持模型切换，修改模型相关配置后，需要重启服务端才能生效。
