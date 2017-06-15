package com.test.spring;

import org.springframework.context.support.AbstractApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;

public class MainApp {

	public static void main(String[] args) {
		System.out.println("1");
		AbstractApplicationContext context = new ClassPathXmlApplicationContext("Beans.xml");
		HelloWorld obj = (HelloWorld) context.getBean("helloWorld");
		System.out.println("2");
		obj.getMessage();
		System.out.println("3");
		context.registerShutdownHook();
	}
}
