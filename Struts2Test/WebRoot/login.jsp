<%@ page language="java" pageEncoding="utf-8"%>
<%@ taglib uri="/struts-tags" prefix="s"%>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">

<head>
<title>login.jsp</title>

<meta http-equiv="pragma" content="no-cache">
<meta http-equiv="cache-control" content="no-cache">
<meta http-equiv="expires" content="0">
<meta http-equiv="keywords" content="keyword1,keyword2,keyword3">
<meta http-equiv="description" content="This is my page">
<!-- 
    <link rel="stylesheet" type="text/css" href="styles.css"> 
    -->

</head>

<body>
	<s:form name="frmLoign" action="login" method="post">
		<s:label value="系统登陆"></s:label>
		<s:textfield name="userName" label="用户名"></s:textfield>
		<s:password name="password" label="密码"></s:password>
		<s:submit value="提交"></s:submit>
	</s:form>
</body>
