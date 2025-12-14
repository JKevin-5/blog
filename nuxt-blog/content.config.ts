import { defineContentConfig, defineCollection } from '@nuxt/content'

export default defineContentConfig({
    collections: {
        // content文件夹路径
        content: defineCollection({
            type: 'page',
            source: '**/*.md'
        })
    }
})