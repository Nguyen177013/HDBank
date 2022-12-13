function random() {
    let random = ''
    Array.from({ length: 13 }, () => {
        random += Math.floor(Math.random() * 10).toString()
    })
    console.log(random)
}

random()