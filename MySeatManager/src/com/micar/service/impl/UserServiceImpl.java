package com.micar.service.impl;

import com.micar.dao.UserDAO;
import com.micar.pojo.User;
import com.micar.service.UserService;

public class UserServiceImpl implements UserService {
	// 注入DAO，生成GET SET 方法
	private UserDAO userdao;

	public UserDAO getUserdao() {
		return userdao;
	}

	public void setUserdao(UserDAO userdao) {
		this.userdao = userdao;
	}

	@Override
	public void saveUser(User user) {
		// TODO Auto-generated method stub
		this.userdao.saveUser(user);
	}

	@Override
	public boolean findUser(User user) {
		//
		User firstuser = this.userdao.findUser(user);
		// 在UserDAO查询中已经判断了只有当用户名和密码都存在时才返回firstuser
		// 所以在这里只用判断firstuser里面用户名或者密码中的一个是否存在就可以了
		if (firstuser.getUsername() != null) {
			return true;
		} else {
			return false;
		}
	}

}
