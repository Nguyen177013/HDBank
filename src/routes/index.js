const siteRouter = require('./site')
const userRouter = require('./user')
const tranferRouter = require('./tranfer')

function route(app) {
    app.use('/tranfer', tranferRouter)
    app.use('/user', userRouter)
    app.use('/', siteRouter)
}

module.exports = route