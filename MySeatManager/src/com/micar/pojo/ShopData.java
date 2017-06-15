package com.micar.pojo;

public class ShopData {
	
	private String poiId; 	// 网店编号
	private String poiType; // 网店类型
	private String poiName; // 网店名称
	private String poiNo; 	// 授权编码
	private String poiMan; 	// 网店负责人
	private String poiTel; 	// 联系电话
	private String poiAddr; // 网店地址
	private String distance; // 距离
	private String poiXnode; // 坐标
	private String poiYnode; // 坐标
	private String deviceid; // 机顶盒deviceid
	private String sipTel; // 机顶盒SIP号码
	private boolean online = false; // 机顶盒是否在线
	
	public String getPoiId() {
		return poiId;
	}
	public void setPoiId(String poiId) {
		this.poiId = poiId;
	}
	public String getPoiType() {
		return poiType;
	}
	public void setPoiType(String poiType) {
		this.poiType = poiType;
	}
	public String getPoiName() {
		return poiName;
	}
	public void setPoiName(String poiName) {
		this.poiName = poiName;
	}
	public String getPoiNo() {
		return poiNo;
	}
	public void setPoiNo(String poiNo) {
		this.poiNo = poiNo;
	}
	public String getPoiMan() {
		return poiMan;
	}
	public void setPoiMan(String poiMan) {
		this.poiMan = poiMan;
	}
	public String getPoiTel() {
		return poiTel;
	}
	public void setPoiTel(String poiTel) {
		this.poiTel = poiTel;
	}
	public String getPoiAddr() {
		return poiAddr;
	}
	public void setPoiAddr(String poiAddr) {
		this.poiAddr = poiAddr;
	}
	public String getDistance() {
		return distance;
	}
	public void setDistance(String distance) {
		this.distance = distance;
	}
	public String getPoiXnode() {
		return poiXnode;
	}
	public void setPoiXnode(String poiXnode) {
		this.poiXnode = poiXnode;
	}
	public String getPoiYnode() {
		return poiYnode;
	}
	public void setPoiYnode(String poiYnode) {
		this.poiYnode = poiYnode;
	}
	public String getDeviceid() {
		return deviceid;
	}
	public void setDeviceid(String deviceid) {
		this.deviceid = deviceid;
	}
	public String getSipTel() {
		return sipTel;
	}
	public void setSipTel(String sipTel) {
		this.sipTel = sipTel;
	}
	public boolean isOnline() {
		return online;
	}
	public void setOnline(boolean online) {
		this.online = online;
	}
}
