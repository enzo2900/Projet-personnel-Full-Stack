package com.example.demo.controller;

import com.example.demo.aspect.ParametersException;
import com.example.demo.dto.DTOAuthentification;
import com.example.demo.map.Compte;
import com.example.demo.security.JWTService;
import com.example.demo.service.ClientService;
import com.example.demo.service.CompteService;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
import java.util.Optional;

@RestController
@AllArgsConstructor
@RequestMapping(consumes = MediaType.APPLICATION_JSON_VALUE)
public class ConnectionController {


    @Autowired
    private JWTService jwtService;
    @Autowired
    private AuthenticationManager authenticationManager;
    @Autowired
    public CompteService compteService;
    @PostMapping(path = "/connect")
    public Map<String, String>UserConnection(@RequestBody DTOAuthentification dtoAuthentification) throws ParametersException {
        final Authentication authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(dtoAuthentification.username(),dtoAuthentification.password()));
        if(authentication.isAuthenticated()) {
            return this.jwtService.generate(authentication.getName());
        }
        return null;

    }

    @PostMapping(path = "/inscription")
    public ResponseEntity UserInscrption(@RequestBody Compte compte) throws ParametersException {
        return this.compteService.inscription(compte);
    }

    @PostMapping(path = "/deconnexion")
    public ResponseEntity deconnexion() {
        this.jwtService.deconnexion();
        return ResponseEntity.ok().body("Deconnexion");
    }
}
