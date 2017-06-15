package com.micar.biz;

public class UserBizImpl implements UserBiz {

	@Override
	public boolean login(String userName, String pwd) {
		// TODO Auto-generated method stub
		boolean ret = false;
		if ("admin".equals(userName) && "admin".equals(pwd)) {
			ret = true;
		}
		return ret;
	}

}
