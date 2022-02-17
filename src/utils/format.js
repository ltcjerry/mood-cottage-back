/**
 * @description 数据格式化
 * @author jerry
 */

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

module.exports = {
    formatUser
}