package main;

import org.apache.log4j.Logger;

public class Log4J {
private static final Logger logger = Logger.getLogger(Log4J.class); 

	public static Logger getLogger(){
	return logger;
	}
	
	
}
