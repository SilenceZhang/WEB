var hashmap = new Map(); //车辆缓存

var map = new BMap.Map("container");
scrollWheelMap(121.48, 31.22, 12); //初始化默认地图

map.addControl(new BMapLib.TrafficControl({showPanel : true}));  //实时路况
map.addControl(new BMap.NavigationControl());
map.addControl(new BMap.ScaleControl());
map.addControl(new BMap.OverviewMapControl({isOpen: true}));  
map.addControl(new BMap.MapTypeControl({offset: new BMap.Size(100, 10)})); //地图卫星三维
var myDis = new BMapLib.DistanceTool(map); //测距工具
/////////////////////////////////////////////////////////////////
//////////////////////////封装函数///////////////////////////////
/**
   初始化默认地图
**/
function scrollWheelMap(lng,lat,zoom) {
	var point = new BMap.Point(lng,lat); 
	map.centerAndZoom(point,zoom); 
	map.enableScrollWheelZoom(); 
}

/**
   showCity("上海市");
**/
function showCity(city){
	map.centerAndZoom(city);
}

/**
    showShop(['酒店','银行','加油站']);
**/
function showShop(shop){
	var bo = map.getBounds();
	var local = new BMap.LocalSearch(map, {renderOptions: {map: map, autoViewport: false}})
	local.searchInBounds(shop ,bo); 
}
/////////////////////////////////////////////////////////////////
///////////////////////////轨迹回放////////////////////////////////

var track_Points = []; 	//存储GPS点集合
var track_car;       	//汽车图标
var track_timer;     	//定时器
var track_index; 		//播放索引

function stopTimeTask(){
	if(track_timer) {
		window.clearTimeout(track_timer);  
	}
}

//轨迹
function initTrackMap(points,buffline) {
	track_index = 0;
	track_Points = points;
	
	map.clearOverlays();
	map.addOverlay(new BMap.Polyline(buffline, {strokeColor: "blue", strokeWeight: 5, strokeOpacity: 1}));
	stopTimeTask();
	map.centerAndZoom(track_Points[0][0], 14);
	//显示小车子
	track_car = markerLocaMap("",track_Points[0][0],carpng);
	map.addOverlay(track_car);
}

/** 播放轨迹 **/
function play() {	
	var track = track_Points[track_index][0];
	track_car.getLabel().setContent("经度: "+track.lng+"<br>纬度: "+track.lat); ///////
	track_car.setPosition(track);	
	//显示行车信息
	printInfo(track_Points[track_index][3],track_Points[track_index][7],track_Points[track_index][6],
			 track_Points[track_index][5],track_Points[track_index][4],track_Points[track_index][1],
			 track_Points[track_index][2],track.lng,track.lat);
	//设置汽车图片转角度
	if(track_index >0){
	    track_car.setRotation(getAngle(track_Points[track_index-1][0],track_Points[track_index][0]));		
	}	
	map.centerAndZoom(track,map.getZoom());  //	map.panTo(track);
	track_index++;
	if(track_index < track_Points.length) {
		track_timer = window.setTimeout("play("+ track_index +")", 200);
	}
}

/** 暂停 **/
function pause(){
	stopTimeTask();
}

/** 重置 **/
function reset(){
	stopTimeTask();
	track_index = 0;
	track_car.setPosition(track_Points[0][0]);
	map.panTo(track_Points[0][0]);
}

/** 获取AB连线与正北方向的角度 **/
function getAngle(pointA, pointB) {
	var dx = pointB.lng - pointA.lng;
	var dy = pointB.lat - pointA.lat;
    // 直角的边长
    var x = Math.abs(dx);
    var y = Math.abs(dy);
    // 斜边长
    var z = Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2));
    // 余弦
    var cos = y / z;
    // 弧度
    var radina = Math.acos(cos);
    // 角度
    var angle =  180 / (Math.PI / radina);

	if(dx>0 && dy<0){
		//第二象限
		angle = 180.0 - angle;
	}else if(dx<0 && dy<0){
		//第三象限
		angle = angle + 180.0;
	}else if(dx<0 && dy >0){
		//第四象限
		angle = 360.0-angle;
	}else if(dx>0 && dy==0){
		angle = 90.0 ;
	}else if(dx==0 && dy<0){
		angle = 180.0;
	}else if(dx<0 && dy==0){
		angle = 270.0;
	}
    return angle;
}

