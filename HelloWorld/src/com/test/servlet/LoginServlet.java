package com.test.servlet;

import java.io.IOException;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 * Servlet implementation class LoginServlet
 */
public class LoginServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public LoginServlet() {
        super();
        // TODO Auto-generated constructor stub
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
        String username = request.getParameter("username");     
        String password = request.getParameter("password");        
          
        //服务器端打印信息  
        //System.out.println("username=" + username);  
        //System.out.println("password=" + password);  
        //设置编码格式  
        response.setContentType("text/html;charset=GB18030");  
          
        //返回html页面  
        response.getWriter().println("<html>");  
        response.getWriter().println("<head>");     
        response.getWriter().println("<title>登录信息</title>");      
        response.getWriter().println("</head>");    
        response.getWriter().println("<body>");     
        response.getWriter().println("欢迎【" + username + "】用户登录成功！！！");    
        response.getWriter().println("</body>");    
        response.getWriter().println("</html>");  
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		doGet(request, response);
	}

}
