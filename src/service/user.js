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
    const result = await User.findOne({
        attributes: ['id', 'userName', 'nickName', 'avatar'],
        where: whereOpt
    })
    return result == null ? result : formatUser(result.dataValues)
}

/**
 * 添加用户
 * @param {stirng} userName 用户名 
 * @param {stirng} password 密码 
 * @param {stirng} gender 性别(0:保密 1:男性 2:女性) 
 * @param {stirng} nickName 昵称 
 */
async function createUser({ userName, password, gender = 0, nickName }) {
    const result = await User.create({ 
        userName, 
        password, 
        gender, 
        nickName: nickName || userName 
    })
    return result.dataValues
}

/**
 * 删除用户
 * @param {string} userName 用户名
 */
async function deleteUser(userName) {
    const result = await User.destroy({ where: {userName} })
    return result > 0
}

module.exports = {
    createUser,
    deleteUser,
    getUserInfo,
}