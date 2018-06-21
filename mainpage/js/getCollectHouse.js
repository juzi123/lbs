//获取收藏的住房信息
! function () {
    var userId = sessionStorage.getItem('userId')
    var url = "http://120.79.251.134/space/public/api/v1/user/get_house_fav?userId=" + userId;
    $.get(url,
        function (data) {
            for (var i = 0; i < data.length; i++) {
                var trow = getDataRow(data[i]);
                $("#tableBody").append(trow);
            }
        }, "json");

    function getDataRow(data) {
        var row = document.createElement('tr'); //创建行  

        var idCell = document.createElement('td'); //创建第一列id  
        idCell.innerHTML = data.house_id; //填充数据  
        row.appendChild(idCell); //加入行  ，下面类似  

        var priceCell = document.createElement('td'); //创建第二列name  
        priceCell.innerHTML = data.house.price;
        row.appendChild(priceCell);

        var locationCell = document.createElement('td'); //创建第三列job  
        locationCell.innerHTML = data.house.address;
        row.appendChild(locationCell);

        var allMessageCell = document.createElement('td'); //创建第四列，操作列
        row.appendChild(allMessageCell);
        var btnAllMes = document.createElement('input'); //创建一个input控件
        btnAllMes.setAttribute('type', 'button'); //type="button"  
        btnAllMes.setAttribute('value', '详细信息');

        btnAllMes.onclick = function () {
            var allMessages = {
                '标题': data.house.title,
                '房源id': data.house_id,
                '地址': data.house.address,
                '面积': data.house.capacity,
                '支付方式': data.house.pay_way,
                '价格': data.house.price,
                '房源介绍': data.house.introduction
            }

            var dataString = JSON.stringify(allMessages)
            confirm(dataString);
        }

        allMessageCell.appendChild(btnAllMes);

        var linkCell = document.createElement('td'); //创建第五列
        row.appendChild(linkCell);
        var btnLink = document.createElement('a');
        btnLink.setAttribute('href', data.house.community_url);
        btnLink.innerHTML = "链接";
        btnLink.setAttribute('target', 'blank');
        linkCell.appendChild(btnLink);

        var delCell = document.createElement('td'); //创建第六列，操作列  
        row.appendChild(delCell);
        var btnDel = document.createElement('input');
        btnDel.setAttribute('type', 'button');
        btnDel.setAttribute('value', '取消收藏');

        //删除操作
        btnDel.onclick = function () {
            if (confirm("取消收藏该房源？")) {
                //找到按钮所在行的节点，然后删掉这一行  
                this.parentNode.parentNode.parentNode.removeChild(this.parentNode.parentNode);
                var deleteURL = "http://120.79.251.134/space/public/api/v1/user/delete_house_fav?userId=" + userId + "&houseId=" + data.house_id;
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