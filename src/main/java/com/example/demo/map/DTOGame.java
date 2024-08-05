package com.example.demo.map;

import jakarta.annotation.Nullable;
import jakarta.persistence.*;

@Entity
@Table(name ="Game")
public class DTOGame {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;


    private String name;


    private int note ;

    public DTOGame() {

    }

    public DTOGame (String name) {
        this.name = name;

    }

    public DTOGame (String name, int note) {
        this.name = name;
        this.note = note;
    }

    public DTOGame (long id, String name, int note) {
        this.id = id;
        this.name = name;
        this.note = note;
    }

    public String getName() {
        return this.name;
    }

    public int getNote() {
        return this.note;
    }

    public long getId() {
        return this.id;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setNote(int note ){
        this.note = note;
    }


}

