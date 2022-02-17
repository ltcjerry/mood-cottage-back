/**
 * @description ORM数据同步
 * @author jerry
 */

const seq = require('./sequlize')

require('./model/index')

// 测试连接数据库
seq.authenticate().then(() => {
    console.log('link database success')
}).catch(() => {
    console.log('link database fail')
})

// 同步model到database
seq.sync({ force: true }).then(() => {
    console.log('sync model sucess')
    process.exit()
}).catch(() => {
    console.log('sync model fail')
})