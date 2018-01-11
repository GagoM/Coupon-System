package main;

import java.io.IOException;
import java.io.PrintWriter;
import java.sql.SQLException;
import java.util.HashMap;

import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.springframework.boot.autoconfigure.web.ServerProperties.Session;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.SessionAttributes;

import core.Exceptions.CouponSystemException;
import core.couponSystemSingleton.ClientType;
import core.couponSystemSingleton.CouponSystem;
import core.facades.AdminFacade;
import core.facades.CompanyFacade;
import core.facades.CouponClientFacade;
import core.facades.CustomerFacade;
@Controller
public class LoginServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;
	
    public LoginServlet() {
        super();
    }

	 @RequestMapping(value="/loginservlet")
	protected void doPost( HttpServletRequest request, HttpServletResponse response,HttpSession session) throws ServletException, IOException {
		String username = request.getParameter("username");
		String pwd = request.getParameter("password");
		String clientType= request.getParameter("userType");
		System.out.println(username + " " + pwd + " " + clientType);
		CouponClientFacade facade = null;
		
		switch(clientType){
		case "Admin":
			try {
				facade = CouponSystem.getInstance().login(username, pwd, ClientType.Admin);
			} catch (SQLException | CouponSystemException e) {
				response.sendRedirect("/coupon1/loginerror/error.html");
				e.printStackTrace();
			}
			if(facade!=null){
				request.getSession().setAttribute("username",username);
				request.getSession().setAttribute(username+"facade", facade);
				request.getSession().setAttribute("authenticated", true);
				LoggerRest logger = new LoggerRest();
				String logMessage = clientType+": '" + username + "' has logged into the system";
				try {
					logger.logToFile(logMessage);
				} catch (CouponSystemException e) {
					e.printStackTrace();
				}
				response.sendRedirect("/coupon1/admin/index.html");
			}
			
		case "Company":
			try {
				facade = CouponSystem.getInstance().login(username, pwd, ClientType.Company);
			} catch (SQLException | CouponSystemException e) {
				response.sendRedirect("/coupon1/loginerror/error.html");
				e.printStackTrace();
			}
			if(facade!=null){
				request.getSession().setAttribute("username",username);
				request.getSession().setAttribute(username+"facade", facade);
				request.getSession().setAttribute("authenticated", true);
				LoggerRest logger = new LoggerRest();
				String logMessage = clientType+": '" + username + "' has logged into the system";
				try {
					logger.logToFile(logMessage);
				} catch (CouponSystemException e) {
					e.printStackTrace();
				}
				response.sendRedirect("/coupon1/company/index.html");
			}
		
		
	case "Customer":
		try {
			facade = CouponSystem.getInstance().login(username, pwd, ClientType.Customer);
		} catch (SQLException | CouponSystemException e) {
			response.sendRedirect("/coupon1/loginerror/error.html");
			e.printStackTrace();
		}
		if(facade!=null){
			request.getSession().setAttribute("username",username);
			request.getSession().setAttribute(username+"facade", facade);
			request.getSession().setAttribute("authenticated", true);
			LoggerRest logger = new LoggerRest();
			String logMessage = clientType+": '" + username + "' has logged into the system";
			try {
				logger.logToFile(logMessage);
			} catch (CouponSystemException e) {
				e.printStackTrace();
			}
			response.sendRedirect("/coupon1/customer/index.html");
		}
	}
	

	
	 }
}
