package com.example.demo.aspect;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Before;
import org.springframework.boot.SpringApplication;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;

import java.io.IOException;

@Aspect
@Component
public class Logging {

    private final HttpServletRequest request;
    private final HttpServletResponse response;
    public Logging(HttpServletRequest request, HttpServletResponse response) {
        this.request = request;
        this.response = response;
    }

    /*@Before("execution(* com.example.demo.controller.HelloController.*(..))")
    public void logVerification() throws Throwable {
        /*if (request.getHeader("key").equals("1")) {

        } else {
            throw new AccessDeniedException("Non autorisée", response);
            //return null;
        }
    }*/
}
