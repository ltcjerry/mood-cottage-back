/**
 * @description 封装 sequlize 数据类型
 * @author jerry
 */

const Sequlize = require('sequelize')

module.exports = {
    TEXT: Sequlize.TEXT,
    STRING: Sequlize.STRING,
    DECIMAL: Sequlize.DECIMAL,
    INTEGER: Sequlize.INTEGER,
    BOOLEAN: Sequlize.BOOLEAN
}