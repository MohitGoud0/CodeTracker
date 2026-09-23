package com.example.demo.service;

import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.Random;

@Service
public class PotdService {

    public Potd getTodayProblem() {

        LocalDate today = LocalDate.now();

        Random random = new Random(today.toEpochDay());

        int platform = random.nextInt(4);

        if (platform == 0) {
            return new Potd(
                    "Find Closest Node to Given Two Nodes",
                    "LeetCode",
                    "Medium",
                    "Graphs",
                    "https://leetcode.com/problems/find-closest-node-to-given-two-nodes/"
            );
        }

        if (platform == 1) {
            return new Potd(
                    "Word in Grid - All Occurrences",
                    "GeeksforGeeks",
                    "Medium",
                    "Arrays",
                    "https://www.geeksforgeeks.org/problems/word-in-grid-all-occurrences/1"
            );
        }

        if (platform == 2) {
            return new Potd(
                    "Day 0: Hello, World.",
                    "HackerRank",
                    "Easy",
                    "Strings",
                    "https://www.hackerrank.com/challenges/30-hello-world/problem"
            );
        }

        return new Potd(
                "FLOW006 - Sum of Digits",
                "CodeChef",
                "Easy",
                "Math",
                "https://www.codechef.com/problems/FLOW006"
        );
    }

    public static class Potd {

        private String title;
        private String platform;
        private String difficulty;
        private String topic;
        private String link;

        public Potd(
                String title,
                String platform,
                String difficulty,
                String topic,
                String link) {

            this.title = title;
            this.platform = platform;
            this.difficulty = difficulty;
            this.topic = topic;
            this.link = link;
        }

        public String getTitle() {
            return title;
        }

        public String getPlatform() {
            return platform;
        }

        public String getDifficulty() {
            return difficulty;
        }

        public String getTopic() {
            return topic;
        }

        public String getLink() {
            return link;
        }
    }
}