package com.edirect.todo.mapper;

import org.springframework.stereotype.Component;
import com.edirect.todo.model.Task;
import com.edirect.todo.dto.TaskDTO;
import com.edirect.todo.dto.TaskCreateDTO;

import java.time.Instant;

@Component
public class TaskMapper {

    public TaskDTO toDTO(Task task) {
        if (task == null) return null;
        TaskDTO dto = new TaskDTO();
        dto.setId(task.getId());
        dto.setName(task.getName());
        dto.setDescription(task.getDescription());
        dto.setCreationDate(task.getCreationDate());
        dto.setFinishDate(task.getFinishDate());
        dto.setCompleted(task.getCompleted());
        if (task.getProject() != null) {
            dto.setProjectId(task.getProject().getId());
        }
        return dto;
    }

    public Task toEntity(TaskCreateDTO dto) {
        if (dto == null) return null;
        Task task = new Task();
        task.setCreationDate(Instant.now());
        task.setName(dto.getName());
        task.setDescription(dto.getDescription());
        task.setFinishDate(dto.getFinishDate());
        task.setCompleted(dto.getCompleted() != null ? dto.getCompleted() : false);
        return task;
    }
}