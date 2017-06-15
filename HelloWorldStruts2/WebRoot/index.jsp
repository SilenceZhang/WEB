<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
	pageEncoding="ISO-8859-1"%>
<%@ taglib prefix="s" uri="/struts-tags"%>
<!DOCTYPE html >
<html>
<head>
<title>Hello World</title>
</head>
<body>
	<h1>Hello World From Struts2</h1>
	<form action="hello">
		<label for="name">Please enter your name</label>
		<br /> 
		<input type="text" name="name" /> 
		<input type="submit" value="Say Hello" />
	</form>
</body>
</html>