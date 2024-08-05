package com.example.demo.repository;

import com.example.demo.map.DTOGame;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface GameRepository extends JpaRepository<DTOGame,Long> {


}
