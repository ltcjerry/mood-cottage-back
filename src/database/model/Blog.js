/**
 * @description 文章数据模型
 * @author jerry
 */

const seq = require('../sequlize')
const { STRING, INTEGER, TEXT, DECIMAL } = require('../types')
 
const Blog = seq.define('blog', {
    userId: {
        type: INTEGER,
        allowNull: false,
        coment: '用户 ID'
    },
    content: {
        type: TEXT,
        allowNull: false,
        coment: '文章内容'
    },
    image: {
        type: STRING,
        coment: '图片地址'
    },
    readNum: {
        type: DECIMAL,
        defaultValue: 0,
        coment: '文章阅读量'
    },
    commentNum: {
        type: DECIMAL,
        defaultValue: 0,
        comment: '文章点赞量'
    }
})
 
module.exports = Blog