package com.edirect.todo.mapper;

import java.util.List;
import java.util.stream.Collectors;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import com.edirect.todo.model.Project;
import com.edirect.todo.dto.ProjectDTO;
import com.edirect.todo.dto.ProjectCreateDTO;
import com.edirect.todo.dto.TaskDTO;

@Component
public class ProjectMapper {

    private final TaskMapper taskMapper;

    @Autowired
    public ProjectMapper(TaskMapper taskMapper) {
        this.taskMapper = taskMapper;
    }

    public ProjectDTO toDTO(Project project) {
        if (project == null) return null;
        ProjectDTO dto = new ProjectDTO();
        dto.setId(project.getId());
        dto.setName(project.getName());
        if (project.getOwner() != null) {
            dto.setOwnerId(project.getOwner().getId());
        }
        List<TaskDTO> tasks = project.getTasks() == null
                ? List.of()
                : project.getTasks().stream()
                .map(taskMapper::toDTO)
                .collect(Collectors.toList());
        dto.setTasks(tasks);
        return dto;
    }

    public Project toEntity(ProjectCreateDTO dto) {
        if (dto == null) return null;
        Project project = new Project();
        project.setName(dto.getName());
        return project;
    }
}