package com.healthmix.config;

import com.healthmix.entity.User;
import com.healthmix.entity.Product;
import com.healthmix.repository.UserRepository;
import com.healthmix.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Component
public class DataInitializer implements CommandLineRunner {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) {
        String adminEmail = "admin@healthmix.com";
        if (userRepository.findByIdentifier(adminEmail).isEmpty()) {
            User admin = new User();
            admin.setIdentifier(adminEmail);
            admin.setPassword(passwordEncoder.encode("Admin@123"));
            admin.setVerified(true);
            admin.setRole("ADMIN");
            userRepository.save(admin);
            System.out.println("✅ Admin user created: " + adminEmail + " / Admin@123");
        } else {
            // Ensure existing admin has correct role
            User admin = userRepository.findByIdentifier(adminEmail).get();
            if (!"ADMIN".equals(admin.getRole())) {
                admin.setRole("ADMIN");
                userRepository.save(admin);
            }
            System.out.println("✅ Admin user already exists: " + adminEmail);
        }

        // Seed default products stock
        seedProduct("prod-classic", "Classic Health Mix", 500, 420);
        seedProduct("prod-kids", "Sprouted Kids Health Mix", 300, 280);
        seedProduct("prod-millet", "Multi Millet Health Mix", 250, 195);
        seedProduct("prod-protein", "Active Protein Health Mix", 150, 110);
    }

    private void seedProduct(String id, String name, Integer total, Integer available) {
        if (productRepository.findById(id).isEmpty()) {
            Product p = new Product(id, name, total, available);
            productRepository.save(p);
            System.out.println("✅ Seeded product stock: " + name);
        }
    }
}
