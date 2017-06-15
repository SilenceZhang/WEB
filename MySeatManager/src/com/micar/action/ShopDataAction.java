package com.micar.action;

import java.io.PrintWriter;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.struts2.interceptor.ServletRequestAware;
import org.apache.struts2.interceptor.ServletResponseAware;

import com.google.gson.Gson;
import com.micar.pojo.ShopData;
import com.micar.util.UtilMsg;
import com.opensymphony.xwork2.ActionSupport;

public class ShopDataAction extends ActionSupport implements ServletRequestAware, ServletResponseAware {

	private HttpServletResponse response;
	private HttpServletRequest request;

	private String lon;
	private String lat;

	public String getLon() {
		return lon;
	}

	public void setLon(String lon) {
		this.lon = lon;
	}

	public String getLat() {
		return lat;
	}

	public void setLat(String lat) {
		this.lat = lat;
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
		response.setContentType("text/html");
		response.setCharacterEncoding("utf-8");
		PrintWriter out = response.getWriter();

		try {
			if (null != lon && null != lat && !lon.equals("") && !lat.equals("")) {
				List<ShopData> list = UtilMsg.getShopList(lat, lon);
				Gson gson = new Gson();
				out.write(gson.toJson(list));
			} else {
				out.write("error");
			}

		} catch (Exception e) {
			// TODO: handle exception
			e.printStackTrace();
			out.write("error");
		} finally {
			out.flush();
			out.close();
		}
		return null;
	}

}
