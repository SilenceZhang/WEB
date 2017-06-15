package com.micar.action;

import com.micar.pojo.User;
import com.micar.service.UserService;
import com.opensymphony.xwork2.ActionSupport;

public class RegisterAction extends ActionSupport {

	private User user;
	// 注入Service,生成SET GET方法
	private UserService userservice;

	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}

	public UserService getUserservice() {
		return userservice;
	}

	public void setUserservice(UserService userservice) {
		this.userservice = userservice;
	}

	@Override
	public String execute() throws Exception {
		// TODO Auto-generated method stub
		this.userservice.saveUser(this.user);
		return SUCCESS;
	}

}
