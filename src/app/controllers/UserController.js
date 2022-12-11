class UserController {
    // [GET] /user/login
    login(req, res, next) {
        // let token = req.cookies.token
        // res.json(token)
        res.render('login')
    }

    // [GET] /user/register
    register(req, res, next) {
        res.render('register')
    }

    // [GET] /user/changePass
    changePass(req, res, next) {
        res.render('changePass')
    }
}

module.exports = new UserController()