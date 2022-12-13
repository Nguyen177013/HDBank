// Thêm người nhận
function handleAddFriend() {
    let formSubmit = document.querySelector('.form-action-add-friend')
    let fullname = document.querySelector('#fullname').value
    let idAccount = document.querySelector('#idAccount').value

    formSubmit.addEventListener('submit', (e) => {
        e.preventDefault()

        refreshToken().then((value) => {
            let apiKeyXata = 'xau_NFju5b34TYFnTVeex0PP51gJ1xGDoFmG0'

            $.ajax({
                url: 'https://6151_v-kh-i-s-workspace-uh7b6d.us-east-1.xata.sh/db/HDBank:main/tables/friends/data',
                headers: {
                    Authorization: 'Bearer' + ' ' + apiKeyXata,
                    'Content-Type': 'application/json',
                },
                method: 'POST',
                data: JSON.stringify({ name: fullname, idAccount: idAccount }),
            }).then((result) => {
                alert('Thêm mới thành công')
                window.location.href = '/tranfer'
            })
        })
    })
}