const lodash = require('lodash')
const blog = require('../models/blog')

const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    return blogs.length === 0
        ? 0
        : blogs.reduce((sum, blog) => sum + blog.likes, 0)
}

const favoriteBlog = (blogs) => {
    let favorite = null
    blogs.forEach(element => {
        if (favorite === null || element.likes > favorite.likes)
            favorite = element
    });
    return blogs.length === 0
        ? null
        : favorite
}

const mostBlogs = (blogs) => {
    const authorsCounts = lodash.countBy(blogs, (blog => blog.author))
    const authors = Object.entries(authorsCounts).sort((a,b) => b[1] - a[1])
    
    if (authors.length === 0)
        return null

    const [name, count] = authors[0]
    return {author: name, blogs: count}
}

const mostLikes = (blogs) => {
    let authorCounts = {}
    lodash.forEach(blogs, (blog => {
        if (!Object.keys(authorCounts).includes(blog.author)) {
            authorCounts[blog.author] = 0
        }
        authorCounts[blog.author] += blog.likes
    }))
    const authors = Object.entries(authorCounts).sort((a,b) => b[1] - a[1])
    
    if (authors.length === 0)
        return null

    const [name, count] = authors[0]
    return {author: name, likes: count}
}

module.exports = { dummy, totalLikes, favoriteBlog, mostBlogs, mostLikes }