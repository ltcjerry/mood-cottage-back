/**
 * @description user 数据格式校验
 * @author jerry
 */

const validate = require('./validate')

const SCHEMA = {
    type: 'object',
    properties: {
        content: {
            type: 'string'
        },
        image: {
            type: 'string',
            maxLength: 255
        }
    }
}

/**
 * 校验用户数据格式
 * @param {Object} data 用户数据
 */
function userValidate(data = {}) {
    return validate(SCHEMA, data)
}

module.exports = userValidate