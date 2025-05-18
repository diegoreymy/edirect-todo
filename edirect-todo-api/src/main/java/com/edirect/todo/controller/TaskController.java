package com.edirect.todo.controller;

import com.edirect.todo.dto.TaskDTO;
import com.edirect.todo.dto.TaskCreateDTO;
import com.edirect.todo.service.TaskService;
import com.edirect.todo.service.ProjectService;
import lombok.AllArgsConstructor;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;

import jakarta.servlet.http.HttpServletRequest;
import java.util.List;

@RestController
@AllArgsConstructor
@RequestMapping("/api")
public class TaskController {

    private final TaskService taskService;
    private final ProjectService projectService;

    private Long getSessionUserId(HttpServletRequest req) {
        var session = req.getSession(false);
        if (session == null) return null;
        return (Long) session.getAttribute("userId");
    }

    private ResponseEntity<?> validateUserAccessToProject(Long projectId, HttpServletRequest req) {
        Long userId = getSessionUserId(req);
        if (userId == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
        if (!projectService.userOwnsProject(projectId, userId)) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
        }
        return null;
    }

    @GetMapping("/projects/{projectId}/tasks")
    public ResponseEntity<?> listByProject(@PathVariable Long projectId, HttpServletRequest req) {
        ResponseEntity<?> error = validateUserAccessToProject(projectId, req);
        if (error != null) return error;

        List<TaskDTO> tasks = taskService.findByProject(projectId);
        return ResponseEntity.ok(tasks);
    }

    @PostMapping("/projects/{projectId}/tasks")
    public ResponseEntity<?> create(@PathVariable Long projectId, @RequestBody TaskCreateDTO dto, HttpServletRequest req) {
        ResponseEntity<?> error = validateUserAccessToProject(projectId, req);
        if (error != null) return error;

        TaskDTO created = taskService.create(projectId, dto);
        return ResponseEntity.status(HttpStatus.CREATED).body(created);
    }

    @PutMapping("/tasks/{id}")
    public ResponseEntity<?> update(@PathVariable Long id, @RequestBody TaskDTO dto, HttpServletRequest req) {
        ResponseEntity<?> error = validateUserAccessToProject(dto.getProjectId(), req);
        if (error != null) return error;

        dto.setId(id);
        TaskDTO updated = taskService.update(dto);
        return ResponseEntity.ok(updated);
    }

    @DeleteMapping("/tasks/{id}")
    public ResponseEntity<?> delete(@PathVariable Long id, HttpServletRequest req) {
        TaskDTO existing = taskService.findById(id);

        ResponseEntity<?> error = validateUserAccessToProject(existing.getProjectId(), req);
        if (error != null) return error;

        taskService.delete(id);
        return ResponseEntity.noContent().build();
    }
}
