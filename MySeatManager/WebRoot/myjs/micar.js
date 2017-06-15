
//定义全局变量
var globalUserid; //用户编号
var globalInfoid; //路救编号
var globalCarid;  //路救车辆编号
var globalCarVin; //路救车辆车架号
var globalLogid;  //处理日志编号
var globalShopid; //网店编号

//安排网店
function pushShop(A,B,C,D,E,F){
	globalInfoid = A;
	globalCarid  = B;
	globalCarVin = C;
	globalLogid  = D;
	globalShopid = E;
	globalUserid = F;
	if(D === "undefined"){
		$('#w1').window('open');
		$('#dg-shop').datagrid('load',{userid: globalUserid});
	}else{
		$('#w0').window('open');
		$('#panelshopinfo').panel({
			fit:true,
			border:false,
			method:'POST',
			href: basePath + "road_getShopinfo.action?shopid=" + E + "&logid=" + D 
		});
	}	
}

/** 重新指定网店 **/
function resetPushShop(){
	$('#w0').window('close');
	$('#w1').window('open');
	$('#dg-shop').datagrid('load',{userid: globalUserid});
}

//查看日志
function openlog(infoid){
	$('#w2').window('open');
	$('#dg-log').datagrid('load',{infoid:infoid});
}

//跟踪车辆
function traceCar(vin){
//	var west= document.getElementById("west");
//	west.style.display=west.style.display=="none"?"block":"none";
//	$('#layoutmain').layout('collapse','west');  //收缩面板
//	$('#layoutmain').layout('expand','west');    //展开面板
}

//查看备注
function openRemark(infoid){
	//alert(infoid);
}

//定位路救点
function openHelpPoint(lat,lon){
	setCenterMap(lat,lon,18);
} 

//保存路救日志
function saveHelplog(){
	var rows = $('#dg-shop').datagrid('getSelections');
	if(rows.length >0){
		var shopid = rows[0]["poiId"];
		var shopname = rows[0]["poiName"];
		var deviceid = rows[0]["deviceid"];
		if(deviceid != ""){
			DWREngine.setAsync(false);
			HelpinfoDAOAjax.saveHelpinfo(globalUserid,globalInfoid,shopid,shopname,deviceid,globalCarid,function(data){
				if(data){
					 alert("操作成功");
					 $('#w1').window('close');
				}else{
					 alert("操作失败");
				}
			})
			DWREngine.setAsync(true);
		}else{
			alert("该网店没有安装机顶盒");
		}
	}else{
		alert("请选择网店");
	}
}

//查看租赁信息
function openUserinfo(userid){
	$('#w3').window('open');
	$('#paneluserinfo').panel({
		fit:true,
		border:false,
		method:'POST',
		href: basePath + "road_getUserinfo.action?userid=" + userid
	});
}

//请求维修订单
function openCarOrder(carvin){
	$('#w5').window('open');
	$('#dg-order').datagrid('load',{carvin: carvin});
}

//请求维修项目
function openRepairProject(orderid){
	$('#w6').window('open');
	$('#dg-repair').datagrid('load',{orderid: orderid});
	$('#dg-orderStuff').datagrid('loadData',{total:0,rows:[]}); 
}

///////////////////////////////////////////////////////////////////
//周边网店列表
$('#dg-shop').datagrid({
	url :  basePath + "road_getShopNet.action",
	autoRowHeight:true,
	remoteSort : true,
	singleSelect : true,
	nowrap : true,
	fitColumns : true,
	striped:true,
	fit:true,
	border:false,
	rownumbers:true,
	loadMsg:"加载数据",
	columns :[[{
		field : 'poiType',
		title : '网店类型',
		width : 25,
		halign : "center"
	}, {
		field : 'poiName',
		title : '网店名称',
		width : 90,
		halign : "center"
	}, {
		field : 'poiTel',
		title : '联系电话',
		width : 55,
		align : "center",
		halign : "center"
	}, {
		field : 'online',
		title : '终端状态',
		width : 25,
		formatter:function(A){
			if(A){
				return "<font size='2' color='blue'>在线</font>" ;
			}else{
				return "<font size='2' color='red' >离线</font>" ;
			}			
		},
		align : "center",
		halign : "center"
	},{
		field : 'distance',
		title : '距离(公里)',
		width : 40,
		align : "right",
		halign : "right"
	}]]
});

