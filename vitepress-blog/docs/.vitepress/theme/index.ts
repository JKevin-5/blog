// https://vitepress.dev/guide/custom-theme
import { h } from 'vue'
import type { Theme } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import './style.css'

// Import Naive UI for SSR support
import pkg from 'naive-ui'
const {
  NInput,
  NTag,
  NSpace,
  NCollapse,
  NCollapseItem,
  NButton,
  NEmpty,
  NIcon,
  NCard,
  NGrid,
  NGridItem
} = pkg

export default {
  extends: DefaultTheme,
  Layout: () => {
    return h(DefaultTheme.Layout, null, {
      // https://vitepress.dev/guide/extending-default-theme#layout-slots
    })
  },
  enhanceApp({ app, router, siteData }) {
    // Register Naive UI components globally for archive page
    app.component('NInput', NInput)
    app.component('NTag', NTag)
    app.component('NSpace', NSpace)
    app.component('NCollapse', NCollapse)
    app.component('NCollapseItem', NCollapseItem)
    app.component('NButton', NButton)
    app.component('NEmpty', NEmpty)
    app.component('NIcon', NIcon)
    app.component('NCard', NCard)
    app.component('NGrid', NGrid)
    app.component('NGridItem', NGridItem)
  }
} satisfies Theme
