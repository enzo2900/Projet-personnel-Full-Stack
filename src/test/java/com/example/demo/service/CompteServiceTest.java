package com.example.demo.service;

import com.example.demo.aspect.ParametersException;
import com.example.demo.map.Compte;
import com.example.demo.repository.CompteRepository;
import org.assertj.core.api.Assert;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.ResponseEntity;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.mock.env.MockEnvironment;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.transaction.annotation.Transactional;

import javax.sql.DataSource;
import java.sql.Connection;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

@Transactional

@SpringBootTest
@ContextConfiguration
class CompteServiceTest {


    @Autowired
     CompteRepository compteRepository;

    @Autowired
    PasswordEncoder passwordEncoder;


    @Autowired
     CompteService compteService;



    @Mock
    Compte compte;
    @Test

    void inscriptionTestOfACorrectCompte() throws ParametersException {
        //Given a CompteService and a new compte create

        compte = Compte.builder().username("TestInscription").password("1@Dsp.azae4").build();

        //WHEN this new compte register to the database
        compteService.inscription(compte);

        //Then this compte should be fetchable with his username
        Assertions.assertNotNull(compteRepository.findByUsername("TestInscription"),"The user can't be retrieved with his username.");

    }

    @Test
    void inscriptionTestOfAIncorrectCompte() throws ParametersException {
        //Given a CompteService and a new compte create

        compte = Compte.builder().username("").email("testMailTest24").password("TestPassword").build();

        //WHEN this new compte should not register to the database
        Assertions.assertThrows(ParametersException.class,() ->compteService.inscription(compte),"An exception did not occured to stop user creation.");


        //Then this compte should not be fetchable with his email
        Assertions.assertTrue(compteRepository.findByEmail("testMailTest24").isEmpty(),"The user was created, the username is not correctly verified or was changed.");

    }

    @Test
    void inscriptionTestWithBadPassword() throws ParametersException {
        //Given a CompteService and a new compte create

        compte = Compte.builder().username("TestInscriptionBasPass").password("TestPassword").build();

        //WHEN this new compte should not register to the database
        Assertions.assertThrows(ParametersException.class,() ->compteService.inscription(compte),"An exception did not occured to stop user creation.");

        //Then this compte should be fetchable with his username
        Assertions.assertTrue(compteRepository.findByUsername("TestInscriptionBasPass").isEmpty(),"The user was created, the password is not correctly verified or was changed.");

    }

    @Test
    void inscriptionTestPasswordWithNoUppercaseLetter() throws ParametersException {
        //Given a CompteService and a new compte create

        compte = Compte.builder().username("TestInscriptionBasPass").password("@spaea54ze").build();

        //WHEN this new compte should not register to the database
        Assertions.assertThrows(ParametersException.class,() ->compteService.inscription(compte),"An exception did not occured to stop user creation.");

        //Then this compte should be fetchable with his username
        Assertions.assertTrue(compteRepository.findByUsername("TestInscriptionBasPass").isEmpty(),"The user was created, the password is not correctly verified or was changed.");

    }

    @Test
    void inscriptionTestPasswordWithNoLowercaseLetter() throws ParametersException {
        //Given a CompteService and a new compte create

        compte = Compte.builder().username("TestInscriptionBasPass").password("@PAEA54ZE").build();

        //WHEN this new compte should not register to the database
        Assertions.assertThrows(ParametersException.class,() ->compteService.inscription(compte),"An exception did not occured to stop user creation.");

        //Then this compte should be fetchable with his username
        Assertions.assertTrue(compteRepository.findByUsername("TestInscriptionBasPass").isEmpty(),"The user was created, the password is not correctly verified or was changed.");

    }

    @Test
    void inscriptionTestPasswordWithNoSpecialCharacter() throws ParametersException {
        //Given a CompteService and a new compte create

        compte = Compte.builder().username("TestInscriptionBasPass").password("aPzeaA54treE").build();

        //WHEN this new compte should not register to the database
        Assertions.assertThrows(ParametersException.class,() ->compteService.inscription(compte),"An exception did not occured to stop user creation.");

        //Then this compte should be fetchable with his username
        Assertions.assertTrue((compteRepository.findByUsername("TestInscriptionBasPass").isEmpty()),"The user was created, the password is not correctly verified or was changed.");

    }
}