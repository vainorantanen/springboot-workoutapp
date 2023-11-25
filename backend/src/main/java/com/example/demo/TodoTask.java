package com.example.demo;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document("TodoTasks")
public class TodoTask {
    @Id
    private String id;

    private String content;

    public TodoTask(String id, String content) {
        super();
        this.id = id;
        this.content = content;
    }

    public String getId() {
        return id;
    }

    public String getContent() {
        return content;
    }
}
