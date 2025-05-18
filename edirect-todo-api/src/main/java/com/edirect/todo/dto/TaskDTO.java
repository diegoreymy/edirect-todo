package com.edirect.todo.dto;

import lombok.Data;

import java.time.Instant;

@Data
public class TaskDTO {
    private Long id;
    private String name;
    private String description;
    private Instant creationDate;
    private Instant finishDate;
    private Boolean completed;
    private Long projectId;
}