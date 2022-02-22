/**
 * @description 用户数据模型
 * @author jerry
 */

const seq = require('../sequlize')
const { STRING, DECIMAL } = require('../types')

const User = seq.define('user', {
    userName: {
        type: STRING,
        allowNull: false,
        unique: true,
        coment: '用户名 唯一'
    },
    password: {
        type: STRING,
        allowNull: false,
        coment: '密码'
    },
    nickName: {
        type: STRING,
        allowNull: false,
        coment: '昵称'
    },
    gender: {
        type: DECIMAL,
        allowNull: false,
        defaultValue: 0,
        coment: '性别(0:保密 1:男性 2:女性)'
    },
    avatar: {
        type: STRING,
        comment: '头像、图片地址'
    }
})

module.exports = User