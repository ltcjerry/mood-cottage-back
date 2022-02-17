/**
 * @description response数据模型
 * @author jerry
 */

// 基础模型类
class BaseModel {
    constructor({code, data, message}) {
        this.code = code
        if (data) {
            this.data = data
        }
        if (message) {
            this.message = message
        }
    }
}

// 成功消息数据模型
class SuccessModel extends BaseModel {
    constructor(data = {}) {
        super({ code: 0, data })
    }
}

// 失败消息数据模型
class FailModel extends BaseModel {
    constructor({ code, message }) {
        super({ code, message })
    }
}

module.exports = {
    FailModel,
    SuccessModel
}
