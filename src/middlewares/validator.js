/**
 * @description json schema 验证中间件
 * @author jerry
 */

const { jsonSchemaFailInfo } = require('../config/errorInfo')
const { FailModel } = require('../utils/resModel')

/**
 * 生成 json schema 验证的中间件
 * @param {function} validateFn 验证函数 
 */
function genValidator(validateFn) {
    async function validator(ctx, next) {
        const data = ctx.request.body
        const error = validateFn(data)
        if (error) {
            ctx.body = new FailModel(jsonSchemaFailInfo)
        } else {
            await next()
        }
    }
    return validator
}

module.exports = {
    genValidator
}