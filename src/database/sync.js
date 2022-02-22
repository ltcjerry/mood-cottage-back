/**
 * @description ORM数据同步
 * @author jerry
 */

const seq = require('./sequlize')

require('./model/index')

// 测试连接数据库
seq.authenticate().then(() => {
    //link database success
}).catch(() => {
    //link database fail
})

// 同步model到database
seq.sync({ force: true }).then(() => {
    //sync model sucess
    process.exit()
}).catch(() => {
    //sync model fail
})