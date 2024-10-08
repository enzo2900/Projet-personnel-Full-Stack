package com.example.demo.map.project;

import com.example.demo.map.Compte;
import jakarta.persistence.*;
import org.springframework.lang.NonNull;

@Entity
public class PostCommentary {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @ManyToOne(cascade = {CascadeType.DETACH, CascadeType.MERGE})
    @NonNull
    @JoinColumn(name = "post.id", referencedColumnName = "id")
    private Post idPost;

    @OneToOne(cascade = CascadeType.ALL)
    @NonNull
    @JoinColumn(name = "compte.id", referencedColumnName = "id")
    private Compte idUser;

    @NonNull
    private String commentary;



}
