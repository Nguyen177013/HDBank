class SiteController {
    // [GET] /home
    index(req, res, next) {
        res.render('home')
    }
}

module.exports = new SiteController()