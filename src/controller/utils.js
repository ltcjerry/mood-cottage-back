/**
 * @description utils controller
 * @author jerry
 */

const path = require('path')
const fse = require('fs-extra')
const { SuccessModel, FailModel } = require('../utils/resModel')
const { uploadFileSizeFailInfo } = require('../config/errorInfo')

// 最大文件体积 1M
const MAX_SIZE = 1024 * 1024 * 1024
// 文件存储目录
const DIST_FOLDER_PATH = path.join(__dirname, '..', '..', 'uploadFiles')
// 是否需要创建目录
fse.pathExists(DIST_FOLDER_PATH).then(exist => {
    if (!exist) {
        fse.ensureDir(DIST_FOLDER_PATH)
    }
})

/**
 * 上传文件
 * @param {string} name 文件名
 * @param {string} type 文件类型
 * @param {number} size 文件体积大小
 * @param {string} filePath 文件路径
 */
async function saveFile({ name, type, size, filePath }) {
    if (size > MAX_SIZE) {
        await fse.remove(filePath)
        return new FailModel(uploadFileSizeFailInfo)
    } else {
        // 移动文件
        const fileName = name + Date.now()
        const distFilePath = path.join(DIST_FOLDER_PATH, fileName)
        await fse.move(filePath, distFilePath)
        return new SuccessModel({ url: '/' + fileName })
    }
}
 
module.exports = {
    saveFile
}