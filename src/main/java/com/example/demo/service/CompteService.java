package com.example.demo.service;

import com.example.demo.aspect.ParametersException;
import com.example.demo.map.Compte;
import com.example.demo.map.Role;
import com.example.demo.map.RoleType;
import com.example.demo.repository.CompteRepository;
import lombok.AllArgsConstructor;
import org.apache.coyote.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;


import java.time.LocalDate;
import java.util.Date;
import java.util.Optional;


@Service
@AllArgsConstructor
public class CompteService implements UserDetailsService {

    @Autowired
    private CompteRepository compteRepository;
    @Autowired
    private PasswordEncoder passwordEncoder;

    private static final String MESSAGE_ERREUR = "Votre identifiant ou mot de passe est incorrect";

    public ResponseEntity inscription(Compte compte) throws ParametersException {
        /*if(!compte.getPassword().matches("[0-9]{1,}[a-z]{1,}[A-Z]{1,}[:punct:]{1,}")){
            throw new ParametersException("MDP non valide");
        }*/
        Optional<Compte> compteVerification = this.compteRepository.findByUsername(compte.getUsername());

        if(compteVerification.isPresent()) {
            throw new ParametersException("L'email ou votre mot de passe n'est pas correcte");
        }
        if(compte.getEmail() !=null) {
            compteVerification =this.compteRepository.findByEmail(compte.getEmail());
            if(compteVerification.isPresent()) {
                throw new ParametersException("L'email ou votre mot de passe n'est pas correcte");
            }
        }

        String mdpEncode = this.passwordEncoder.encode(compte.getPassword());
        compte.setPassword(mdpEncode);
        Role role = new Role();
        role.setType(RoleType.USER);
        compte.setRole(role);
        if(compte.getDate() == null) {
            compte.setDate(new Date());
        }
         this.compteRepository.save(compte);
        return ResponseEntity.ok("Votre compte a été créé");
    }
    public  ResponseEntity  VerifyConnectionData(Compte compte) throws ParametersException {
        String username = compte.getUsername();
        String password = compte.getPassword();
        if(dataIsCorrect(username,password)) {
            Optional<Compte> compteVerification = this.compteRepository.findClient(compte.getUsername());

            if(!compteVerification.isPresent()) {
                throw new ParametersException(MESSAGE_ERREUR);
            }
            if(!compteVerification.get().getPassword().equals(passwordEncoder.encode(compte.getPassword()))) {
                throw new ParametersException(MESSAGE_ERREUR);
            }
            return ResponseEntity.status(400).body("Vous êtes connectés");



        } else {
            throw new ParametersException(MESSAGE_ERREUR);
        }
    }

    private boolean dataIsCorrect(String username,String password) {
        return username != null && !username.isEmpty()
                && password != null  && password.isEmpty();

    }

    @Override
    public Compte loadUserByUsername(String username) throws UsernameNotFoundException {
        Compte compte;
        try {
            compte = this.compteRepository.findByUsername(username).orElseThrow(() -> new UsernameNotFoundException(MESSAGE_ERREUR));
        } catch( UsernameNotFoundException ex) {
            compte = this.compteRepository.findByEmail(username).orElseThrow(() -> new UsernameNotFoundException(MESSAGE_ERREUR));
        }

        return compte;
    }
}
