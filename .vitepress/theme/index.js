import DefaultTheme from 'vitepress/theme'
import MermaidBlock from './MermaidBlock.vue'

export default {
  ...DefaultTheme,
  enhanceApp({ app }) {
    // 全局注册组件
    app.component('MermaidBlock', MermaidBlock)
  }
}