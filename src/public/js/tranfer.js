// Chuyển tiền
function handleTranfer() {
    let form = document.querySelector('.form-action-tranfer')
    let idAccount = document.querySelector('.id-account').value
    let toAcct = document.querySelector('#toAcct').value
    let amount = document.querySelector('#amount').value
    let description = document.querySelector('#description').value

    form.addEventListener('submit', (e) => {
        e.preventDefault()
        refreshToken().then((value) => {
            $.ajax({
                url: 'https://7ucpp7lkyl.execute-api.ap-southeast-1.amazonaws.com/dev/transfer',
                headers: {
                    accept: 'application/json',
                    'access-token': value,
                    'x-api-key': 'hutech_hackathon@123456',
                    'Content-Type': 'application/json',
                },
                method: 'POST',
                data: JSON.stringify({
                    data: {
                        amount: amount,
                        description: description,
                        fromAcct: idAccount,
                        toAcct: toAcct,
                    },
                    request: {
                        requestId: 'a7ea23df-7468-439d-9b12-26eb4a760901',
                        requestTime: '1667200102200',
                    },
                }),
            }).then((result) => {
                if (result.response.responseMessage == 'Format message invalid, toAcct invalid') {
                    alert('Tài khoản người hưởng không tồn tại !')
                } else {
                    if (confirm('Đã chuyển khoản thành công. Bạn có muốn thực hiện giao dịch khác ?') == true) {
                        window.location.href = '/tranfer '
                    } else {
                        window.location.href = '/'
                    }
                }
                // arrClient.push(idAccount)
                // console.log(arrClient)

                // set nguoi dung tai day
            })
        })
    })
}

// Send OTP
const otpContainer = document.querySelector('.otp-container')
const mobileVerify = document.querySelector('.mobile-verify')
const boxVerify = document.querySelector('.box-verify')
const btnContinue = document.querySelector('.btn-continue')
const btnResend = document.querySelector('.btn-resend')
const btnVerify = document.querySelector('.btn-verify')
const btnBack = document.querySelector('.btn-back')
const phoneNumber = document.getElementById('phone-number')
const otpInput = document.querySelectorAll('.otp-input .input')
const containerContent = document.querySelector('.container-content')
const expireEle = document.querySelector('.expire')

// OTP
let expire = 30
let OTP
let countdown
let yourInputNumber = ''

// Handle animate
btnContinue.addEventListener('click', () => {
    otpContainer.classList.remove('go-right')
    mobileVerify.classList.remove('go-right')
    OTP = randomOTP()
    handleCountDown()
    alert(`Your OTP: ${OTP} 123`)
    console.log(OTP)
})

// back to set number screen
btnBack.addEventListener('click', () => {
    otpContainer.classList.add('go-right')
    otpContainer.classList.remove('active-box')
    mobileVerify.classList.add('go-right', 'active-box')
})

// handle OTP input
otpInput.forEach((input) => {
    input.addEventListener('keyup', (e) => {
        const element = e.target

        if (element.value.match(/\d/)) {
            yourInputNumber += element.value
            alertText('.otp-container .text-danger', '')

            if (element.nextElementSibling) {
                element.nextElementSibling.focus()
            }
        } else {
            alertText('.otp-container .text-danger', 'Enter a number in each field')
        }
    })
})

// handle verify button
btnVerify.addEventListener('click', () => {
    const icon = boxVerify.querySelector('.fas')

    if (OTP === yourInputNumber) {
        icon.classList.add('fa-check-circle')
        icon.classList.remove('fa-times-circle')
        boxVerify.querySelector('p').innerHTML = `
        Your account has been <br/> verified successfully
        <br/>
        <span class='text-muted'>Please wait while redirecting</span>
        `

        setTimeout(() => {
            window.location.href = `https://www.homiedev.com/javascript-projects-for-beginners/`
        }, 2000)
    } else {
        icon.classList.remove('fa-check-circle')
        icon.classList.add('fa-times-circle')
        boxVerify.querySelector('p').innerHTML = `
        Verification failed
        <br/>
        <span class='text-muted'>Please <span class='btn-return text-dark'>try again</span></span>
        `
    }
    boxVerify.classList.add('active')
})

// handle btn return
containerContent.addEventListener('click', (e) => {
    const element = e.target
    if (element.classList.contains('btn-return')) {
        boxVerify.classList.remove('active')

        activeStateOTP()
    }
})

// handle btn request again
btnResend.addEventListener('click', activeStateOTP)

function handleCountDown() {
    countdown = setInterval(() => {
        expire--
        if (expire === 0) {
            clearInterval(countdown)
            OTP = null
            console.log(OTP)
        }
        expireEle.textContent = expire < 10 ? '0' + expire + 's' : expire + 's'
    }, 1000)
}

function alertText(element, text) {
    document.querySelector(`${element}`).textContent = text
}

function randomOTP() {
    let random = ''
    Array.from({ length: 4 }, () => {
        random += Math.floor(Math.random() * 10).toString()
    })
    return random
}

function resetStateOTP() {
    clearInterval(countdown)
    expire = 30
    OTP = null
    yourInputNumber = ''

    otpInput.forEach((input) => {
        input.value = ''
    })
}

function formatPhoneNumber(number) {
    return number.toString().slice(0, 7) + '***'
}

function activeStateOTP() {
    resetStateOTP()

    OTP = randomOTP()
    handleCountDown()
    alert(`Your OTP: ${OTP}`)
    console.log(OTP)
}