/**
 * @description 数据格式化
 * @author jerry
 */

const { format } = require('date-fns')
const { DEFAULT_AVATAR } = require('../config/constant')

/**
 * 用户默认头像
 * @param {Objet} obj 用户对象
 */
function formatUserAvatar(obj) {
    if (obj.avatar == null) {
        obj.avatar = DEFAULT_AVATAR
    }
    return obj
}

/**
 * 格式化时间
 * @param {*} str 时间字符串
 */
function timeFormat(str) {
    return format(new Date(str), 'MM-dd HH:mm')
}

/**
 * 格式化数据时间
 * @param {Object} obj 数据
 */
function formatDBTime(obj) {
    obj.createdAtFormat = timeFormat(obj.createdAt)
    obj.updatedAtFormat = timeFormat(obj.updatedAt)
    return obj
}

/**
 * 格式化用户信息
 * @param {Array | Object} data 用户列表或单个用户
 */
function formatUser(data) {
    if (data == null) {
        return data
    } else if (data instanceof Array) {
        return data.map(formatUserAvatar)
    } else {
        return formatUserAvatar(data)
    }
}

/**
 * 格式化文章信息
 * @param {Array | Object} data 文章列表或单篇文章
 */
function formatBlog(data) {
    if (data == null) {
        return data
    } else if (data instanceof Array) {
        return data.map(formatDBTime)
    } else {
        return formatDBTime(data)
    }
}

module.exports = {
    formatUser,
    formatBlog
}