// Quên mật khẩu

// Refresh Token
// async function refreshToken() {
//     let data = await $.ajax({
//         url: 'https://hdbank-hackathon.auth.ap-southeast-1.amazoncognito.com/oauth2/token',
//         method: 'POST',
//         headers: {
//             accept: 'application/json',
//             'Content-Type': 'application/x-www-form-urlencoded',
//         },
//         data: {
//             client_id: 'sikcnei4t2h3ntkqj5d49ltvr',
//             grant_type: 'refresh_token',
//             refresh_token: 'eyJjdHkiOiJKV1QiLCJlbmMiOiJBMjU2R0NNIiwiYWxnIjoiUlNBLU9BRVAifQ.lMUJrc55tc2qdYBrU7any-E4sFKY0H21ViFgldna42qiaK44o2zEuIj648XcGGKP3uEfCunTj-asHm4zmsJnz6BS3fEuGJhzQlB_8BuP5lVs36g0OaQWsxtSiUoxby04GBIIJGVHP2w2NYzMd8unuqFEO_4K-cyqZlTb451-xNE9FvO-IgHDFsMPQdlkqvlPCIc3bjsDPlvCDtu5B0anO4o7V7A-vaGQ_YJHBBBvOVsD-o0Wl7EhTCu3urstn4w0PvFILhAn13zpH-Wp6jcQNP04K9hsrRL0apKWqG-_yvPSCxaoIWuzHiIWT7YfTKd92U5IcYu_GSyfXSV06pl7Nw.ZZWAjXdDaBa8-GLt.3U1Y-_QgsmFHC9nqiK1RrOFSYDb1J-5rFCJz8NhBQ7zUe_BpSKUVvrbqJNMFbKW9OVG541VFueuXR9faJVRcQtttrR2yoPOE5snXw7IjdsyDj45BUMXASRDMUjj95lKTMDQUkK5aJthB1PkV9dr6-yoHUxCD8PnVSBQnmAuD0pW7uRZ1ppeo1qbldzN-_DxGAtrXxbqsH7yb7zWfEZTStQaMq9o2j_dAMdk0xMkRVLKaJ1ERNBsgirMxnwp8FNL-j9f8U0UeKgdxzGNsTEuUMAPhBMPnAEeGmXhgvofW55xWM2-8mElbd7_xc6GnoWp3LNdo1rvJwlV5Iatmh4T1G2OWP63-0bvhL0HhZJNrrceCvDov5imD7pedP-JR_aw-Veyv4sR3UJ44EK80aoq4GGdxh5aLmAoqgKop3fDSa-olarZV9C8IhnswHa_wLQo8rUlS1cpqjK-RWF1h6HfPM79_qWF0rKuBVmKIiAU89ncRDxzusuNpH1oXs26bSa9t7MKKqVpGqvg1n8oTLn8g773dF_uZbFsiCCNAzrab5_veYs9lfyFS3HAlokRCkvuCKRkGQpvwes1se3fxy7jRxXXGK9mzwqFnMD-lhPTPXjQAvOUUKS-g9QugqHZTDqLH_YxfNcRSNTyuFqBN-qmsI2QGMXcdAMGUuU5GM6p55jfDqoeVaC7Nd0QMsGtKkl--MoIwSX-y_Nh6poq9Zll59SVzwfG24Yu2y5aCz_meFYifEfezYC2E2qDenlqh2XyzHOgc6PyJ1Pze6NOglHIWB34vdUfHMDb_wdWVapkVUmSVAsn98azqtQwKLYmTkVm86-PMfwwnNo4vZyXiZ6g_NUY1VDF5hQiVAQ5okJMZLeAOpEY2cBZMtbExp_84aznobV1CJEVHN_PXCAihYXsUfj-2MVqvbtB2aCKR-SDSiqTXF68UC4WGithQYU1q4tO2YEvVdTUsCUsRVB8ygvjaCVpF7xw3o-ZOJELTcIqxsHONi03f8dI84A8xLvrm8UB7zsPIJhpafRURanYbLiC07gz8Gs9s4LmUAWNUNFEubsQCLpfUPimzGVxotGRX4ijJbQEwf0gLdtOl1OdJLvMkG0a-qgjUkDw-2v-SEAK9WD7TgW1dMwT1rCm6kQkZSWI9Dq23Uqol8y6fov1Jxo6mo_RLfruLsUaMXivpoSuNKMWtlEe0-bk3f5KFvSKr6ElAaVwMt8oyRJlsjms2c0LpA_t2_ODJRwYYLbLvqILHw0XlpHja5oohBLJLh6xjnLda9BM2xExgqqO3QVKENdCErNjHqMSECNunLRNnt_ICG5RwcMlXhWq1mzJHfhf1M2ikvIsRCL-hdA.LT6g9msdRd_SszieL_X2Ng',
//         },
//     })
//     return data.id_token
// }

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
        btnSendOtp.setAttribute('href', 'tel:' + valueRandom)
    }
})

// Btn Back
btnBack.addEventListener('click', () => {
    otpContainer.classList.add('go-right')
    otpContainer.classList.remove('active-box')
    mobileVerify.classList.add('go-right', 'active-box')
})

btnVerify.addEventListener('click', () => {
    let newPass = document.querySelector('#newPass').value.trim()
    let repeatNewPass = document.querySelector('#repeatNewPass').value.trim()
    let codeOtp = document.querySelector('#code-otp').value.trim()

    if (newPass == '' || repeatNewPass == '' || codeOtp == '') {
        // fix lỗi gửi sự kiện gửi đi khi chưa nhập thông tin tại đây --------------------------------------------------
        alert('Vui lòng nhập đầy đủ thông tin !')
    } else {
        if (newPass !== repeatNewPass || valueRandom !== codeOtp) {
            let formSubmit = document.querySelector('.form-action-forgott-password')
            formSubmit.addEventListener('submit', (e) => {
                e.preventDefault()
            })
            alert('Mật khẩu chưa trùng khớp !')
                // fix lỗi gửi sự kiện gửi đi khi chưa nhập thông tin tại đây --------------------------------------------------
                //handleForgotPass()
        } else {
            let formSubmit = document.querySelector('.form-action-forgot-password')
            formSubmit.addEventListener('submit', (e) => {
                e.preventDefault()
            })

            // gọi ra tất cả thông tin có trong DB user
            // so sánh để lấy ra username đúng như người dùng nhập ngoài input
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
    }
})