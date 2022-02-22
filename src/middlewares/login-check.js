/**
 * @description 登录验证的中间件
 * @author jerry
 */

const { loginCheckFailInfo } = require('../config/errorInfo')
const { FailModel } = require('../utils/resModel')

/**
 * API登录验证
 * @param {Object} ctx koa2 ctx
 * @param {*} next koa2 next
 */
async function loginCheck(ctx, next) {
    if (ctx.session && ctx.session.userInfo) {
        await next()
    } else {
        ctx.body = new FailModel(loginCheckFailInfo)
    }
}

/**
 * 页面登录验证
 * @param {Object} ctx koa2 ctx
 * @param {*} next koa2 next
 */
async function loginRedirct() {
    if (ctx.session && ctx.session.userInfo) {
        await next()
    } else {
        const currentUrl = ctx.url
        ctx.redirect(`/login?url=${encodeURIComponent(currentUrl)}`)
    }
}

module.exports = {
    loginCheck,
    loginRedirct
}