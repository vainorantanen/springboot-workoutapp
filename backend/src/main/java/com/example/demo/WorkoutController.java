package com.example.demo;

import java.util.List;
import java.util.Optional;

import org.bson.json.JsonObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.util.Pair;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ObjectNode;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/workouts")
public class WorkoutController {
    

    @Autowired
    private WorkoutRepository workoutRepository;

    @GetMapping("/")
    public List<Workout> getWorkouts() {
        System.out.println("Getting workouts");
        List<Workout> workouts = workoutRepository.findAll();
        return workouts;
    }

    @PostMapping("/add")
    public Workout addWorkout(@RequestBody Workout workout) {
        Workout savedWorkout = workoutRepository.save(workout);
        return savedWorkout;
    }

    @PostMapping("/addMovementToWorkout")
    public Workout addMovementToWorkout(
        @RequestBody ObjectNode requestBody
    ) {
        System.out.println("RequestBody" + requestBody);
        String workoutId = requestBody.get("workoutId").asText(); // Corrected typo in "workoudId"
        String description = requestBody.get("description").asText();

        // Assuming "movementToAdd" is a JSON object representing the Movement
        JsonNode movementNode = requestBody.get("movementToAdd");
        ObjectMapper objectMapper = new ObjectMapper();
        Movement movement = objectMapper.convertValue(movementNode, Movement.class);
        Optional<Workout> optionalWorkout = workoutRepository.findById(workoutId);
        System.out.println("Optional: " + optionalWorkout);
        if (optionalWorkout.isPresent()) {
            Workout workout = optionalWorkout.get();
            System.out.println("Workout: " + workout);
            Pair<Movement, String> movementDescriptionPair = Pair.of(movement, description);
             System.out.println("pair: " + movementDescriptionPair);
            workout.getMovements().add(movementDescriptionPair);
            Workout savedWorkout = workoutRepository.save(workout);
             System.out.println("saved: " + savedWorkout);
            return savedWorkout;
        } else {
            // Handle case where workout ID is not found
            // You can throw an exception or handle it based on your application logic
             System.out.println("ID not found");
            return null;
        }
    }
}

