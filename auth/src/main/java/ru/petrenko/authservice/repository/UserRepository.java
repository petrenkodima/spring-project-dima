package ru.petrenko.authservice.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import ru.petrenko.authservice.entity.User;

import java.util.List;

public interface UserRepository extends JpaRepository<User, Long> {
    User findByLogin(String login);
    List<User> findByRoleName(String name);
}
