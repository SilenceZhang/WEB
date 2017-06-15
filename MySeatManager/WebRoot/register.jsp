<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ taglib prefix="s" uri="/struts-tags"%>
<%
	String path = request.getContextPath();
	String basePath = request.getScheme() + "://" + request.getServerName() + ":" + request.getServerPort()
			+ path + "/";
%>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
<head>
<base href="<%=basePath%>">
<title>regist</title>
<script>
	function jumpToLogin() {
		document.location.href = "login.jsp";
	}
</script>
</head>

<body>
	<s:form action="register" method="post">
		<table>
			<tr>
				<td>用户<input type="text" name="user.username" /></td>
			</tr>
			<tr>
				<td>密码<input type="password" name="user.password" /></td>
			</tr>
			<tr>
				<td><input type="submit" value="注册" /></td>
				<td><input type="button" value="返回登录" onclick="jumpToLogin()" /></td>
			</tr>
		</table>
	</s:form>
</body>
</html>
