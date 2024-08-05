package com.example.demo.map.project;

import com.example.demo.map.Compte;
import jakarta.persistence.*;
import lombok.NonNull;

@Entity
public class Post {

    @Id
    private long id;

    @OneToOne(cascade = CascadeType.ALL)
    @NonNull
    @JoinColumn(name = "compte.id",referencedColumnName = "id")
    private Compte idUser;

    private String mainUserCommentary;

    private long numberOfLikes;


}
