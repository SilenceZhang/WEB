package com.test.action;

public class MyServerImpl implements MyServer {

	@Override
	public boolean valid(String username, String password) {
		// TODO Auto-generated method stub
		if (username.equals("admin") && password.equals("123")) {
			return true;
		}
		return false;
	}

}
