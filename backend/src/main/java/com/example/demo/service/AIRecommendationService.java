package com.example.demo.service;

import com.example.demo.model.Problem;
import com.example.demo.repository.ProblemRepository;
import com.openai.client.OpenAIClient;
import com.openai.client.okhttp.OpenAIOkHttpClient;
import com.openai.models.ChatModel;
import com.openai.models.responses.Response;
import com.openai.models.responses.ResponseCreateParams;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AIRecommendationService {

    private final ProblemRepository problemRepository;

    private final OpenAIClient client =
            OpenAIOkHttpClient.fromEnv();

    public AIRecommendationService(
            ProblemRepository problemRepository) {

        this.problemRepository = problemRepository;
    }

    public String getRecommendation(Long userId) {

        List<Problem> problems =
                problemRepository.findByUserId(userId);

        if (problems.isEmpty()) {
            return "Start solving Easy problems in Arrays and Strings to build a strong foundation.";
        }

        int easy = 0;
        int medium = 0;
        int hard = 0;

        StringBuilder topics = new StringBuilder();

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
                topics.append(problem.getTopic()).append(", ");
            }
        }

        String prompt =
                "You are an AI coding mentor for a student. " +
                "Analyze the student's coding progress and give one short, practical recommendation. " +
                "Do not give generic motivation. " +
                "Mention what difficulty or DSA area the student should focus on next. " +
                "Keep the answer within 2 sentences.\n\n" +

                "Student coding data:\n" +
                "Easy solved: " + easy + "\n" +
                "Medium solved: " + medium + "\n" +
                "Hard solved: " + hard + "\n" +
                "Topics practiced: " + topics + "\n";

        ResponseCreateParams params =
                ResponseCreateParams.builder()
                        .input(prompt)
                        .model(ChatModel.GPT_5_2)
                        .build();

        Response response =
                client.responses().create(params);

        return response.output()
                .stream()
                .flatMap(item -> item.message().stream())
                .flatMap(message -> message.content().stream())
                .flatMap(content -> content.outputText().stream())
                .map(outputText -> outputText.text())
                .findFirst()
                .orElse("Keep practicing consistently and focus on your weaker DSA topics.");
    }
}