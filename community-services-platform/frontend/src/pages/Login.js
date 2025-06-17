import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import {
  Container,
  Paper,
  TextField,
  Button,
  Typography,
  Box,
  Grid,
  Divider,
  IconButton,
  InputAdornment,
  Alert,
  CircularProgress,
  Avatar,
} from '@mui/material';
import {
  Visibility,
  VisibilityOff,
  Email as EmailIcon,
  Lock as LockIcon,
  Login as LoginIcon,
} from '@mui/icons-material';
import { toast } from 'react-toastify';
import authService from '../services/authService';
import { loginStart, loginSuccess, loginFailure } from '../store/slices/authSlice';

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    setLoading(true);
    dispatch(loginStart());

    try {
      const response = await authService.login(data);
      dispatch(
        loginSuccess({
          user: {
            id: response.userId,
            nome: response.nome,
            email: response.email,
            tipo: response.tipo,
          },
          token: response.token,
        })
      );
      toast.success('Login realizado com sucesso!');
      navigate('/dashboard');
    } catch (error) {
      dispatch(loginFailure(error.response?.data?.message || 'Erro ao fazer login'));
      toast.error(error.response?.data?.message || 'Erro ao fazer login');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container component="main" maxWidth="sm">
      <Box
        sx={{
          marginTop: 8,
          marginBottom: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Paper
          elevation={3}
          sx={{
            padding: 4,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            width: '100%',
          }}
        >
          <Avatar
            sx={{
              m: 1,
              bgcolor: 'primary.main',
              width: 56,
              height: 56,
            }}
          >
            <LoginIcon fontSize="large" />
          </Avatar>
          
          <Typography component="h1" variant="h4" sx={{ mb: 3 }}>
            Entrar na Plataforma
          </Typography>

          <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ width: '100%' }}>
            <TextField
              fullWidth
              label="Email"
              type="email"
              margin="normal"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <EmailIcon />
                  </InputAdornment>
                ),
              }}
              {...register('email', {
                required: 'Email é obrigatório',
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: 'Email inválido',
                },
              })}
              error={!!errors.email}
              helperText={errors.email?.message}
            />

            <TextField
              fullWidth
              label="Senha"
              type={showPassword ? 'text' : 'password'}
              margin="normal"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LockIcon />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={() => setShowPassword(!showPassword)}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              {...register('senha', {
                required: 'Senha é obrigatória',
                minLength: {
                  value: 6,
                  message: 'Senha deve ter no mínimo 6 caracteres',
                },
              })}
              error={!!errors.senha}
              helperText={errors.senha?.message}
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2, py: 1.5 }}
              disabled={loading}
              startIcon={loading ? <CircularProgress size={20} /> : <LoginIcon />}
            >
              {loading ? 'Entrando...' : 'Entrar'}
            </Button>

            <Grid container>
              <Grid item xs>
                <Link to="/forgot-password" style={{ textDecoration: 'none' }}>
                  <Typography variant="body2" color="primary">
                    Esqueceu sua senha?
                  </Typography>
                </Link>
              </Grid>
              <Grid item>
                <Link to="/register" style={{ textDecoration: 'none' }}>
                  <Typography variant="body2" color="primary">
                    Não tem uma conta? Cadastre-se
                  </Typography>
                </Link>
              </Grid>
            </Grid>

            <Divider sx={{ my: 3 }}>OU</Divider>

            <Alert severity="info" sx={{ mt: 2 }}>
              Use as credenciais de teste:
              <br />
              Cliente: cliente@teste.com / senha123
              <br />
              Prestador: prestador@teste.com / senha123
            </Alert>
          </Box>
        </Paper>
      </Box>
    </Container>
  );
};

export default Login; 