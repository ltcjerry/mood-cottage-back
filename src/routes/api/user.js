/**
 * @description user API路由
 * @author jerry
 */

const { isExist, register } = require('../../controller/user')

const router = require('koa-router')()

router.prefix('/api/user')

// login
router.get('/login', async(ctx, next) => {
   
})
 
// register
router.post('/register', async(ctx, next) => {
    const { userName, password, gender } = ctx.request.body
    ctx.body = await register({ userName, password, gender })
})

// 用户是否存在
router.post('/isExist', async(ctx, next) => {
    const { userName } = ctx.request.body
    ctx.body = await isExist(userName)
})
 
module.exports = router
 