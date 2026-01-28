# VitePress Blog with Archive System

一个功能完整的VitePress博客系统，包含按标签和日期归档的功能。

## 🚀 功能特性

### 📅 时间线视图
- 按年份和月份分组显示博客文章
- 可折叠的时间线，便于导航
- 每个时间段显示文章数量

### 🏷️ 标签系统
- 完整的标签过滤功能
- 多标签选择支持
- 标签使用统计显示
- 热门标签突出显示

### 🔍 搜索与过滤
- 实时搜索文章标题、摘要和标签
- 搜索结果即时更新
- 清除过滤功能

### 🎨 现代UI设计
- 使用Naive UI组件库
- 响应式设计，支持移动设备
- 优雅的悬停效果和过渡动画
- 可自定义的主题色彩

### 📱 响应式布局
- 移动端优化的导航
- 自适应的网格布局
- 触摸友好的交互

## 📁 项目结构

```
docs/
├── posts/                    # 博客文章
│   ├── 2024/
│   │   ├── 01-getting-started.md
│   │   ├── 02-advanced-vue-patterns.md
│   │   ├── 03-responsive-css.md
│   │   └── 04-typescript-best-practices.md
│   └── 2025/
│       └── 01-web-development-2025.md
├── .vitepress/
│   ├── theme/
│   │   ├── components/       # 自定义Vue组件
│   │   │   ├── ArchivePage.vue
│   │   │   ├── PostCard.vue
│   │   │   └── TagFilter.vue
│   │   ├── posts.data.ts    # 数据加载器
│   │   ├── index.ts         # 主题配置
│   │   └── style.css        # 自定义样式
│   └── config.mts          # VitePress配置
├── archive.md              # 归档页面
├── tags/index.md           # 标签页面
└── index.md                # 首页
```

## 🛠️ 技术栈

- **VitePress 2.0** - 静态站点生成器
- **Vue 3** - 前端框架
- **TypeScript** - 类型安全
- **Naive UI** - UI组件库
- **CSS Variables** - 主题定制

## 📝 文章Frontmatter格式

```yaml
---
title: "文章标题"
date: "YYYY-MM-DD"
tags: ["标签1", "标签2", "标签3"]
excerpt: "文章摘要"
layout: "post"
---
```

## 🎯 核心组件

### ArchivePage.vue
主要的归档页面组件，包含：
- 搜索框
- 标签过滤器
- 时间线视图
- 文章列表

### PostCard.vue
文章卡片组件，特性：
- 文章标题、日期、标签显示
- 阅读时间估算
- 响应式设计
- 交互效果

### TagFilter.vue
标签过滤组件，功能：
- 热门标签显示
- 多标签选择
- 标签统计
- 清除过滤器

## 🚀 快速开始

1. 安装依赖：
   ```bash
   pnpm install
   ```

2. 启动开发服务器：
   ```bash
   pnpm run docs:dev
   ```

3. 构建生产版本：
   ```bash
   pnpm run docs:build
   ```

4. 预览构建结果：
   ```bash
   pnpm run docs:preview
   ```

## 📊 数据加载

使用VitePress的`createContentLoader`自动加载和处理文章数据：

```typescript
// .vitepress/theme/posts.data.ts
import { createContentLoader } from 'vitepress'

export default createContentLoader('posts/**/*.md', {
  transform(rawData) {
    return rawData
      .filter(page => page.frontmatter.date && page.frontmatter.layout === 'post')
      .sort((a, b) => new Date(b.frontmatter.date).getTime() - new Date(a.frontmatter.date).getTime())
      .map(page => ({
        title: page.frontmatter.title,
        url: page.url,
        date: page.frontmatter.date,
        tags: page.frontmatter.tags || [],
        excerpt: page.frontmatter.excerpt || '',
        year: new Date(page.frontmatter.date).getFullYear(),
        month: new Date(page.frontmatter.date).getMonth() + 1
      }))
  }
})
```

## 🎨 自定义主题

在`.vitepress/theme/style.css`中自定义颜色和样式：

```css
:root {
  --vp-c-brand-1: #3498db;  /* 主品牌色 */
  --vp-c-brand-2: #2980b9;  /* 悬停状态 */
  --vp-c-brand-3: #21618c;  /* 激活状态 */
  --vp-c-brand-soft: rgba(52, 152, 219, 0.1);  /* 软背景色 */
}
```

## 📱 响应式断点

- **移动端**: < 768px
- **平板端**: 768px - 1024px  
- **桌面端**: > 1024px

## 🔄 SEO优化

- 语义化HTML结构
- 合适的标题层级
- 响应式图片
- 快速加载性能

## 📈 性能特性

- Vite构建优化
- 组件按需加载
- CSS变量减少重复代码
- 现代浏览器特性

## 🤝 贡献指南

1. Fork项目
2. 创建功能分支
3. 提交更改
4. 推送到分支
5. 创建Pull Request

## 📄 许可证

MIT License

---

这个VitePress博客系统提供了完整的文章管理、归档和标签功能，适合个人博客、技术文档或内容展示网站使用。