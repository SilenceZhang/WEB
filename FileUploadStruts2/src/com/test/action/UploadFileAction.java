package com.test.action;

import java.io.File;
import java.io.IOException;

import org.apache.commons.io.FileUtils;

import com.opensymphony.xwork2.ActionSupport;

public class UploadFileAction extends ActionSupport{
	private File myFile;
	private String myFileContentType;
	private String myFileName;
	private String destPath;
	
	public String execute()
	{
		destPath = "/usr/local/apache-tomcat-7.0.78/work";
		try {
			System.out.println("Src File name: " + myFile);
			System.out.println("Dst File name: " + myFileName);
			File destFile = new File(destPath, myFileName);
			FileUtils.copyFile(myFile, destFile);
		} catch (IOException e) {
			// TODO: handle exception
			e.printStackTrace();
			return ERROR;
		}
		return SUCCESS;
	}

	public File getMyFile() {
		return myFile;
	}

	public void setMyFile(File myFile) {
		this.myFile = myFile;
	}

	public String getMyFileContentType() {
		return myFileContentType;
	}

	public void setMyFileContentType(String myFileContentType) {
		this.myFileContentType = myFileContentType;
	}

	public String getMyFileName() {
		return myFileName;
	}

	public void setMyFileName(String myFileName) {
		this.myFileName = myFileName;
	}

	public String getDestPath() {
		return destPath;
	}

	public void setDestPath(String destPath) {
		this.destPath = destPath;
	}

	
	
}
