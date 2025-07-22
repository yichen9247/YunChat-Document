import { defineConfig } from 'vitepress'

export default defineConfig({
  lastUpdated: true,
  title: "YunChat文档",
  description: "一款有趣的聊天应用",
  themeConfig: {
    i18nRouting: true,
    nav: [
      { text: '首页', link: '/' },
      { text: '简介', link: '/depoly/intro' },
      { text: '演示站', link: 'https://im.yunair.cn' },
      { text: '客户端下载', items: [{ 
          text: 'Android', link: 'https://doc.handsock.xiaokolomi.cn/apk/app-release.apk' 
      }, { 
          text: 'Windows', link: 'https://doc.handsock.xiaokolomi.cn/msi/YunChat_2.3.2_x64_en-US.msi' 
      }]},
    ],

    sidebar: [
      {
        items: [
          { text: '项目简介', link: '/depoly/intro' },
          { text: '快速上手', link: '/depoly/quick-start' },
          { text: '后端部署', link: '/depoly/backend' },
          { text: '前端部署', link: '/depoly/frontend' },
          { text: '一键部署', link: '/depoly/docker-depoly' },
          { text: '平台支持', link: '/depoly/platform' },
          { text: '运行项目', link: '/depoly/start-run' },
          { text: '反向代理', link: '/depoly/reverse-proxy' },
          { text: '更新迁移', link: '/depoly/migrate' },
          { text: '开放接口', link: '/depoly/openapi' },
          { text: '付费搭建', link: '/depoly/pay-build' },
          { text: '常见问题', link: '/depoly/faq' }
        ]
      }
    ],
 
    socialLinks: [
      { icon: 'github', link: 'https://github.com/yichen9247/YunChat' }
    ],
    
    footer: {
      message: '<p style="line-height: 32px;"><a href="https://beian.miit.gov.cn" target="_blank">蜀ICP备2025133319号-1</a></p>',
    },

    editLink: {
      pattern: 'https://github.com/yichen9247/YunChat-Document/edit/main/docs/:path'
    }
  },
  head: [['link', { rel: 'icon', href: '/favicon.ico' }]]
});