package com.test.interceptor;

import com.opensymphony.xwork2.ActionInvocation;
import com.opensymphony.xwork2.interceptor.AbstractInterceptor;

public class MyInterceptor extends AbstractInterceptor{

	@Override
	public String intercept(ActionInvocation invocation) throws Exception {
		// TODO Auto-generated method stub
		//let us do some pre-processing
		String output = "Pre-Processing";
		System.out.println(output);
		
		//let us call action or next inetceptor
		String result = invocation.invoke();
		
		//let us do some post-processing
		output = "Post-Processiong";
		System.out.println(output);
		return result;
		
	}
	

}
