package com.example.demo;

import org.springframework.data.mongodb.repository.MongoRepository;

public interface WorkoutRepository extends MongoRepository<Workout, String> {
    // You can define custom query methods here if needed
}
