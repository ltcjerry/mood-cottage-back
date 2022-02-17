const router = require('koa-router')()
const jwt = require('jsonwebtoken')
const util = require('util')
const verify = util.promisify(jwt.verify)
const { SECRET } = require('../../config/constant')

router.prefix('/users')

router.post('/login', function (ctx, next) {
    const { username, password } = ctx.request.body
    const userInfo = null
    if (userInfo) {
        const token = jwt.sign(userInfo, SECRET, { expiresIn: '1h' })
        ctx.body = {
            status: 'success',
            data: token
        }
    } else {
        ctx.body = {
            status: 'fail',
            msg: 'error'
        }
    }

})

router.get('/getUserInfo', async (ctx, next) => {
    const token = ctx.header.authorization
    try {
        const payload = await verify(token.split(' ')[1], SECRET)
        ctx.body = {
            code: 200,
            data: payload
        }
    } catch (error) {
        ctx.body = {
            code: 500,
            msg: 'verify token failed'
        }
    }
})

module.exports = router
