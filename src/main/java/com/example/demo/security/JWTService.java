package com.example.demo.security;

import com.example.demo.dto.DTOAuthentification;
import com.example.demo.map.Compte;
import com.example.demo.map.Jwt;
import com.example.demo.repository.JwtRepository;
import com.example.demo.service.CompteService;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.security.Key;
import java.util.Date;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.function.Function;
import java.util.stream.Collectors;

@AllArgsConstructor
@Transactional
@Service
public class JWTService {

    private final String ENCRYPTION_KEY = "e4439c7e35d0a8bd1b21bad16ad82a1f21aa399eb3929bd29d2cd0a5c89539eb";
    @Autowired
    private CompteService compteService;

    @Autowired
    private JwtRepository jwtRepository;
    public Map<String,String> generate(String username) {
        Compte compte = compteService.loadUserByUsername(username);
        this.disableTokens(compte);
        final Map<String,String> jwtMap = this.generateJwt(compte);

        final Jwt jwt = Jwt
                .builder()
                .valeur(jwtMap.get("bearer"))
                .expire(false)
                .compte(compte)
                .build();
        this.jwtRepository.save(jwt);
        return jwtMap;

    }

    private Map<String,String> generateJwt(Compte compte) {
        final long currentTime = System.currentTimeMillis();
        final long expirationTime = currentTime + 20 * 60*1000;
        final Map<String, Object> json;
        if(compte.getEmail() == null) {
            json = Map.of(
                    "username", compte.getUsername(),
                    Claims.EXPIRATION, new Date(expirationTime));

        } else {
            json = Map.of(
                    "username", compte.getUsername(),
                    Claims.EXPIRATION, new Date(expirationTime));
            /*json = Map.of(
                    "username", compte.getUsername(),
                    Claims.EXPIRATION, new Date(expirationTime),
                    Claims.SUBJECT, compte.getEmail());*/
        }
        final String bearer = Jwts.builder().
                issuedAt(new Date(currentTime))
                .expiration(new Date(expirationTime)).
                subject(compte.getUsername())
                .claims(json)
                .signWith(getKey(), SignatureAlgorithm.HS256)
                .compact();
        return Map.of("bearer",bearer,
                "durationMinutes",""+(expirationTime/1000/60 - currentTime/1000/60)
        );
    }

    private Key getKey() {
        final byte[] decoder = Decoders.BASE64.decode(ENCRYPTION_KEY);

        return Keys.hmacShaKeyFor(decoder);
    }

    public String extractUsername(String token) {
        return this.getClaim(token,Claims::getSubject);
    }

    public boolean isTokenExpired(String token) {
        Date expirationDate = this.getClaim(token,Claims::getExpiration);
        return expirationDate.before(new Date());
    }


    private <T> T getClaim(String token, Function<Claims,T> function) {
        Claims claims = getAllClaims(token);
        return function.apply(claims);
    }

    private Claims getAllClaims(String token) {
        return Jwts.parser()
                .setSigningKey(this.getKey())
                .build()
                .parseClaimsJws(token)
                .getBody();
    }

    public Jwt tokenByValue(String token) {
        return this.jwtRepository.findByValeurAndExpire(token,false)
                .orElseThrow(()-> new RuntimeException("Token inconnu"));
    }

    public void deconnexion() {
        Compte compte = (Compte)SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        Jwt jwt =  this.jwtRepository.findTokenWithCompte(compte.getUsername(),false)
                .orElseThrow(()-> new RuntimeException("Token invalide"));
        jwt.setExpire(true);
        this.jwtRepository.save(jwt);

    }
    private void disableTokens(Compte compte) {
        final List<Jwt> jwtList = this.jwtRepository.findTokenWithEmail(compte.getUsername()).peek(
                jwt -> {

                    jwt.setExpire(true);
                }
        ).collect(Collectors.toList());

        this.jwtRepository.saveAll(jwtList);
    }

    @Scheduled(cron = "0 */30 * * * *")
    public void removeUselessJwt() {
        this.jwtRepository.deleteAllByExpire(true);
    }

    public Map<String,String> tokenAvailable(Jwt token) {

        Optional<Jwt> jwt = jwtRepository.findByValeurAndExpire(token.getValeur(),false);
        Map<String,String> json;
        if(jwt.isPresent()) {
            json = Map.of(
                    "available","true"
            );
        } else {
            json = Map.of(
                    "available","false"
            );
        }

        return json;
    }
}
