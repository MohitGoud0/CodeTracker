package com.example.demo.controller;

import com.example.demo.model.User;
import com.example.demo.repository.UserRepository;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/goal")
@CrossOrigin
public class GoalController {

    private final UserRepository userRepository;

    public GoalController(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @GetMapping
    public int getGoal(@RequestParam Long userId) {

        User user = userRepository.findById(userId).orElse(null);

        if (user == null) {
            return 0;
        }

        return user.getDailyGoal();
    }

    @PutMapping
    public int setGoal(
            @RequestParam Long userId,
            @RequestParam int goal) {

        User user = userRepository.findById(userId).orElse(null);

        if (user == null) {
            return 0;
        }

        if (goal < 1) {
            return user.getDailyGoal();
        }

        user.setDailyGoal(goal);

        userRepository.save(user);

        return user.getDailyGoal();
    }
}