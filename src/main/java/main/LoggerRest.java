package main;

import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/logger")
public class LoggerRest {

	@RequestMapping(value = "logtofile", method = RequestMethod.POST, consumes = MediaType.TEXT_PLAIN_VALUE)
	public void logToFile(@RequestBody String logMessage) {

		if (logMessage != null) {
			String message = logMessage;
			Log4j2.LOG.trace(message);

		}
	}

}
