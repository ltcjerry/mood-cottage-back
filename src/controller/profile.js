/**
 * @description 个人主页 controller
 * @author jerry
 */

const { DEFAULT_PAGE_SIZE } = require('../config/constant')
const { getBlogListByUser } = require('../service/blog')
const { SuccessModel } = require('../utils/resModel')

/**
 * 
 * @param {string} userName 用户名
 * @param {number} page 当前页号
 */
async function getProfileBlogList(userName, page = 0, size = DEFAULT_PAGE_SIZE) {
    const result = await getBlogListByUser({ userName, page, size })
    return new SuccessModel({
        page,
        size,
        count: result.count,
        blogList: result.blogList
    })
}

module.exports = {
    getProfileBlogList
}