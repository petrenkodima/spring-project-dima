package ru.petrenko.authservice.controllers;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import ru.petrenko.authservice.entity.User;
import ru.petrenko.authservice.entity.UserSave;
import ru.petrenko.authservice.service.UserService;

import java.util.List;

@RestController // @Controller + @ResponseBody over each method
@RequestMapping("/user")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    @GetMapping
    public List<User> getAll() {
        return userService.findAllAndSort();
    }

    @GetMapping("/role")
    public List<User> getUserByRole(@RequestParam("role") String role){
        return userService.findByRoleName(role);
    }

    @GetMapping("/id")
    public User getUser(@RequestParam("id") Long id){
        return userService.findOneUser(id);
    }

    @PostMapping("/save")
    public ResponseEntity<User> saveUser(@RequestBody UserSave user) {
        User user1 = userService.saveUser(user);
        if(user1 != null){
            return ResponseEntity.status(HttpStatus.CREATED).body(user1);
        }
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
    }

    @GetMapping("/login")
    public User getOne(@RequestParam("login") String login){
        return userService.findOneLogin(login);
    }
}