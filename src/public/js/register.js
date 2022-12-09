// Register
function handleRegister() {
    let form = document.querySelector('.form-action-register')
    let fullname = document.querySelector('#fullname-register').value
    let email = document.querySelector('#email-register').value
    let phone = document.querySelector('#phone-register').value
    let cmnd = document.querySelector('#cmnd-register').value

    form.addEventListener('submit', (e) => {
        e.preventDefault()

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
                // Register
                publicKey = result.data.key
                encrypt.setPublicKey(publicKey)
                let data = JSON.stringify({
                    username: $('#username-register').val(),
                    password: $('#pass-register').val(),
                })
                var credential = encrypt.encrypt(data)
                $.ajax({
                    url: 'https://7ucpp7lkyl.execute-api.ap-southeast-1.amazonaws.com/dev/register',
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
                            email: email,
                            fullName: fullname,
                            identityNumber: cmnd,
                            phone: phone,
                            key: publicKey,
                        },
                        request: {
                            requestId: 'a7ea23df-7468-439d-9b12-26eb4a760901',
                            requestTime: '1667200102200',
                        },
                    }),
                }).then((result) => {
                    if (result.response.responseMessage == 'User already exists') {
                        alert('Người dùng này đã tồn tại. Vui lòng chọn tên đăng nhập khác !')
                        window.location.href = '/user/register'
                    } else {
                        alert('Đăng ký tài khoản thành công')
                        window.location.href = '/user/login'
                    }
                })
            })
        })
    })
}