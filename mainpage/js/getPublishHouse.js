//获取发布的住房信息
! function () {
    var userId = sessionStorage.getItem('userId')
    var url = "http://120.79.251.134/space/public/api/v1/house/get_public_house?user_id=" + userId;
    $.get(url,
        function (data) {
            console.log(data)
            for (var i = 0; i < data.length; i++) {
                var trow = getDataRow(data[i]);
                $("#publishTableBody").append(trow);
            }
        }, "json");

    function getDataRow(data) {
        var row = document.createElement('tr'); //创建行  

        var idCell = document.createElement('td'); //创建第一列id  
        idCell.innerHTML = data.id; //填充数据  
        row.appendChild(idCell); //加入行  ，下面类似  

        var priceCell = document.createElement('td'); //创建第二列name  
        priceCell.innerHTML = data.price;
        row.appendChild(priceCell);

        var locationCell = document.createElement('td'); //创建第三列job  
        locationCell.innerHTML = data.address;
        row.appendChild(locationCell);

        var allMessageCell = document.createElement('td'); //创建第四列，操作列
        row.appendChild(allMessageCell);
        var btnAllMes = document.createElement('input'); //创建一个input控件
        btnAllMes.setAttribute('type', 'button'); //type="button"  
        btnAllMes.setAttribute('value', '详细信息');
        btnAllMes.onclick = function () {
            
            var allMessages = {
                '标题': data.title,
                '房源id': data.id,
                '地址': data.address,
                '面积': data.capacity,
                '支付方式': data.pay_way,
                '价格': data.price,
                '房源介绍': data.introduction
            }

            var dataString = JSON.stringify(allMessages)
            confirm(dataString);
        }
        allMessageCell.appendChild(btnAllMes);

        var changeCell = document.createElement('td'); //创建第五列
        if (data.status === 0) {
            changeCell.innerHTML = '待出租';
        } else {
            changeCell.innerHTML = '已出租';
        }
        row.appendChild(changeCell);
        var btnChange = document.createElement('input');
        btnChange.setAttribute('type', 'button');
        btnChange.setAttribute('value', '修改房源状态');
        btnChange.onclick = function () {
            if (confirm("确定修改房源状态？")) {
                var changeURL = "http://120.79.251.134/space/public/api/v1/house/change_house_status?house_id=" + data.id + "&status=" + data.status;
                console.log(changeURL)
                $.get(changeURL,
                    function (data) {
                        console.log(data)
                    }, "json");
            }
        }
        changeCell.appendChild(btnChange);

        var delCell = document.createElement('td'); //创建第六列
        row.appendChild(delCell);
        var btnDel = document.createElement('input');
        btnDel.setAttribute('type', 'button');
        btnDel.setAttribute('value', '删除房源');

        //删除操作  
        btnDel.onclick = function () {
            if (confirm("确定该房源？")) {
                var deleteURL = "http://120.79.251.134/space/public/api/v1/user/delete_house_fav?userId=" + userId + "&houseId=" + data.id;
                $.get(deleteURL,
                    function (data) {
                        if (errorCode !== 0) {
                            alert('操作失败！')
                        }
                    }, "json");
            }
        }
        delCell.appendChild(btnDel);

        return row; //返回tr数据      
    }
}.call()