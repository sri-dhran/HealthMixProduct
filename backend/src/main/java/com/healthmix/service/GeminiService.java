package com.healthmix.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class GeminiService {

    @Value("${GEMINI_API_KEY:}")
    private String geminiApiKey;

    private final RestTemplate restTemplate;

    public GeminiService() {
        this.restTemplate = new RestTemplate();
    }

    public String generateRecipe(List<String> ingredients, String goals) throws Exception {
        if (geminiApiKey == null || geminiApiKey.isEmpty()) {
            throw new IllegalStateException("GEMINI_API_KEY is not set in environment variables");
        }

        String url = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=" + geminiApiKey;

        String prompt = "You are an expert nutritionist. Create a unique, healthy recipe using these ingredients: " + String.join(", ", ingredients) + ".\n";
        if (goals != null && !goals.isEmpty()) {
            prompt += "The user's health goal is: " + goals + ". Please tailor the recipe to this goal.\n";
        }
        prompt += "Provide the recipe in a clear format with a title, ingredients list with measurements, and step-by-step instructions.";

        // Construct request body for Gemini API
        Map<String, Object> requestBody = new HashMap<>();
        List<Map<String, Object>> contents = new ArrayList<>();
        Map<String, Object> content = new HashMap<>();
        List<Map<String, Object>> parts = new ArrayList<>();
        Map<String, Object> part = new HashMap<>();
        
        part.put("text", prompt);
        parts.add(part);
        content.put("parts", parts);
        contents.add(content);
        requestBody.put("contents", contents);

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);

        HttpEntity<Map<String, Object>> entity = new HttpEntity<>(requestBody, headers);

        ResponseEntity<Map> response = restTemplate.postForEntity(url, entity, Map.class);

        if (response.getStatusCode().is2xxSuccessful() && response.getBody() != null) {
            try {
                // Parse the response structure from Gemini
                List<Map<String, Object>> candidates = (List<Map<String, Object>>) response.getBody().get("candidates");
                Map<String, Object> firstCandidate = candidates.get(0);
                Map<String, Object> resContent = (Map<String, Object>) firstCandidate.get("content");
                List<Map<String, Object>> resParts = (List<Map<String, Object>>) resContent.get("parts");
                String text = (String) resParts.get(0).get("text");
                return text;
            } catch (Exception e) {
                throw new Exception("Failed to parse Gemini response", e);
            }
        } else {
            throw new Exception("Gemini API call failed with status: " + response.getStatusCode());
        }
    }
}
