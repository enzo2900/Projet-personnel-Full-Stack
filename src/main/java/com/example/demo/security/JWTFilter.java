package com.example.demo.security;

import com.example.demo.map.Jwt;
import com.example.demo.repository.JwtRepository;
import com.example.demo.service.CompteService;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.stereotype.Service;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@Service
public class JWTFilter extends OncePerRequestFilter {


    private CompteService compteService;
    private JWTService jwtService;

    private JwtRepository jwtRepository;

    public JWTFilter(CompteService compteService, JWTService jwtService, JwtRepository jwtRepository) {
        this.compteService = compteService;
        this.jwtService = jwtService;
        this.jwtRepository = jwtRepository;
    }
    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        String username = null;
        String token= null;
        boolean isTokenExpired = true;
        Jwt tokenBd = null;

        final String authorization = request.getHeader("Authorization");

        if(authorization != null && authorization.startsWith("Bearer")) {
            token = authorization.substring(7);
            tokenBd = this.jwtService.tokenByValue(token);
            isTokenExpired = jwtService.isTokenExpired(token);
            username = jwtService.extractUsername(token);
        }

        if(!isTokenExpired
                && username != null && tokenBd != null
                && SecurityContextHolder.getContext().getAuthentication() ==null
         && tokenBd.getCompte().getUsername().equals(username)) {
            UserDetails userDetails = this.compteService.loadUserByUsername(username);
            UsernamePasswordAuthenticationToken authenticationToken =  new UsernamePasswordAuthenticationToken(userDetails,null,userDetails.getAuthorities());
            SecurityContextHolder.getContext().setAuthentication(authenticationToken);
        }
        filterChain.doFilter(request,response);
    }
}
