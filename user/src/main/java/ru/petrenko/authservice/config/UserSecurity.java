package ru.petrenko.authservice.config;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import ru.petrenko.authservice.entity.User;

import java.util.Collection;
import java.util.Collections;

public class UserSecurity implements UserDetails {

    private String login;
    private String password;
    private Collection<? extends GrantedAuthority> grantedAuthorities;

    public static UserSecurity fromUserEntityToCustomUserDetails(User user) {
        UserSecurity userSecurity = new UserSecurity();
        userSecurity.login = user.getLogin();
        userSecurity.password = user.getPassword();
        userSecurity.grantedAuthorities = Collections.singletonList(new SimpleGrantedAuthority(user.getRole().getName()));
        return userSecurity;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return grantedAuthorities;
    }

    @Override
    public String getPassword() {
        return password;
    }

    @Override
    public String getUsername() {
        return login;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }
}
