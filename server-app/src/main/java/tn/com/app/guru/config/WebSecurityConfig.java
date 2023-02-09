package tn.com.app.guru.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.WebSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;

@Configuration
@EnableWebSecurity
@EnableGlobalMethodSecurity(prePostEnabled = true)
public class WebSecurityConfig extends WebSecurityConfigurerAdapter {

	@Override
	public void configure(WebSecurity web) throws Exception {
		web.ignoring().antMatchers("/resources/**", "/static/**", "/css/**", "/js/**", "/images/**",
				"/resources/static/**", "/css/**", "/js/**", "/img/**", "/fonts/**", "/images/**", "/scss/**",
				"/vendor/**", "/favicon.ico", "/auth/**", "/favicon.png", "/v3/api-docs/**", "/configuration/ui",
				"/configuration/security", "/swagger-ui.html", "/webjars/**", "/swagger-resources/**",
				"/swagge‌​r-ui.html", "/actuator", "/actuator/**", "/swagger-ui/**", "/validator/**", "/**",
				"/auth/login");
	}

}
