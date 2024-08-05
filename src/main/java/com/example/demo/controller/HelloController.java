package com.example.demo.controller;

import ch.qos.logback.core.net.server.Client;
import com.example.demo.service.Client2;
import com.example.demo.service.ClientService;
import com.example.demo.service.Personne;
import com.example.demo.AnnotationTest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@AnnotationTest(test = "Hello")
public class HelloController {

    @GetMapping("/")
    public String index() {
        return "Greetings from Spring Boot!";
    }

    @Autowired
    private ClientService clientService;
    @RequestMapping("/Hello")
    @ResponseBody
    public String sayHello() {
        return "Hello.html";
    }

    @GetMapping("/greeting")
    public Personne greeting(@RequestParam(value = "n", defaultValue = "World") String name) {
        return new Personne(1, "Hello, " + name);
    }

    @GetMapping("/client")
    public List<Client2> getAllClients() {
        return clientService.findAll();
    }

    @PutMapping("/clientC")
    public ResponseEntity<Client2> addClient(@RequestBody Client2 client) {
        return ResponseEntity.ok(clientService.createClient(client));
    }

    @GetMapping("/client/get")
    public Client2 getClientByName(@RequestParam(value="name") String name) {
        return clientService.findSpecificClient(name);
    }

    @GetMapping("/client/e")
    public Client2 getClientWithSpecifif(@RequestParam(value="prefix") String s) {
        return clientService.findClientWithSpecific(s);
    }
}
