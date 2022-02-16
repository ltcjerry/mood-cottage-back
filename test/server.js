/**
 * @description jest server
 * @author jerry
 */

const request = require('supertest')
const server = require('../src/app').callback()

module.exports = request(server)