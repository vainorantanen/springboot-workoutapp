package com.example.demo;

import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
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

    @DeleteMapping("/delete/{movementId}")
    public String deleteMovement(@PathVariable String movementId) {
        Optional<Movement> movement = movementRepository.findById(movementId);

        if (movement.isPresent()) {
            movementRepository.deleteById(movementId);
            return movementId;
        } else {
            return null;
        }
    }

    @PutMapping("/modify/{movementId}")
    public Movement modifyMovement(
        @PathVariable String movementId,
        @RequestBody Map<String, String> requestBody
        )
    {
        String newMovement = requestBody.get("newMovement");

        Optional<Movement> optionalMovement = movementRepository.findById(movementId);

        if (optionalMovement.isPresent()) {
            Movement movement = optionalMovement.get();
            movement.setMovement(newMovement);

            Movement updatedMovement = movementRepository.save(movement);

            return updatedMovement;

        } else {
            return null;
        }
    }
}
