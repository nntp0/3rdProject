const test1 = async () => {
    console.log('Hello')
    return 'World'
}


const test2 = () => {
    return new Promise((resolve, reject) => {
        test1().then((res) => {
            console.log(res)
            resolve('Nice')
        })
    })
}


const test3 = () => {
    return new Promise((resolve, reject) => {
        test2().then((res) => {
            console.log(res)
            resolve('To')
        })
    })
}

const test4 = () => {
    return new Promise((resolve, reject) => {
        test3().then((res) => {
            console.log(res)
        })
    })
}

test4()