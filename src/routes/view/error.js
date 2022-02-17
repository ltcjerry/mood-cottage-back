/**
 * @description error 和 404 视图路由
 * @author jerry
 */

const router = require('koa-router')()

// error
router.get('/error', async(ctx, next) => {
    await ctx.render('error', {})
})

// 404
router.get('*', async(ctx, next) => {
    await ctx.render('404', {})
})

module.exports = router
