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
    },
    jsonSchemaFailInfo: {
        code: 1004,
        message: '数据格式校验错误'
    },
    loginFailInfo: {
        code: 1005,
        message: '登录失败'
    },
    loginCheckFailInfo: {
        code: 1006,
        message: '你尚未登录'
    },
    deleteUserFailInfo: {
        code: 1007,
        message: '测试环境删除用户失败'
    },
    uploadFileSizeFailInfo: {
        code: 1008,
        message: '上传文件体积过大'
    },
    updateUserFailInfo: {
        code: 1009,
        message: '修改用户信息失败'
    }
}