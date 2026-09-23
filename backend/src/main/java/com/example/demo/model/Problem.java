package com.example.demo.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;

import java.time.LocalDate;

@Entity
public class Problem {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;
    private String difficulty;
    private String platform;
    private String status;
    private String topic;
    private String link;

    private LocalDate solvedDate;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    public Problem() {
    }

    public Problem(
            String title,
            String difficulty,
            String platform,
            String status,
            String topic,
            String link,
            LocalDate solvedDate,
            User user) {

        this.title = title;
        this.difficulty = difficulty;
        this.platform = platform;
        this.status = status;
        this.topic = topic;
        this.link = link;
        this.solvedDate = solvedDate;
        this.user = user;
    }

    public Long getId() {
        return id;
    }

    public String getTitle() {
        return title;
    }

    public String getDifficulty() {
        return difficulty;
    }

    public String getPlatform() {
        return platform;
    }

    public String getStatus() {
        return status;
    }

    public String getTopic() {
        return topic;
    }

    public String getLink() {
        return link;
    }

    public LocalDate getSolvedDate() {
        return solvedDate;
    }

    public User getUser() {
        return user;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public void setDifficulty(String difficulty) {
        this.difficulty = difficulty;
    }

    public void setPlatform(String platform) {
        this.platform = platform;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public void setTopic(String topic) {
        this.topic = topic;
    }

    public void setLink(String link) {
        this.link = link;
    }

    public void setSolvedDate(LocalDate solvedDate) {
        this.solvedDate = solvedDate;
    }

    public void setUser(User user) {
        this.user = user;
    }
}