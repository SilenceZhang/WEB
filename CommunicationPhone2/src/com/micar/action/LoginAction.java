package com.micar.action;

import java.io.UnsupportedEncodingException;
import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.struts2.interceptor.ServletRequestAware;
import org.apache.struts2.interceptor.ServletResponseAware;

import com.opensymphony.xwork2.ActionSupport;

public class LoginAction extends ActionSupport implements ServletRequestAware, ServletResponseAware {

	private static final long serialVersionUID = 1L;

	HttpServletRequest request;
	HttpServletResponse response;

	private String username;
	private String password;

	public String getUsername() {
		System.out.println("hahah get username!!!");
		return username;
	}

	public void setUsername(String username) {
		System.out.println("hahah, you set user name");
		this.username = username;
	}

	public String getPassword() {
		System.out.println("hahah get password!!!");

		return password;
	}

	public void setPassword(String password) {
		System.out.println("hahah, you set password");
		this.password = password;
	}

	@Override
	public void setServletResponse(HttpServletResponse response) {
		// TODO Auto-generated method stub
		
		System.out.println("hahah, you set response");

		this.response = response;

	}

	@Override
	public void setServletRequest(HttpServletRequest request) {
		// TODO Auto-generated method stub
		System.out.println("hahah, you set request");

		this.request = request;

	}

	public void login() {
		try {
			System.out.println("login?????");

			this.response.setContentType("text/json;charset=utf-8");
			this.response.setCharacterEncoding("UTF-8");
			Map<String, String> json = new HashMap<String, String>();

			System.out.println(username);
			System.out.println(password);
			if ("admin".equals(username) && "admin".equals(password)) {
				json.put("message", "welcome admin login");
			} else {
				json.put("message", "unlegal login!");
			}

			byte[] jsonBytes;
			jsonBytes = json.toString().getBytes("utf-8");
			response.setContentLength(jsonBytes.length);
			response.getOutputStream().write(jsonBytes);
			response.getOutputStream().flush();
			response.getOutputStream().close();

		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}

	}

}
