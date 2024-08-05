package com.example.demo.controller;

import com.example.demo.map.DTOGame;
import com.example.demo.service.GameService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class GameController {

    private GameService gameService;

    public GameController(GameService game) {
        this.gameService = game;
    }

    @PutMapping("/game/create")
    public ResponseEntity<DTOGame> CreateGame(@RequestBody DTOGame game) {
        return ResponseEntity.ok(gameService.CreateGame(game));
    }

    @GetMapping(path = "/game")
    public List<DTOGame> getAllGames() {
        return gameService.getAllGames();
    }

    @PostMapping(path = "/game/update")
    public ResponseEntity<DTOGame> updateGame(@RequestBody DTOGame game) {
        return  ResponseEntity.ok(gameService.UpdateGame(game));
    }

    @DeleteMapping(path="/game/delete")
    public ResponseEntity<HttpStatus>  deleteGame(@RequestParam(value="id") String id) {
        gameService.DeleteGame(Long.parseLong(id));
        return ResponseEntity.ok(HttpStatus.ACCEPTED);
    }
}

