package com.example.demo.aspect;

import com.example.demo.controller.HTMLController;
import com.fasterxml.jackson.core.JsonGenerator;
import com.fasterxml.jackson.core.util.JsonGeneratorDecorator;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import java.io.IOException;

@ControllerAdvice
public class SecurityHandler {

    @ExceptionHandler(AccessDeniedException.class)
    public ResponseEntity<ReponseHTTP> handle(AccessDeniedException ex) throws IOException {
        ex.response.sendError(403,"non autorisée");
        return null;
    }

    @ExceptionHandler(ParametersException.class)
    public ResponseEntity handleParametersException(ParametersException ex) {


        return ResponseEntity.status(400).body(ex.getMessage());
    }
}
