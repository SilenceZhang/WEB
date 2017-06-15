package com.micar.json;

import java.io.IOException;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.struts2.interceptor.ServletRequestAware;
import org.apache.struts2.interceptor.ServletResponseAware;

import com.opensymphony.xwork2.ActionSupport;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

public class JSONAction extends ActionSupport implements ServletRequestAware, ServletResponseAware {

	private static final long serialVersionUID = -989477296829078690L;

	private HttpServletRequest request;
	private HttpServletResponse response;
	private String format;

	public String getFormat() {
		return format;
	}

	public void setFormat(String format) {
		this.format = format;
	}

	@Override
	public void setServletResponse(HttpServletResponse response) {
		// TODO Auto-generated method stub
		this.response = response;
	}

	@Override
	public void setServletRequest(HttpServletRequest request) {
		// TODO Auto-generated method stub
		this.request = request;
	}

	public void getjson() throws Exception {
		// TODO Auto-generated method stub

		System.out.println("1");
		JSONArray jsonArray = new JSONArray();
		JSONObject jsonObject = new JSONObject();

		jsonObject.put("id", 1);
		jsonObject.put("title", "haribote11111");
		jsonObject.put("timelength", 89);

		JSONObject jsonObject1 = new JSONObject();
		jsonObject1.put("id", 2);
		jsonObject1.put("title", "sudu");
		jsonObject1.put("timelength", 120);

		JSONObject jsonObject2 = new JSONObject();
		jsonObject2.put("id", 3);
		jsonObject2.put("title", "bianxing3");
		jsonObject2.put("timelength", 100);

		jsonArray.add(0, jsonObject);
		jsonArray.add(1, jsonObject1);
		jsonArray.add(2, jsonObject2);

		System.out.println(jsonArray.toString());
		try {
			this.response.setContentType("application/json");
			this.response.setCharacterEncoding("UTF-8");
			this.response.getWriter().write(jsonArray.toString());
		} catch (IOException e) {
			// TODO: handle exception
			e.printStackTrace();
		}

	}

}
