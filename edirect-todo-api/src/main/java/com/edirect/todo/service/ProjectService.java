package com.edirect.todo.service;

import java.util.List;
import java.util.stream.Collectors;
import org.springframework.stereotype.Service;
import lombok.AllArgsConstructor;
import com.edirect.todo.repository.ProjectRepository;
import com.edirect.todo.repository.UserRepository;
import com.edirect.todo.mapper.ProjectMapper;
import com.edirect.todo.dto.ProjectDTO;
import com.edirect.todo.dto.ProjectCreateDTO;
import com.edirect.todo.model.User;
import com.edirect.todo.model.Project;

@Service
@AllArgsConstructor
public class ProjectService {
    private final ProjectRepository projectRepository;
    private final UserRepository userRepository;
    private final ProjectMapper projectMapper;

    public ProjectDTO create(ProjectCreateDTO dto, Long ownerId) {
        User owner = getUserOrThrow(ownerId);
        Project project = projectMapper.toEntity(dto);
        project.setOwner(owner);
        Project saved = projectRepository.save(project);
        return projectMapper.toDTO(saved);
    }

    public List<ProjectDTO> findByOwner(Long ownerId) {
        User owner = getUserOrThrow(ownerId);
        return projectRepository.findByOwner(owner).stream()
                .map(projectMapper::toDTO)
                .collect(Collectors.toList());
    }

    public ProjectDTO update(ProjectDTO dto) {
        Project project = getProjectOrThrow(dto.getId());
        project.setName(dto.getName());
        Project saved = projectRepository.save(project);
        return projectMapper.toDTO(saved);
    }

    public void delete(Long id) {
        projectRepository.deleteById(id);
    }

    public boolean userOwnsProject(Long projectId, Long userId) {
        return projectRepository.findById(projectId)
                .map(proj -> proj.getOwner().getId().equals(userId))
                .orElse(false);
    }

    private User getUserOrThrow(Long userId) {
        return userRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("Usuário não encontrado"));
    }

    private Project getProjectOrThrow(Long projectId) {
        return projectRepository.findById(projectId)
                .orElseThrow(() -> new IllegalArgumentException("Projeto não encontrado"));
    }
}