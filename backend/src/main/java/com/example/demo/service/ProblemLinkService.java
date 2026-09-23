package com.example.demo.service;

import org.springframework.stereotype.Service;

@Service
public class ProblemLinkService {

    public String getProblemLink(String title, String platform) {

        if (title == null || platform == null) {
            return "";
        }

        String name = title.trim()
                .toLowerCase()
                .replace(" ", "-");

        if (platform.equalsIgnoreCase("LeetCode")) {
            return "https://leetcode.com/problems/" + name + "/";
        }

        if (platform.equalsIgnoreCase("CodeChef")) {
            return "https://www.codechef.com/problems/" + title.trim().toUpperCase();
        }

        if (platform.equalsIgnoreCase("HackerRank")) {
            return "https://www.hackerrank.com/challenges/" + name + "/problem";
        }

        if (platform.equalsIgnoreCase("GeeksforGeeks")) {
            return "https://www.geeksforgeeks.org/problems/" + name + "/1";
        }

        return "";
    }
}