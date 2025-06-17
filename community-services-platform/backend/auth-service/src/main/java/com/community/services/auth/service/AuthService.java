package com.community.services.auth.service;

import com.community.services.auth.dto.AuthResponseDTO;
import com.community.services.auth.dto.LoginRequestDTO;
import com.community.services.auth.dto.RegisterRequestDTO;
import com.community.services.auth.model.Usuario;
import com.community.services.auth.repository.UsuarioRepository;
import com.community.services.auth.util.JwtUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashMap;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UsuarioRepository usuarioRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;
    private final AuthenticationManager authenticationManager;

    @Transactional
    public AuthResponseDTO register(RegisterRequestDTO request) {
        // Verificar se o email já existe
        if (usuarioRepository.existsByEmail(request.getEmail())) {
            throw new BadCredentialsException("Email já cadastrado");
        }

        // Criar novo usuário
        Usuario usuario = new Usuario();
        usuario.setNome(request.getNome());
        usuario.setEmail(request.getEmail());
        usuario.setSenha(passwordEncoder.encode(request.getSenha()));
        usuario.setTipo(request.getTipo());
        usuario.setTelefone(request.getTelefone());

        usuario = usuarioRepository.save(usuario);

        // Gerar token com informações extras
        Map<String, Object> extraClaims = new HashMap<>();
        extraClaims.put("userId", usuario.getId());
        extraClaims.put("tipo", usuario.getTipo());
        extraClaims.put("nome", usuario.getNome());

        String token = jwtUtil.generateToken(usuario, extraClaims);

        return new AuthResponseDTO(
                token,
                usuario.getTipo(),
                usuario.getId(),
                usuario.getNome(),
                usuario.getEmail()
        );
    }

    public AuthResponseDTO login(LoginRequestDTO request) {
        try {
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            request.getEmail(),
                            request.getSenha()
                    )
            );
        } catch (Exception e) {
            throw new BadCredentialsException("Credenciais inválidas");
        }

        Usuario usuario = usuarioRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new BadCredentialsException("Usuário não encontrado"));

        // Gerar token com informações extras
        Map<String, Object> extraClaims = new HashMap<>();
        extraClaims.put("userId", usuario.getId());
        extraClaims.put("tipo", usuario.getTipo());
        extraClaims.put("nome", usuario.getNome());

        String token = jwtUtil.generateToken(usuario, extraClaims);

        return new AuthResponseDTO(
                token,
                usuario.getTipo(),
                usuario.getId(),
                usuario.getNome(),
                usuario.getEmail()
        );
    }
} 