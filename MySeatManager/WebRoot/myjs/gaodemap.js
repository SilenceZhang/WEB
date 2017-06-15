/**
 * 车辆管理
 */
var hashmap = new Map(); //车辆缓存

//点聚合
var shopclus,powerclus,carclus;
var shopMarker=[],powerMarker=[],carMarker=[];

//网店聚合样式
var shopStyle = [{
	url: shopStyle1,
	size: new AMap.Size(32,32),
	offset: new AMap.Pixel(-16, -30),
	textSize:15,
	textColor:'#0000ff'
}, {
	url: shopStyle2,
	size: new AMap.Size(32, 32),
	offset: new AMap.Pixel(-16, -30),
	textSize:15,
	textColor:'#0000ff'
}, {
	url: shopStyle3,
	size: new AMap.Size(32, 32),
	offset: new AMap.Pixel(-16, -30),
	textSize:15,
	textColor:'#0000ff'
}];

//充电桩聚合样式
var powerStyle = [{
	url: powerStyle1,
	size: new AMap.Size(32, 32),
	offset: new AMap.Pixel(-16, -30),
	textSize:15,
	textColor:'#0000ff'
}, {
	url: powerStyle2,
	size: new AMap.Size(32, 32),
	offset: new AMap.Pixel(-16, -30),
	textSize:15,
	textColor:'#0000ff'
}, {
	url: powerStyle3,
	size: new AMap.Size(32, 32),
	offset: new AMap.Pixel(-16, -30),
	textSize:15,
	textColor:'#0000ff'
}];

//车辆聚合样式 
var carStyle = [{
	url: carStyle1,
	size: new AMap.Size(32, 32),
	offset: new AMap.Pixel(-16, -30),
	textSize:15,
	textColor:'#0000ff'
}, {
	url: carStyle2,
	size: new AMap.Size(32, 32),
	offset: new AMap.Pixel(-16, -30),
	textSize:15,
	textColor:'#0000ff'
}, {
	url: carStyle3,
	size: new AMap.Size(32, 32),
	offset: new AMap.Pixel(-16, -30),
	textSize:15,
	textColor:'#0000ff'
}];

//////////////////////////////////////////
var track_timer;

//高德地图map
var map = new AMap.Map("container",{
	view : new AMap.View2D({
		center: [121.48, 31.22], 
		zoom: 11
	})
});



map.addControl(new AMap.Scale());
map.addControl(new AMap.ToolBar({visible:false}));
map.addControl(new AMap.OverView({isOpen:true}));

//实时路况图层
var trafficLayer = new AMap.TileLayer.Traffic({
    zIndex: 10
});
trafficLayer.setMap(map);

var center = map.getCenter(); //获取中心位置
var zoom = map.getZoom();     //获取放大比例

//地图移动后触发
map.on('moveend',function(){
	requestPoint();
});
//地图缩放后触发
map.on('zoomend',function(){
	requestPoint();
});

//移动或者缩放地图时触发
function requestPoint(){
	center = map.getCenter();zoom = map.getZoom();
	requestShopData(); //请求网店数据
	requestPowerData();//请求充电桩数据
	if(track_timer) {
		//清理一下车辆数据定时器
		window.clearTimeout(track_timer);
	}
	requestCarData(); //请求车辆数据
}
requestPoint();

/////////////////////////////////////////
var trafficFlag = true;
var carFlag = true;
var powerFlag = true;
var shopFlag = true;
//显示路况
function openTraffic(A){
	trafficFlag = A ;
	if(A){
		trafficLayer.show();
	}else{
		trafficLayer.hide();
	}
}
//显示汽车
function openCar(A){
	carFlag = A;
	for(var i=0;i<hashmap.getKeys().length;i++){
		var key = hashmap.getKeys()[i];
		var bool = key.indexOf("car_");
		if(bool >=0){
			var mark = hashmap.get(key);
			if(A){
				mark.show();
			}else{
				mark.hide();
			}
		}
	}
}
//显示充电桩
function openPower(A){
	powerFlag = A ; 
	for(var i=0;i<hashmap.getKeys().length;i++){
		var key = hashmap.getKeys()[i];
		var bool = key.indexOf("power_");
		if(bool >=0){
			var mark = hashmap.get(key);
			if(A){
				mark.show();
				addCluster("power");
			}else{
				mark.hide(); 
				if (powerclus) {powerclus.setMap(null);}
			}
		}
	}
}
//显示网店
function openShop(A){
	shopFlag = A;
	for(var i=0;i<hashmap.getKeys().length;i++){
		var key = hashmap.getKeys()[i];
		var bool = key.indexOf("shop_");
		if(bool >=0){
			var mark = hashmap.get(key);
			if(A){
				mark.show();
				addCluster("shop");
			}else{
				mark.hide(); 
				if (shopclus) {shopclus.setMap(null);}
			}
		}
	}
}
///////////////////////////////////////////////////
//定位位置和放大比例
function setCenterMap(lat,lon,zoom){
	map.setCenter(new AMap.LngLat(lon,lat));
	map.setZoom(zoom);
	requestPoint();
}

