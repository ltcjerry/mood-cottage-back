/**
 * @description utils API 路由
 * @author jerry
 */

const { isTest } = require('../../utils/env')
const koaForm = require('formidable-upload-koa')
const { loginCheck } = require('../../middlewares/login-check')
const { saveFile } = require('../../controller/utils')
 
const router = require('koa-router')()
 
router.prefix('/api/utils')
 
// upload picture
router.post('/upload', loginCheck, koaForm(), async(ctx, next) => {
    const file = ctx.req.files['file']
    const { size, path, name, type } = file
    ctx.body = await saveFile({ name, type, size, filePath: path })
})
  
module.exports = router
  