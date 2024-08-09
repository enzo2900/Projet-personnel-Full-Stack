package com.example.demo.map.project;

import com.example.demo.map.Compte;
import jakarta.persistence.*;
import lombok.*;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Setter
@Getter
public class Post {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @ManyToOne(cascade = {CascadeType.DETACH, CascadeType.MERGE})
    @NonNull
    @JoinColumn(name = "compte.id",referencedColumnName = "id")
    private Compte idUser;

    private String mainUserCommentary;

    private long numberOfLikes;


}
