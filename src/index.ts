import _ from 'lodash'

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
export function 断言文本相等(变量1: any, 变量2: any) {
    var c1 = JSON.stringify(变量1)
    var c2 = JSON.stringify(变量2)
    if (c1 != c2) {
        throw `断言失败: 值1: ${c1} 值2: ${c2}`
    }
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

/**
 * 按主字段合并表中的行, 并合并给定的合并字段为数组.
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
 * 以id为主字段, 以['标签']为合并字段, 合并后:
 * ```
 * [
 *  { id: 1, 姓名: 'a', 标签: ['a1', 'a2', 'a3'] },
 *  { id: 2, 姓名: 'b', 标签: ['b1'] },
 * ]
 * ```
 */
export function 对表合并行<
    A extends { [key: string]: unknown },
    B extends keyof A,
    C extends { [K in keyof A]?: true },
>(
    输入表: A[],
    主字段: B,
    合并字段: C,
    是否去重: boolean = false,
): { [K in keyof A]: 对表合并行_返回值计算<C, K, A> }[] {
    return 数组等价去重(输入表.map((a) => a[主字段]))
        .filter((a) => a != null)
        .map((主字段值) => {
            var 子表 = 输入表.filter((b) => 等价(b[主字段], 主字段值))
            var 列名们 = Object.keys(输入表[0])
            var 合并后对象 = 列名们.reduce((s, 列名) => {
                var 结果数组 = 子表.map((a) => a[列名]).filter((a) => a != null)
                if (是否去重) 结果数组 = 数组等价去重(结果数组) as any
                return { ...s, [列名]: !合并字段[列名] ? 结果数组[0] : 结果数组 }
            }, {} as { [K in keyof A]: A[K][] })
            return 合并后对象
        }) as any
}
type 对表合并行_返回值计算<C, K extends keyof A, A> = K extends keyof C ? A[K][] : A[K]

export function 等价<A>(a: A, b: A) {
    return JSON.stringify(a) == JSON.stringify(b)
}

export function 数组等价去重<A>(数组: A[]) {
    return _.uniqWith(数组, 等价)
}

/**
 * 输入:
 * ```
 * {
 *  姓名: [1, 2, 3],
 *  年龄: ['1', '2', '3'],
 * }
 * ```
 *
 * 得到:
 * ```
 * [
 *  {姓名: 1, 年龄: '1'},
 *  {姓名: 2, 年龄: '2'},
 *  {姓名: 3, 年龄: '3'},
 * ]
 * ```
 */
export function 对象构造表<A extends { [key: string]: unknown[] }>(输入: A): { [K in keyof A]: A[K][0] }[] {
    var 字段 = Object.keys(输入)
    var 值 = Object.values(输入)
    var 行数 = 值[0].length

    if (字段.length == 0) throw '必须有键'
    if (行数 == 0) throw '必须有值'
    if (值.map((a) => a.length).filter((a) => a != 行数).length != 0) throw '所有值的长度必须一致'

    var r: { [K in keyof A]: A[K] }[] = []
    for (var i = 0; i < 行数; i++) {
        var 行 = 字段.map((a) => ({ [a]: 输入[a][i] })).reduce((s, a) => Object.assign(s, a))
        r.push(行 as any)
    }

    return r
}

export function 区域数组(s: number, e: number) {
    return Array(e - s)
        .fill(null)
        .map((_, i) => i)
}
