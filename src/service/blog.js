/**
 * @description blog service
 * @author jerry
 */

const { Blog } = require('../database/model/index')
const { formatUser } = require('../utils/format')

/**
 * 创建文章 service
 * @param {string} userId 用户ID 
 * @param {string} content 文章内容 
 * @param {string} image 附带图片 
 */
async function createBlog({ userId, content, image }) {
    const result = await Blog.create({ userId, content, image })
    return result.dataValues
}
 
module.exports = {
    createBlog
}