/**
 * @description sequlize实例(ORM)
 * @author jerry
 */

const Sequelize = require('sequelize')
const { MYSQL_CONF } = require('../config/database')
const { isProd, isTest } = require('../utils/env')

const { host, user, password, database } = MYSQL_CONF
const conf = { host, dialect: 'mysql' }
// 线上环境，使用连接池
if (isProd) {
    conf.pool = { max: 5, min: 0, idle: 10000 }
}
// 测试环境，关掉log日志
if (isTest) {
    conf.loggin = () => {}
}
const seq = new Sequelize(database, user, password, conf)

module.exports = seq


