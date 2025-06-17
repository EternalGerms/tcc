package com.community.services.auth.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class RegisterRequestDTO {
    
    @NotBlank(message = "Nome é obrigatório")
    private String nome;
    
    @NotBlank(message = "Email é obrigatório")
    @Email(message = "Email inválido")
    private String email;
    
    @NotBlank(message = "Senha é obrigatória")
    @Pattern(regexp = "^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d@$!%*#?&]{8,}$", 
             message = "Senha deve ter no mínimo 8 caracteres, incluindo letras e números")
    private String senha;
    
    @NotBlank(message = "Tipo de usuário é obrigatório")
    @Pattern(regexp = "^(cliente|prestador)$", message = "Tipo deve ser 'cliente' ou 'prestador'")
    private String tipo;
    
    private String telefone;
} 