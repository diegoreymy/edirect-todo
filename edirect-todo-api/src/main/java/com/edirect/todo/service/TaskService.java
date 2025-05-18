package com.edirect.todo.service;

import java.util.List;
import java.util.stream.Collectors;
import org.springframework.stereotype.Service;
import lombok.AllArgsConstructor;
import com.edirect.todo.repository.TaskRepository;
import com.edirect.todo.repository.ProjectRepository;
import com.edirect.todo.mapper.TaskMapper;
import com.edirect.todo.dto.TaskDTO;
import com.edirect.todo.dto.TaskCreateDTO;
import com.edirect.todo.model.Project;
import com.edirect.todo.model.Task;

@Service
@AllArgsConstructor
public class TaskService {
    private final TaskRepository taskRepository;
    private final ProjectRepository projectRepository;
    private final TaskMapper taskMapper;

    public TaskDTO create(Long projectId, TaskCreateDTO dto) {
        Project project = getProjectOrThrow(projectId);
        Task task = taskMapper.toEntity(dto);
        task.setProject(project);
        Task saved = taskRepository.save(task);
        return taskMapper.toDTO(saved);
    }

    public List<TaskDTO> findByProject(Long projectId) {
        Project project = getProjectOrThrow(projectId);
        return taskRepository.findByProject(project).stream()
                .map(taskMapper::toDTO)
                .collect(Collectors.toList());
    }

    public TaskDTO update(TaskDTO dto) {
        Task task = getTaskOrThrow(dto.getId());
        task.setDescription(dto.getDescription());
        task.setFinishDate(dto.getFinishDate());
        task.setCompleted(dto.getCompleted());
        Task saved = taskRepository.save(task);
        return taskMapper.toDTO(saved);
    }

    public void delete(Long id) {
        taskRepository.deleteById(id);
    }

    public TaskDTO findById(Long id) {
        Task task = getTaskOrThrow(id);
        return taskMapper.toDTO(task);
    }

    private Project getProjectOrThrow(Long projectId) {
        return projectRepository.findById(projectId)
                .orElseThrow(() -> new IllegalArgumentException("Project not found"));
    }

    private Task getTaskOrThrow(Long taskId) {
        return taskRepository.findById(taskId)
                .orElseThrow(() -> new IllegalArgumentException("Task not found"));
    }
}