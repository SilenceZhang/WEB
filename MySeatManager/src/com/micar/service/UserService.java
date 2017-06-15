package com.micar.service;

import com.micar.pojo.User;

public interface UserService {
	public void saveUser(User user);
	
	public boolean findUser(User user);

}
