package main;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import core.facades.AdminFacade;
import core.facades.CompanyFacade;
import core.facades.CustomerFacade;

@CrossOrigin (origins = "*")		
@RestController
@RequestMapping("/auth")
public class AuthRest {
	
	@RequestMapping(value = "adminlogincheck", method = RequestMethod.GET)
	@ResponseBody
	public boolean adminLoginCheck(HttpServletRequest request,HttpSession session){
		String userName = (String)request.getSession().getAttribute("username");
		AdminFacade adminFacade = null;
		adminFacade = (AdminFacade)request.getSession().getAttribute(userName+"facade"); 
			if(adminFacade!=null){
				return true;
			}else{
				return false;
			}
	}
	
	@RequestMapping(value = "companylogincheck", method = RequestMethod.GET)
	@ResponseBody
	public boolean compLoginCheck(HttpServletRequest request,HttpSession session){
		String userName = (String)request.getSession().getAttribute("username");
		CompanyFacade companyFacade = null;
		companyFacade = (CompanyFacade)request.getSession().getAttribute(userName+"facade"); 
			if(companyFacade!=null){
				return true;
			}else{
				return false;
			}
	
	}
	@RequestMapping(value = "customerlogincheck", method = RequestMethod.GET)
	@ResponseBody
	public boolean customerLoginCheck(HttpServletRequest request,HttpSession session){
		String userName = (String)request.getSession().getAttribute("username");
		CustomerFacade customerFacade = null;
		customerFacade = (CustomerFacade)request.getSession().getAttribute(userName+"facade"); 
			if(customerFacade!=null){
				return true;
			}else{
				return false;
			}
	
	}
}
