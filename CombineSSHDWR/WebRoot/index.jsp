<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%
	String path = request.getContextPath();
	String basePath = request.getScheme() + "://" + request.getServerName() + ":" + request.getServerPort()
			+ path + "/";
%>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
<head>
<base href="<%=basePath%>">

<title>My JSP 'index.jsp' starting page</title>
<meta http-equiv="pragma" content="no-cache">
<meta http-equiv="cache-control" content="no-cache">
<meta http-equiv="expires" content="0">
<meta http-equiv="keywords" content="keyword1,keyword2,keyword3">
<meta http-equiv="description" content="This is my page">
<!--
	<link rel="stylesheet" type="text/css" href="styles.css">
	-->
<script type="text/javascript" src="/CombineSSHDWR/dwr/engine.js"></script>
<script type="text/javascript" src="/CombineSSHDWR/dwr/util.js"></script>
<script type="text/javascript" src="/CombineSSHDWR/dwr/interface/Demo.js"></script>

<script type="text/javascript">
	var mycall = function callBack(data) {
		dwr.util.setValue("demo1", data);
	}

	function showMyName() {
		Demo.getMyname(mycall);
	}

	function clearName() {
		demo1.value = "";
	}
</script>
</head>

<body>
	This is my JSP page.
	<br>

	<h1>Ajax Test Page</h1>

	<input type="button" value="显示姓名" onclick="javascript:showMyName()">

	<input type="button" value="清空" onclick="javascript:clearName()">
	<br>

	<input type="text" id="demo1">
	<br>
</body>
</html>
