package com.edirect.todo.repository;

import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import com.edirect.todo.model.User;

public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByUsername(String username);
}