$('#search-info').datagrid({
	url :  basePath + "road_getSearchInfo.action",
	autoRowHeight:true,
	remoteSort : true,
	singleSelect : true,
	nowrap : true,
	fitColumns : true,
	striped:true,
	fit:true,
	border:false,
	rownumbers:true,
	loadMsg:"加载数据",
	columns :[[{
		field : 'userId',
		title : 'userId',
		width : 25,
		halign : "center"
	}, {
		field : 'userName',
		title : 'userName',
		width : 25,
		halign : "center"
	}, {
		field : 'carYnode',
		title : 'carYnode',
		width : 25,
		halign : "center"
	}, {
		field : 'carXnode',
		title : 'carXnode',
		width : 25,
		halign : "center"
	},{
		field : 'userPhone',
		title : 'userPhone',
		width : 25,
		halign : "center"
	},{
		field : 'reqtime',
		title : 'reqtime',
		width : 25,
		halign : "center"
	}]]
});


//路救列表
$('#dg-car').datagrid({
			url:basePath + "road_getRoadHelp.action",
			autoRowHeight:true,
			remoteSort : true,
			singleSelect : true,
			nowrap : true,
			fitColumns : true,
			rownumbers:true,
			striped:true,
			loadMsg:"加载数据",
			columns : [[{
				field : 'carplate',
				title : '车辆牌号',
				width : 80
			}, {
				field : 'reqtype',
				title : '请求类型',
				width : 80
			}, {
				field : 'reqtimestr',
				title : '请求时间',
				width : 150
			}, {
				field : 'status',
				title : '请求状态',
				formatter:function(A){
					return "<font size='2' color='blue' >"+ A +"</font>" ;
				},
				width : 80
			}]],
			view : detailview,
			detailFormatter : function(rowIndex, rowData) {
				var htmlstr = "<table bgcolor='#a1e4f5'><tr>"+
						"<td width='90'><font style='font-weight:bold;' size='1' color='blue'>用户信息</font></td>" +
						"<td colspan='2' width='220'><font style='font-weight:bold;' size='1' color='blue'>车辆信息</font></td>"+
						"<td><font style='font-weight:bold;' size='1' color='blue'>操作</font></td>"+
					"</tr>"+
					"<tr>"+
						"<td><font size='1' color='red'>编号：</font><br><font size='1' color='green'>"+ rowData.uid +"</font></td>"+
						"<td width='120'><font size='1' color='red'>编号：</font><br><font size='1' color='green'>"+ rowData.carid +"</font></td>"+
						"<td><font size='1' color='red'>车牌：</font><br><font size='1' color='green'>"+ rowData.carplate +"</font></td>"+
						"<td><input type='button' onclick='pushShop(\""+
						rowData.infoid+"\",\""+rowData.carid+"\",\""+rowData.carvin+"\",\"" 
						+rowData.logid +"\",\""+ rowData.shopid +"\",\""+ rowData.uid +"\");' value='安排网店'/></td>"+
					"</tr>"+             
					"<tr>"+
						"<td><font size='1' color='red'>姓名：</font><br><font size='1' color='green'>"+ rowData.uname +"</font></td>"+
						"<td><font size='1' color='red'>车架：</font><br><font size='1' color='green'>"+ rowData.carvin +"</font></td>"+
						"<td><font size='1' color='red'>经度：</font><br><font size='1' color='green'>"+ rowData.carlon +"</font></td>"+
						"<td><input type='button' onclick='openlog(\""+ rowData.infoid +"\");' value='处理日志'/></td>"+
					"</tr>"+
					"<tr>"+
						"<td><font size='1' color='red'>电话：</font><br><font size='1' color='green'>"+ rowData.uphone +"</font></td>"+
						"<td><font size='1' color='red'>名称：</font><br><font size='1' color='green'>"+ rowData.carname +"</font></td>"+
						"<td><font size='1' color='red'>维度：</font><br><font size='1' color='green'>"+ rowData.carlat +"</font></td>"+
						"<td><input type='button' onclick='traceCar(\""+ rowData.carvin +"\");' value='定位车辆'/></td>"+
					"</tr>"+
					"<tr>"+
						"<td><input type='button' onclick='openUserinfo(\""+ rowData.uid +"\");'  value='租赁信息'/></td>"+
						"<td><font size='1' color='red'>车型：</font><br><font size='1' color='green'>"+ rowData.cartype +"</font></td>"+
						"<td><input type='button' onclick='openHelpPoint(\" "+ rowData.carlat +" \",\" "+ rowData.carlon +" \");' value='路救位置'/></td>"+
						"<td><input type='button' onclick='openRemark(\""+ rowData.infoid +"\");' value='备注信息'/></td>"+
					"</tr>"+
				"</table>";
				return htmlstr;
			}
		});

