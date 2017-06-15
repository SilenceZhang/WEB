package com.micar.web.action;

import com.micar.biz.UserBiz;
import com.micar.biz.UserBizImpl;
import com.opensymphony.xwork2.ActionSupport;

public class LoginAction extends ActionSupport {
	private String username;
	private String password;
	
	private String message;

	private UserBiz biz = new UserBizImpl();

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	
	
	public String getMessage() {
		System.out.println("haha get message");
		return message;
	}

	public void setMessage(String message) {
		System.out.println("haha set message");
		this.message = message;
	}

	@Override
	public String execute() throws Exception {
		// TODO Auto-generated method stub

		System.out.println("login!!!!");

		boolean loginStatus = biz.login(username, password);

		if (loginStatus) {
			message = "unbelievebal it's success";
			return SUCCESS;
		} else {
			message = "sorry, it's wrong";
			return ERROR;
		}
	}

}
