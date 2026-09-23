package com.example.demo.controller;

import com.example.demo.service.AIRecommendationService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/ai")
@CrossOrigin
public class AIRecommendationController {

    private final AIRecommendationService aiRecommendationService;

    public AIRecommendationController(
            AIRecommendationService aiRecommendationService) {

        this.aiRecommendationService = aiRecommendationService;
    }

    @GetMapping("/recommendation")
    public String getRecommendation(
            @RequestParam Long userId) {

        return aiRecommendationService.getRecommendation(userId);
    }
}