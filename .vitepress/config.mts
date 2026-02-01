import { defineConfig } from 'vitepress';

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: '知渊集',
  description: '一个专注于个人知识管理与成长积累的文档平台',
  lang: 'zh-CN', // 站点的 lang 属性
  base: '/learning/', // 🔥基于主路径的站点访问路径
  head: [['link', { rel: 'icon', href: '/.vitepress/favicon.ico' }]],
  lastUpdated: true, // 🔥启用 Git 获取每个页面的最后更新时间戳
  markdown: {
    // 🔥markdown 扩展
    lineNumbers: true, // 代码块启用行号
    math: true, // 支持数学方程，需要下载 markdown-it-mathjax3 插件
    image: {
      // 默认禁用图片懒加载
      lazyLoading: true
    }
  },
  themeConfig: {
    logo: '/.vitepress/logo.svg',
    outline: {
      // 🔥文档侧边栏配置
      level: [2, 6],
      label: '页面导航'
    },
    docFooter: {
      // 🔥用于自定义出现在上一页和下一页链接上方的文本
      prev: '上一页',
      next: '下一页'
    },
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: '首页', link: '/' },
      { text: '技术知识', link: '/md-culture/dao' },
      { text: '法律知识', link: '/md-law/labor-law' }
    ],

    sidebar: [
      {
        text: '面试准备',
        items: [
          {
            text: '面试流程',
            link: '/md-interview/process'
          },
          {
            text: '书写简历',
            link: '/md-interview/cv'
          },
          {
            text: '行为面试',
            link: '/md-interview/behavior'
          },
          {
            text: '谈薪技巧',
            link: '/md-interview/skill'
          },
        ]
      },
      {
        text: '计算机基础',
        items: [
          {
            text: '计算机基础',
            link: '/md-computer/basic'
          },
        ]
      },
      {
        text: '数据结构 & 算法',
        items: [
          {
            text: '算法基础',
            link: '/md-algorithm/basic'
          },
        ]
      },
      {
        text: '技术知识积累',
        items: [

          {
            text: '数据结构 & 算法',
            items: [
              {
                text: '算法基础',
                link: '/gui-electron'
              },
            ]
          },

          {
            text: 'HTML & CSS & JS',
            items: [
              {
                text: '算法基础',
                link: '/gui-electron'
              },
            ]
          },
          {
            text: '框架使用 & 原理',
            items: [
              {
                text: '算法基础',
                link: '/gui-electron'
              },
            ]
          },
        ]
      },
      {
        text: '法律知识积累',
        items: [
          {
            text: '劳动法 & 劳动合同法',
            link: '/md-law/labor-law'
          },
        ]
      },
      {
        text: '文化知识积累',
        items: [
          {
            text: '道家文学',
            link: '/md-culture/dao'
          },
        ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/wynectar' },
      { icon: 'gitee', link: 'https://gitee.com/wynectar' }
    ],
    search: {
      provider: 'local',
      options: {
        miniSearch: {
          /**
           * @type {Pick<import('minisearch').Options, 'extractField' | 'tokenize' | 'processTerm'>}
           */
          options: {
            /* ... */
          },
          /**
           * @type {import('minisearch').SearchOptions}
           * @default
           * { fuzzy: 0.2, prefix: true, boost: { title: 4, text: 2, titles: 1 } }
           */
          searchOptions: {
            /* ... */
          }
        }
      }
    }
  }
});
