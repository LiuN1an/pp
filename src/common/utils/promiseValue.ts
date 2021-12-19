/**
 * 异步控制顺序
 */
export const promiseValue = () => {
    let resolve
    let reject
    const promise = new Promise((res, rej) => {
        resolve = res
        reject = rej
    })
    return [promise, resolve, reject]
}