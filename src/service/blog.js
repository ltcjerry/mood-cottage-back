/**
 * @description blog service
 * @author jerry
 */

const { Blog, User } = require('../database/model/index')
const { formatUser, formatBlog } = require('../utils/format')

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

/**
 * 根据用户获取文章列表
 * @param {Object} param0 查询参数 { userName, page = 0, size = 0}
 */
async function getBlogListByUser({ userName, page = 0, size = 10}) {
    const query = {}

    if (userName) {
        query.userName = userName
    }

    const result = await Blog.findAndCountAll({
        limit: size,
        offset: page * size,
        order: [['id', 'desc']],
        include: [{ 
            model: User, 
            attributes: ['userName', 'nickName', 'picture'],
            where: query
        }]
    })

    const blogList = result.rows.map(row => {
        const data = formatBlog(row.dataValues)
        const user = data.user.dataValues
        data.user = formatUser(user)
        return data
    })

    return {
        count: result.count,
        blogList
    }
}
 
module.exports = {
    createBlog,
    getBlogListByUser
}