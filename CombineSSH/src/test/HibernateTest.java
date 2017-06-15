package test;

import java.util.Date;

import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.Transaction;
import org.hibernate.cfg.Configuration;

import com.test.model.User;

public class HibernateTest {

	/**
	 * @param args
	 */
	public static void main(String[] args) {
		// TODO Auto-generated method stub

		Configuration cfg = new Configuration().configure();
		SessionFactory factory = cfg.buildSessionFactory();
		Session session = factory.openSession();

		// 打开事务
		Transaction tx = session.beginTransaction();

		// 创建POJO对象

		User user = new User();
		user.setName("brues");
		user.setPassword("blog.csdn.net/bruesz");
		user.setBirthday(new Date());
		session.save(user);

		// 关闭事务
		tx.commit();

		session.close();

		System.out.println("User Inserted!");

	}

}
