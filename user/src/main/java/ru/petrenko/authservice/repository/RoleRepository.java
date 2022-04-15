package ru.petrenko.authservice.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import ru.petrenko.authservice.entity.Role;

public interface RoleRepository extends JpaRepository<Role, Integer> {
    Role findRoleByName(String name);
    Role findRoleById(Long roleId);
}
