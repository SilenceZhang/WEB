package com.micar.util;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;
import java.text.DecimalFormat;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import com.google.gson.Gson;
import com.google.gson.JsonArray;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
import com.micar.cache.CacheMap;
import com.micar.pojo.CarData;
import com.micar.pojo.ShopData;

public class UtilMsg {

	//common String
	public static String ROAD_HELP = "roadhelp";
	public static String HEART_BEAT = "heartbeat";
	
	// 车辆数据
	public static String CAR_DATA_URL = "http://10.20.65.204:8080/CenterData/getCarlist";
	public static String CAR_INFO_URL = "http://10.20.65.204:8080/CenterData/getCarInfo";
	// 充电桩信息
	public static String POWER_URL = "http://10.20.65.201:88/OAapp/WebObjects/OAapp.woa?mqApply=aroundCharge&pageNo=1";
	// 周边门店网点
	public static String SHOP_URL = "http://10.20.65.201:88/OAapp/WebObjects/OAapp.woa?mqApply=aroundPoi";
	public static String SHOP_LIST_URL = "http://10.20.65.204:8080/DMB/getShopByPoint";
	public static String SHOP_INFO_URL = "http://10.20.65.204:8080/DMB/getShopInfoById";
	// 根据用户ID获取用户信息
	public static String FIND_INFO_BY_ID = "http://10.20.65.200:88/OAapp/WebObjects/OAapp.woa?mqApply=app_one_touch&from=1&userId=";
	// 根据车牌号获取用户信息
	public static String FIND_INFO_BY_CAR_NO = "http://10.20.65.200:88/OAapp/WebObjects/OAapp.woa?mqApply=app_one_touch&from=1&carId=";
	// 车辆维修订单maintenance
	public static String CAR_MAINTENANCE_ORDER = "http://10.20.65.206/workdir/ernet/ernet/index.php/Shop4S/Jobs/getHrOrderByVin?stjob_car_vin=";
	// 车辆维修订单项目
	public static String CAR_MAINTENANCE_LIST = "http://10.20.65.206/workdir/ernet/ernet/index.php/Shop4S/Jobs/getHrItemAndMaterailById?stjob_order_id=";
	// 推送二网
	public static String PUSH_TO_ASSIST_NETWORK = "http://10.20.65.205/workdir/ernet/ernet/index.php/Shop4S/Customers/getLujiuInfomation";

	/////////////////////////////////////////////
	// 网络请求
	public static String getResponseFromURL(String urlPath) throws Exception {
		StringBuffer sbf = new StringBuffer();
		BufferedReader reader = null;
		HttpURLConnection uc = null;
		try {
			URL url = new URL(urlPath);
			uc = (HttpURLConnection) url.openConnection();
			uc.setDoOutput(true);
			uc.setDoInput(true);
			uc.setRequestMethod("POST");
			uc.connect();
			reader = new BufferedReader(new InputStreamReader(uc.getInputStream(), "UTF-8"));
			String line;
			while ((line = reader.readLine()) != null) {
				sbf.append(line);
			}
		} catch (Exception e) {
		} finally {
			try {
				reader.close();
				uc.disconnect();
			} catch (Exception e2) {
			}
		}
		return sbf.toString();
	}

	/**
	 * Get information about surrounding vehicles
	 * 
	 * @param lat
	 * @param lon
	 * @param range
	 * @return
	 */
	public static List<CarData> getCarDataList(String lat, String lon, String range) {
		String url = CAR_DATA_URL + "?lon=" + lon + "&lat=" + lat + "&range=" + range;

		List<CarData> list = new ArrayList<CarData>();
		try {
			String json = getResponseFromURL(url);
			Gson gson = new Gson();
			JsonArray jsonArray = new JsonParser().parse(json).getAsJsonArray();
			for (int i = 0; i < jsonArray.size(); i++) {
				CarData data = gson.fromJson(jsonArray.get(i), CarData.class);
				if (System.currentTimeMillis() - Long.parseLong(data.getUptime()) > 1000 * 60 * 2) {
					// large than 2 minutes , off-line
					data.setAccStatus("1");
				} else {
					data.setAccStatus("0");
				}
				list.add(data);
			}
		} catch (Exception e) {
			// TODO: handle exception
			System.out.println(e.toString());
		}
		return list;
	}
	
	/**
	 * alert if the TVBOX is on-line
	 */
	public static boolean isTerminalOnLine(String deviceId) {
		boolean flag = false;
		try {
			Map<String, Long> map = (Map<String,Long>)CacheMap.getValueByKey(HEART_BEAT);
			Long timer = map.get(deviceId);
			if (null != timer) {
				if ( (System.currentTimeMillis() - timer) <= 30*1000) {
					flag = true;
				}
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		return flag;
	}
	
	/**
	 * get shop around
	 */
	public static List<ShopData> getShopList(String lat, String lon) {
		String url = SHOP_LIST_URL + "?lon="+lon+"&lat="+lat;
		List<ShopData> list = new ArrayList<ShopData>();
		try {
			String json = getResponseFromURL(url);
			JsonObject jo;
			JsonArray jsonArray = new JsonParser().parse(json).getAsJsonArray();
			if (jsonArray.isJsonArray()) {
				for (int i = 0; i < jsonArray.size(); i++) {
					ShopData sd = new ShopData();
					jo = jsonArray.get(i).getAsJsonObject();
					sd.setPoiId(jo.get("uuid").getAsString());    		//门店编号
					sd.setPoiNo(jo.get("shopcode").getAsString());     	//门店授权编号
					sd.setPoiName(jo.get("shopname").getAsString());   	//门店名称
					sd.setPoiMan(jo.get("linkman").getAsString());     	//门店负责人
					sd.setPoiTel(jo.get("linkphone").getAsString());    //门店联系电话
					sd.setPoiType(jo.get("shoptype").getAsString());   	//门店类型
					sd.setPoiXnode(jo.get("lat").getAsString());  		//门店维度坐标
					sd.setPoiYnode(jo.get("lon").getAsString());  		//门店经度坐标
					sd.setPoiAddr(jo.get("address").getAsString()); 	//门店地址
					sd.setDeviceid(jo.get("deviceid").getAsString()); 	//机顶盒deviceid
					sd.setSipTel(jo.get("sipphone").getAsString());    	//门店网络电话号码
					sd.setDistance(
							//保留三位小数，单位公里
							new DecimalFormat("0.000").format(jo.get("distance").getAsDouble())							
							);//距离
					sd.setOnline(isTerminalOnLine(sd.getDeviceid())); //TVBOX is on-line?
					list.add(sd);
				}
			}
		}catch (Exception e) {
			// TODO: handle exception
			e.printStackTrace();
		}
		return list;
	}
}
