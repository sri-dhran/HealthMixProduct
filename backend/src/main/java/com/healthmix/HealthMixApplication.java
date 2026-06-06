package com.healthmix;

import io.github.cdimascio.dotenv.Dotenv;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class HealthMixApplication {

    public static void main(String[] args) {
        // Load variables from .env file located one directory up (in the project root)
        try {
            Dotenv dotenv = Dotenv.configure().directory("../").ignoreIfMissing().load();
            dotenv.entries().forEach(entry -> System.setProperty(entry.getKey(), entry.getValue()));
        } catch (Exception e) {
            System.out.println("No .env file found or error loading it, falling back to system environment variables.");
        }

        SpringApplication.run(HealthMixApplication.class, args);
    }

}
