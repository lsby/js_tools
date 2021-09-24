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
    var 表1 = [
        { id: 1, 姓名: 'a', 标签: 'a1' },
        { id: 1, 姓名: 'a', 标签: 'a2' },
        { id: 1, 姓名: 'a', 标签: 'a3' },
        { id: 2, 姓名: 'b', 标签: 'b1' },
    ]
    var 合并后1 = tools.对表合并行(表1, 'id', { 标签: true })
    tools.断言相等(
        JSON.stringify(合并后1),
        JSON.stringify([
            { id: 1, 姓名: 'a', 标签: ['a1', 'a2', 'a3'] },
            { id: 2, 姓名: 'b', 标签: ['b1'] },
        ]),
    )

    var 表2 = [
        { id: [1], 姓名: 'a', 标签: 'a1' },
        { id: [1], 姓名: 'a', 标签: 'a2' },
        { id: [1], 姓名: 'a', 标签: 'a3' },
        { id: [2], 姓名: 'b', 标签: 'b1' },
    ]
    var 合并后2 = tools.对表合并行(表2, 'id', { 标签: true })
    tools.断言相等(
        JSON.stringify(合并后2),
        JSON.stringify([
            { id: [1], 姓名: 'a', 标签: ['a1', 'a2', 'a3'] },
            { id: [2], 姓名: 'b', 标签: ['b1'] },
        ]),
    )

    var 表3 = [
        { id: 1, 姓名: 'a', 标签: 'a' },
        { id: 1, 姓名: 'a', 标签: 'a' },
        { id: 1, 姓名: 'a', 标签: 'b' },
        { id: 2, 姓名: 'b', 标签: 'c' },
    ]
    var 合并后3 = tools.对表合并行(表3, 'id', { 标签: true }, true)
    tools.断言相等(
        JSON.stringify(合并后3),
        JSON.stringify([
            { id: 1, 姓名: 'a', 标签: ['a', 'b'] },
            { id: 2, 姓名: 'b', 标签: ['c'] },
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
it('对象构造表', async function () {
    var r = tools.对象构造表({
        姓名: [1, 2, 3],
        年龄: ['1', '2', '3'],
    })
    tools.断言相等(
        JSON.stringify(r),
        JSON.stringify([
            { 姓名: 1, 年龄: '1' },
            { 姓名: 2, 年龄: '2' },
            { 姓名: 3, 年龄: '3' },
        ]),
    )
})
it('区域数组', async function () {
    var r = tools.区域数组(0, 2)
    tools.断言相等(JSON.stringify(r), JSON.stringify([0, 1]))
})
