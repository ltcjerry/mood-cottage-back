const Koa = require('koa')
const app = new Koa()
const path = require('path')
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')
const session = require('koa-generic-session')
const redisStore = require('koa-redis')
const cors = require('koa2-cors')
const koaStatic = require('koa-static')

// token密钥、jwt配置, 暂不使用
// const koaJwt = require('koa-jwt')
// const { TOKEN_SECRET_KEY } = require('./config/constant')
// app.use(koaJwt({
//     secret: TOKEN_SECRET_KEY
// }).unless({
//     path: [/^\/users\/login/] //忽略部分目录jwt验证
// }))

// 路由
const blogAPIRouter = require('./routes/api/blog')
const utilsAPIRouter = require('./routes/api/utils')
const userAPIRouter = require('./routes/api/user')
const errorViewRouter = require('./routes/view/error')

// redis
const { REDIS_CONF } = require('./config/database')
const { SESSION_SECRET_key } = require('./config/constant')

// error handler
onerror(app, { redirect: '/error'})

// cors
app.use(cors())

// middlewares
app.use(bodyparser({
    enableTypes:['json', 'form', 'text']
}))
app.use(json())
app.use(logger())
app.use(koaStatic(__dirname + '/public'))
app.use(koaStatic(path.join(__dirname, '..', 'uploadFiles')))

app.use(views(__dirname + '/views', {
    extension: 'ejs'
}))

// session 配置
app.keys = [SESSION_SECRET_key]
app.use(session({
    key: 'blog.sid', // cookie name 默认是 `koa.sid`
    prefix: 'blog:sess:', // redis key的前缀 默认是 `koa:sess:`
    cookie: { path: '/', httpOnly: true, maxAge: 24 * 60 * 60 * 1000 },
    store: redisStore({ all: `${REDIS_CONF.host}:${REDIS_CONF.port}` })
}))

// routes
app.use(blogAPIRouter.routes(), blogAPIRouter.allowedMethods())
app.use(utilsAPIRouter.routes(), utilsAPIRouter.allowedMethods())
app.use(userAPIRouter.routes(), userAPIRouter.allowedMethods())
app.use(errorViewRouter.routes(), errorViewRouter.allowedMethods())

// error-handling
app.on('error', (err, ctx) => {
    console.error('server error', err, ctx)
})

module.exports = app
