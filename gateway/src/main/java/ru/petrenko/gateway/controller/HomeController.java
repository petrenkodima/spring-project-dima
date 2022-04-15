package ru.petrenko.gateway.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
@CrossOrigin("*")
public class HomeController {
    @GetMapping("/")
    public String home(Model model){
        return "home";
    }

}
