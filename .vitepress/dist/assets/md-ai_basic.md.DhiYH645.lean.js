import{_ as n,C as d,c as s,o as r,a4 as e,G as a}from"./chunks/framework.C-Sv_Sou.js";const c=JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"md-ai/basic.md","filePath":"md-ai/basic.md","lastUpdated":1783862120000}'),g={name:"md-ai/basic.md"};function o(i,t,f,x,y,h){const l=d("MermaidBlock");return r(),s("div",null,[t[0]||(t[0]=e("",3)),a(l,{code:`flowchart LR
    A[用户在前端界面<br>输入提示词 Prompt] --> B[前端将 Prompt<br>转为 Embedding 向量]
    B --> C[向量数据库检索<br>相关知识]
    C --> D[将检索结果 + Prompt<br>组合为新的 Prompt]
    D --> E[调用 LLM API<br>并传入 Temperature 等参数]
    E --> F[LLM 以 Token 为单位<br>流式 Streaming 生成回复]
    F --> G[前端逐字渲染<br>最终展示给用户]
`}),t[1]||(t[1]=e("",24))])}const u=n(g,[["render",o]]);export{c as __pageData,u as default};
