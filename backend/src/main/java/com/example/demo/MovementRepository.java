package com.example.demo;

import org.springframework.data.mongodb.repository.MongoRepository;

public interface MovementRepository extends MongoRepository<Movement, String> {
    // You can define custom query methods here if needed
}