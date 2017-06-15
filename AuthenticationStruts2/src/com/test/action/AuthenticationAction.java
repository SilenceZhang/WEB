package com.test.action;

import com.opensymphony.xwork2.ActionSupport;

public class AuthenticationAction extends ActionSupport{
	
	private String name;
	private int age;
	
	@Override
	public String execute() throws Exception {
		// TODO Auto-generated method stub
		return SUCCESS;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public int getAge() {
		return age;
	}

	public void setAge(int age) {
		this.age = age;
	}
	
	@Override
	public void validate() {
		// TODO Auto-generated method stub
		if (name == null || name.trim().equals(""))
		{
			addFieldError("name", "The name is required");
		}
		if (age < 28 || age > 56)
		{
			addFieldError("age", "Age must between 28 and 56");
		}
	}
	
	

}
