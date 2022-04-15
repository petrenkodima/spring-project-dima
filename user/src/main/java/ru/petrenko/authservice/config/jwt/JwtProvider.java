package ru.petrenko.authservice.config.jwt;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import io.jsonwebtoken.*;
import lombok.extern.java.Log;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import ru.petrenko.authservice.entity.User;

import java.time.LocalDate;
import java.time.ZoneId;
import java.util.Date;

@Component
@Log
public class JwtProvider {

    @Value("$(jwt.secret)")
    private String jwtSecret;

    public String generateToken(User user) throws JsonProcessingException {
        Date date = Date.from(LocalDate.now().plusDays(7).atStartOfDay(ZoneId.systemDefault()).toInstant());
        ObjectMapper objectMapper = new ObjectMapper();
        return Jwts.builder()
                .setSubject(objectMapper.writeValueAsString(user))
                .setExpiration(date)
                .signWith(SignatureAlgorithm.HS512, jwtSecret)
                .compact();
    }

    public boolean validateToken(String token) {
        try {
            Jwts.parser().setSigningKey(jwtSecret).parseClaimsJws(token);
            return true;
        } catch (ExpiredJwtException expEx) {
            log.severe("Token expired");
        } catch (UnsupportedJwtException unsEx) {
            log.severe("Unsupported jwt");
        } catch (MalformedJwtException mjEx) {
            log.severe("Malformed jwt");
        } catch (SignatureException sEx) {
            log.severe("Invalid signature");
        } catch (Exception e) {
            log.severe("Invalid token");
        }
        return false;
    }


    public User getUserFromToken(String token) throws JsonProcessingException {
        Claims claims = Jwts.parser().setSigningKey(jwtSecret).parseClaimsJws(token).getBody();
        ObjectMapper objectMapper = new ObjectMapper();
        return objectMapper.readValue(claims.getSubject(),User.class);
    }
}