import { defineConfig } from 'vitepress'

export default defineConfig({
  title: "HandSock文档",
  lastUpdated: true,
  description: "一款有趣的聊天应用",
  themeConfig: {
    i18nRouting: true,
    nav: [
      { text: '首页', link: '/' },
      { text: '简介', link: '/depoly/intro' },
      { text: '演示站', link: 'https://handsock.xiaokolomi.cn/' },
    ],

    sidebar: [
      {
        items: [
          { text: '项目简介', link: '/depoly/intro' },
          { text: '快速上手', link: '/depoly/quick-start' },
          { text: '后端部署', link: '/depoly/backend' },
          { text: '前端部署', link: '/depoly/frontend' },
          { text: '运行项目', link: '/depoly/start-run' },
          { text: '反向代理', link: '/depoly/reverse-proxy' },
          { text: '常见问题', link: '/depoly/faq' }
        ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/yichen9247/HandSock' }
    ],
    
    footer: {
      message: '基于 <b>MIT</b> 许可发布',
      copyright: '版权所有 © 2023 至今 <a href="https://github.com/yichen9247" target="_blank">Hua</a>'
    },

    editLink: {
      pattern: 'https://github.com/yichen924/Handsock-Document/edit/main/docs/:path'
    }
  },
  head: [['link', { rel: 'icon', href: '/favicon.ico' }]]
});