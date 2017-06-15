package com.micar.cache.pojo;

//PUSH TO liusaiyu 
public class PushInfo {

	private String userid; // 用户编号
	private String carid; // 车编号
	private String helptypeid; // 路救类型
	private String logid; // 记录编号

	public PushInfo() {

	}

	public PushInfo(String userid, String carid, String helptypeid, String logid) {
		this.userid = userid;
		this.carid = carid;
		this.helptypeid = helptypeid;
		this.logid = logid;
	}

	public String getUserid() {
		return userid;
	}

	public void setUserid(String userid) {
		this.userid = userid;
	}

	public String getCarid() {
		return carid;
	}

	public void setCarid(String carid) {
		this.carid = carid;
	}

	public String getHelptypeid() {
		return helptypeid;
	}

	public void setHelptypeid(String helptypeid) {
		this.helptypeid = helptypeid;
	}

	public String getLogid() {
		return logid;
	}

	public void setLogid(String logid) {
		this.logid = logid;
	}
}
