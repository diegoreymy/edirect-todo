package com.edirect.todo.repository;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import com.edirect.todo.model.Task;
import com.edirect.todo.model.Project;

public interface TaskRepository extends JpaRepository<Task, Long> {
    List<Task> findByProject(Project project);
}