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

// translate

app.post('/translate', function(req, res) {
    const axios = require('axios')
    const encodedParams = new URLSearchParams()
        // encodedParams.append('q', 'Hello, world!')
        // encodedParams.append('target', 'vi')
        // encodedParams.append('source', 'en')

    encodedParams.append('q', 'Xin chào')
    encodedParams.append('target', 'en')
    encodedParams.append('source', 'vi')

    const options = {
        method: 'POST',
        url: 'https://google-translate1.p.rapidapi.com/language/translate/v2',
        headers: {
            'content-type': 'application/x-www-form-urlencoded',
            'Accept-Encoding': 'application/gzip',
            'X-RapidAPI-Key': '4c48a9c605msh9bf84f399eaca8fp195f31jsn8d75354b2a7f',
            'X-RapidAPI-Host': 'google-translate1.p.rapidapi.com',
        },
        data: encodedParams,
    }

    axios
        .request(options)
        .then(function(response) {
            res.json(response.data)
        })
        .catch(function(error) {
            console.error(error)
        })
})

// SMS
// app.post('/sendsms', function(req, res) {
//     const axios = require('axios')

//     const encodedParams = new URLSearchParams()
//     encodedParams.append('sms', '+84971521473')
//     encodedParams.append('message', 'Test message here.')
//     encodedParams.append('senderid', 'MyCompany')
//     encodedParams.append('schedule', '1377959755')
//     encodedParams.append('return', 'http://yourwebsite.com')
//     encodedParams.append('key', '1B490066-EA03-E39A-A18C-C4868E45CFAE')
//     encodedParams.append('username', 'temp-idk-test-dynamic')

//     const options = {
//         method: 'POST',
//         url: 'https://inteltech.p.rapidapi.com/send.php',
//         headers: {
//             'content-type': 'application/x-www-form-urlencoded',
//             'X-RapidAPI-Key': '4c48a9c605msh9bf84f399eaca8fp195f31jsn8d75354b2a7f',
//             'X-RapidAPI-Host': 'inteltech.p.rapidapi.com',
//         },
//         data: encodedParams,
//     }

//     axios
//         .request(options)
//         .then(function(response) {
//             console.log(response.data)
//         })
//         .catch(function(error) {
//             console.error(error)
//         })
// })

// const { Vonage } = require('@vonage/server-sdk')

// const Vonage = require('@vonage/server-sdk')
// const { NCCOBuilder, Talk, OutboundCallWithNCCO } = require('@vonage/voice')

// const vonage = new Vonage({
//     apiKey: '24f3cd57',
//     apiSecret: 'ijTDmo3XDKJi5HIt',
//     applicationId: 'fd374c1a-9aeb-4ac5-b2d2-c947e33d01bc',
//     privateKey: `-----BEGIN PRIVATE KEY-----
//     MIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQCWqp6aOKhfbRsj
//     a5SuuVai/TZuklqEvGxuwN4gpPoG7e2GJpXv61MbltGdcm9pO+D+5mW6g2J6jRT0
//     qew1LKdPOVoRFA0uK+/Z6/uoDg6TQBp2/x25sAWe6LVtOs+tGEaGJLXW4etaCCG9
//     smBVGTyoxEK+lFIugWgIz3KmecUCR9Lt72rF4JlqBE1fzUHh6l1edF0zfIac871Y
//     QbjgKZJG7U4bm0P/HBE2YhCYoYVLUrIlJZPkDj7m3EVgDFGGiDtPVcNCNchAUS33
//     KMerIfmkLm91r1qyPz90KlPNDE7Wygcr+VoPEGatiREbU5CloZTnJZ36j4VpXHT+
//     Zh/3kwYjAgMBAAECggEAFMYSrIifrS9MfMjtDQhF9J7S01JqQ6n9OL9uq8lDe2gb
//     22bU6T8k9tqygocllbi+sDamk8hgxYKlVIoHT6+dTqma4bGbkvWrklGyIaef2oK4
//     rhaai8tELcxqk38hOlMXX5COjUHEzbrtorZbskVoB+GuTZECzHcQQpgOd/tghAya
//     j06NeJ0xiz/MUzrnNbKzUib0WwwG0FP9sknsMSUDNHXVH0qVR8HzkNVhlkT8bxn3
//     HVU+70XbE9g6ce9gVIXLN4Owl5GKivTrcsP2FtzZ4vyfXatetx+Yj12GIGfLxRpg
//     Oln9p/pcj8PFsEf8Je6Md270JbLhjtLK4HVqKm8t2QKBgQDRJHPtSOp9N0XICM4b
//     8dId5NsyJ27AhKEWra0uNEzD8ywuobg5rUS4HfGfZWHvIppQxb7pmkpHq2CIxgPW
//     9Ix/8Q6HV01/NhY2/pgbnoebIWoHmqK68DFBIdcJA5jobmlLS0Nz7AV7prEZowtc
//     62iYXOUSlw9YU3W4CfuR/TZNKQKBgQC4bDqiMfTHYzGrIJhv9BKvZ2b6831i2jHV
//     hZ1o4pw+qw8MdA3tE9yIZkUEsv0tuHaNhazGnQ3PGKzeMUMezjrD8syhYFaw87HE
//     XgUBnz+jWqHGlIccJMmUTNYXCwdjrnCldQUN8AJhR6BRODxd2RLifGCKpwkJ5xDN
//     qaXzbe1WawKBgQC4ObUIQp+TlxmX3/G2eegNPye6YTPUz7+aW3heZ+FrBgxYM0o1
//     PCR5Tp8lOkfvPvrRxa6q1acyxIpvUIXXVmlg1fVnUIbKVNlyrgdM5PMsul1Mv3Ey
//     3Bt29RkXLp0FuSR1F6IePbyCtE3yeEWtHwxukf2Sx4/TzQi4CcsZSQQJKQKBgCeF
//     4kbyR9AXPQS8lo6fkwWONm6fkgaGVlm5KdPZhLyVckMr9/QP5ppAuJfaOBH9T0Lj
//     G/TwoY35bsqragQHFGb7+Mi42btQbo9zysTfOQcsHDFvkUkBxUWH9fW4QlwlfTSo
//     UG39OrVYYU4mrCE8rSRmnVX5mCFMKLi6m7sAmvWDAoGAKWXrBrmU2OpVLuirCvyD
//     dLUMfJPRNJyAGmEuww63yEBirRnLZDEXmXEH6DbVcM4Cwsb0Pi8a2ym3XIL7UqOH
//     Qd9/lJN2AEt0Wht5EkG9hNIaR/g9WpG28C1oPL0Dy4dkHMR2urd8QeWbIqSE3Rd9
//     3qcAv13aqLfuFhHFWzI+cDs=
//     -----END PRIVATE KEY-----
//     `,
// })

// app.post('/sendmess', function(req, res) {
//     vonage.messages
//         .send(
//             new Text(
//                 'This is a Facebook Messenger text message sent using the Messages API',
//                 FB_RECIPIENT_ID,
//                 FB_SENDER_ID,
//             ),
//         )
//         .then((resp) => console.log(resp.message_uuid))
//         .catch((err) => console.error(err))
// })

// Nhận các route sau đó sử dụng (luôn để dưới cùng)
const route = require('./routes')
route(app)