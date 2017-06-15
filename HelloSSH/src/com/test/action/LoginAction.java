package com.test.action;

import com.opensymphony.xwork2.ActionSupport;

public class LoginAction extends ActionSupport {
	private String username;
	private String password;



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

	@Override
	public String execute() throws Exception {
		// TODO Auto-generated method stub
		if (username != null) {
			System.out.println(username);
		}
		if (password != null) {
			System.out.println(password);
		}
		if ("admin".equals(username) && "123".equals(password)) {
			return SUCCESS;
		}
		return LOGIN;
	}

}
