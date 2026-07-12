<template>
  <div
    class="mermaid-container"
    @mouseenter="showTools = true"
    @mouseleave="showTools = false"
    @wheel.prevent="handleWheelZoom"
  >
    <!-- 右上角悬浮工具栏 豆包原版Icon -->
    <div class="tool-bar" v-show="showTools">
      <!-- 缩小 -->
      <div class="tool-btn" @click="zoomOut" title="缩小">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M5 12h14"></path>
        </svg>
      </div>
      <!-- 放大 -->
      <div class="tool-btn" @click="zoomIn" title="放大">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M12 5v14M5 12h14"></path>
        </svg>
      </div>
      <!-- 重置视图 -->
      <div class="tool-btn" @click="resetView" title="重置视图">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M23 4v6h-6"></path>
          <path d="M1 20v-6h6"></path>
          <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"></path>
        </svg>
      </div>
      <!-- 全屏 -->
      <div class="tool-btn" @click="toggleFullscreen" title="全屏">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M8 3H5a2 2 0 0 0-2 2v3"></path>
          <path d="M21 8V5a2 2 0 0 0-2-2h-3"></path>
          <path d="M3 16v3a2 2 0 0 0 2 2h3"></path>
          <path d="M16 21h3a2 2 0 0 0 2-2v-3"></path>
        </svg>
      </div>
      <!-- 下载 -->
      <div class="tool-btn" @click="downloadSvg" title="下载图表">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M12 3v14"></path>
          <path d="M7 13l5 5 5-5"></path>
          <path d="M5 21h14"></path>
        </svg>
      </div>
      <!-- 查看代码 -->
      <div class="tool-btn" @click="showCodeModal = true" title="查看代码">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <polyline points="15 18 21 12 15 6"></polyline>
          <polyline points="9 6 3 12 9 18"></polyline>
        </svg>
      </div>
    </div>

    <!-- 图表容器：支持拖拽+文字完整显示 -->
    <div 
      class="chart-drag-wrap"
      @mousedown="startDrag"
      @mousemove="onDrag"
      @mouseup="stopDrag"
      @mouseleave="stopDrag"
    >
      <div ref="chartRef" class="chart-render" :style="chartTransform"></div>
    </div>

    <!-- 豆包同款代码弹窗 -->
    <div v-if="showCodeModal" class="code-mask" @click.self="showCodeModal = false">
      <div class="code-dialog">
        <div class="code-dialog-header">
          <span>Mermaid 代码</span>
          <span class="close-btn" @click="showCodeModal = false">×</span>
        </div>
        <pre class="code-dialog-body">{{ code }}</pre>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch, computed } from 'vue'
import mermaid from 'mermaid'
import { useData } from 'vitepress'

const props = defineProps({
  code: {
    type: String,
    required: true
  }
})

const chartRef = ref(null)
const { isDark } = useData()

const showTools = ref(false)
const showCodeModal = ref(false)

// 缩放配置：默认清晰、最小0.5、最大8倍
const DEFAULT_SCALE = 0.8
const MIN_SCALE = 0.75
const MAX_SCALE = 2.0
let scale = ref(DEFAULT_SCALE)

// 拖拽位移
let offsetX = ref(0)
let offsetY = ref(0)
let isDragging = false
let dragStartX = 0
let dragStartY = 0

// 变换样式：文字不裁切、居中完整显示
const chartTransform = computed(() => ({
  transform: `translate(${offsetX.value}px, ${offsetY.value}px) scale(${scale.value})`,
  transformOrigin: 'center center',
  transition: isDragging ? 'none' : 'transform 0.15s ease'
}))

// Mermaid 配置：保证文字完整显示、字号适中不遮挡
function initMermaid() {
  mermaid.initialize({
    startOnLoad: false,
    securityLevel: 'loose',
    theme: isDark.value ? 'dark' : 'default',
    fontFamily: '-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica,Arial,sans-serif',
    fontSize: 14,
    flowchart: {
      htmlLabels: true,
      useMaxWidth: false,
      width: '100%'
    },
    sequence: { useMaxWidth: false },
    classDiagram: { useMaxWidth: false },
    erDiagram: { useMaxWidth: false }
  })
}

// 渲染图表
async function renderChart() {
  if (!chartRef.value) return
  chartRef.value.innerHTML = ''
  initMermaid()
  const id = `mermaid_${Date.now()}`
  const { svg } = await mermaid.render(id, props.code)
  chartRef.value.innerHTML = svg
  setSvgScale()
}

