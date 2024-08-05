package com.example.demo.repository;

import com.example.demo.map.Jwt;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.stream.Stream;

@Repository
public interface JwtRepository extends JpaRepository<Jwt,Long> {

    Optional<Jwt> findByValeurAndExpire(String token,boolean expire);

    @Query("FROM Jwt j WHERE j.expire = :expire   AND j.compte.username = :email")
    Optional<Jwt> findTokenWithCompte(@Param("email")String username, @Param("expire") boolean expire);

    @Query("FROM Jwt j WHERE j.compte.username = :email")
    Stream<Jwt> findTokenWithEmail(@Param("email")String username);

    void deleteAllByExpire(boolean expire);
}