////////////////////////////////////////////////////////////////
///////////////////////////车辆位置轨迹跟踪///////////////////////////
/**
   显示车辆位置信息
**/
function markerLocaMap(carName,carPoint,carPic) {
	var label = new BMap.Label(carName, {offset: new BMap.Size(30, -40)});
	var icon = new BMap.Icon(carPic, new BMap.Size(15, 30));
	var car = new BMap.Marker(carPoint, {icon:icon});
	car.setLabel(label);
	var opts = {
		  width : 200,       // 信息窗口宽度
		  height: 100,       // 信息窗口高度
		  title : "车辆定位" 	 // 信息窗口标题
		};		
	car.addEventListener('click', function(e) {
		var info = carName + " :位置 "+ "<br/>" + 
		"纬度: " + e.point.lat + "," + "经度：" + e.point.lng + "<br/><br/>" +
		"<input type='button' onclick='readtext()' value='语音推送' />" + "&nbsp;&nbsp;&nbsp;&nbsp;" +
		"<input type='button' onclick='locatpush()' value='导航推送' />" ;
		var infoWindow = new BMap.InfoWindow(info);
		map.openInfoWindow(infoWindow,e.point);
	});
	map.addOverlay(car); 
	return car;
}
////////////////////////////////////////////////
//初始化car信息
var car ;
//循环获取数据，刷新车辆当前位置
var imei = "";
function initCarRealGuiji(){
	isCar = false;
	stopTimeTask();
	map.clearOverlays();
	car = markerLocaMap ("",new BMap.Point("0","0"),carpng);
	loopCarLoaction();
}

function loopCarLoaction(){
	$.ajax({
		url : basePath + "/getLoation",
		cache : false,
		type : "POST",
		async : false,
		dataType : "json",
		data : {
			tid:imei
		},
		error : function(){
			alert("没有行车数据");
		},
		success : function(data) {
			convertPoint(data);
		}
	});
	track_timer = window.setTimeout("loopCarLoaction()", 2000);
}

var oldpoint;
function convertPoint(data){
	var p = new BMap.Point(data.lon,data.lat);
    var bd09data = wgs84tobd09(p.lng,p.lat);
    var point = new BMap.Point(bd09data[0],bd09data[1]);
	car.getLabel().setContent("");
    car.setPosition(point);
    if(null != oldpoint){
    	car.setRotation(getAngle(oldpoint,point));
    }
    oldpoint = point;
    if(!isCar){
    	map.panTo(oldpoint);
    }
    //显示车辆信息
    printInfo(data.speed,data.f,data.l,data.u,data.alt,data.times,data.range,data.lon,data.lat);
}


/////////////////////////////////////////////////////
//设置导航
function requestCarData(){
	$.ajax({
		url : basePath + "/getCarData", 
		type : "POST",
		async : false,
		dataType : "json",
		error : function(){
			alert("error");
		},
		success : function(data) {
			for ( var entity in data) {
				//显示车图片判断
				var carpng = data[entity].isOnline == true ? caron : caroff;
				//车辆编号车架号
				var carid = data[entity].carid;
				//坐标转换 高德转百度
				var bd09data = gcj02tobd09(data[entity].lon,data[entity].lat); 
				var newPoint = new BMap.Point(bd09data[0],bd09data[1]);
				//获取车辆缓存对象
				var hashcar = hashmap.get(carid);
				if(hashcar != null ){
					var oldPoint = hashcar.getPosition();
					hashcar.getIcon().imageUrl = carpng ; //设置car图片
					hashcar.setRotation(getAngle(oldPoint,newPoint)); //转向car图片
					//移动车辆
					hashcar.setPosition(newPoint);
				}else{
					//车不存在缓存里
					hashcar = markerLocaMap("",newPoint,carpng);
					hashcar.setLabel();
					hashmap.put(data[entity].carid, hashcar);
				}
			}
		}
	});
	track_timer = window.setTimeout("requestCarData()", 8000);
}
/////////////////////////////////////////////////////

