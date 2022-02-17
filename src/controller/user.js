/**
 * @description user controller
 * @author jerry
 */

const { getUserInfo } = require('../service/user')
const { SuccessModel, FailModel } = require('../utils/resModel')
const { 
    registerUserNameNotExistInfo 
} = require('../config/failInfo')

/**
 * 用户名是否存在
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

module.exports = {
    isExist
}