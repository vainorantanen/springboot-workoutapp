package com.example.demo;

import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.bson.json.JsonObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.util.Pair;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
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

    @PostMapping("/addMovementToWorkout/{workoutId}")
    public Workout addMovementToWorkout(
        @PathVariable String workoutId,
        @RequestBody ObjectNode requestBody
    ) {
        String description = requestBody.get("description").asText();

        // Assuming "movementToAdd" is a JSON object representing the Movement
        JsonNode movementNode = requestBody.get("movementToAdd");
        ObjectMapper objectMapper = new ObjectMapper();
        Movement movement = objectMapper.convertValue(movementNode, Movement.class);
        Optional<Workout> optionalWorkout = workoutRepository.findById(workoutId);
        if (optionalWorkout.isPresent()) {
            Workout workout = optionalWorkout.get();
            Pair<Movement, String> movementDescriptionPair = Pair.of(movement, description);
            workout.getMovements().add(movementDescriptionPair);
            Workout savedWorkout = workoutRepository.save(workout);
            return savedWorkout;
        } else {
            // Handle case where workout ID is not found
            // You can throw an exception or handle it based on your application logic
             System.out.println("ID not found");
            return null;
        }
    }

    @DeleteMapping("/delete/{workoutId}")
public String deleteWorkout(@PathVariable String workoutId) {
    Optional<Workout> optionalWorkout = workoutRepository.findById(workoutId);
    if (optionalWorkout.isPresent()) {
        workoutRepository.deleteById(workoutId);
        return workoutId;
    } else {
        return null;
    }
}

@PutMapping("/modifyDescription/{workoutId}")
public Workout modifyWorkoutDescription(
    @PathVariable String workoutId,
    @RequestBody Map<String, String> requestBody
) {
    String newDescription = requestBody.get("newDescription");
    System.out.println(newDescription);
    Optional<Workout> optionalWorkout = workoutRepository.findById(workoutId);
    
    if (optionalWorkout.isPresent()) {
        Workout workout = optionalWorkout.get();
        workout.setDescription(newDescription);
        
        // Save the updated workout with the new description
        Workout updatedWorkout = workoutRepository.save(workout);
        
        System.out.println(updatedWorkout);
        return updatedWorkout;
    } else {
        // Handle case where workout ID is not found
        // You can throw an exception or handle it based on your application logic
        return null;
    }
}

}

