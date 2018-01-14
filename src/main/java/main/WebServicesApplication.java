package main;

import javax.servlet.Filter;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.config.AutowireCapableBeanFactory;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.security.SecurityAutoConfiguration;
import org.springframework.boot.web.servlet.FilterRegistrationBean;
import org.springframework.context.annotation.Bean;
import org.springframework.security.config.annotation.web.builders.WebSecurity;

import filters.SessionAuthFilter;

@SpringBootApplication(exclude = {SecurityAutoConfiguration.class })
public class WebServicesApplication {
	private @Autowired AutowireCapableBeanFactory beanFactory;
	public static void main(String[] args) {
		SpringApplication.run(WebServicesApplication.class, args);
		
	}
	@Bean
	public FilterRegistrationBean SessionAuthenticationFilter() {
		FilterRegistrationBean filterRego = new FilterRegistrationBean();
		Filter sessionAuthFilter = new SessionAuthFilter();
		beanFactory.autowireBean(sessionAuthFilter);

		filterRego.setFilter(sessionAuthFilter);
		filterRego.addUrlPatterns("/admin/*");
		filterRego.addUrlPatterns("/company/*");
		filterRego.addUrlPatterns("/customer/*");
		filterRego.addUrlPatterns("/logger/*");
		return filterRego;
	}
	
	public void configure(WebSecurity web) throws Exception {


	}
}
