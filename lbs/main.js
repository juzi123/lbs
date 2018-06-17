! function () {
    //radio点击标志
    var trafficModeSelect = 1;
    //初始化map
    var map = new AMap.Map('container', {
        zoom: 10
    });
    //信息窗口
    var infoWindow = new AMap.InfoWindow({
        offset: new AMap.Pixel(0, -30)
    });
    //模拟当前住址，起点
    var startPoint = new AMap.LngLat(122.1, 37.1);
    //console.log(startPoint)
    //终点
    var terminalPoint;
    //var terminalPoint = new AMap.LngLat(122, 37);;
    //console.log(terminalPoint)
    //点标记，模拟选中的房屋
    var markers = [];
    positions = [
        [122.3, 37.4],
        [122.21, 37.1],
        [122.1123, 37.1223],
        [122.1212, 37.1231],
        [122.3231, 37.3211]
    ];
    //初始化点标记
    for (var i = 0; i < positions.length; i++) {
        var marker = new AMap.Marker({
            map: map,
            icon: './image/marker_green.png',
            //icon: 'http://webapi.amap.com/theme/v1.3/markers/n/mark_b' + (i + 1) + '.png',
            position: positions[i],
            offset: {x: -16, y: -32}
        });
        marker.content = '我是第' + (i + 1) + '个Marker';
        markers.push(marker);
    }
    //为点标记添加点击事件
    for (var i = 0; i < markers.length; i++) {
        //console.log(markers[i].getPosition())
        markers[i].on('click', function (e) {
            terminalPoint = new AMap.LngLat(this.getPosition().lng, this.getPosition().lat)
            // console.log(terminalPoint)
            // console.log(startPoint)
            //设置信息窗体
            infoWindow.setContent(e.target.content);
            infoWindow.open(map, e.target.getPosition());
            $('#car').unbind();
            $('#walk').unbind();
            $('#bus').unbind();
            trafficModeClicked(startPoint, terminalPoint);
            $(`.trafficMode input:nth-child(${trafficModeSelect})`).click()
        })
    }
    //map.add(marker);
    AMapUI.loadUI(['misc/PoiPicker'], function (PoiPicker) {
        var poiPicker = new PoiPicker({
            //city:'北京', //默认值为auto，即自动设定为用户ip所在城市onCityReady(callback:Function)
            input: 'pickerInput'
        });
        //初始化poiPicker
        poiPickerReady(poiPicker);
        //初始化radio
        trafficModeClicked(startPoint, terminalPoint);
        $(`.trafficMode input:nth-child(${trafficModeSelect})`).click()
    });

    function poiPickerReady(poiPicker) {
        window.poiPicker = poiPicker;
        //选取了某个POI
        poiPicker.on('poiPicked', function (poiResult) {
            //var source = poiResult.source,
            var poi = poiResult.item;
            //console.log(poi)
            startPoint = new AMap.LngLat(poi.location.lng, poi.location.lat);
            //console.log(startPoint)
            // info = {
            //     source: source,
            //     id: poi.id,
            //     name: poi.name,
            //     location: poi.location,
            //     address: poi.address
            // };
            //map.clearMap()
            $('#car').unbind();
            $('#walk').unbind();
            $('#bus').unbind();
            // map.clearMap();
            trafficModeClicked(startPoint, terminalPoint);
            $(`.trafficMode input:nth-child(${trafficModeSelect})`).click()
        });
    }

    //构造路线导航类
    var driving = new AMap.Driving({
        map: map,
        panel: "panel"
    });
    //步行导航
    var walking = new AMap.Walking({
        map: map,
        panel: "panel"
    });
    //公交导航类
    var transOptions = {
        map: map,
        panel: 'panel',
        //policy: AMap.TransferPolicy.LEAST_TIME
    };
    var transfer = new AMap.Transfer(transOptions);

    function trafficModeClicked(startPoint, terminalPoint) {
        $('#car').on('click', function (e) {
            $('#panel').html("");
            walking.clear();
            transfer.clear();
            trafficModeSelect = 1;
            // 根据起终点经纬度规划驾车导航路线
            driving.search(startPoint, terminalPoint);
        })
        $('#walk').on('click', function (e) {
            $('#panel').html("");
            driving.clear();
            transfer.clear();
            trafficModeSelect = 2;
            //根据起终点坐标规划步行路线
            walking.search(startPoint, terminalPoint);
        })
        $('#bus').on('click', function (e) {
            $('#panel').html("");
            walking.clear();
            driving.clear();
            trafficModeSelect = 3;
            //根据起、终点坐标查询公交换乘路线
            transfer.search(startPoint, terminalPoint);
            //console.log('1')
        })
        return;
    }

}.call()