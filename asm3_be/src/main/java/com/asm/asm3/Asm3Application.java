package com.asm.asm3;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.web.servlet.FilterRegistrationBean;
import org.springframework.boot.web.servlet.ServletComponentScan;
import org.springframework.context.annotation.Bean;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.filter.CorsFilter;

@SpringBootApplication
@ServletComponentScan
public class Asm3Application {

	public static void main(String[] args) {
		SpringApplication.run(Asm3Application.class, args);
	}

	@Bean
	public FilterRegistrationBean<CorsFilter> corsFilterRegistration() {
		// Configure CORS for front-end
		CorsConfiguration corsConfiguration = new CorsConfiguration();
		corsConfiguration.addAllowedOrigin("http://localhost:3000"); // fe admin
		corsConfiguration.addAllowedOrigin("http://localhost:4000"); // fe client
		corsConfiguration.addAllowedMethod("*"); // Allow all methods
		corsConfiguration.addAllowedHeader("*"); // Allow all headers
		corsConfiguration.setAllowCredentials(true);

		CorsFilter corsFilter = new CorsFilter(request -> corsConfiguration);

		FilterRegistrationBean<CorsFilter> registrationBean = new FilterRegistrationBean<>(corsFilter);
		registrationBean.addUrlPatterns("/api/*"); // Apply CORS filter to the desired URL patterns
		return registrationBean;
	}

}
