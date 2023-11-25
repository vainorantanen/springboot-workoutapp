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
@RequestMapping("/api/tasks")
public class TodoController {

    @Autowired
    private TodoTaskRepository todoTaskRepo;

    @GetMapping("/")
    public List<TodoTask> getAllTasks() {
        System.out.println("Getting tasks");
        List<TodoTask> tasks = todoTaskRepo.findAll();
        System.out.println("Get tasks: " + tasks);
        return tasks;
    }

    @PostMapping("/add")
    public TodoTask addTask(@RequestBody TodoTask todoTask) {
        TodoTask savedTask = todoTaskRepo.save(todoTask);
        System.out.println("Get savedTask: " + savedTask);
        return savedTask;
    }
}
