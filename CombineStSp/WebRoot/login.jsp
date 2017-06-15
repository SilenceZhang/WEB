<%@ page language="java" contentType="text/html; charset=utf-8"
	pageEncoding="utf-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<title>登录</title>
</head>
<body>
	<form action="loginPro" method="post">
		<table>
			<caption>用户登录</caption>
			<tr>
				<td>用户名：</td>
				<td><input type="text" name="username" /></td>
			</tr>
			<tr>
				<td>密码：</td>
				<td><input type="text" name="password" /></td>
			</tr>
			<tr>
				<td><input value="提交" type="submit" /></td>
				<td><input value="重置" type="reset" /></td>
			</tr>
		</table>
	</form>
</body>
</html>