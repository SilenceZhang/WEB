package com.micar.listener;

import java.util.HashMap;
import java.util.List;

import javax.servlet.ServletContextEvent;
import javax.servlet.ServletContextListener;

import com.micar.cache.CacheMap;
import com.micar.cache.pojo.PushInfo;
import com.micar.util.UtilMsg;

//
public class ProcessListener implements ServletContextListener{

	@Override
	public void contextDestroyed(ServletContextEvent sce) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public void contextInitialized(ServletContextEvent sce) {
		// TODO Auto-generated method stub
		//路救缓存
		System.out.println("silence start create a CacheMap");
		CacheMap.setValueAndKey(UtilMsg.ROAD_HELP, new HashMap<String, List<PushInfo>>());
		//终端路救心跳
		CacheMap.setValueAndKey(UtilMsg.HEART_BEAT, new HashMap<String, Long>());
		
	}
	

}
