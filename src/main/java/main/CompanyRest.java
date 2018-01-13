package main;

import java.io.FileNotFoundException;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Collection;
import java.util.Date;

import javax.servlet.http.HttpServletRequest;

import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import core.Exceptions.CouponSystemException;
import core.Exceptions.UniqueNameException;
import core.facades.CompanyFacade;
import core.javaBeans.Company;
import core.javaBeans.Coupon;
import core.javaBeans.CouponType;
import webBeans.CompanyService;
import webBeans.CouponService;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/company")
public class CompanyRest {
	public CompanyFacade getCompanyFacade(HttpServletRequest request) {
		String userName = (String) request.getSession().getAttribute("username");
		CompanyFacade companyFacade = (CompanyFacade) request.getSession().getAttribute(userName + "facade");
		return companyFacade;
	}

	@RequestMapping(value = "getcompanyusername", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)

	public CompanyService getCompanyName(HttpServletRequest request) throws CouponSystemException {

		CompanyFacade facade = getCompanyFacade(request);
		if (facade != null) {
			Company company = new Company();
			String compName = (String) request.getSession().getAttribute("username");
			company.setCompName(compName);
			CompanyService companyService = new CompanyService(company);
			System.out.println(companyService.toString());
			return companyService;
		}
		return null;
	}

	@RequestMapping(value = "/createcoupon", method = RequestMethod.POST, consumes = MediaType.APPLICATION_JSON_VALUE)
	public void createCoupon(@RequestBody CouponService c, HttpServletRequest request)
			throws CouponSystemException, UniqueNameException {
		CompanyFacade companyFacade = getCompanyFacade(request);
		if (companyFacade != null) {
			Coupon coupon = c.convertToCoupon();
			companyFacade.createCoupon(coupon);
		}

	}

	@RequestMapping(value = "/removecoupon", method = RequestMethod.DELETE, consumes = MediaType.APPLICATION_JSON_VALUE)
	public void removeCoupon(@RequestBody CouponService c, HttpServletRequest request) throws CouponSystemException {
		CompanyFacade companyFacade = getCompanyFacade(request);
		if (companyFacade != null) {
			Coupon coupon = c.convertToCoupon();
			companyFacade.removeCoupon(coupon);
		}
	}

	@RequestMapping(value = "/updatecoupon", method = RequestMethod.PUT, consumes = MediaType.APPLICATION_JSON_VALUE)
	public void updateCoupon(@RequestBody CouponService c, HttpServletRequest request) throws CouponSystemException {
		CompanyFacade companyFacade = getCompanyFacade(request);
		if (companyFacade != null) {
			Coupon coupon = c.convertToCoupon();
			companyFacade.updateCoupon(coupon);
		}

	}

	@RequestMapping(value = "readcoupon/{id}", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)

	public CouponService readCoupon(@PathVariable("id") long id, HttpServletRequest request)
			throws CouponSystemException {
		CompanyFacade companyFacade = getCompanyFacade(request);
		if (companyFacade != null) {
			Coupon coupon = companyFacade.readCoupon(id);
			CouponService couponService = new CouponService(coupon);
			return couponService;
		}
		return null;
	}

	@RequestMapping(value = "getallcoupon", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
	public Collection<CouponService> getAllCoupon(HttpServletRequest request) throws CouponSystemException {
		CompanyFacade companyFacade = getCompanyFacade(request);
		if (companyFacade != null) {
			CouponService couponService = new CouponService();
			Collection<Coupon> list = new ArrayList<>();
			list = companyFacade.getAllCoupon();
			Collection<CouponService> list2 = new ArrayList<>();
			list2 = couponService.convertToCouponsService(list);
			return list2;
		}
		return null;
	}

	@RequestMapping(value = "getcouponsbytype/{type}", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
	public Collection<CouponService> getCouponsByType(@PathVariable("type") CouponType c, HttpServletRequest request)
			throws CouponSystemException {
		CompanyFacade companyFacade = getCompanyFacade(request);
		if (companyFacade != null) {

			CouponService couponService = new CouponService();
			Collection<Coupon> list = new ArrayList<>();
			list = companyFacade.getCouponsByType(c);
			Collection<CouponService> list2 = new ArrayList<>();
			list2 = couponService.convertToCouponsService(list);
			return list2;
		}
		return null;
	}

	@RequestMapping(value = "getcouponsbyprice/{price}", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
	public Collection<CouponService> getCouponsByPrice(@PathVariable("price") double price, HttpServletRequest request)
			throws CouponSystemException {
		CompanyFacade companyFacade = getCompanyFacade(request);
		if (companyFacade != null) {
			CouponService couponService = new CouponService();
			Collection<Coupon> list = new ArrayList<>();
			list = companyFacade.getCouponsByPrice(price);
			Collection<CouponService> list2 = new ArrayList<>();
			list2 = couponService.convertToCouponsService(list);
			return list2;
		}
		return null;

	}

	@RequestMapping(value = "getcouponsbydate/{date}", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
	public Collection<CouponService> getCouponsByDate(@PathVariable("date") String date, HttpServletRequest request)
			throws CouponSystemException, ParseException {
		SimpleDateFormat newFormat = new SimpleDateFormat("yyyy-MM-dd");
		Date newDate = newFormat.parse(date);
		CompanyFacade companyFacade = getCompanyFacade(request);
		if (companyFacade != null) {
			CouponService couponService = new CouponService();
			Collection<Coupon> list = new ArrayList<>();
			list = companyFacade.getCouponsByDate(newDate);
			Collection<CouponService> list2 = new ArrayList<>();
			list2 = couponService.convertToCouponsService(list);
			return list2;
		}
		return null;
	}

	@RequestMapping(value = "getallexistingcoupons", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
	public Collection<CouponService> getAllExistingCoupons(HttpServletRequest request) throws CouponSystemException {
		CompanyFacade companyFacade = getCompanyFacade(request);
		if (companyFacade != null) {
			Collection<Coupon> coupons = new ArrayList<>();
			coupons = companyFacade.getAllExistingCoupons();
			Collection<CouponService> couponsToReturn = new ArrayList<>();
			CouponService couponService = new CouponService();
			couponsToReturn = couponService.convertToCouponsService(coupons);
			return couponsToReturn;
		}
		return null;
	}

	@RequestMapping(value = "companylogout", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
	public void logout(HttpServletRequest request) throws CouponSystemException, FileNotFoundException {
		CompanyFacade companyFacade = getCompanyFacade(request);
		if (companyFacade != null) {
			String username = (String) request.getSession().getAttribute("username");
			LoggerRest logger = new LoggerRest();
			String logMessage = "company: '" + username + "' has logged out from the system";
			logger.logToFile(logMessage);
			request.getSession().removeAttribute(username);
			request.getSession().removeAttribute(username + "facade");
			request.getSession().removeAttribute("authenticated");
		}
	}

}