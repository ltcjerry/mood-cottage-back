/**
* @description blog model test
* @author jerry
*/

const { Blog } = require('../../src/database/model/index')

test('Blog数据模型的属性集合符合预期', () => {
    const blog = Blog.build({ 
        userId: 1, 
        content: 'test',
        image: '/test.png',
    })
    expect(blog.userId).toBe(1)
    expect(blog.content).toBe('test')
    expect(blog.image).toBe('/test.png')
})