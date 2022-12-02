// Show Hide Password
var passInput = document.querySelector('.input-password')

function showHidePassword() {
    passInput.type = passInput.type === 'password' ? 'text' : 'password'
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

const url = 'https://7ucpp7lkyl.execute-api.ap-southeast-1.amazonaws.com/dev/get_key'
const options = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        'access-token': 'eyJraWQiOiJXcDRGMndiQVpMa1d2WWgyNDhnYjNtUHBLRzZTdDRNcG85Tmc3U2diZ2E0PSIsImFsZyI6IlJTMjU2In0.eyJzdWIiOiI4NDE5MmJhZi05ZGYwLTRlNWItOWE3My0zZjcwMzZlZjg5OWIiLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwiaXNzIjoiaHR0cHM6XC9cL2NvZ25pdG8taWRwLmFwLXNvdXRoZWFzdC0xLmFtYXpvbmF3cy5jb21cL2FwLXNvdXRoZWFzdC0xX1FiMVE4VFBzVSIsImNvZ25pdG86dXNlcm5hbWUiOiI4NDE5MmJhZi05ZGYwLTRlNWItOWE3My0zZjcwMzZlZjg5OWIiLCJvcmlnaW5fanRpIjoiMGI3NGJmMzYtNjhhYS00YTU0LThjNjgtOTJhZGNlMzRjMDJiIiwiYXVkIjoic2lrY25laTR0MmgzbnRrcWo1ZDQ5bHR2ciIsImV2ZW50X2lkIjoiNzg1YWM2NDItODhmMi00MWEwLThiY2MtY2ZjMDBiMTBlMGEyIiwidG9rZW5fdXNlIjoiaWQiLCJhdXRoX3RpbWUiOjE2Njk2OTc4NjUsIm5hbWUiOiJWw7UgS2jhuqNpIiwiZXhwIjoxNjY5OTk0NTIzLCJpYXQiOjE2Njk5MDgxMjMsImp0aSI6Ijk1NGFlMDMwLTgwN2EtNGY0Zi04ZjNiLWYxZTU5ZTcxZmU1MSIsImVtYWlsIjoia2hhaWR1Y2hvYUBnbWFpbC5jb20ifQ.YIqRjy_QO8wRb8b82-7x1CgoqyHDGF22jkCeXhAZu-nn2fNS6Yzg_fkBuRXlBWnFAVLXQYd7NnJBai_KbC9U5jHT8KT9XEiEC8zABv9q5tj0Du4GNDnUkOvUyRjQNkguKJeSiS22SurOFRabmNo-882IC-ZNTtjF3inMSnTJGy67EUJfBzVcexJVLVpmlBors4K0ZghFAbL9v8OdaF2zj2ioBfuF3GCHLe3SxYIgmgYdSRrHdUQ-ttJypcW_8PrA43qiKsmPoixlF1EuVdWVFrL_So5YnSlm6vGomouQdXLFEWxCxBqCx854_Pp5-z9Lhrm0j8xI3LvbrkCX4N1Mdw',
        'x-api-key': 'hutech_hackathon@123456',
    },
}
fetch(url, options)
    .then((res) => res.json())
    .then((result) => {
        let publicKey = result.data.key
        console.log(publicKey)
    })

// Login
function handleLogin() {
    console.log(123)
        // const username = document.querySelector('#username').value
        // const password = document.querySelector('#password').value
        // const form = document.querySelector('.form-action-login')
        // form.addEventListener('submit', (e) => {
        //     e.preventDefault()
        //     fetch('/user/login', {
        //             method: 'POST',
        //             body: JSON.stringify({ username: username, password: password }),
        //             headers: { 'Content-Type': 'application/json' },
        //         })
        //         .then((data) => {
        //             return data.json()
        //         })
        //         .then((data) => {
        //             if (data.token) {
        //                 setCookie('token', data.token, 1)
        //                 window.location.href = '/home'
        //             } else {
        //                 const text = document.querySelector('.text')
        //                 text.classList.remove('hidden')
        //             }
        //         })
        //         .catch((e) => console.log(e.message))
        // })
}

// Nhận sự kiện từ việc nhấn phím để thực hiện function handleLogin()
document.onkeypress = function(myEvent) {
    // console.log(myEvent.which);
    if (myEvent.which == 13) {
        handleLogin()
    }
}