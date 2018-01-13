package webBeans;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

import javax.xml.bind.annotation.XmlRootElement;

import core.javaBeans.Customer;
@XmlRootElement
public class CustomerService implements Serializable{
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	private long id;
	private String custName;
	private String password;
	private Collection<CouponService> coupons;

	public CustomerService() {
	}

	public CustomerService(Customer c){
		this.id = c.getId();
		this.custName = c.getCustName();
		this.password = c.getPassword();
	}
	
	public Customer convertToCustomer(){
		Customer customer = new Customer();
		customer.setId(this.id);
		customer.setCustName(this.custName);
		customer.setPassword(this.password);
		return	customer;
	}
	
	public Collection<CustomerService> convertToCustomersService(Collection<Customer>customers){
		List<CustomerService>customers1 = new ArrayList<>();
		for (Customer customer: customers) {
			CustomerService c = new CustomerService(customer);
customers1.add(c);
		}
		return customers1;
	}
	public Collection<Customer> convertToCustomers(Collection<CustomerService>customers){
		List<Customer>customers1 = new ArrayList<>();
		for (CustomerService customer: customers) {
			Customer c = new Customer();
c.setId(customer.getId());
c.setCustName(c.getCustName());
c.setPassword(c.getPassword());
			customers1.add(c);
		}
		return customers1;
	}
	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

	public String getCustName() {
		return custName;
	}

	public void setCustName(String custName) {
		this.custName = custName;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public Collection<CouponService> getCoupons() {
		return coupons;
	}

	public void setCoupons(Collection<CouponService> coupons) {
		this.coupons = coupons;
	}

	@Override
	public String toString() {
		return "Customer [id=" + id + ", custName=" + custName + ", password=" + password + ", coupons=" + coupons
				+ "]";
	}

}
