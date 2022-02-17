/**
 * @description 存储配置
 * @author jerry
 */

const { isProd } = require('../utils/env')

let REDIS_CONF = {
    port: 6379,
    host: '127.0.0.1'
}

let MYSQL_CONF = {
    user: 'root',
    port: '3306',
    host: 'localhost',
    database: 'blog_db',
    password: 'ltc19961206'
}

if (isProd) {
    // redis线上环境配置
    REDIS_CONF = {
        port: 6379,
        host: 'localhost'
    }
    // mysql线上环境配置
    MYSQL_CONF = {
        user: 'root',
        port: '3306',
        host: 'localhost',
        database: 'blog_db',
        password: 'ltc19961206'
    }
}

module.exports = {
    REDIS_CONF,
    MYSQL_CONF
}