package com.example.demo.service;

import com.example.demo.model.Problem;
import com.example.demo.repository.ProblemRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.Set;
import java.util.TreeSet;

@Service
public class StreakService {

    private final ProblemRepository problemRepository;

    public StreakService(ProblemRepository problemRepository) {
        this.problemRepository = problemRepository;
    }

    public int getCurrentStreak(Long userId) {

        List<Problem> problems =
                problemRepository.findByUserId(userId);

        Set<LocalDate> dates = new TreeSet<>();

        for (Problem problem : problems) {

            if (problem.getSolvedDate() != null) {
                dates.add(problem.getSolvedDate());
            }
        }

        LocalDate today = LocalDate.now();

        int streak = 0;

        while (dates.contains(today)) {

            streak++;

            today = today.minusDays(1);
        }

        return streak;
    }

    public int getLongestStreak(Long userId) {

        List<Problem> problems =
                problemRepository.findByUserId(userId);

        Set<LocalDate> dates = new TreeSet<>();

        for (Problem problem : problems) {

            if (problem.getSolvedDate() != null) {
                dates.add(problem.getSolvedDate());
            }
        }

        int longest = 0;
        int current = 0;

        LocalDate previous = null;

        for (LocalDate date : dates) {

            if (previous != null &&
                date.equals(previous.plusDays(1))) {

                current++;

            } else {

                current = 1;
            }

            if (current > longest) {
                longest = current;
            }

            previous = date;
        }

        return longest;
    }

    public int getTodaySolved(Long userId) {

        List<Problem> problems =
                problemRepository.findByUserId(userId);

        LocalDate today = LocalDate.now();

        int count = 0;

        for (Problem problem : problems) {

            if (today.equals(problem.getSolvedDate())) {
                count++;
            }
        }

        return count;
    }
}