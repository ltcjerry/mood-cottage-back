/**
 * @description user controller
 * @author jerry
 */

const { getUserInfo, createUser } = require('../service/user')
const { SuccessModel, FailModel } = require('../utils/resModel')
const { 
    registerFailInfo,
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
async function register({ userName, passowrd, gender }) {
    const userInfo = await getUserInfo(userName)
    if (userInfo) {
        return new FailModel(registerUserNameExistInfo)
    } else {
        try {
            await createUser({ userName, passowrd: doCrypto(passowrd), gender })
            return new SuccessModel()
        } catch (error) {
            return new FailModel(registerFailInfo)
        }
    }
}

module.exports = {
    isExist,
    register,
}