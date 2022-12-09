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
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

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

var token

// Get Home
app.get(
    '/',
    (req, res, next) => {
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
    },
    (req, res, next) => {
        res.render('home', { index: 0, token: token })
    },
)

// Get Tranfer
app.get(
    '/tranfer',
    (req, res, next) => {
        try {
            // lấy accountNo từ token để chuyển khoản
            token = req.cookies.token
            if (token) {
                next()
            } else {
                res.render('login')
            }
        } catch (error) {
            res.render('login')
        }
    },
    (req, res, next) => {
        res.render('tranfer', { index: 1, token: token })
    },
)

// Log out
app.get('/deleteCookie', function(req, res, next) {
    let cookie = req.cookies
    for (var prop in cookie) {
        if (!cookie.hasOwnProperty(prop)) {
            continue
        }
        res.cookie(prop, '', { expires: new Date(0) })
    }
    res.redirect('/user/login')
})

// SMS

const Nexmo = require('nexmo')
const nexmo = new Nexmo({
    apiKey: '098b8412',
    apiSecret: 'DiE1pV1p3R0vPutR',
})

app.post('/sendsms', function(req, res) {
    const from = 'Vonage APIs'
    const to = '84971521473'
    const text = 'Hello Khai Vo'

    nexmo.message.sendSms(from, to, text, (err, responseData) => {
        if (err) {
            console.log(err)
        } else {
            if (responseData.messages[0]['status'] === '0') {
                // console.log('Message sent successfully.')
                res.json(responseData)
            } else {
                res.json(`Message failed with error: ${responseData.messages[0]['error-text']}`)
            }
        }
    })
})

// Nhận các route sau đó sử dụng (luôn để dưới cùng)
const route = require('./routes')
route(app)