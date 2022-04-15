package ru.petrenko.authservice.controllers;

import lombok.RequiredArgsConstructor;
import lombok.SneakyThrows;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import ru.petrenko.authservice.config.jwt.JwtProvider;
import ru.petrenko.authservice.entity.User;
import ru.petrenko.authservice.service.UserService;

import java.util.Objects;

@RestController
@RequiredArgsConstructor
public class AuthController {
    private final UserService userService;
    private final JwtProvider jwtProvider;
    private final PasswordEncoder passwordEncoder;

    @SneakyThrows
    @GetMapping("/auth")
    public String getAuth(@RequestParam("login") String login,
                          @RequestParam("password") String password) {
        User user = userService.findOneLogin(login);
        if(user == null) throw new IllegalArgumentException("Invalid user or password");
        if(Objects.equals(user.getPassword(), passwordEncoder.encode(password)))
            throw new IllegalArgumentException("Invalid user or password");
        return jwtProvider.generateToken(user);
    }
}
