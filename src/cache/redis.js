/**
 * @description 连接 redis 的方法 get set
 * @author jerry
 */

const redis = require('redis')
const { REDIS_CONF } = require('../config/database')

// 创建客户端
const redisClient = redis.createClient(REDIS_CONF.port, REDIS_CONF.host)
redisClient.on('error', err => {
    console.error('redis error', err)
})

/**
 * redis set
 * @param {string} key 键
 * @param {string} val 值
 * @param {*} timeout 超时期限
 */
function set(key, val, timeout = 60 * 60) {
    if (typeof val === 'object') {
        val = JSON.stringify(val)
    }
    redisClient.set(key, val)
    redisClient.expire(key, timeout)
}

/**
 * redis get
 * @param {string} key 键
 */
function get(key) {
    const promise = new Promise((resolve, reject) => {
        redisClient.get(key, (err, val) => {
            if (err) {
                reject(err)
            } else if (val === null) {
                resolve(null)
            } else {
                try {
                    resolve(JSON.parse(val))
                } catch (error) {
                    resolve(val)
                }
            }
        })
    })
}

module.exports = { get, set }