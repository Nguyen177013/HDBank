// Slick Slide
$(document).ready(function() {
    $('.home-banner').slick({
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        prevArrow: `<button type='button' class='slick-prev pull-left'><ion-icon name="chevron-back-circle-outline"></ion-icon></button>`,
        nextArrow: `<button type='button' class='slick-next pull-right'><ion-icon name="chevron-forward-circle-outline"></ion-icon></button>`,
    })
})

// Get Data
let idAccount = document.querySelector('.account-des').innerHTML
let totalBalance = document.querySelector('.account-total')

refreshToken()
    .then((value) => {
        $.ajax({
            url: 'https://7ucpp7lkyl.execute-api.ap-southeast-1.amazonaws.com/dev/balance',
            headers: {
                accept: 'application/json',
                'access-token': value,
                'x-api-key': 'hutech_hackathon@123456',
                'Content-Type': 'application/json',
            },
            method: 'POST',
            data: JSON.stringify({
                data: {
                    acctNo: idAccount,
                },
                request: {
                    requestId: 'a7ea23df-7468-439d-9b12-26eb4a760901',
                    requestTime: '1667200102200',
                },
            }),
        }).then((result) => {
            // Type Number VND
            var type_value = parseInt(`${result.data.amount}`)
            type_value = type_value.toLocaleString('vi', { style: 'currency', currency: 'VND' })
            totalBalance.value = type_value
        })
    })
    .catch((error) => {
        console.log(error.message)
    })

// Copy id account
function handleCopy() {
    var copyText = document.getElementById('inputAccount')
    copyText.select()
    navigator.clipboard.writeText(copyText.value)
}

// Ẩn hiện mật khẩu
const input = document.querySelector('.input')
const eyeOpen = document.querySelector('.eye-open')
const eyeClose = document.querySelector('.eye-close')

eyeOpen.addEventListener('click', function() {
    eyeOpen.classList.add('hidden')
    eyeClose.classList.remove('hidden')
    input.setAttribute('type', 'password')
})

eyeClose.addEventListener('click', function() {
    eyeOpen.classList.remove('hidden')
    eyeClose.classList.add('hidden')
    input.setAttribute('type', 'text')
})

// Show QR Code
const wrapper = document.querySelector('.wrapper-qr')
let qrInput = wrapper.querySelector('.form input')
let generateBtn = wrapper.querySelector('.form button')
let qrImg = wrapper.querySelector('.qr-code img')
let preValue

document.addEventListener('DOMContentLoaded', function() {
    let qrValue = qrInput.value.trim()
    if (!qrValue || preValue === qrValue) return
    preValue = qrValue
    generateBtn.innerText = 'Generating QR Code...'
    qrImg.src = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${qrValue}`
    qrImg.addEventListener('load', () => {
        wrapper.classList.add('active')
        generateBtn.innerText = 'Generate QR Code'
    })
})

qrInput.addEventListener('keyup', () => {
    if (!qrInput.value.trim()) {
        wrapper.classList.remove('active')
        preValue = ''
    }
})