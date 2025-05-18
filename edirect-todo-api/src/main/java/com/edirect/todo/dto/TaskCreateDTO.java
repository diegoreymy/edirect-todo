package com.edirect.todo.dto;

import lombok.Data;

import java.time.Instant;

@Data
public class TaskCreateDTO {
    private String description;
    private Instant finishDate;
    private Boolean completed;
}