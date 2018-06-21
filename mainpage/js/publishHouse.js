$("#rentSubmit").click(function () {
    console.log(1)
    $.post("http://120.79.251.134/space/public/api/v1/house/add_house", 
        {
            user_id: sessionStorage.getItem('userId'),
            capacity: $('#capacityVal').val(),
            pay_way: $('#paywayVal').val(),
            price: $('#priceVal').val(),
            status: 0,
            area: $('#areaVal').val(),
            title: $('#titleVal').val(),
            longitude: $('#lngVal').val(),
            latitude: $('#latVal').val(),
            address: $('#locationVal').val(),
            introduction: $('#introductionVal').val(),
            from_time: 1525410373,
            to_time: 1525423547
        },
        function (data) {
            if(data.errorCode === 0){
                alert('发布成功');
            } else {
                alert('发布失败')
            }
        }, "json");
})