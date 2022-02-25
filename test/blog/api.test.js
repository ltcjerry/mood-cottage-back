/**
* @description blog api test
* @author jerry
*/

const server = require('../server')
const { COOKIE } = require('../testInfo')

let BLOG_ID = ''

test('创建一篇文章，预期成功', async() => {
    const testContent = `测试文章接口内容数据_${Date.now()}`
    const testImage = `/test_${Date.now()}.png`

    const res = await server
    .post('/api/blog/create')
    .send({ content: testContent, image: testImage })
    .set('cookie', COOKIE)
    expect(res.body.code).toBe(0)
    expect(res.body.data.content).toBe(testContent)
    expect(res.body.data.image).toBe(testImage)

    BLOG_ID = res.body.data.id
})