//毫秒格式化时间
function formatDate(millisecond){
	if(millisecond == 0)return "";
	var now = new Date(millisecond);
	var year = now.getFullYear();
	var month = now.getMonth() + 1;
	month = month < 10 ? "0"+month : month;
	var date = now.getDate();
	date = date < 10 ? "0"+date : date;
	var hour = now.getHours();
	hour = hour < 10 ? "0"+hour : hour;
	var minute = now.getMinutes();
	minute = minute < 10 ? "0"+minute : minute;
	var second = now.getSeconds();
	second = second < 10 ? "0"+second : second;
	return year + "-" + month + "-" + date + " " + hour + ":" + minute + ":" + second;
}

//打印行车数据
function printInfo(t_speed,t_front,t_left,t_up,t_alt,t_time,t_range,t_lon,t_lat){
	var mytime = formatDate(parseInt(t_time));
	var myrange = t_range/1000 ;
	var myspeed = (t_speed*3.6).toFixed(3);
	var info = "车速: " + myspeed + " Km/h" + "<br/>"
			+ "前后: " + t_front + "<br/>" 
			+ "左右: " + t_left + "<br/>"
			+ "上下: " + t_up + "<br/>"
			+ "海拔: " + t_alt + " 米" +"<br/>"
			+ "时间: " + mytime + "<br/>"
			+ "里程: " + myrange + " 公里" +"<br/>"
			+ "经度: " + t_lon + "<br/>"
			+ "维度: " + t_lat ;
	document.getElementById('t_info').innerHTML = info;		
}

/////////////////////////////////////
function readtext(){
	var str=prompt("请输入要推送的内容","驾驶员，我想对您说……"); 
	if(str){
		startRemoteReadText(imei,str);
	}
}

var isCar = false;
function locatpush(){
	isCar = true;
	alert("请在地图上点击行驶终点，左击鼠标选取，右击鼠标确定");
}

//设置导航
function startRemoteLocation(imei,lat,lon){
	$.ajax({
		url : basePath + "/settingLocation",
		type : "POST",
		async : false,
		dataType : "json",
		data : {
			tid:imei,
			lat:lat,
			lon:lon
		},
		error : function(){
			alert("设置失败，可能车辆没有行驶。");
		},
		success : function(data) {
			alert("设置成功");
		}
	});
}

//播报语音
function startRemoteReadText(imei,text){
	$.ajax({
		url : basePath + "/settingReadText",
		cache : false,
		type : "POST",
		async : false,
		dataType : "json",
		data : {
			tid:imei,
			text:text
		},
		error : function(){
			alert("设置失败，可能车辆没有行驶。");
		},
		success : function(data) {
			alert("设置成功");
		}
	});
}

/////////////////////////////////////////////////////////////////////////////
/////////////////////////////围栏判断是否越界/////////////////////////////////
function InPolygonMap() {
		//定位地图中心位置
		scrollWheelMap(116.402455,39.915138,18);
		var historys = [];
		historys.push(new BMap.Point(116.403722,39.915284));
		historys.push(new BMap.Point(116.40303,39.91482));
		historys.push(new BMap.Point(116.402455,39.915138));
		historys.push(new BMap.Point(116.402105,39.915464));
		historys.push(new BMap.Point(116.403308,39.915706));
		historys.push(new BMap.Point(116.405392,39.914654));

		//新建一个围栏
		var polygon = new BMap.Polygon(historys, {strokeColor: "blue", strokeWeight: 5, strokeOpacity: 0.5});			
		map.addOverlay(polygon);
		
		//添加map点击事件
		map.addEventListener('click', function(e) {
			if (e.overlay != null) {
				return;
			}
			var marker = new BMap.Marker(e.point);			
			map.addOverlay(marker);
			marker.enableDragging();//可拖动
			marker.addEventListener('click', function(e) { 						
				var isIn = rayCasting(e.point, historys);
				var result = (isIn)? '在圈里' : '不在圈内';
				alert(result);
			});
		});
	}

/**
 * @description 射线法判断点是否在多边形内部
 * @param {Object} p 待判断的点，格式：{ x: X 坐标, y: Y 坐标 }
 * @param {Array} poly 多边形顶点，数组成员的格式同 p
 * @return {String} 点 p 和多边形 poly 的几何关系
 */
