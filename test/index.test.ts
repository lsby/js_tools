import 'mocha'
import lib from '../dist/'
import * as tools from '@lsby/js_tools'

describe('测试组', async function () {
    it('测试1', function () {
        tools.断言相等(lib(1, 2), 3)
    })
})
