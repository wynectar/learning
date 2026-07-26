import { defineConfig } from 'vitepress';

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: '持续学习ing',
  description: '',
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
    },
    config(md) {
      const defaultRender = md.renderer.rules.fence
      md.renderer.rules.fence = (tokens, idx, options, env, self) => {
        const token = tokens[idx]
        if (token.info.trim() === 'mermaid') {
          // 传给 Vue 组件
          return `<MermaidBlock code="${md.utils.escapeHtml(token.content)}"></MermaidBlock>`
        }
        return defaultRender(tokens, idx, options, env, self)
      }
    }
  },
  // 解决 vite 预构建报错
  vite: {
    optimizeDeps: {
      include: ['mermaid'],
      exclude: ['cytoscape']
    },
    resolve: {
      alias: {
        'cytoscape/dist/cytoscape.umd.js': 'cytoscape'
      }
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
      { text: 'AI 🔥', link: '/md-ai/basic' },
    ],

    sidebar: [
      { text: '前端面试', link: '/md-interview/distribution' },
      {
        text: 'AI 🔥',
        items: [
          {
            text: '基础相关',
            link: '/md-ai/basic'
          },
          {
            text: '名词解释',
            link: '/md-ai/noun-explanation'
          },
          {
            text: '工程十六问',
            link: '/md-ai/ask'
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
            text: '基础相关',
            link: '/md-algorithm/basic'
          },
          {
            text: '数据类型',
            link: '/md-algorithm/data-type'
          },
          {
            text: '哈希表',
            link: '/md-algorithm/hash'
          },
          {
            text: '双指针',
            link: '/md-algorithm/two-pointers'
          },
          {
            text: '滑动窗口',
            link: '/md-algorithm/sliding-window'
          },
          {
            text: '普通数组',
            link: '/md-algorithm/ordinary-array'
          },
          {
            text: '矩阵',
            link: '/md-algorithm/matrix'
          },
          {
            text: '链表',
            link: '/md-algorithm/list-node'
          },
          {
            text: '二叉树',
            link: '/md-algorithm/binary-tree'
          },
          {
            text: '图论',
            link: '/md-algorithm/graph'
          },
          {
            text: '回溯',
            link: '/md-algorithm/backtrack'
          },
          {
            text: '二分查找',
            link: '/md-algorithm/binary-search'
          },
          {
            text: '栈',
            link: '/md-algorithm/stack'
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
