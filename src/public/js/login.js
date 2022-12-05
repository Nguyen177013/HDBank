// Show Hide Password
var passInput = document.querySelector('.input-password')

function showHidePassword() {
    passInput.type = passInput.type === 'password' ? 'text' : 'password'
}

// Nhận sự kiện từ việc nhấn phím để thực hiện function handleLogin()
document.onkeypress = function(myEvent) {
    // console.log(myEvent.which);
    if (myEvent.which == 13) {
        handleLogin()
    }
}

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

// lấy id_token
var id_token

// setTimeout(function() {
$.ajax({
        url: 'https://hdbank-hackathon.auth.ap-southeast-1.amazoncognito.com/oauth2/token',
        method: 'POST',
        headers: {
            accept: 'application/json',
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        data: {
            client_id: 'sikcnei4t2h3ntkqj5d49ltvr',
            grant_type: 'refresh_token',
            refresh_token: 'eyJjdHkiOiJKV1QiLCJlbmMiOiJBMjU2R0NNIiwiYWxnIjoiUlNBLU9BRVAifQ.lMUJrc55tc2qdYBrU7any-E4sFKY0H21ViFgldna42qiaK44o2zEuIj648XcGGKP3uEfCunTj-asHm4zmsJnz6BS3fEuGJhzQlB_8BuP5lVs36g0OaQWsxtSiUoxby04GBIIJGVHP2w2NYzMd8unuqFEO_4K-cyqZlTb451-xNE9FvO-IgHDFsMPQdlkqvlPCIc3bjsDPlvCDtu5B0anO4o7V7A-vaGQ_YJHBBBvOVsD-o0Wl7EhTCu3urstn4w0PvFILhAn13zpH-Wp6jcQNP04K9hsrRL0apKWqG-_yvPSCxaoIWuzHiIWT7YfTKd92U5IcYu_GSyfXSV06pl7Nw.ZZWAjXdDaBa8-GLt.3U1Y-_QgsmFHC9nqiK1RrOFSYDb1J-5rFCJz8NhBQ7zUe_BpSKUVvrbqJNMFbKW9OVG541VFueuXR9faJVRcQtttrR2yoPOE5snXw7IjdsyDj45BUMXASRDMUjj95lKTMDQUkK5aJthB1PkV9dr6-yoHUxCD8PnVSBQnmAuD0pW7uRZ1ppeo1qbldzN-_DxGAtrXxbqsH7yb7zWfEZTStQaMq9o2j_dAMdk0xMkRVLKaJ1ERNBsgirMxnwp8FNL-j9f8U0UeKgdxzGNsTEuUMAPhBMPnAEeGmXhgvofW55xWM2-8mElbd7_xc6GnoWp3LNdo1rvJwlV5Iatmh4T1G2OWP63-0bvhL0HhZJNrrceCvDov5imD7pedP-JR_aw-Veyv4sR3UJ44EK80aoq4GGdxh5aLmAoqgKop3fDSa-olarZV9C8IhnswHa_wLQo8rUlS1cpqjK-RWF1h6HfPM79_qWF0rKuBVmKIiAU89ncRDxzusuNpH1oXs26bSa9t7MKKqVpGqvg1n8oTLn8g773dF_uZbFsiCCNAzrab5_veYs9lfyFS3HAlokRCkvuCKRkGQpvwes1se3fxy7jRxXXGK9mzwqFnMD-lhPTPXjQAvOUUKS-g9QugqHZTDqLH_YxfNcRSNTyuFqBN-qmsI2QGMXcdAMGUuU5GM6p55jfDqoeVaC7Nd0QMsGtKkl--MoIwSX-y_Nh6poq9Zll59SVzwfG24Yu2y5aCz_meFYifEfezYC2E2qDenlqh2XyzHOgc6PyJ1Pze6NOglHIWB34vdUfHMDb_wdWVapkVUmSVAsn98azqtQwKLYmTkVm86-PMfwwnNo4vZyXiZ6g_NUY1VDF5hQiVAQ5okJMZLeAOpEY2cBZMtbExp_84aznobV1CJEVHN_PXCAihYXsUfj-2MVqvbtB2aCKR-SDSiqTXF68UC4WGithQYU1q4tO2YEvVdTUsCUsRVB8ygvjaCVpF7xw3o-ZOJELTcIqxsHONi03f8dI84A8xLvrm8UB7zsPIJhpafRURanYbLiC07gz8Gs9s4LmUAWNUNFEubsQCLpfUPimzGVxotGRX4ijJbQEwf0gLdtOl1OdJLvMkG0a-qgjUkDw-2v-SEAK9WD7TgW1dMwT1rCm6kQkZSWI9Dq23Uqol8y6fov1Jxo6mo_RLfruLsUaMXivpoSuNKMWtlEe0-bk3f5KFvSKr6ElAaVwMt8oyRJlsjms2c0LpA_t2_ODJRwYYLbLvqILHw0XlpHja5oohBLJLh6xjnLda9BM2xExgqqO3QVKENdCErNjHqMSECNunLRNnt_ICG5RwcMlXhWq1mzJHfhf1M2ikvIsRCL-hdA.LT6g9msdRd_SszieL_X2Ng',
        },
    }).then((result) => {
        id_token = result.id_token
            // console.log(id_token)
    })
    // }, 1000)

// Khai báo thư viện Encrypt
let encrypt = new JSEncrypt()

// lấy Public key
// tọa biến public để sử dụng ở function handleLogin()
var publicKey

$.ajax({
    url: 'https://7ucpp7lkyl.execute-api.ap-southeast-1.amazonaws.com/dev/get_key',
    headers: {
        accept: 'application/json',
        'access-token': 'eyJraWQiOiJXcDRGMndiQVpMa1d2WWgyNDhnYjNtUHBLRzZTdDRNcG85Tmc3U2diZ2E0PSIsImFsZyI6IlJTMjU2In0.eyJzdWIiOiI4NDE5MmJhZi05ZGYwLTRlNWItOWE3My0zZjcwMzZlZjg5OWIiLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwiaXNzIjoiaHR0cHM6XC9cL2NvZ25pdG8taWRwLmFwLXNvdXRoZWFzdC0xLmFtYXpvbmF3cy5jb21cL2FwLXNvdXRoZWFzdC0xX1FiMVE4VFBzVSIsImNvZ25pdG86dXNlcm5hbWUiOiI4NDE5MmJhZi05ZGYwLTRlNWItOWE3My0zZjcwMzZlZjg5OWIiLCJvcmlnaW5fanRpIjoiMGI3NGJmMzYtNjhhYS00YTU0LThjNjgtOTJhZGNlMzRjMDJiIiwiYXVkIjoic2lrY25laTR0MmgzbnRrcWo1ZDQ5bHR2ciIsImV2ZW50X2lkIjoiNzg1YWM2NDItODhmMi00MWEwLThiY2MtY2ZjMDBiMTBlMGEyIiwidG9rZW5fdXNlIjoiaWQiLCJhdXRoX3RpbWUiOjE2Njk2OTc4NjUsIm5hbWUiOiJWw7UgS2jhuqNpIiwiZXhwIjoxNjcwMzM3MDY4LCJpYXQiOjE2NzAyNTA2NjgsImp0aSI6ImMyOWQzY2M2LWE3M2ItNDhhZC04NDk5LTNmZTI4MTQ2NDZkNSIsImVtYWlsIjoia2hhaWR1Y2hvYUBnbWFpbC5jb20ifQ.RvG0whz88zkGJHlQ4spKlIdMG4XFOk8pklh_Le0hk4Ql4_y-7jd6H_b7hcungp5eDzLsQmIiSFjWNB83wHoNvk_xUz5NhhXuQbfrD797ve3C4tawdtt3n-h_Yq2FV9lp89R3qZr9x4a1JjkvJYKn2Z2Z-SqI7vhyzlB8cUM4V7szhgy0TqaOo4f4ZqNJ4cHAVudK8nzQtTck3S6cA-RCfIWPejaRknRQ6uZX1Ukv-kDT0NLJG-Y09x9K4BcF5_n78ppc9Z5Z9yUtRF8Nw0qvf5LQUjgnxmmjgSF5bC7nZfZ-R8ZYn-g7PPtjawi201yFLGGjWadVXP6R7PLNUdOVKw',
        'x-api-key': 'hutech_hackathon@123456',
        'Content-Type': 'application/json',
    },
    method: 'GET',
}).then((result) => {
    publicKey = result.data.key
    encrypt.setPublicKey(publicKey)
})

// Login
function handleLogin() {
    let form = document.querySelector('.form-action-login')
    form.addEventListener('submit', (e) => {
            e.preventDefault()
            let data = JSON.stringify({ username: $('#username').val(), password: $('#password').val() })
            var credential = encrypt.encrypt(data)
            $.ajax({
                    url: 'https://7ucpp7lkyl.execute-api.ap-southeast-1.amazonaws.com/dev/login',
                    headers: {
                        accept: 'application/json',
                        'access-token': id_token,
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
                })
                .then((result) => {
                    console.log(result)
                        // window.location.href = '/'
                })
                .catch((err) => {
                    console.log('Đã xảy ra lỗi!')
                })
        })
        // $.ajax({
        //     url: 'user/login',
        //     method: 'POST',
        //     data: {
        //         username: $('#username').val(),
        //         password: $('#password').val(),
        //     },
        // }).then((data) => {
        //     // setCookie('token', data.token, 1)
        //     // window.location.href = '/user/login'
        //     return data.json()
        // })
}