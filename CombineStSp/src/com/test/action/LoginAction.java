package com.test.action;

import com.opensymphony.xwork2.ActionSupport;

public class LoginAction extends ActionSupport{
    private String username;
    private String password;
    private String tip;
    private MyServer ms;

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

    public String getTip() {
        return tip;
    }

    public void setTip(String tip) {
        this.tip = tip;
    }

    public void setMs(MyServer ms) {
        this.ms = ms;
    }

    public String execute() throws Exception {
        //setMs(new MyServerImpl());
    	System.out.println(getUsername());
    	System.out.println(getPassword());
    	if (ms == null) {
    		return "error";
    	}
        if (ms.valid(getUsername(), getPassword())) {
            setTip("登录成功");
            return "success";
        } else {
            return "error";
        }
    }

}
