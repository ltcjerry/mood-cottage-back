/**
 * @description user controller
 * @author jerry
 */

const { SuccessModel, FailModel } = require('../utils/resModel')
const { 
    createUser, 
    deleteUser, 
    updateUser, 
    getUserInfo, 
} = require('../service/user')
const { 
    loginFailInfo, 
    registerFailInfo,
    deleteUserFailInfo,
    updateUserFailInfo,
    registerUserNameExistInfo, 
    registerUserNameNotExistInfo,
} = require('../config/errorInfo')
const doCrypto = require('../utils/crypto')

/**
 * 判断用户名是否存在
 * @param {string} userName 用户名
 */
async function isExist(userName) {
    const userInfo = await getUserInfo(userName)
    if (userInfo) {
        return new SuccessModel(userInfo)
    } else {
        return new FailModel(registerUserNameNotExistInfo)
    }
}

/**
 * 注册
 * @param {string} userName 用户名
 *  @param {string} password 密码
 * @param {number} gender 性别(0:保密 1:男性 2:女性)
 */
async function register({ userName, password, gender }) {
    const userInfo = await getUserInfo(userName)
    if (userInfo) {
        return new FailModel(registerUserNameExistInfo)
    } else {
        try {
            await createUser({ userName, password: doCrypto(password), gender })
            return new SuccessModel()
        } catch (error) {
            console.error(error.message, error.stack)
            return new FailModel(registerFailInfo)
        }
    }
}

/**
 * 登录
 * @param {Object} ctx koa2 ctx
 * @param {string} userName 用户名
 * @param {string} password 密码
 */
async function login(ctx, userName, password) {
    const userInfo = await getUserInfo(userName, doCrypto(password))
    if (userInfo) {
        if (ctx.session.userInfo == null) {
            ctx.session.userInfo = userInfo
        }
        return new SuccessModel()
    } else {
        return new FailModel(loginFailInfo)
    }
}

/**
 * 测试环境下删除当前用户
 * @param {string} userName 当前用户名
 */
async function deleteCurUser(userName) {
    const result = await deleteUser(userName)
    return result ? new SuccessModel() : FailModel(deleteUserFailInfo)
}

/**
 * 
 * @param {Object} ctx koa2 ctx
 * @param {Object} param 用户信息
 */
async function changeInfo(ctx, { nickName, avatar }) {
    const { userName } = ctx.session.userInfo
    nickName = nickName || userName
    const infoData = { newNickName: nickName, newAvatar: avatar }
    const result = await updateUser({ userName }, infoData)
    if (result) {
        Object.assign(ctx.session.userInfo, { nickName, avatar })
        return new SuccessModel()
    } else {
        return new FailModel(updateUser)
    }
}

module.exports = {
    login,
    isExist,
    register,
    changeInfo,
    deleteCurUser,
}