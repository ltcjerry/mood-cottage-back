/**
 * @description home API 路由
 * @author jerry
 */

const router = require('koa-router')()
const { getProfileBlogList } = require('../../controller/profile')
const { loginCheck } = require('../../middlewares/login-check')


router.prefix('/api/profile')

router.get('/:userName', loginCheck, async (ctx, next) => {
    const { userName: curUserName } = ctx.params
    ctx.body = await getProfileBlogList(curUserName, 0)
})