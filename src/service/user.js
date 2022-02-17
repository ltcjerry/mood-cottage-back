/**
 * @description user service
 * @author jerry
 */

const { User } = require('../database/model/index')
const { formatUser } = require('../utils/format')

/**
 * 获取用户信息
 * @param {string} userName 用户名
 * @param {string} password 密码
 */
async function getUserInfo(userName, password) {
    const whereOpt = { userName }
    if (password) {
        Object.assign(whereOpt, { password })
    }
    const result = User.findOne({
        attributes: ['id', 'userName', 'nickName', 'avatar'],
        where: whereOpt
    })
    return result == null ? result : formatUser(result.dataValues)
}

module.exports = {
    getUserInfo
}