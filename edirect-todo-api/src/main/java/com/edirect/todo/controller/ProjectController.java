package com.edirect.todo.controller;

import com.edirect.todo.dto.ProjectDTO;
import com.edirect.todo.dto.ProjectCreateDTO;
import com.edirect.todo.service.ProjectService;
import lombok.AllArgsConstructor;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import java.util.List;

@RestController
@RequestMapping("/api/projects")
@AllArgsConstructor
public class ProjectController {

    private final ProjectService projectService;

    private Long getSessionUserId(HttpServletRequest req) {
        HttpSession session = req.getSession(false);
        if (session == null) return null;
        return (Long) session.getAttribute("userId");
    }

    private ResponseEntity<?> unauthorizedIfNoUser(HttpServletRequest req) {
        if (getSessionUserId(req) == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
        return null;
    }

    @GetMapping
    public ResponseEntity<?> list(HttpServletRequest req) {
        ResponseEntity<?> error = unauthorizedIfNoUser(req);
        if (error != null) return error;

        Long userId = getSessionUserId(req);
        List<ProjectDTO> projects = projectService.findByOwner(userId);
        return ResponseEntity.ok(projects);
    }

    @PostMapping
    public ResponseEntity<?> create(@RequestBody ProjectCreateDTO dto, HttpServletRequest req) {
        ResponseEntity<?> error = unauthorizedIfNoUser(req);
        if (error != null) return error;

        Long userId = getSessionUserId(req);
        ProjectDTO created = projectService.create(dto, userId);
        return new ResponseEntity<>(created, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> update(@PathVariable Long id, @RequestBody ProjectDTO dto, HttpServletRequest req) {
        ResponseEntity<?> error = unauthorizedIfNoUser(req);
        if (error != null) return error;

        dto.setId(id);
        ProjectDTO updated = projectService.update(dto);
        return ResponseEntity.ok(updated);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(@PathVariable Long id, HttpServletRequest req) {
        ResponseEntity<?> error = unauthorizedIfNoUser(req);
        if (error != null) return error;

        projectService.delete(id);
        return ResponseEntity.noContent().build();
    }
}
