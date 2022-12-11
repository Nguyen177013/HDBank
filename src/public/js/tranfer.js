// Add data modal
document.addEventListener('DOMContentLoaded', function() {
    let apiKeyXata = 'xau_NFju5b34TYFnTVeex0PP51gJ1xGDoFmG0'
    $.ajax({
        url: 'https://6151_v-kh-i-s-workspace-uh7b6d.us-east-1.xata.sh/db/HDBank:main/tables/friends/query',
        headers: {
            Authorization: 'Bearer' + ' ' + apiKeyXata,
            'Content-Type': 'application/json',
        },
        method: 'POST',
        data: JSON.stringify({
            page: { size: 10 },
        }),
    }).then((result) => {
        const arrList = result.records
        let formInfo = document.querySelector('.friend-item')
        let html = ''
        arrList.map((item) => {
            html += `
                <tr>
                    <th scope="row">
                        <span><ion-icon class="icon-eye" name="trash-outline"></ion-icon></span>
                    </th>
                    <td>${item.name}</td>
                    <td class="value-account">${item.idAccount}</td>
                    <td>
                        <span data-id='${item.id}'>
                            <ion-icon class="icon-eye item-friend" name="arrow-redo-outline"></ion-icon>
                        </span>
                    </td>
                </tr>
            `
        })

        formInfo.innerHTML = html

        let listItemID = document.querySelectorAll('.item-friend')
        let listValueAccount = document.querySelectorAll('.value-account')
        let inputToAccount = document.querySelector('.tranfer-input-to-account')
        for (let i = 0; i < listItemID.length; i++) {
            listItemID[i].addEventListener('click', function() {
                inputToAccount.value = listValueAccount[i].innerHTML
            })
        }
    })
})

// function random() {
//     let random = ''
//     Array.from({ length: 13 }, () => {
//         random += Math.floor(Math.random() * 10).toString()
//     })
//     console.log(random)
// }

// random()