package com.healthmix.service;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

@Service
public class EmailService {

    @Autowired
    private JavaMailSender mailSender;

    @Value("${spring.mail.username}")
    private String fromEmail;

    public void sendOtpEmail(String toEmail, String otp) throws MessagingException {
        MimeMessage message = mailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");

        helper.setFrom(fromEmail);
        helper.setTo(toEmail);
        helper.setSubject("Your HealthMix Verification Code");

        String htmlContent = "<!DOCTYPE html>" +
            "<html><head><style>" +
            "body { font-family: 'Segoe UI', Arial, sans-serif; background: #f4f4f4; margin: 0; padding: 0; }" +
            ".container { max-width: 480px; margin: 40px auto; background: #fff; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 24px rgba(0,0,0,0.08); }" +
            ".header { background: linear-gradient(135deg, #2E7D32 0%, #388E3C 100%); padding: 32px; text-align: center; }" +
            ".header h1 { color: #fff; margin: 0; font-size: 26px; font-weight: 700; letter-spacing: 1px; }" +
            ".header p { color: #C8E6C9; margin: 6px 0 0; font-size: 14px; }" +
            ".body { padding: 32px; text-align: center; }" +
            ".body p { color: #555; font-size: 15px; line-height: 1.6; }" +
            ".otp-box { background: #F1F8E9; border: 2px dashed #81C784; border-radius: 12px; padding: 20px; margin: 24px 0; }" +
            ".otp-code { font-size: 42px; font-weight: 800; letter-spacing: 12px; color: #2E7D32; font-family: 'Courier New', monospace; }" +
            ".expiry { color: #E53935; font-size: 13px; margin-top: 8px; font-weight: 600; }" +
            ".footer { background: #f9f9f9; padding: 20px; text-align: center; border-top: 1px solid #eee; }" +
            ".footer p { color: #999; font-size: 12px; margin: 0; }" +
            "</style></head><body>" +
            "<div class='container'>" +
            "  <div class='header'>" +
            "    <h1>🌿 HealthMix</h1>" +
            "    <p>Your trusted health companion</p>" +
            "  </div>" +
            "  <div class='body'>" +
            "    <p>Hello! You requested a verification code for your <strong>HealthMix</strong> account.</p>" +
            "    <div class='otp-box'>" +
            "      <div class='otp-code'>" + otp + "</div>" +
            "      <p class='expiry'>⏱ Expires in 10 minutes</p>" +
            "    </div>" +
            "    <p>Enter this code in the app to verify your email. If you didn't request this, please ignore this email.</p>" +
            "  </div>" +
            "  <div class='footer'>" +
            "    <p>© 2024 HealthMix. All rights reserved. Do not reply to this email.</p>" +
            "  </div>" +
            "</div>" +
            "</body></html>";

        helper.setText(htmlContent, true);
        mailSender.send(message);
    }
}
