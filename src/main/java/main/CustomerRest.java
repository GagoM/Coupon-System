package main;

import java.io.FileNotFoundException;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.Collection;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.SessionAttributes;


import core.Exceptions.CouponSystemException;
import core.couponSystemSingleton.CouponSystem;
import core.daoClasses.CompanyDBDAO;
import core.facades.CompanyFacade;
import core.facades.CustomerFacade;
import core.javaBeans.Coupon;
import core.javaBeans.CouponType;
import webBeans.CouponService;
import webBeans.CustomerService;
@CrossOrigin (origins = "*")		
@RestController
@RequestMapping("/customer")
public class CustomerRest {
	 
	public CustomerFacade getCustomerFacade(HttpServletRequest request){
String username = (String) request.getSession().getAttribute("username");
CustomerFacade customerFacade = (CustomerFacade) request.getSession().getAttribute(username+"facade");

return customerFacade;
	}
	
	@RequestMapping(value="getcustomerusername", method=RequestMethod.GET,
	produces = MediaType.APPLICATION_JSON_VALUE)
	
	public CustomerService getCustomerName(HttpServletRequest request) throws CouponSystemException {

		CustomerFacade facade = getCustomerFacade(request);
		if (facade != null) {
			String compName = (String) request.getSession().getAttribute("username");

			CustomerService customerService = new CustomerService();
			customerService.setCustName(compName);
			return customerService;
		}
		return null;
	}
	
	@RequestMapping(value="/purchasecoupon", method=RequestMethod.POST,
	consumes = MediaType.APPLICATION_JSON_VALUE)
	public void purchaseCoupon(@RequestBody CouponService c,HttpServletRequest request) throws CouponSystemException {
		CustomerFacade customerFacade = getCustomerFacade(request);
		if(customerFacade!=null){
			Coupon coupon = c.convertToCoupon();
			customerFacade.purchaseCoupon(coupon);
		}
		
	}
	
	@RequestMapping(value="/getallpurchasedcoupons", method=RequestMethod.GET,
	produces = MediaType.APPLICATION_JSON_VALUE)
	public Collection<CouponService> getAllPurchasedCoupons(HttpServletRequest request) throws CouponSystemException {
		CustomerFacade customerFacade = getCustomerFacade(request);
		if(customerFacade!=null){
			Collection<Coupon>coupons = customerFacade.getAllPurchasedCoupons();
			CouponService couponService = new CouponService();
			Collection<CouponService>coupons1 = new ArrayList<>();
			coupons1 = couponService.convertToCouponsService(coupons);
			return coupons1;
			
		}
	return null;
	}
	
	@RequestMapping(value="/getallpurchasedcouponsbytype/{type}", method=RequestMethod.GET,
	produces = MediaType.APPLICATION_JSON_VALUE)
	public Collection<CouponService> getAllPurchasedCouponsByType(@PathVariable("type")CouponType type,HttpServletRequest request) throws CouponSystemException {
	
		CustomerFacade customerFacade = getCustomerFacade(request);
		if(customerFacade!=null){
			Collection<Coupon>coupons = customerFacade.getAllPurchasedCouponsByType(type);
			CouponService couponService = new CouponService();
			Collection<CouponService>coupons1 = new ArrayList<>();
			coupons1 = couponService.convertToCouponsService(coupons);
			return coupons1;
	}
	return null;
	}
	
	@RequestMapping(value="/getallpurchasedcouponsbyprice/{price}", method=RequestMethod.GET,
	produces = MediaType.APPLICATION_JSON_VALUE)
	public Collection<CouponService> getAllPurchasedCouponsByPrice(@PathVariable("price")double price,HttpServletRequest request) throws CouponSystemException {
		CustomerFacade customerFacade = getCustomerFacade(request);
		if(customerFacade!=null){
			Collection<Coupon>coupons = customerFacade.getAllPurchasedCouponsByPrice(price);
			CouponService couponService = new CouponService();
			Collection<CouponService>coupons1 = new ArrayList<>();
			coupons1 = couponService.convertToCouponsService(coupons);
			return coupons1;
	
	}
		return null;
	}
	
	@RequestMapping(value="getallcouponforcustomer", method=RequestMethod.GET,
			produces = MediaType.APPLICATION_JSON_VALUE)
			public Collection<CouponService> getAllCouponForCustomer(HttpServletRequest request) throws CouponSystemException, SQLException {
				CustomerFacade customerFacade = getCustomerFacade(request);
				if(customerFacade!=null){
					CouponService couponService = new CouponService();
					Collection<Coupon>list = new ArrayList<>();
					list = customerFacade.getAllCoupons();
					Collection<CouponService>list2 = new ArrayList<>();
					list2 = couponService.convertToCouponsService(list);
					System.out.println(list);
					System.out.println(list2);
					return list2;
				}
				return null;
			}
	
	@RequestMapping(value="/getallcouponsbytypeforcustomer/{type}", method=RequestMethod.GET,
			produces = MediaType.APPLICATION_JSON_VALUE)
			public Collection<CouponService> getAllCouponsByType(@PathVariable("type")CouponType type,HttpServletRequest request) throws CouponSystemException, SQLException {
			
				CustomerFacade customerFacade = getCustomerFacade(request);
				if(customerFacade!=null){
					Collection<Coupon>coupons = customerFacade.getAllCouponsByType(type);
					CouponService couponService = new CouponService();
					Collection<CouponService>coupons1 = new ArrayList<>();
					coupons1 = couponService.convertToCouponsService(coupons);
					return coupons1;
			}
			return null;
			}
			
			@RequestMapping(value="/getallcouponsbypriceforcustomer/{price}", method=RequestMethod.GET,
			produces = MediaType.APPLICATION_JSON_VALUE)
			public Collection<CouponService> getAllCouponsByPrice(@PathVariable("price")double price,HttpServletRequest request) throws CouponSystemException, SQLException {
				CustomerFacade customerFacade = getCustomerFacade(request);
				if(customerFacade!=null){
					Collection<Coupon>coupons = customerFacade.getAllCouponsByPrice(price);
					CouponService couponService = new CouponService();
					Collection<CouponService>coupons1 = new ArrayList<>();
					coupons1 = couponService.convertToCouponsService(coupons);
					return coupons1;
			
			}
				return null;
			}
			
			@RequestMapping(value="customerlogout", method=RequestMethod.GET,
					produces = MediaType.APPLICATION_JSON_VALUE)
			public void logout(HttpServletRequest request,HttpSession session) throws CouponSystemException, FileNotFoundException {
				CustomerFacade  customerFacade = getCustomerFacade(request);
				if(customerFacade!=null){
					String username = (String) request.getServletContext().getAttribute("username");
					LoggerRest logger = new LoggerRest();
					String logMessage = "customer:'"+ username +"' has logged out from the system";
					logger.logToFile(logMessage);
					request.getSession().removeAttribute(username);
					request.getSession().removeAttribute(username+"facade");
					request.getSession().removeAttribute("authenticated");
				}
			}

			
}
