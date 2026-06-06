package com.healthmix.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;

@Service
public class EmailService {

    @Value("${resend.api.key:}")
    private String resendApiKey;

    @Value("${resend.from.email:onboarding@resend.dev}")
    private String fromEmail;

    private final HttpClient httpClient = HttpClient.newHttpClient();

    public void sendOtpEmail(String toEmail, String otp) throws Exception {
        if (resendApiKey == null || resendApiKey.isBlank()) {
            throw new IllegalStateException("Resend API key not configured (RESEND_API_KEY env var)");
        }

        String htmlContent = buildHtmlEmail(otp);

        // Build JSON safely
        String jsonBody = "{"
                + "\"from\":\"HealthMix <" + escapeJson(fromEmail) + ">\","
                + "\"to\":[\"" + escapeJson(toEmail) + "\"],"
                + "\"subject\":\"Your HealthMix Verification Code\","
                + "\"html\":\"" + escapeJson(htmlContent) + "\""
                + "}";

        HttpRequest request = HttpRequest.newBuilder()
                .uri(URI.create("https://api.resend.com/emails"))
                .header("Authorization", "Bearer " + resendApiKey)
                .header("Content-Type", "application/json")
                .POST(HttpRequest.BodyPublishers.ofString(jsonBody))
                .build();

        HttpResponse<String> response = httpClient.send(request, HttpResponse.BodyHandlers.ofString());

        if (response.statusCode() < 200 || response.statusCode() >= 300) {
            throw new RuntimeException("Resend API error " + response.statusCode() + ": " + response.body());
        }

        System.out.println("✅ Email sent via Resend to " + toEmail + " (status " + response.statusCode() + ")");
    }

    private String escapeJson(String value) {
        return value
                .replace("\\", "\\\\")
                .replace("\"", "\\\"")
                .replace("\n", "\\n")
                .replace("\r", "\\r")
                .replace("\t", "\\t");
    }

    private String buildHtmlEmail(String otp) {
        return "<!DOCTYPE html>"
                + "<html><head><style>"
                + "body{font-family:'Segoe UI',Arial,sans-serif;background:#f4f4f4;margin:0;padding:0}"
                + ".container{max-width:480px;margin:40px auto;background:#fff;border-radius:16px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.08)}"
                + ".header{background:linear-gradient(135deg,#2E7D32 0%,#388E3C 100%);padding:32px;text-align:center}"
                + ".header h1{color:#fff;margin:0;font-size:26px;font-weight:700;letter-spacing:1px}"
                + ".header p{color:#C8E6C9;margin:6px 0 0;font-size:14px}"
                + ".body{padding:32px;text-align:center}"
                + ".body p{color:#555;font-size:15px;line-height:1.6}"
                + ".otp-box{background:#F1F8E9;border:2px dashed #81C784;border-radius:12px;padding:20px;margin:24px 0}"
                + ".otp-code{font-size:42px;font-weight:800;letter-spacing:12px;color:#2E7D32;font-family:'Courier New',monospace}"
                + ".expiry{color:#E53935;font-size:13px;margin-top:8px;font-weight:600}"
                + ".footer{background:#f9f9f9;padding:20px;text-align:center;border-top:1px solid #eee}"
                + ".footer p{color:#999;font-size:12px;margin:0}"
                + "</style></head><body>"
                + "<div class='container'>"
                + "<div class='header'><h1>HealthMix</h1><p>Your trusted health companion</p></div>"
                + "<div class='body'>"
                + "<p>Hello! You requested a verification code for your <strong>HealthMix</strong> account.</p>"
                + "<div class='otp-box'>"
                + "<div class='otp-code'>" + otp + "</div>"
                + "<p class='expiry'>Expires in 10 minutes</p>"
                + "</div>"
                + "<p>Enter this code in the app to verify your email. If you did not request this, please ignore this email.</p>"
                + "</div>"
                + "<div class='footer'><p>2024 HealthMix. All rights reserved.</p></div>"
                + "</div></body></html>";
    }
}
