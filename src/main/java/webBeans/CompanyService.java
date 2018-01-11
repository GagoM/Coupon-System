package webBeans;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collection;
import java.util.List;

import javax.xml.bind.annotation.XmlRootElement;

import core.javaBeans.Company;

@XmlRootElement
public class CompanyService implements Serializable{
	private long id;
	private String compName;
	private String password;
	private String email;
	private Collection<CouponService> coupons;

	public CompanyService() {

	}

	public CompanyService(Company c){
	this.id = c.getId();
	this.compName = c.getCompName();
	this.password = c.getPassword();
	this.email = c.getEmail();
	}
	
	
	
	public Company convertToCompany(){
	Company company = new Company();
	company.setId(this.id);
	company.setCompName(this.compName);
	company.setPassword(this.password);
	company.setEmail(this.email);
	
		
		return	company;
	}
	
	public Collection<CompanyService> convertToCompaniesService(Collection<Company>companies){
		List<CompanyService>companies1 = new ArrayList<>();
		for (Company company: companies) {
			CompanyService c = new CompanyService(company);
companies1.add(c);
		}
		return companies1;
	}
	public Collection<Company> convertToCompanies(Collection<CompanyService>companies){
		List<Company>companies1 = new ArrayList<>();
		for (CompanyService company: companies) {
			Company c = new Company();
			c.setId(company.getId());
			c.setCompName(company.getCompName());
			c.setEmail(company.getEmail());
			c.setPassword(company.getPassword());
companies1.add(c);
		}
		return companies1;
	}
	
	
	
	
	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

	public String getCompName() {
		return compName;
	}

	public void setCompName(String compName) {
		this.compName = compName;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public Collection<CouponService> getCoupons() {
		return coupons;
	}

	public void setCoupons(Collection<CouponService> coupons) {
		this.coupons = coupons;
	}

	@Override
	public String toString() {
		return "Company [id=" + id + ", compName=" + compName + ", password=" + password + ", email=" + email
				+ ", coupons=" + coupons + "]";
	}

}
