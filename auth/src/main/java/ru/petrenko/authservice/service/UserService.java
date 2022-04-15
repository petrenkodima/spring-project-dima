package ru.petrenko.authservice.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import ru.petrenko.authservice.entity.User;
import ru.petrenko.authservice.repository.UserRepository;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;

    public User findOneLogin(String login) {
        return userRepository.findByLogin(login);
    }

}
