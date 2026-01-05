package com.cinema.app;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@SpringBootApplication(scanBasePackages = "com.cinema.app")
@EntityScan(basePackages = "com.cinema.app.model")
@EnableJpaRepositories(basePackages = "com.cinema.app.repository")
public class MovieTicketApplication {
    public static void main(String[] args) {
        SpringApplication.run(MovieTicketApplication.class, args);
    }
}
