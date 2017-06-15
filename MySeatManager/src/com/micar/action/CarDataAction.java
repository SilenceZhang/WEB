package com.micar.action;

import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.struts2.interceptor.ServletRequestAware;
import org.apache.struts2.interceptor.ServletResponseAware;

import com.google.gson.Gson;
import com.micar.pojo.CarData;
import com.micar.util.UtilMsg;
import com.opensymphony.xwork2.ActionSupport;

import net.sf.json.JSONArray;

public class CarDataAction extends ActionSupport implements ServletRequestAware, ServletResponseAware {

	private HttpServletRequest request;
	private HttpServletResponse response;

	private String lat;
	private String lon;
	private String range;

	public String getLat() {
		return lat;
	}

	public void setLat(String lat) {
		this.lat = lat;
	}

	public String getLon() {
		return lon;
	}

	public void setLon(String lon) {
		this.lon = lon;
	}

	public String getRange() {
		return range;
	}

	public void setRange(String range) {
		this.range = range;
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


	@Override
	public String execute() throws Exception {
		// TODO Auto-generated method stub
		try {
			System.out.println(lat + lon + range);
			List<CarData> list = UtilMsg.getCarDataList(lat, lon, range);
			this.response.setCharacterEncoding("UTF-8");
			Gson gson = new Gson();
			String json = gson.toJson(list);
			this.response.getWriter().write(json);
		} catch (Exception e) {
			// TODO: handle exception
			e.printStackTrace();
		}
		return null;
	}
	
	
	public void getjson() throws Exception {
		try {
			List<CarData> list = UtilMsg.getCarDataList(lat, lon, range);
			this.response.setCharacterEncoding("UTF-8");
			Gson gson = new Gson();
			String json = gson.toJson(list);
			this.response.getWriter().write(json);
		} catch (Exception e) {
			// TODO: handle exception
		}

	}

}
