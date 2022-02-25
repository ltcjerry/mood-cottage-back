/**
 * @description blog API 路由
 * @author jerry
 */

const router = require('koa-router')()
const { loginCheck } = require('../../middlewares/login-check')
const { genValidator } = require('../../middlewares/validator')
const blogValidate = require('../../validator/blog')
const { create } = require('../../controller/blog')
  
router.prefix('/api/blog')
  
// 创建文章
router.post('/create', loginCheck, genValidator(blogValidate), async(ctx, next) => {
    const { content, image } = ctx.request.body
    const { id: userId } = ctx.session.userInfo
    ctx.body = await create({ userId, content, image })
})
   
module.exports = router
   