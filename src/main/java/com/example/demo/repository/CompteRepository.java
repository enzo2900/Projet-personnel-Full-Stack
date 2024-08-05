package com.example.demo.repository;

import com.example.demo.map.Compte;
import com.example.demo.service.Client2;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface CompteRepository extends JpaRepository<Compte,Long> {

    @Query(value="SELECT * FROM compte WHERE username = :prefix% ",nativeQuery = true)
    Optional<Compte> findClient(@Param("prefix") String s) ;

    Optional<Compte> findByUsername(String username);

    Optional<Compte> findByEmail(String email);
}
