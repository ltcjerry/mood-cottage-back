/**
 * @description 请求失败信息集合
 * @author jerry
 */

module.exports = {
    registerUserNameNotExistInfo: {
        code: 1001,
        message: '用户名未存在'
    },
    registerUserNameExistInfo: {
        code: 1002,
        message: '用户名已存在'
    },
    registerFailInfo: {
        code: 1003,
        message: '注册失败,请重试'
    }
}