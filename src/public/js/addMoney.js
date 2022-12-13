function handleAddMoney() {
    let valueCode = document.querySelector('#value-code').value
    let apiKeyXata = 'xau_NFju5b34TYFnTVeex0PP51gJ1xGDoFmG0'

    // lấy toàn bộ danh sách thẻ Card trong DB
    $.ajax({
        url: 'https://6151_v-kh-i-s-workspace-uh7b6d.us-east-1.xata.sh/db/HDBank:main/tables/cards/query',
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

        // tìm thẻ có mã code thảo điều kiện sau đó in ra giá để nhà mạng chuyển khoản trở lại
        function checkState(item) {
            if (item.codeValue == valueCode) return item
        }
        let newArr = data.find(checkState)

        // Chuyển tiền trở lại tài khoản
        let amount = newArr.price
        let idService = '004704070000178'
        let myAccount = '045704070000434'

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
                        description: 'Nhà mạng chuyển khoản',
                        fromAcct: idService,
                        toAcct: myAccount,
                    },
                    request: {
                        requestId: 'a7ea23df-7468-439d-9b12-26eb4a760901',
                        requestTime: '1667200102200',
                    },
                }),
            }).then((result) => {
                alert('Tài khoản của bạn đã được cộng ' + amount + 'đ')
                window.location.href('/')
            })
        })
    })

    // Set true for card in database
    $.ajax({
        url: 'https://6151_v-kh-i-s-workspace-uh7b6d.us-east-1.xata.sh/db/HDBank:main/tables/cards/data/' + newArr.id,
        headers: {
            Authorization: 'Bearer' + ' ' + apiKeyXata,
            'Content-Type': 'application/json',
        },
        method: 'PATCH',
        data: JSON.stringify({ price: newArr.price, codeValue: newArr.codeValue, sold: '1', state: true }),
    }).then((result) => {
        console.log(result)
    })
}