import 'mocha'
import * as tools from '../dist/'

it('断言相等', async function () {
    tools.断言相等(1, 1)
})
it('断言为null', async function () {
    tools.断言为NULL(null)
})
it('断言不为null', async function () {
    tools.断言不为NULL(1)
})
it('断言为真', async function () {
    tools.断言为真(true)
})
it('断言为假', async function () {
    tools.断言为假(false)
})
it('Y组合子', async function () {
    var f = tools.Y((s) => (a: number) => a == 0 ? 1 : a * s(s)(a - 1))
    tools.断言为真(f(5) == 120)
})
it('重复字符串', async function () {
    var r = tools.重复字符串('1', 2, '')
    tools.断言为真(r == '11')
})
it('合并表', async function () {
    var 表 = [
        { id: 1, 姓名: 'a', 标签: 'a1' },
        { id: 1, 姓名: 'a', 标签: 'a2' },
        { id: 1, 姓名: 'a', 标签: 'a3' },
        { id: 2, 姓名: 'b', 标签: 'b1' },
    ]
    var 合并后 = tools.合并表(表, 'id')
    tools.断言相等(
        JSON.stringify(合并后),
        JSON.stringify({
            '1': { id: [1], 姓名: ['a'], 标签: ['a1', 'a2', 'a3'] },
            '2': { id: [2], 姓名: ['b'], 标签: ['b1'] },
        }),
    )
})
it('对表合并行', async function () {
    var 表 = [
        { id: 1, 姓名: 'a', 标签: 'a1' },
        { id: 1, 姓名: 'a', 标签: 'a2' },
        { id: 1, 姓名: 'a', 标签: 'a3' },
        { id: 2, 姓名: 'b', 标签: 'b1' },
    ]
    var 合并后 = tools.对表合并行(表, 'id')
    tools.断言相等(
        JSON.stringify(合并后),
        JSON.stringify([
            { id: [1], 姓名: ['a'], 标签: ['a1', 'a2', 'a3'] },
            { id: [2], 姓名: ['b'], 标签: ['b1'] },
        ]),
    )
})
it('多重笛卡尔积', async function () {
    var r = tools.多重笛卡尔积([1, 2, 3], [4, 5])
    tools.断言相等(
        JSON.stringify(r),
        JSON.stringify([
            [1, 4],
            [1, 5],
            [2, 4],
            [2, 5],
            [3, 4],
            [3, 5],
        ]),
    )
})
it('数组缝合', async function () {
    var r = tools.数组缝合([1, 2, 3], [4, 5, 6])
    tools.断言相等(JSON.stringify(r), JSON.stringify([1, 4, 2, 5, 3, 6]))
})
