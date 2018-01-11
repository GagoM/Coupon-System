package main;

	import java.io.BufferedOutputStream;
import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.FileWriter;
import java.io.IOException;
import java.io.OutputStream;
import java.util.ArrayList;
import java.util.Collection;
import java.util.Date;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import javax.websocket.server.PathParam;

import org.apache.log4j.Logger;
import org.springframework.http.MediaType;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import webBeans.CompanyService;
import webBeans.CustomerService;
import core.Exceptions.CouponSystemException;
import core.Exceptions.UniqueNameException;
import core.couponSystemSingleton.CouponSystem;
import core.facades.AdminFacade;
import core.facades.CompanyFacade;
import core.javaBeans.Company;
import core.javaBeans.Customer;
@CrossOrigin (origins = "*")	
@RestController
@RequestMapping("/admin")
	public class AdminRest {
		public AdminFacade getAdminFacade(HttpServletRequest request) {
			String userName = (String) request.getSession().getAttribute("username");
			AdminFacade adminFacade = (AdminFacade) request.getSession().getAttribute(userName+"facade");
//			AdminFacade adminFacade = (AdminFacade) CouponSystem.getInstance().login("admin", "1234", "admin");
			return adminFacade;
		}
	
		@RequestMapping(value="/createcompany", method=RequestMethod.POST,
		consumes = MediaType.APPLICATION_JSON_VALUE)
		public void createCompany(@RequestBody CompanyService c,HttpServletRequest request) throws CouponSystemException, UniqueNameException {
			AdminFacade adminFacade = getAdminFacade(request);
			if (adminFacade != null) {
				Company company = c.convertToCompany();
				adminFacade.createCompany(company);
//				Logger logger = Log4J.getLogger();
			}
			
		}

		@RequestMapping(value="/removecompany", method=RequestMethod.DELETE,
		consumes = MediaType.APPLICATION_JSON_VALUE)
		public void removeCompany(@RequestBody CompanyService c,HttpServletRequest request) throws CouponSystemException {
			AdminFacade adminFacade = getAdminFacade(request);
			if (adminFacade != null) {
				Company company = c.convertToCompany();
				adminFacade.removeCompany(company);
			}
		}

		
		@RequestMapping(value="/updatecompany", method=RequestMethod.PUT,
		consumes = MediaType.APPLICATION_JSON_VALUE)
		public void updateCompany(@RequestBody CompanyService c, HttpServletRequest request) throws CouponSystemException {
			AdminFacade adminFacade = getAdminFacade(request);
			if (adminFacade != null) {
				Company company = c.convertToCompany();
				adminFacade.updateCompany(company);
			}
		}



		@RequestMapping(value="readcompany/{id}", method=RequestMethod.GET,
		produces = MediaType.APPLICATION_JSON_VALUE)
		
		public CompanyService readCompany(@PathVariable("id") long id,HttpServletRequest request) throws CouponSystemException {

			AdminFacade adminFacade = getAdminFacade(request);
			if (adminFacade != null) {
				Company company = adminFacade.readCompany(id);
				CompanyService companyService = new CompanyService(company);
				return companyService;
			}
			return null;
		}

		
		@RequestMapping(value="readallcompanies", method=RequestMethod.GET,
		produces = MediaType.APPLICATION_JSON_VALUE)
		public Collection<CompanyService> readAllCompanies(HttpServletRequest request) throws CouponSystemException {
			AdminFacade adminFacade = getAdminFacade(request);
			if (adminFacade != null) {
				CompanyService companyService = new CompanyService();
				Collection<Company> list = new ArrayList<>();
				list = adminFacade.readAllCompanies();
				ArrayList<CompanyService> list2 = (ArrayList<CompanyService>) companyService
						.convertToCompaniesService(list);
				return list2;
			}
			return null;
		}

		@RequestMapping(value="createcustomer", method=RequestMethod.POST,
		consumes = MediaType.APPLICATION_JSON_VALUE)
		public void createCustomer(@RequestBody CustomerService c,HttpServletRequest request) throws CouponSystemException, UniqueNameException {
			AdminFacade adminFacade = getAdminFacade(request);
			if (adminFacade != null) {
				Customer customer = c.convertToCustomer();
				adminFacade.createCustomer(customer);

			}

		}

		@RequestMapping(value="removecustomer", method=RequestMethod.DELETE,
		consumes = MediaType.APPLICATION_JSON_VALUE)
		public void removeCustomer(@RequestBody CustomerService c,HttpServletRequest request) throws CouponSystemException {
			AdminFacade adminFacade = getAdminFacade(request);
			if (adminFacade != null) {
				Customer customer = c.convertToCustomer();
				adminFacade.removeCustomer(customer);
			}
		}


		@RequestMapping(value="updatecustomer", method=RequestMethod.PUT,
		consumes = MediaType.APPLICATION_JSON_VALUE)
		public void updateCustomer(@RequestBody CustomerService c,HttpServletRequest request) throws CouponSystemException {
			AdminFacade adminFacade = getAdminFacade(request);
			if (adminFacade != null) {
				Customer customer = c.convertToCustomer();
				adminFacade.updateCustomer(customer);
			}

		}


		@RequestMapping(value="readcustomer/{id}", method=RequestMethod.GET,
		produces = MediaType.APPLICATION_JSON_VALUE)
		public CustomerService readCustomer(@PathVariable("id") long id,HttpServletRequest request) throws CouponSystemException {
			AdminFacade adminFacade = getAdminFacade(request);
			if (adminFacade != null) {
				Customer customer = adminFacade.readCustomer(id);
				CustomerService customerService = new CustomerService(customer);
				return customerService;
			}
			return null;

		}


		@RequestMapping(value="readallcustomer", method=RequestMethod.GET,
		produces = MediaType.APPLICATION_JSON_VALUE)
		public Collection<CustomerService> readAllCustomer(HttpServletRequest request) throws CouponSystemException {
			AdminFacade adminFacade = getAdminFacade(request);
			if (adminFacade != null) {
				CustomerService customerService = new CustomerService();
				Collection<Customer> list = new ArrayList<>();
				list = adminFacade.readAllCustomer();
				List<CustomerService> list2 = (List<CustomerService>) customerService.convertToCustomersService(list);
				return list2;
			}
			return null;
		}
		@RequestMapping(value="adminlogout", method=RequestMethod.GET,
				produces = MediaType.APPLICATION_JSON_VALUE)
		public void logout(HttpServletRequest request,HttpSession session) throws CouponSystemException, FileNotFoundException {
			AdminFacade adminFacade = getAdminFacade(request);
			if(adminFacade!=null){
				String username = (String) request.getSession().getAttribute("username");
				request.getSession().removeAttribute(username);
				request.getSession().removeAttribute(username+"facade");
				request.getSession().removeAttribute("authenticated");
				LoggerRest logger = new LoggerRest();
				String logMessage = "admin has logged out from the system";
				logger.logToFile(logMessage);
			}
		}


	}


