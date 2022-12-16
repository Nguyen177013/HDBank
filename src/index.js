var path = require('path')
const express = require('express')
const handlebars = require('express-handlebars')
const app = express()

// Thư viện PUT, PATCH
const methodOverride = require('method-override')
const port = 3001

var cookieParser = require('cookie-parser')
app.use(cookieParser())

// Body parse
var bodyParser = require('body-parser')
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

// JWT
var jwt = require('jsonwebtoken')

app.use(
    express.urlencoded({
        extended: true,
    }),
)
app.use(express.json())

// dùng khi muốn sử dụng method="PUT" cho việc edit sản phẩm
app.use(methodOverride('_method'))

// Static file
app.use(express.static(path.join(__dirname, 'public')))

// Template engine
app.engine(
    'hbs',
    handlebars.engine({
        extname: '.hbs',
        helpers: {
            sum: (a, b) => a + b,
        },
    }),
)
app.set('views', path.join(__dirname, 'resources', 'views'))
app.set('view engine', 'hbs')

app.listen(port, () => {
    console.log(`App listening on port http://localhost:${port}`)
})

var checkLogin = async(req, res, next) => {
    try {
        // kiểm tra thấy nếu token có giá trị sẽ cho phép truy cập vào trang HOME
        // sai sẽ trả về trang LOGIN
        token = req.cookies.token
        if (token) {
            next()
        } else {
            res.render('login')
        }
    } catch (error) {
        res.render('login')
    }
}

var token

// Get Home
app.get('/', checkLogin, (req, res, next) => {
    res.render('home', { index: 0, token: token })
})

// Get Tranfer
app.get('/tranfer', checkLogin, (req, res, next) => {
    res.render('tranfer', { index: 1, token: token })
})

// Get Change Password
app.get('/changePass', checkLogin, (req, res, next) => {
    res.render('changePass', { index: 3, token: token })
})

// Mua thẻ cào
app.get('/buyCard', checkLogin, (req, res, next) => {
    res.render('buyCard', { index: 2, token: token })
})

// Thêm mới người nhận
app.get('/createFriend', checkLogin, (req, res, next) => {
    res.render('createFriend', { index: 1, token: token })
})

// Nạp tiền bằng thẻ card
app.get('/addMoney', (req, res, next) => {
    res.render('addMoney', { index: 0, token: token })
})

// Nạp tiền bằng thẻ card
app.get('/forgotPass', (req, res, next) => {
    res.render('forgotPass')
})

// Log out
app.get('/deleteCookie', function(req, res, next) {
    let cookie = req.cookies
    for (var prop in cookie) {
        if (!cookie.hasOwnProperty(prop)) {
            continue
        }
        res.cookie(prop, '', { expires: new Date(0) })
    }
    res.redirect('/')
})

// Translate
// app.post('/translate', function(req, res) {
//     const axios = require('axios')
//     const encodedParams = new URLSearchParams()

//     // encodedParams.append('q', 'Hello, world!')
//     // encodedParams.append('target', 'vi')
//     // encodedParams.append('source', 'en')

//     encodedParams.append('q', 'Tài khoản')
//     encodedParams.append('q', 'Chuyển tiền')
//     encodedParams.append('q', 'Nạp tiền điện thoại')
//     encodedParams.append('q', 'Đổi mật khẩu')
//     encodedParams.append('q', 'Đăng xuất')

//     encodedParams.append('target', 'en')
//     encodedParams.append('source', 'vi')

//     const options = {
//         method: 'POST',
//         url: 'https://google-translate1.p.rapidapi.com/language/translate/v2',
//         headers: {
//             'content-type': 'application/x-www-form-urlencoded',
//             'Accept-Encoding': 'application/gzip',
//             'X-RapidAPI-Key': '4c48a9c605msh9bf84f399eaca8fp195f31jsn8d75354b2a7f',
//             'X-RapidAPI-Host': 'google-translate1.p.rapidapi.com',
//         },
//         data: encodedParams,
//     }

//     axios
//         .request(options)
//         .then(function(response) {
//             // res.json(response.data.data.translations[0].translatedText)
//             res.json(response.data)
//         })
//         .catch(function(error) {
//             console.error(error)
//         })
// })

// SMS
const accountSid = 'ACff0c2237d5222f6fcd7a328f3a61d70f'
const authToken = '860513d9a9b6c02951b8596c35178516'
const client = require('twilio')(accountSid, authToken)

app.post('/sendsms', function(req, res) {
    // xóa token "otp"
    // let cookie = req.cookies
    // for (var prop in cookie) {
    //     if (!cookie.hasOwnProperty(prop)) {
    //         continue
    //     }
    //     res.cookie(prop, '', { expires: new Date(0) })
    // }

    // res.redirect('/')

    var valueRandom = req.body
    console.log(valueRandom)

    client.messages
        .create({
            body: 'Mã OTP của bạn là: ' + req.cookies.otp,
            messagingServiceSid: 'MG1fed4473d00d018f043553bd295d9338',
            to: '+84971521473',
        })
        .then((message) => console.log(message.sid))
        .done()
})

// Nhận các route sau đó sử dụng (luôn để dưới cùng)
const route = require('./routes')
route(app)