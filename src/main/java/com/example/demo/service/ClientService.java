package com.example.demo.service;

import com.example.demo.repository.ClientRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ClientService {
    @Autowired
    private ClientRepository clientRepo;



    public List<Client2> findAll() {
        return clientRepo.findAll();
    }

    public Client2 createClient(Client2 client) {
        return clientRepo.save(client);
    }

    public  Client2 findSpecificClient(String name) {
        return clientRepo.findByName(name);
    }

    public Client2 findClientWithSpecific(String s) {
        return clientRepo.findClientByFirst(s) ;
    }

}
