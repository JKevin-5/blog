import { createContentLoader } from 'vitepress'

export default createContentLoader('posts/**/*.md', {
  transform(rawData) {
    // Filter and sort posts by date
    return rawData
      .filter(page => page.frontmatter.date)
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