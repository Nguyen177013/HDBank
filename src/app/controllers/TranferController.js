class TranferController {
    // [GET] /tranfer
    tranfer(req, res, next) {
        res.render('tranfer')
    }
}

module.exports = new TranferController()