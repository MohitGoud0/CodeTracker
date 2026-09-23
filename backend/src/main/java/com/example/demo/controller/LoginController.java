package com.example.demo.controller;

import com.example.demo.model.User;
import com.example.demo.repository.UserRepository;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/users")
@CrossOrigin
public class LoginController {

    private final UserRepository userRepository;

    public LoginController(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @PostMapping("/login")
    public User login(@RequestBody User user) {

        for (User u : userRepository.findAll()) {

            if (u.getEmail().equals(user.getEmail()) &&
                u.getPassword().equals(user.getPassword())) {

                return u;
            }
        }

        return null;
    }
}