// Set Cookie
function setCookie(cname, cvalue, exdays) {
    const d = new Date()
    d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000)
    let expires = 'expires=' + d.toUTCString()
    document.cookie = cname + '=' + cvalue + ';' + expires + ';path=/'
}

// Get Cookie
function getCookie(cname) {
    let name = cname + '='
    let decodedCookie = decodeURIComponent(document.cookie)
    let ca = decodedCookie.split(';')
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i]
        while (c.charAt(0) == ' ') {
            c = c.substring(1)
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length)
        }
    }
    return ''
}

// Quên mật khẩu
const otpContainer = document.querySelector('.otp-container')
const mobileVerify = document.querySelector('.mobile-verify')
const btnContinue = document.querySelector('.btn-continue')
const btnVerify = document.querySelector('.btn-verify')
const btnBack = document.querySelector('.btn-back')
const containerContent = document.querySelector('.container-content')

var valueRandom = 0

// Btn Continue
btnContinue.addEventListener('click', () => {
    let username = document.querySelector('#username').value.trim()
    let btnSendOtp = document.querySelector('.btn-send-otp')
    if (username == '') {
        alert('Vui lòng điền tên đăng nhập !')
    } else {
        otpContainer.classList.remove('go-right')
        mobileVerify.classList.remove('go-right')

        // Tạo mã OTP và gán giá trị cho btnSendOtp
        let random = ''
        Array.from({ length: 4 }, () => {
            random += Math.floor(Math.random() * 10).toString()
        })
        valueRandom = random

  fetch('/sendsms', {
            method: 'POST',
            body: JSON.stringify({ valueRandom }),
            headers: { 'Content-Type': 'application/json' },
        }).then((data) => {
            console.log('oke')
        })


    }
})

// Btn Back
btnBack.addEventListener('click', () => {
    otpContainer.classList.add('go-right')
    otpContainer.classList.remove('active-box')
    mobileVerify.classList.add('go-right', 'active-box')
})

// btnVerify.addEventListener('click', () => {
let formSubmit = document.querySelector('.form-action-forgot-password')
formSubmit.addEventListener('submit', (e) => {
        let newPass = document.querySelector('#newPass').value.trim()
        let repeatNewPass = document.querySelector('#repeatNewPass').value.trim()
        let codeOtp = document.querySelector('#code-otp').value.trim()
        e.preventDefault()

        if (newPass == '' || repeatNewPass == '' || codeOtp == '') {
            alert('Vui lòng nhập đầy đủ thông tin !')
            return
        } else if (newPass !== repeatNewPass) {
            alert('Mật khẩu xác nhận chưa trùng khớp !')
            return
        } else if (valueRandom !== codeOtp) {
            alert('Mã xác thực chưa chính xác !')
            return
        } else {
            let apiKeyXata = 'xau_NFju5b34TYFnTVeex0PP51gJ1xGDoFmG0'
            $.ajax({
                url: 'https://6151_v-kh-i-s-workspace-uh7b6d.us-east-1.xata.sh/db/HDBank:main/tables/users/query',
                headers: {
                    Authorization: 'Bearer' + ' ' + apiKeyXata,
                    'Content-Type': 'application/json',
                },
                method: 'POST',
                data: JSON.stringify({
                    page: { size: 10 },
                }),
            }).then((result) => {
                const data = result.records
                let username = document.querySelector('#username').value

                function checkUser(item) {
                    if (item.username == username) return item
                }
                let account = data.find(checkUser)

                // Đổi mật khẩu
                let userInfo = account.username
                let currentPassword = account.password
                let newPassword = document.querySelector('#newPass').value

                refreshToken().then((value) => {
                    // Get PublicKey
                    let publicKey
                    $.ajax({
                        url: 'https://7ucpp7lkyl.execute-api.ap-southeast-1.amazonaws.com/dev/get_key',
                        headers: {
                            accept: 'application/json',
                            'access-token': value,
                            'x-api-key': 'hutech_hackathon@123456',
                            'Content-Type': 'application/json',
                        },
                        method: 'GET',
                    }).then((result) => {
                        publicKey = result.data.key
                        encrypt.setPublicKey(publicKey)
                        let data = JSON.stringify({
                            username: userInfo,
                            oldPass: currentPassword,
                            newPass: newPassword,
                        })
                        var credential = encrypt.encrypt(data)

                        // Change Password
                        $.ajax({
                            url: 'https://7ucpp7lkyl.execute-api.ap-southeast-1.amazonaws.com/dev/change_password',
                            headers: {
                                accept: 'application/json',
                                'access-token': value,
                                'x-api-key': 'hutech_hackathon@123456',
                                'Content-Type': 'application/json',
                            },
                            method: 'POST',
                            data: JSON.stringify({
                                data: {
                                    credential: credential,
                                    key: publicKey,
                                },
                                request: {
                                    requestId: 'a7ea23df-7468-439d-9b12-26eb4a760901',
                                    requestTime: '1667200102200',
                                },
                            }),
                        }).then((result) => {
                            // Đổi mật khẩu trong DB "users"
                            let userInfo = account.username
                            let newPassword = document.querySelector('#newPass').value
                            $.ajax({
                                url: 'https://6151_v-kh-i-s-workspace-uh7b6d.us-east-1.xata.sh/db/HDBank:main/tables/users/data/' +
                                    account.id,
                                headers: {
                                    Authorization: 'Bearer' + ' ' + apiKeyXata,
                                    'Content-Type': 'application/json',
                                },
                                method: 'PATCH',
                                data: JSON.stringify({
                                    username: userInfo,
                                    password: newPassword,
                                }),
                            }).then((result) => {
                                alert('Đã đổi mật khẩu thành công !')
                                window.location.href = '/user/login'
                            })
                        })
                    })
                })
            })
        }
    })
    // })
