// Ẩn hiện currentPass
const currentPass = document.querySelector('.current-password')
const eyeOpenCurrent = document.querySelector('.eye-open-current')
const eyeCloseCurrent = document.querySelector('.eye-close-current')

eyeOpenCurrent.addEventListener('click', function() {
    eyeOpenCurrent.classList.add('hidden')
    eyeCloseCurrent.classList.remove('hidden')
    currentPass.setAttribute('type', 'password')
})

eyeCloseCurrent.addEventListener('click', function() {
    eyeOpenCurrent.classList.remove('hidden')
    eyeCloseCurrent.classList.add('hidden')
    currentPass.setAttribute('type', 'text')
})

// Ẩn hiện newPass
const newPass = document.querySelector('.new-password')
const eyeOpenNew = document.querySelector('.eye-open-new')
const eyeCloseNew = document.querySelector('.eye-close-new')

eyeOpenNew.addEventListener('click', function() {
    eyeOpenNew.classList.add('hidden')
    eyeCloseNew.classList.remove('hidden')
    newPass.setAttribute('type', 'password')
})

eyeCloseNew.addEventListener('click', function() {
    eyeOpenNew.classList.remove('hidden')
    eyeCloseNew.classList.add('hidden')
    newPass.setAttribute('type', 'text')
})