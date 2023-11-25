package com.example.demo;

import java.util.Date;
import java.util.List;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.util.Pair;

@Document("Workouts")
public class Workout {
    @Id
    private String id;

    private Date date;
    private int duration;
    private List<Pair<Movement, String>> movements;
    private String description;

    public Workout(String id, Date date, int duration, List<Pair<Movement, String>> movements,
    String description) {
        super();
        this.id = id;
        this.date = date;
        this.duration = duration;
        this.movements = movements;
        this.description = description;
    }

    public String getId() {
        return id;

    }

    public Date getDate() {
        return date;
    }

    public int getDuration() {
        return duration;
    }

    public List<Pair<Movement, String>> getMovements() {
        return movements;
    }

    public String getDescription() {
        return description;
    }
}
