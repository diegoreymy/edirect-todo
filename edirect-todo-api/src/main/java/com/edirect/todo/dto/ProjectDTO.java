package com.edirect.todo.dto;

import lombok.Data;
import java.util.List;

@Data
public class ProjectDTO {
    private Long id;
    private String name;
    private Long ownerId;
    private List<TaskDTO> tasks;
}