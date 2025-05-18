package com.edirect.todo.repository;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import com.edirect.todo.model.Project;
import com.edirect.todo.model.User;

public interface ProjectRepository extends JpaRepository<Project, Long> {
    List<Project> findByOwner(User owner);
}