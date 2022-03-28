/**
* @description 个人主页 test
* @author jerry
*/

const server = require('../server')
const { COOKIE, USER_NAME } = require('../testInfo')

test('个人主页加载数据，预期成功', async() => {
    const res = await server
    .get(`/api/profile/loadMore/${USER_NAME}/0`)
    .set('cookie', COOKIE)
    expect(res.body.code).toBe(0)
    const data = res.body.data
    expect(data).toHaveProperty('page')
    expect(data).toHaveProperty('size')
    expect(data).toHaveProperty('count')
    expect(data).toHaveProperty('blogList')
})