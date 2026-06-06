package com.healthmix.controller;

import com.healthmix.dto.AuthRequest;
import com.healthmix.dto.VerifyRequest;
import com.healthmix.entity.User;
import com.healthmix.repository.UserRepository;
import com.healthmix.security.JwtUtil;
import com.healthmix.service.EmailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;
import java.util.Random;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private EmailService emailService;

    // 1. Send OTP (Register / Resend)
    @PostMapping("/register")
    public ResponseEntity<Map<String, String>> register(@RequestBody AuthRequest request) {
        String identifier = request.getIdentifier();
        Optional<User> optionalUser = userRepository.findByIdentifier(identifier);
        
        User user = optionalUser.orElseGet(User::new);
        user.setIdentifier(identifier);
        
        // Generate 6-digit OTP
        String otp = String.format("%06d", new Random().nextInt(999999));
        user.setCurrentOtp(otp);
        user.setOtpExpiry(LocalDateTime.now().plusMinutes(10));
        
        userRepository.save(user);

        // Check if identifier is an email and send via email
        boolean isEmail = identifier.contains("@");
        Map<String, String> response = new HashMap<>();

        if (isEmail) {
            try {
                emailService.sendOtpEmail(identifier, otp);
                response.put("message", "OTP sent to your email: " + identifier);
            } catch (Exception e) {
                System.err.println("Email sending failed: " + e.getMessage());
                // Fallback: print to console so development still works
                System.out.println("=================================================");
                System.out.println("FALLBACK OTP for " + identifier + ": " + otp);
                System.out.println("=================================================");
                response.put("error", "Failed to send OTP email. Please check your email address or try again.");
                return ResponseEntity.internalServerError().body(response);
            }
        } else {
            // Phone number — print to console (SMS integration can be added later)
            System.out.println("=================================================");
            System.out.println("PHONE OTP for " + identifier + ": " + otp);
            System.out.println("=================================================");
            response.put("message", "OTP generated for " + identifier + " (check server console for phone OTPs)");
        }

        return ResponseEntity.ok(response);
    }

    // 2. Verify OTP
    @PostMapping("/verify")
    public ResponseEntity<Map<String, String>> verifyOtp(@RequestBody VerifyRequest request) {
        Optional<User> optionalUser = userRepository.findByIdentifier(request.getIdentifier());
        Map<String, String> response = new HashMap<>();

        if (optionalUser.isEmpty()) {
            response.put("error", "User not found");
            return ResponseEntity.badRequest().body(response);
        }

        User user = optionalUser.get();
        if (user.getCurrentOtp() == null || !user.getCurrentOtp().equals(request.getOtp())) {
            response.put("error", "Invalid OTP");
            return ResponseEntity.badRequest().body(response);
        }

        if (user.getOtpExpiry().isBefore(LocalDateTime.now())) {
            response.put("error", "OTP has expired");
            return ResponseEntity.badRequest().body(response);
        }

        user.setVerified(true);
        user.setCurrentOtp(null); // Clear OTP after success
        userRepository.save(user);

        response.put("message", "OTP verified successfully");
        return ResponseEntity.ok(response);
    }

    // 3. Set Password
    @PostMapping("/set-password")
    public ResponseEntity<Map<String, String>> setPassword(@RequestBody AuthRequest request) {
        Optional<User> optionalUser = userRepository.findByIdentifier(request.getIdentifier());
        Map<String, String> response = new HashMap<>();

        if (optionalUser.isEmpty() || !optionalUser.get().isVerified()) {
            response.put("error", "User not verified");
            return ResponseEntity.badRequest().body(response);
        }

        User user = optionalUser.get();
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        userRepository.save(user);

        response.put("message", "Password set successfully");
        return ResponseEntity.ok(response);
    }

    // 4. Login
    @PostMapping("/login")
    public ResponseEntity<Map<String, String>> login(@RequestBody AuthRequest request) {
        Optional<User> optionalUser = userRepository.findByIdentifier(request.getIdentifier());
        Map<String, String> response = new HashMap<>();

        if (optionalUser.isEmpty()) {
            response.put("error", "Invalid credentials");
            return ResponseEntity.badRequest().body(response);
        }

        User user = optionalUser.get();
        if (!user.isVerified()) {
            response.put("error", "Please verify your account first");
            return ResponseEntity.badRequest().body(response);
        }

        if (user.getPassword() == null || !passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            response.put("error", "Invalid credentials");
            return ResponseEntity.badRequest().body(response);
        }

        String token = jwtUtil.generateToken(user.getIdentifier());
        response.put("token", token);
        return ResponseEntity.ok(response);
    }

    // 5. Get User Profile
    @GetMapping("/me")
    public ResponseEntity<Map<String, Object>> getProfile(@RequestHeader(value = "Authorization", required = false) String authHeader) {
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            return ResponseEntity.status(401).build();
        }
        
        try {
            String token = authHeader.substring(7);
            String identifier = jwtUtil.extractUsername(token);
            
            Optional<User> optionalUser = userRepository.findByIdentifier(identifier);
            if (optionalUser.isEmpty()) {
                return ResponseEntity.status(404).build();
            }
            
            User user = optionalUser.get();
            Map<String, Object> response = new HashMap<>();
            response.put("identifier", user.getIdentifier());
            response.put("role", user.getRole());
            response.put("createdAt", user.getCreatedAt() != null ? user.getCreatedAt().toString() : null);
            response.put("isVerified", user.isVerified());
            
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            return ResponseEntity.status(401).build();
        }
    }
}
