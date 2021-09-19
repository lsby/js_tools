export function 断言相等(变量: Number | Boolean | String, 值: Number | Boolean | String) {
    var 变量类型 = typeof 变量
    var 值类型 = typeof 值
    if (变量类型 == 'object' || 变量类型 == 'function' || 变量类型 == 'undefined') {
        throw '意外的变量类型:' + 变量类型
    }
    if (值类型 == 'object' || 值类型 == 'function' || 值类型 == 'undefined') {
        throw '意外的值类型:' + 值类型
    }
    if (变量 != 值) throw `断言失败: 期待: ${值} 实际: ${变量}`
}
export function 断言为真(值: boolean) {
    if (值 != true) {
        throw `断言失败: 期待: true 实际: ${值}`
    }
}
export function 断言为假(值: boolean) {
    if (值 != false) {
        throw `断言失败: 期待: false 实际: ${值}`
    }
}
export function 断言为NULL(值: any) {
    if (值 != null) {
        throw `断言失败: 期待: null 实际: ${值}`
    }
}
export function 断言不为NULL(值: any) {
    if (值 == null) {
        throw `断言失败: 期待: 非null 实际: ${值}`
    }
}

export var Y = (s: any) => s(s)
export function 重复字符串(字符串: string, 重复次数: number, 分割符号: string) {
    return Array(重复次数)
        .fill(null)
        .map((_) => 字符串)
        .join(分割符号)
}

/**
 * 按主字段合并表
 *
 * 表:
 * ```
 * [
 *  { id: 1, 姓名: 'a', 标签: 'a1' },
 *  { id: 1, 姓名: 'a', 标签: 'a2' },
 *  { id: 1, 姓名: 'a', 标签: 'a3' },
 *  { id: 2, 姓名: 'b', 标签: 'b1' },
 * ]
 * ```
 *
 * 以id为主字段合并后:
 * ```
 * {
 *  '1': { id: [1], 姓名: ['a'], 标签: ['a1', 'a2', 'a3'] },
 *  '2': { id: [2], 姓名: ['b'], 标签: ['b1'] },
 * }
 * ```
 */
export function 合并表<A extends { [key: string]: string | number | boolean }, B extends keyof A>(
    输入表: A[],
    主字段: B,
): { [key: string]: { [K in keyof A]: A[K][] } } {
    return [...new Set(输入表.map((a) => a[主字段]))]
        .map((a) => a.toString())
        .reduce((s, 主字段值) => {
            var 子表 = 输入表.filter((b) => b[主字段] == 主字段值)
            var 列名们 = Object.keys(输入表[0])
            var 合并后对象 = 列名们.reduce((s, 列名) => {
                var 合并的数组 = [...new Set(子表.map((a) => a[列名]))]
                return { ...s, [列名]: 合并的数组 }
            }, {} as { [K in keyof A]: A[K][] })
            return { ...s, [主字段值]: 合并后对象 }
        }, {} as { [key: string]: { [K in keyof A]: A[K][] } })
}

export function 笛卡尔积(数组1: unknown[], 数组2: unknown[]) {
    if (数组1.length == 0 || 数组2.length == 0) {
        return []
    }
    return 数组1.map((a) => 数组2.map((b) => [a, b])).flat()
}
export function 多重笛卡尔积(...数组们: unknown[][]) {
    if (数组们.length == 0) return []
    if (数组们.length == 1) return 数组们.map((a) => a.map((a) => [a])).flat()

    var 累加值 = 笛卡尔积(数组们[0], 数组们[1])
    for (var i = 2; i < 数组们.length; i++) {
        累加值 = 笛卡尔积(累加值, 数组们[i])
    }

    return 累加值.map((a) => a.flat())
}

export function 数组缝合<A, B>(数组1: A[], 数组2: B[]) {
    if (数组1.length != 数组2.length) throw '数组长度必须一致'

    var r = []
    for (var i = 0; i < 数组1.length; i++) {
        if (数组1[i] != null) {
            r.push(数组1[i])
        }
        if (数组2[i] != null) {
            r.push(数组2[i])
        }
    }

    return r
}
