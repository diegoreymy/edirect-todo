package com.edirect.todo.mapper;

import org.springframework.stereotype.Component;
import com.edirect.todo.model.User;
import com.edirect.todo.dto.UserDTO;
import com.edirect.todo.dto.UserCreateDTO;

@Component
public class UserMapper {

    public UserDTO toDTO(User user) {
        if (user == null) return null;
        UserDTO dto = new UserDTO();
        dto.setId(user.getId());
        dto.setUsername(user.getUsername());
        return dto;
    }

    public User toEntity(UserCreateDTO dto) {
        if (dto == null) return null;
        User user = new User();
        user.setUsername(dto.getUsername());
        user.setPassword(dto.getPassword());
        return user;
    }
}