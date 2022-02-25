/**
 * @description blog controller
 * @author jerry
 */

const xss = require('xss')
const { SuccessModel, FailModel } = require('../utils/resModel')
const { createBlog } = require('../service/blog')
const { createBlogFailInfo } = require('../config/errorInfo')

/**
 * 创建文章 controller
 * @param {string} userId 用户ID 
 * @param {string} content 文章内容 
 * @param {string} image 附带图片 
 */
async function create({ userId, content, image }) {
    try {
        const blog = await createBlog({ 
            image,
            userId, 
            content: xss(content) 
        })
        return new SuccessModel(blog)
    } catch (error) {
        console.log(error.message, error.stack)
        return new FailModel(createBlogFailInfo)
    }
}

module.exports = {
    create
}