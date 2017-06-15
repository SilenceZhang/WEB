package com.micar.dao;

import com.micar.pojo.User;

public interface UserDAO {
	public void saveUser(User user);
	public User findUser(User user);

}
