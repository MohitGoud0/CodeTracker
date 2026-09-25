package com.example.demo.service;

import com.example.demo.model.Problem;
import com.example.demo.repository.ProblemRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AIRecommendationService {

    private final ProblemRepository problemRepository;

    public AIRecommendationService(ProblemRepository problemRepository) {
        this.problemRepository = problemRepository;
    }

    public String getRecommendation(Long userId) {

        List<Problem> problems =
                problemRepository.findByUserId(userId);

        if (problems.isEmpty()) {
            return "Start with Easy problems in Arrays and Strings to build a strong DSA foundation.";
        }

        int easy = 0;
        int medium = 0;
        int hard = 0;

        int arrays = 0;
        int strings = 0;
        int linkedLists = 0;
        int trees = 0;

        for (Problem problem : problems) {

            if (!"Solved".equalsIgnoreCase(problem.getStatus())) {
                continue;
            }

            if ("Easy".equalsIgnoreCase(problem.getDifficulty())) {
                easy++;
            }

            if ("Medium".equalsIgnoreCase(problem.getDifficulty())) {
                medium++;
            }

            if ("Hard".equalsIgnoreCase(problem.getDifficulty())) {
                hard++;
            }

            if (problem.getTopic() != null) {

                if ("Arrays".equalsIgnoreCase(problem.getTopic())) {
                    arrays++;
                }

                if ("Strings".equalsIgnoreCase(problem.getTopic())) {
                    strings++;
                }

                if ("Linked List".equalsIgnoreCase(problem.getTopic())) {
                    linkedLists++;
                }

                if ("Trees".equalsIgnoreCase(problem.getTopic())) {
                    trees++;
                }
            }
        }

        if (easy > medium + hard) {
            return "You have solved more Easy problems, so start focusing on Medium problems to improve your problem-solving skills.";
        }

        if (arrays > strings && arrays > linkedLists && arrays > trees) {
            return "You practice Arrays frequently. Next, focus on Strings and Linked Lists to improve your DSA coverage.";
        }

        if (strings > arrays && strings > linkedLists && strings > trees) {
            return "You practice Strings frequently. Try more Medium Array and Linked List problems next.";
        }

        if (linkedLists > arrays && linkedLists > strings && linkedLists > trees) {
            return "You practice Linked Lists frequently. Start solving more Trees and Graph problems next.";
        }

        if (trees > arrays && trees > strings && trees > linkedLists) {
            return "You are practicing Trees well. Try more Graph and Dynamic Programming problems next.";
        }

        if (hard > 0) {
            return "You have started solving Hard problems. Continue with Medium problems in weaker DSA topics before increasing Hard problem practice.";
        }

        return "Keep solving Medium problems and gradually increase your practice across different DSA topics.";
    }
}