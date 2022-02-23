/**
 * @description login test
 * @author jerry
 */

const server = require('../server')

const userName = `u_${Date.now()}`
const password = `p_${Date.now()}`
const testUser = {
    userName,
    password,
    nickName: userName,
    gender: 1
}

let COOKIE = ''

// 注册
test('注册一个用户，预期成功', async () => {
    const res = await server.post('/api/user/register').send(testUser)
    expect(res.body.code).toBe(0)
})

// 重复注册
test('重复注册相同的用户，预期失败', async () => {
    const res = await server.post('/api/user/register').send(testUser)
    expect(res.body.code).not.toBe(0)
})

// 查询用户是否存在
test('查询注册的用户名，预期成功', async () => {
    const res = await server.post('/api/user/isExist').send({ userName })
    expect(res.body.code).toBe(0) 
})

// 用户输入数据格式检测
test('json schema检测，使用非法格式注册用户，预期失败', async () => {
    const res = await server.post('/api/user/register').send({
        userName: '12345',
        password: '1',
        gender: 'test'
    })
    expect(res.body.code).not.toBe(0)
})

// 用户登录
test('已注册用户登录，预期成功', async () => {
    const res = await server.post('/api/user/login').send({ userName, password })
    expect(res.body.code).toBe(0) 
    COOKIE = res.headers['set-cookie'].join(';')
})

// 修改用户信息
test('修改用户信息，预期成功', async () => {
    const res = await server
    .patch('/api/user/changeInfo')
    .send({
        nickName: '测试昵称',
        avatar: '测试头像'
    })
    .set('cookie', COOKIE)
    expect(res.body.code).toBe(0) 
})

// 修改密码
test('修改密码，预期成功', async () => {
    const res = await server
    .patch('/api/user/changePassword')
    .send({password, newPassword: `p_${Date.now()}`})
    .set('cookie', COOKIE)
    expect(res.body.code).toBe(0) 
})

// 用户删除
test('删除用户，预期成功', async () => {
    const res = await server.post('/api/user/delete').set('cookie', COOKIE)
    expect(res.body.code).toBe(0) 
})

// 退出登录
test('退出登录，预期成功', async () => {
    const res = await server.post('/api/user/logout').set('cookie', COOKIE)
    expect(res.body.code).toBe(0) 
})

// 再次查询用户
test('再次查询已删除的用户，预期失败', async () => {
    const res = await server.post('/api/user/isExist').send({ userName })
    expect(res.body.code).not.toBe(0) 
})