function rayCasting(p, poly) {
  var px = p.lng,
      py = p.lat,
      flag = false;
  for(var i = 0, l = poly.length, j = l - 1; i < l; j = i, i++) {    
    var sx = poly[i].lng,
        sy = poly[i].lat,
        tx = poly[j].lng,
        ty = poly[j].lat;
    // 点与多边形顶点重合
    if((sx === px && sy === py) || (tx === px && ty === py)) {
      return true;
    }
    // 判断线段两端点是否在射线两侧
    if((sy < py && ty >= py) || (sy >= py && ty < py)) {
      // 线段上与射线 Y 坐标相同的点的 X 坐标
      var x = sx + (py - sy) * (tx - sx) / (ty - sy);
      // 点在多边形的边上
      if(x === px) {
        return true;
      }
      // 射线穿过多边形的边界
      if(x > px) {
        flag = !flag
      }
    }
  }
  // 射线穿过多边形边界的次数为奇数时点在多边形内
  return flag ;   
}

////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////加载围栏测试////////////////////////////////////////

///////////////////////////////////////////////
var fencePoints = [];//保存围栏节点
//画线结束时触发的事件
myDis.addEventListener("drawend", function(e) {	
});

//每次点击底图添加节点时触发的事件
myDis.addEventListener("addpoint", function(e) {
	fencePoints.push(new BMap.Point(e.point.lng,e.point.lat));
});

//点击线段上最后一个节点旁的关闭按钮时触发的事件
myDis.addEventListener("removepolyline", function(e) {		
		loadPolyLine("<b>测试画图</b>，这是我们画的围栏",fencePoints);    
});

//加载围栏
function loadPolyLine(fenceName,fencePoints){
	//创建多边形
	var secRingPolygon = new BMap.Polygon(fencePoints, {strokeColor:"blue", strokeWeight:5, strokeOpacity:0.5});
	//添加多边形到地图上
	map.addOverlay(secRingPolygon);
	//创建多边形标签
	var secRingLabel = new BMap.Label(fenceName,{offset: new BMap.Size(10,-10)});
	secRingLabel.setStyle({"z-index":"999999", "padding": "10px","width": "140px","border": "1px solid #ccff00"});   

	//当鼠标进入多边形区域时会触发此事件(鼠标进入)
	secRingPolygon.addEventListener("mouseover",function(){
		secRingPolygon.setStrokeColor("red");
		map.addOverlay(secRingLabel);
	});
	//给多边形添加鼠标"移动"事件(鼠标在内移动)
	secRingPolygon.addEventListener("mousemove",function(event){
		secRingLabel.setPosition(event.point);
	});
	//鼠标离开多边形时触发此事件(鼠标离开) 
	secRingPolygon.addEventListener("mouseout",function(){
		secRingPolygon.setStrokeColor("blue");
		map.removeOverlay(secRingLabel);
	});
	//点击多边形后会触发此事件。 
	secRingPolygon.addEventListener("click",function(){
		map.zoomIn();
		secRingPolygon.setStrokeColor("red");
	});	
}

////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////
var curr_lng ;
var curr_lat ; 
//单击地图事件
map.addEventListener("click",
	function(e){
		curr_lng = e.point.lng ; 
		curr_lat = e.point.lat ;
		console.log('坐标：',e.point.lng+";"+ e.point.lat);
	}
); 
//双击地图事件
map.addEventListener("dblclick",
	function(e){
	}
); 

// 添加右键菜单  
var contextMenu = new BMap.ContextMenu();
var txtMenuItem = [  
    {
		text: "<font size=2 color='red'>确定选择目的地</font>",  
        callback: function () {
        	if(isCar){
        		if(curr_lng != "" && curr_lat !=""){
            		var p = bd09togcj02(curr_lng,curr_lat);
            		startRemoteLocation(imei,p[1],p[0]);
            		isCar = false;
            	}else{
            		alert("请在地图上选取目的地。左击鼠标即可");
            	}
        	}else{
        		alert("请点击车辆，选择推送导航");
        	}
		}  
	}  
];  
  
// 遍历菜单items，添加进菜单  
for (var i = 0; i < txtMenuItem.length; i++) {  
    contextMenu.addItem(new BMap.MenuItem(txtMenuItem[i].text, txtMenuItem[i].callback, 100));  
    if (i == 4 || i == 6 ) {  
        contextMenu.addSeparator();  
    }  
}  
// 添加菜单到map  
map.addContextMenu(contextMenu);















