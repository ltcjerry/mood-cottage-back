/**
 * @description user 数据格式校验
 * @author jerry
 */

const validate = require('./validate')

const SCHEMA = {
    type: 'object',
    properties: {
        userName: {
            type: 'string',
            pattern: '^[a-zA-Z][a-zA-Z0-9_]+$',
            maxLength: 255,
            minLength: 2
        },
        password: {
            type: 'string',
            maxLength: 255,
            minLength: 3
        },
        nickName: {
            type: 'string',
            maxLength: 255
        },
        avatar: {
            type: 'string',
            maxLength: 255
        },
        gender: {
            type: 'number',
            minimum: 0,
            maximum: 2
        }
    }
}
 
/**
  * 校验文章数据格式
  * @param {Object} data 文章数据
  */
function blogValidate(data = {}) {
    return validate(SCHEMA, data)
}
 
module.exports = blogValidate