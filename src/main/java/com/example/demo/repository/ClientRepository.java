package com.example.demo.repository;

import com.example.demo.service.Client2;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;


public interface ClientRepository extends JpaRepository<Client2, Long> {
    Page<Client2> findAll(Pageable pageable);

    Client2 findByName(String name);

   @Query(value="SELECT * FROM client2 WHERE name LIKE :prefix% ",nativeQuery = true)
    Client2 findClientByFirst(@Param("prefix") String s) ;


}
