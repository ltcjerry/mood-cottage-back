/**
 * @description user API路由
 * @author jerry
 */

const router = require('koa-router')()

router.prefix('/api/user')

// login
router.get('/login', async(ctx, next) => {
   
})
 
// register
router.post('/register', async(ctx, next) => {
    
})

// 用户是否存在
router.post('/isExist', async(ctx, next) => {
    const { userName } = ctx.request.body
})
 
module.exports = router
 