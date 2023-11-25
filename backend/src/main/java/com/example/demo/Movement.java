package com.example.demo;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document("Movement")
public class Movement {
    @Id
    private String id;

    private String movement;

    public Movement() {
        // Empty constructor for Jackson deserialization
    }

    public Movement(String id, String movement) {
        super();
        this.id = id;
        this.movement = movement;
    }

    public String getId() {
        return id;
    }

    public String getMovement() {
        return movement;
    }
}
