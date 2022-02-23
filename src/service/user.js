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

/**
 * 修改用户信息
 * @param {object} condition 查询条件
 * @param {*} userInfo 修改内容
 */
async function updateUser(condition, userInfo) {
    const { userName, password } = condition
    const { newPassword, newNickName, newAvatar } = userInfo
    const updateData = {}
    if (newPassword) {
        updateData.password = newPassword
    }
    if (newNickName) {
        updateData.nickName = newNickName
    }
    if (newAvatar) {
        updateData.avatar = newAvatar
    }
    const queryData = { userName }
    if (password) {
        queryData.password = password
    }
    const result = await User.update(updateData, { where: queryData })
    return result[0] > 0
}

module.exports = {
    createUser,
    deleteUser,
    updateUser,
    getUserInfo,
}