//维修订单
$('#dg-order').datagrid({
	url : basePath + "road_getCarOrder.action",
	autoRowHeight:true,
	remoteSort : true,
	singleSelect : true,
	nowrap : true,
	fitColumns : true,
	border:false,
	striped:true,
	rownumbers:true,
	loadMsg:"加载数据",
	columns :[[{
		field : 'shopid',
		title : '网店编号',
		width : 50,
		align : "center",
		halign : "center"
	},{
		field : 'shopname',
		title : '网店名称',
		width : 120,
		align : "center",
		halign : "center"
	}, {
		field : 'orderdate',
		title : '订单日期',
		width : 90,
		align : "center",
		halign : "center"
	},{
		field : 'orderid',
		title : '操作',
		width : 50,
		align : "center",
		halign : "center",
		formatter:function(A){
			return "<a onclick='openRepairProject(\""+ A +"\")' href='javascript:void(0)' >查看</a>";  
		}		
	}]]
});


//维修记录列表
$('#dg-repair').datagrid({
	url : basePath + "road_getCarRepairPoject.action",
	autoRowHeight:true,
	remoteSort : true,
	singleSelect : true,
	nowrap : true,
	fitColumns : true,
	border:false,
	striped:true,
	rownumbers:true,
	loadMsg:"加载数据",
	columns :[[{
		field : 'proid',
		title : '项目编号',
		width : 40,
		align : "center",
		halign : "center"
	}, {
		field : 'proname',
		title : '项目名称',
		width : 120,
		align : "center",
		halign : "center"
	}, {
		field : 'protype',
		title : '项目类型',
		width : 50,
		align : "center",
		halign : "center"
	},{
		field : 'prodate',
		title : '项目日期',
		width : 60,
		align : "center",
		halign : "center"
	}]],
	onSelect:function(A,B){
		$('#dg-orderStuff').datagrid("loadData",B.clList);
	}
});

//维修记录列表
$('#dg-orderStuff').datagrid({
	autoRowHeight:true,
	remoteSort : true,
	singleSelect : true,
	nowrap : true,
	fitColumns : true,
	striped:true,
	border:false,
	rownumbers:true,
	loadMsg:"加载数据",
	columns :[[{
		field : 'stuffname',
		title : '材料名称',
		width : 80,
		align : "center",
		halign : "center"
	}, {
		field : 'stuffmodel',
		title : '材料型号',
		width : 100,
		align : "center",
		halign : "center"
	}, {
		field : 'stuffnum',
		title : '使用数量',
		width : 40,
		align : "center",
		halign : "center"
	}]]
});

//门店处理日志
$('#dg-log').datagrid({
	url : basePath + "road_getShopLog.action",
	autoRowHeight:true,
	remoteSort : true,
	singleSelect : true,
	nowrap : true,
	fitColumns : true,
	striped:true,
	border:false,
	rownumbers:true,
	loadMsg:"加载数据",
	columns :[[{
		field : 'shopname',
		title : '网店名称',
		width : 100,
		align : "center",
		halign : "center"
	}, {
		field : 'status',
		title : '处理状态',
		width : 60,
		align : "center",
		halign : "center"
	}, {
		field : 'times',
		title : '处理时间',
		width : 80,
		align : "center",
		halign : "center"
	},{
		field : 'workid',
		title : '业务编号',
		width : 60,
		align : "center",
		halign : "center"
	}, {
		field : 'remark',
		title : '备注信息',
		width : 40,
		align : "center",
		halign : "center"
	}]]
});

/////////////////////////////////////////////////////////////

//获取cookie
function getCookie(){
	var text = document.cookie;
	alert(text);
	if(text == ""){
		text = new Date().getTime();
		setCookie(text);
	}	
	return text;
}

//设置cookie
function setCookie(A){
	var exp = new Date(); 
	exp.setTime(exp.getTime() + 7*24*60*60*1000);
	document.cookie = A + ";expires=" + exp.toGMTString();
}








