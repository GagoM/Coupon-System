package main;

import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileWriter;
import java.io.IOException;
import java.util.Date;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import core.Exceptions.CouponSystemException;
import core.facades.AdminFacade;
@CrossOrigin (origins = "*")	
@RestController
@RequestMapping("/logger")
public class LoggerRest {
	@RequestMapping(value = "logtofile", method = RequestMethod.POST, consumes = MediaType.TEXT_PLAIN_VALUE)
	public void logToFile(@RequestBody String logMessage)
			throws CouponSystemException, FileNotFoundException {
		
		File file = new File("C:/Users/Administrator/Desktop/log.txt");
		String date = new Date().toString();
		String message = "\n" + date + ":" + logMessage;
		
		if (logMessage != null) {
			try (FileWriter out = new FileWriter(file, true);){
				System.out.println(logMessage);//delete that one later
				out.write(message);
				out.flush();
				
			} catch (IOException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
		}
	}
}