// 添加点聚合
function addCluster(tag) {
    if(tag == "shop"){
    	if (shopclus) {shopclus.setMap(null);}
    	map.plugin(["AMap.MarkerClusterer"], function() {
    		shopclus = new AMap.MarkerClusterer(map, shopMarker,{
	    			minClusterSize:2,
	    			styles:shopStyle 
    			}
    		);
        });
    }else if(tag == "power"){
    	if (powerclus) {powerclus.setMap(null);}
    	map.plugin(["AMap.MarkerClusterer"], function() {
    		powerclus = new AMap.MarkerClusterer(map, powerMarker, {
	    			minClusterSize:2,
	    			styles:powerStyle
    			}
    		);
        });
    }else if(tag == "car"){
    	if (carclus) {carclus.setMap(null);}
    	map.plugin(["AMap.MarkerClusterer"], function() {
    		carclus = new AMap.MarkerClusterer(map, carMarker, {
	    			minClusterSize:2,
	    			styles:carStyle
    			}
    		);
        });
    }
} 

//////////////////////////////////////////////
//信息窗体
var infoWindow = new AMap.InfoWindow({
	isCustom : false,
	showShadow :true
});

/** 新建地图覆盖物信息 **/
function markerLocaMap(carId,carPoint,carPic) {
	var car = new AMap.Marker({
        map: map,
        autoRotation:true,
        offset : new AMap.Pixel(-15,-7),
        position : carPoint,
        icon: new AMap.Icon({
            size: new AMap.Size(30, 15),
            image: carPic,
            imageSize:new AMap.Size(30, 15)
        })        
    });
	car.setTitle(carId);
	car.on('click', function(e){
		var info = e.target.getExtData();
		infoWindow.setContent(info.join("<br/>"));
		infoWindow.open(map, e.target.getPosition());
	});
	return car;
}

///////////////////////////////////////////////////////////////

//请求车辆数据
function requestCarData(){
	var range = center.distance(map.getBounds().getSouthWest());
	$.ajax({
		url : basePath + "/getCarData?lat="+ center.getLat() +"&lon="+ center.getLng() +"&range=" + range, 
		type : "POST",
		async : true,
		dataType : "json",
		error : function(){
		},
		success : function(data) {
			for ( var entity in data) {
				//显示车图片判断
				var carpng = data[entity].accStatus=="0"?caron:caroff;
				//车辆编号车架号
				var carid = data[entity].vin;
				//当前坐标
				var newPoint = new AMap.LngLat(parseFloat(data[entity].lon),parseFloat(data[entity].lat));
				//获取车辆缓存对象
				var hashcar = hashmap.get("car_"+ carid);
				if(hashcar == null ){
					hashcar = markerLocaMap(carid,newPoint,carpng);
					hashmap.put("car_"+carid, hashcar);
					carMarker.push(hashcar); //添加到 点聚合
				}
				if(carFlag){
					hashcar.show();
				}else{
					hashcar.hide();
				}
				//设置car图片
				hashcar.setIcon(new AMap.Icon({
						            size: new AMap.Size(30,15),
						            image: carpng,
						            imageSize:new AMap.Size(30,15)
						        }));
				var oldPoint = hashcar.getPosition();
				if(!oldPoint.equals(newPoint)){
					//移动车辆
					var distance = Math.floor(oldPoint.distance(newPoint));
					var speed = Math.floor(0.4* distance);
					speed = speed<10 ? 5:speed;
					hashcar.moveTo(newPoint,speed);
				}				
				//气泡消息
				var info = [];
				info.push("<span style=\"font-size:10px;color:#F00\">车辆号："+ data[entity].id +"</span>");
				info.push("<span style=\"font-size:10px;color:#F00\">车架号："+ data[entity].vin +"</span>");
				info.push("<hr/><div><img style=\"float:left;width:100px;height:70px\" src="+ data[entity].image 
						+"></img><p style=\"font-size:12px;color:#00F\">车辆名称:  "+ data[entity].name);
				info.push("车牌号码:  "+  data[entity].carPlate);
				info.push("剩余电量:  " + data[entity].electricity + " %");
				info.push("续航里程:  " + data[entity].surplusDistance +" 公里");
				var acc = data[entity].accStatus=="0"?"运行":"熄火";
				info.push("使用状态: " + acc);
				var cartype = "";
				switch (data[entity].cartype) {
					case "0":cartype = "分时租赁"; break;
					case "1":cartype = "企业租赁"; break;
					case "2":cartype = "个人购买"; break;
					default:break;
				}
				info.push("车辆类型:  " + cartype);
				info.push("租赁期限:  " + data[entity].rentalDate + "</p></div> "+ 
				"<input type='button' value='查询租赁信息' onclick='openUserinfo(\""+ data[entity].id +"\");' />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"+
				"&nbsp;&nbsp;&nbsp;&nbsp;<input type='button' value='查询维修记录' onclick='openCarOrder(\""+ data[entity].vin +"\");' /> ");
				hashcar.setExtData(info);
			}
		}
	});
	track_timer = window.setTimeout("requestCarData()", 10000);
}

