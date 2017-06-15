package com.micar.cache;

import java.util.HashMap;
import java.util.Map;

import org.apache.commons.collections.map.HashedMap;

public class CacheMap {
	
	private static Map<String, Object> map = new HashMap<String, Object>();
	
	public static Map<String, Object> getMap() {
		return map;
	}
	
	public static Object getValueByKey(String key) {
		return map.get(key);
	}
	
	public static void setValueAndKey(String key, Object o){
		map.put(key, o);
	}
	

}
