/**
 * @description user API路由
 * @author jerry
 */

const { isTest } = require('../../utils/env')
const userValidate = require('../../validator/user')
const { genValidator } = require('../../middlewares/validator')
const { loginCheck } = require('../../middlewares/login-check')
const { 
    login, 
    logout, 
    isExist, 
    register,
    changeInfo,
    deleteCurUser,
    changePassword,
} = require('../../controller/user')

const router = require('koa-router')()

router.prefix('/api/user')

// login
router.post('/login', async(ctx, next) => {
    const { userName, password } = ctx.request.body
    ctx.body = await login(ctx, userName, password)
})
 
// register
router.post('/register', genValidator(userValidate), async(ctx, next) => {
    const { userName, password, gender } = ctx.request.body
    ctx.body = await register({ userName, password, gender })
})

// 用户是否存在
router.post('/isExist', async(ctx, next) => {
    const { userName } = ctx.request.body
    ctx.body = await isExist(userName)
})

// 删除（仅测试环境下有效)
router.post('/delete', loginCheck, async (ctx, next) => {
    if (isTest) {
        const { userName } = ctx.session.userInfo
        ctx.body = await deleteCurUser(userName)
    }
})

// 修改个人信息
router.patch('/changeInfo', loginCheck, genValidator(userValidate), async (ctx, next) => {
    const { userName, avatar } = ctx.request.body
    ctx.body = await changeInfo(ctx, { userName, avatar })
})

// 修改密码
router.patch('/changePassword', loginCheck, genValidator(userValidate), async (ctx, next) => {
    const { userName } = ctx.session.userInfo
    const { password, newPassword } = ctx.request.body
    ctx.body = await changePassword(userName, password, newPassword)
})

// 退出登录
router.post('/logout', loginCheck, async (ctx, next) => {
    ctx.body = await logout(ctx)
})

module.exports = router