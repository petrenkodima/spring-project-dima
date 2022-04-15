package ru.petrenko.authservice.service;

import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Sort;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import ru.petrenko.authservice.entity.Role;
import ru.petrenko.authservice.entity.User;
import ru.petrenko.authservice.entity.UserSave;
import ru.petrenko.authservice.repository.RoleRepository;
import ru.petrenko.authservice.repository.UserRepository;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final PasswordEncoder passwordEncoder;

    public List<User> findAllAndSort() {
        return userRepository.findAll(Sort.by(Sort.Order.asc("login"),
                                              Sort.Order.desc("login"))
        );
    }

    public User findOneUser(Long id) {
        Optional<User> foundUser = userRepository.findById(id);
        return foundUser.orElse(null);
    }

    public User findOneLogin(String login) {
        return userRepository.findByLogin(login);
    }

    public User saveUser(UserSave user) {
        if(userRepository.findByLogin(user.getLogin()) == null){
            Role userRole = roleRepository.findRoleById(2L);
            User newUser = new User(user.getLogin(), passwordEncoder.encode(user.getPassword()));
            newUser.setRole(userRole);
            return userRepository.save(newUser);
        }
        return null;
    }

    public  List<User> findByRoleName(String name){
        return userRepository.findByRoleName(name);
    }
}