// 应用缩放
function setSvgScale() {
  const svg = chartRef.value?.querySelector('svg')
  if (!svg) return
  svg.style.transform = `scale(${scale.value})`
  svg.style.transformOrigin = 'center'
  svg.style.transition = 'transform 0.15s ease'
}

// 按钮缩放
const zoomIn = () => {
  if (scale.value < MAX_SCALE) {
    scale.value += 0.25
    setSvgScale()
  }
}
const zoomOut = () => {
  if (scale.value > MIN_SCALE) {
    scale.value -= 0.25
    setSvgScale()
  }
}

// 重置：还原缩放+位置
const resetView = () => {
  scale.value = DEFAULT_SCALE
  offsetX.value = 0
  offsetY.value = 0
  setSvgScale()
}

// 鼠标滚轮缩放
function handleWheelZoom(e) {
  e.deltaY > 0 ? zoomOut() : zoomIn()
}

// 拖拽逻辑
function startDrag(e) {
  isDragging = true
  dragStartX = e.clientX - offsetX.value
  dragStartY = e.clientY - offsetY.value
}
function onDrag(e) {
  if (!isDragging) return
  offsetX.value = e.clientX - dragStartX
  offsetY.value = e.clientY - dragStartY
}
function stopDrag() {
  isDragging = false
}

// 全屏居中
const toggleFullscreen = async () => {
  const wrap = chartRef.value.closest('.mermaid-container')
  if (!wrap) return
  if (!document.fullscreenElement) {
    await wrap.requestFullscreen()
    wrap.style.display = 'flex'
    wrap.style.justifyContent = 'center'
    wrap.style.alignItems = 'center'
  } else {
    await document.exitFullscreen()
    wrap.style.display = ''
    wrap.style.justifyContent = ''
    wrap.style.alignItems = ''
  }
}

// 下载SVG
const downloadSvg = () => {
  const svg = chartRef.value?.querySelector('svg')
  if (!svg) return
  const serializer = new XMLSerializer()
  const svgStr = serializer.serializeToString(svg)
  const blob = new Blob([svgStr], { type: 'image/svg+xml' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = 'mermaid-chart.svg'
  a.click()
  URL.revokeObjectURL(url)
}

onMounted(renderChart)
watch(isDark, renderChart)
</script>

<style scoped>
/* 豆包原版容器：背景/圆角/内边距 1:1 */
.mermaid-container {
  position: relative;
  margin: 24px 0;
  padding: 28px 20px;
  border-radius: 12px;
  background-color: #f7f8fa;
  overflow: hidden;
}
:deep(.dark) .mermaid-container {
  background-color: #1d1d1f;
}

/* 右上角悬浮工具栏 */
.tool-bar {
  position: absolute;
  top: 12px;
  right: 12px;
  display: flex;
  gap: 4px;
  z-index: 10;
}

/* 按钮大小/圆角/间距/hover 完全复刻豆包 */
.tool-btn {
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.72);
  color: #4e5969;
  cursor: pointer;
  transition: background 0.2s ease;
}
.tool-btn:hover {
  background: rgba(240, 240, 240, 0.92);
}
:deep(.dark) .tool-btn {
  background: rgba(255, 255, 255, 0.08);
  color: #c9cdd4;
}
:deep(.dark) .tool-btn:hover {
  background: rgba(255, 255, 255, 0.15);
}

/* 拖拽图表区域：文字完整显示、不裁切 */
.chart-drag-wrap {
  width: 100%;
  min-height: 140px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: grab;
  overflow: visible !important;
}
.chart-render {
  flex-shrink: 0;
  overflow: visible !important;
}
.chart-render svg {
  overflow: visible !important;
  max-width: unset !important;
}

/* 代码弹窗 豆包同款UI */
.code-mask {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.55);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
}
.code-dialog {
  width: 640px;
  max-width: 90vw;
  border-radius: 12px;
  overflow: hidden;
  background: #ffffff;
}
:deep(.dark) .code-dialog {
  background: #2c2c2e;
}
.code-dialog-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 14px 18px;
  border-bottom: 1px solid #e5e6eb;
  font-size: 15px;
  font-weight: 500;
  color: #1d2129;
}
:deep(.dark) .code-dialog-header {
  border-color: #38383a;
  color: #f5f5f5;
}
.close-btn {
  cursor: pointer;
  font-size: 18px;
  color: #86909c;
}
.code-dialog-body {
  padding: 18px;
  max-height: 65vh;
  overflow: auto;
  font-size: 14px;
  line-height: 1.6;
  color: #4e5969;
  white-space: pre;
}
:deep(.dark) .code-dialog-body {
  color: #c9cdd4;
}
</style>