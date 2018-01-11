package filters;

import java.io.IOException;
import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.annotation.WebFilter;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.springframework.http.HttpStatus;


@WebFilter("/SessionAuthFilter")
public class SessionAuthFilter implements Filter {

    public SessionAuthFilter() {
    }

	public void destroy() {
	}

	public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain) throws IOException, ServletException {

		HttpServletRequest servletrequest = (HttpServletRequest) request;
		HttpSession session = servletrequest.getSession();
		
		boolean authenticated = false;
		
		if (session.getAttribute("authenticated") != null) {
			authenticated = (boolean) session.getAttribute("authenticated");
		}
		
		if (authenticated) {
			chain.doFilter(request, response);
			
		} else {
			HttpServletResponse servletresponse = (HttpServletResponse) response;
			servletresponse.sendError(HttpStatus.UNAUTHORIZED.value(),"THIS REQUEST HAS BEEN BLOCKED BY AUTHENTICATION FILTER!");
			
		}
	}
	
		

	public void init(FilterConfig fConfig) throws ServletException {
	}

}