//请求网店信息
function requestShopData(){
	var currectPoint = wgs84togcj02(center.getLng(),center.getLat()); //高德转物理
	$.ajax({
		url : basePath + "/getShopData?lat="+ currectPoint[1] +"&lon="+ currectPoint[0], 
		type : "POST",
		async : true,
		dataType : "json",
		error : function(){
		},
		success : function(data) {
			for ( var entity in data) {
				var poiId = data[entity].poiId; //网店编号
				var p = wgs84togcj02(parseFloat(data[entity].poiYnode),
						parseFloat(data[entity].poiXnode)); //物理坐标转高德
				var newPoint = new AMap.LngLat(p[0],p[1]); //网店坐标				
				var hashop = hashmap.get("shop_"+ poiId); //获取网店缓存对象
				if(hashop == null){
					hashop = markerLocaMap(poiId,newPoint,shoppng);
					if(shopFlag){
						hashop.show();
					}else{
						hashop.hide();
					}
					//设置car图片
					hashop.setIcon(new AMap.Icon({
							            size: new AMap.Size(20, 20),
							            image: shoppng,
							            imageSize:new AMap.Size(20, 20)
							        }));
					var info = [];
					info.push("<span style=\"font-size:10px;color:#F00\">网店编号："+ data[entity].poiId +"</span>");
					info.push("<hr/><div><img style=\"float:left;width:100px;height:90px\" src="+ shoppng 
							+"></img><p style=\"font-size:12px;color:#00F\">网店名称:  "+ data[entity].poiName);
					info.push("联系电话:  " + data[entity].poiTel);
					info.push("网店地址:  " + data[entity].poiAddr);
					info.push("经营类型:  " + data[entity].poiType +" 级门店 </p></div>");
					info.push("<input type='button' value='拨打网店电话' onclick=\"callNumber('"+ data[entity].sipTel +"')\"/>");
					hashop.setExtData(info);
					hashmap.put("shop_"+poiId, hashop);
					shopMarker.push(hashop); //添加到 点聚合
				}
			}
			addCluster("shop");
		}
	});
}

//请求充电桩信息
function requestPowerData(){
	var currectPoint = bd09togcj02(center.getLng(),center.getLat());
	$.ajax({
		url : basePath + "/getPowerData?lat="+ currectPoint[1] +"&lon="+ currectPoint[0], 
		type : "POST",
		async : true,
		dataType : "json",
		error : function(){
		},
		success : function(data) {
			for ( var entity in data) {
				var chargeId = data[entity].chargeId; //充电桩编号
				var p = bd09togcj02(parseFloat(data[entity].chargeXnode),
						parseFloat(data[entity].chargeYnode)); //百度转高德
				var newPoint = new AMap.LngLat(p[0],p[1]); //充电桩坐标
				var hashPower = hashmap.get("power_"+ chargeId); //获取充电桩缓存对象
				if(hashPower == null){
					hashPower = markerLocaMap(chargeId,newPoint,powerpng);
					if(powerFlag){
						hashPower.show();
					}else{
						hashPower.hide();
					}
					//设置car图片
					hashPower.setIcon(new AMap.Icon({
							            size: new AMap.Size(16, 20),
							            image: powerpng,
							            imageSize:new AMap.Size(16, 20)
							        })
					);					
					var info = [];
					info.push("<span style=\"font-size:10px;color:#F00\">充电桩编号："+ data[entity].chargeId +"</span>");
					info.push("<hr/><div><img style=\"float:left;width:90px;height:100px\" src="+ powerpng 
							+"></img><p style=\"font-size:12px;color:#00F\">名称:  "+ data[entity].chargeName);
					info.push("电价:  " + data[entity].paid + " 元/度");
					info.push("停车费:  " + data[entity].parkingFee);
					info.push("服务费:  " + data[entity].serviceFee);
					info.push("慢充桩数:  " + data[entity].AvailAcNum);
					info.push("快充桩量:  " + data[entity].AvailDcNum);
					var typeFlag = data[entity].typeFlg=="0"?"体系内":"第三方";
					info.push("站点类型:  " + typeFlag);
					info.push("联系电话:  " + data[entity].chargePhone);
					info.push("联系地址:  " + data[entity].chargeAddr +"</p></div>");
					hashPower.setExtData(info);
					hashmap.put("power_"+chargeId, hashPower);
					powerMarker.push(hashPower); //添加到 点聚合
				}
			}
			addCluster("power");
		}
	});
}




