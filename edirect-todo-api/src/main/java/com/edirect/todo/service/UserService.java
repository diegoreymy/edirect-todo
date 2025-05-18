package com.edirect.todo.service;

import java.util.Optional;
import org.springframework.stereotype.Service;
import lombok.AllArgsConstructor;
import org.mindrot.jbcrypt.BCrypt;
import com.edirect.todo.repository.UserRepository;
import com.edirect.todo.mapper.UserMapper;
import com.edirect.todo.dto.UserDTO;
import com.edirect.todo.dto.UserCreateDTO;
import com.edirect.todo.model.User;

@Service
@AllArgsConstructor
public class UserService {
    private final UserRepository userRepository;
    private final UserMapper userMapper;

    public UserDTO register(UserCreateDTO dto) {
        Optional<User> existingUser = userRepository.findByUsername(dto.getUsername());
        if (existingUser.isPresent()) {
            throw new IllegalArgumentException("O nome de usuário já existe");
        }
        User user = userMapper.toEntity(dto);
        user.setPassword(BCrypt.hashpw(dto.getPassword(), BCrypt.gensalt()));
        User saved = userRepository.save(user);
        return userMapper.toDTO(saved);
    }

    public UserDTO authenticate(String username, String rawPassword) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new IllegalArgumentException("Usuário ou senha inválidos"));
        if (!BCrypt.checkpw(rawPassword, user.getPassword())) {
            throw new IllegalArgumentException("Usuário ou senha inválidos");
        }
        return userMapper.toDTO(user);
    }

    public UserDTO findById(Long id) {
        return userRepository.findById(id)
                .map(userMapper::toDTO)
                .orElse(null);
    }
}
