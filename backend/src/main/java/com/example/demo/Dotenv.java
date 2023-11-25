package com.example.demo;

import java.io.BufferedReader;
import java.io.FileReader;
import java.io.IOException;

public class Dotenv {
    public static void load() {
        try (BufferedReader br = new BufferedReader(new FileReader(".env"))) {
            String line;
            while ((line = br.readLine()) != null) {
                String[] parts = line.split("=");
                if (parts.length >= 2) {
                    String key = parts[0].trim();
                    String value = parts[1].trim();
                    System.setProperty(key, value);
                }
            }
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}

