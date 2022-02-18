/**
 * @description 加密方法
 * @author jerry
 */

const crypto = require('crypto')
const { CRYPTO_SECRET_KEY } = require('../config/constant')

/**
 * md5 加密
 * @param {string} data 明文数据
 */
function md5(data) {
    const md5 = crypto.createHash('md5')
    return md5.update(data).digest('hex')
}

/**
 * 加密方法
 * @param {string} data 明文数据
 */
function doCrypto(data) {
    const str = `password=${data}&key=${CRYPTO_SECRET_KEY}`
    return md5(str)
}

module.exports = doCrypto