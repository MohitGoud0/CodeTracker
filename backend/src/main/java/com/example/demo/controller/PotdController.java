package com.example.demo.controller;

import com.example.demo.service.PotdService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/potd")
@CrossOrigin
public class PotdController {

    private final PotdService potdService;

    public PotdController(PotdService potdService) {
        this.potdService = potdService;
    }

    @GetMapping
    public PotdService.Potd getPotd() {
        return potdService.getTodayProblem();
    }
}