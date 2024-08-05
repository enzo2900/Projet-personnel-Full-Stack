package com.example.demo.service;

import com.example.demo.map.DTOGame;
import com.example.demo.repository.GameRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.List;

@Service
public class GameService {

    private GameRepository gameRepository;

    public GameService(GameRepository gameRepository) {
        this.gameRepository = gameRepository;
    }

    public DTOGame CreateGame(@RequestBody DTOGame game) {
        return gameRepository.save(game);
    }

    public DTOGame UpdateGame( DTOGame game) {
        DTOGame existingGame = gameRepository.getReferenceById(game.getId());
        existingGame.setName(game.getName());
        existingGame.setNote(game.getNote());
        return gameRepository.save(existingGame);
    }

    public void DeleteGame(Long id) {
        gameRepository.delete(gameRepository.getReferenceById(id));
    }

    public List<DTOGame> getAllGames() {
        return gameRepository.findAll();
    }
}
