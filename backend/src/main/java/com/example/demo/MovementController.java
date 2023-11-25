package com.example.demo;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/movements")
public class MovementController {
    
    @Autowired
    private MovementRepository movementRepository;

    @GetMapping("/")
    public List<Movement> getMovements() {
        List<Movement> movements = movementRepository.findAll();
        return movements;
    }

    @PostMapping("/add")
    public Movement addMovement(@RequestBody Movement movement) {
        Movement savedMovement = movementRepository.save(movement);
        return savedMovement;
    }
}
