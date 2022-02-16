/**
 * @description 存储配置
 * @author jerry
 */

const { isProd } = require("../utils/env")

let REDIS_CONF = {
    port: 6379,
    host: '127.0.0.1'
}

// 线上环境参数
if (isProd) {
    REDIS_CONF = {
        port: 6379,
        host: 'localhost'
    }
}

module.exports = {
    REDIS_CONF
}