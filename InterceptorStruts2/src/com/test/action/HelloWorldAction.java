package com.test.action;

import com.opensymphony.xwork2.ActionSupport;

public class HelloWorldAction extends ActionSupport{
	private String name;
	@Override
	public String execute() throws Exception {
		// TODO Auto-generated method stub
		System.out.println("Inside action");
		return "success";
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	

}
