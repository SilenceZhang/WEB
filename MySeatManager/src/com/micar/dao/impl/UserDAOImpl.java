package com.micar.dao.impl;

import java.util.List;

import org.springframework.orm.hibernate4.support.HibernateDaoSupport;

import com.micar.dao.UserDAO;
import com.micar.pojo.User;

public class UserDAOImpl extends HibernateDaoSupport implements UserDAO {

	// add new user
	@Override
	public void saveUser(User user) {
		// TODO Auto-generated method stub
		if (user != null) {
			System.out.println("1");
		}
		// something wrong
		this.getHibernateTemplate().setCheckWriteOperations(false);
		this.getHibernateTemplate().save(user);

	}

	@Override
	public User findUser(User user) {
		// TODO Auto-generated method stub
		User firstuser = new User();

		String hql = "from User user where user.username='" + user.getUsername() + "' and user.password= '"
				+ user.getPassword() + "'";

		List<User> userlist = (List<User>) this.getHibernateTemplate().find(hql);

		// 判断是否有查询结果，换句话说就是判断用户是否存在
		if (userlist.size() > 0) {
			// 取出查询结果的第一个值，理论上数据库是没有重复的用户信息
			firstuser = userlist.get(0);
		}
		return firstuser;
	}
	

}
