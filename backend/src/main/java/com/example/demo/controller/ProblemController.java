package com.example.demo.controller;

import com.example.demo.model.Problem;
import com.example.demo.repository.ProblemRepository;
import com.example.demo.service.ProblemLinkService;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/problems")
@CrossOrigin
public class ProblemController {

    private final ProblemRepository problemRepository;
    private final ProblemLinkService problemLinkService;

    public ProblemController(
            ProblemRepository problemRepository,
            ProblemLinkService problemLinkService) {

        this.problemRepository = problemRepository;
        this.problemLinkService = problemLinkService;
    }

    @PostMapping
    public Problem addProblem(@RequestBody Problem problem) {

        String link = problemLinkService.getProblemLink(
                problem.getTitle(),
                problem.getPlatform()
        );

        problem.setLink(link);

        if ("Solved".equalsIgnoreCase(problem.getStatus())) {
            problem.setSolvedDate(LocalDate.now());
        }

        return problemRepository.save(problem);
    }

    @GetMapping
    public List<Problem> getProblems(
            @RequestParam Long userId) {

        return problemRepository.findByUserId(userId);
    }

    @PutMapping("/{id}")
    public Problem updateProblem(
            @PathVariable Long id,
            @RequestBody Problem updatedProblem) {

        Problem problem =
                problemRepository.findById(id).orElse(null);

        if (problem == null) {
            return null;
        }

        problem.setTitle(updatedProblem.getTitle());
        problem.setDifficulty(updatedProblem.getDifficulty());
        problem.setPlatform(updatedProblem.getPlatform());
        problem.setStatus(updatedProblem.getStatus());
        problem.setTopic(updatedProblem.getTopic());

        String link = problemLinkService.getProblemLink(
                updatedProblem.getTitle(),
                updatedProblem.getPlatform()
        );

        problem.setLink(link);

        if ("Solved".equalsIgnoreCase(updatedProblem.getStatus())) {
            problem.setSolvedDate(LocalDate.now());
        } else {
            problem.setSolvedDate(null);
        }

        return problemRepository.save(problem);
    }

    @DeleteMapping("/{id}")
    public String deleteProblem(@PathVariable Long id) {

        problemRepository.deleteById(id);

        return "Problem deleted";
    }
}