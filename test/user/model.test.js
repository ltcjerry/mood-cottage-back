/**
 * @description user model test
 * @author jerry
 */

const { User } = require('../../src/database/model/index')

test('User数据模型的属性集合符合预期', () => {
    const user = User.build({ 
        userName: 'jerry', 
        password: 'test123',
        nickName: 'mouse',
        avatar: 'test.png'
    })
    expect(user.userName).toBe('jerry')
    expect(user.password).toBe('test123')
    expect(user.gender).toBe(0)
    expect(user.nickName).toBe('mouse')
    expect(user.avatar).toBe('test.png')
})