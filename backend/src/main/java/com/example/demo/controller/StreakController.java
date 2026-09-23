package com.example.demo.controller;

import com.example.demo.service.StreakService;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/streak")
@CrossOrigin
public class StreakController {

    private final StreakService streakService;

    public StreakController(StreakService streakService) {
        this.streakService = streakService;
    }

    @GetMapping
    public Map<String, Integer> getStreak(
            @RequestParam Long userId) {

        Map<String, Integer> result = new HashMap<>();

        result.put(
                "currentStreak",
                streakService.getCurrentStreak(userId)
        );

        result.put(
                "longestStreak",
                streakService.getLongestStreak(userId)
        );

        result.put(
                "todaySolved",
                streakService.getTodaySolved(userId)
        );

        return result;
    }
}