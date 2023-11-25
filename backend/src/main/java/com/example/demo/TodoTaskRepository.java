package com.example.demo;

import org.springframework.data.mongodb.repository.MongoRepository;

public interface TodoTaskRepository extends MongoRepository<TodoTask, String> {
    // You can define custom query methods here if needed
}
