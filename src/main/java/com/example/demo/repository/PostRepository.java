package com.example.demo.repository;

import com.example.demo.map.project.Post;
import org.springframework.data.domain.Page;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.lang.reflect.Array;
import java.util.List;

public interface PostRepository extends JpaRepository<Post,Long> {

    @Query("SELECT u FROM Post u order by u.dateCreation desc")
    List<Post> getAllPost() ;

}
