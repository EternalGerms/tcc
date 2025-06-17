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
  ToggleButton,
  ToggleButtonGroup,
  Stepper,
  Step,
  StepLabel,
} from '@mui/material';
import {
  Visibility,
  VisibilityOff,
  Email as EmailIcon,
  Lock as LockIcon,
  Person as PersonIcon,
  Phone as PhoneIcon,
  PersonAdd as PersonAddIcon,
  Build as BuildIcon,
  ShoppingCart as ShoppingCartIcon,
} from '@mui/icons-material';
import { toast } from 'react-toastify';
import authService from '../services/authService';
import { loginSuccess } from '../store/slices/authSlice';

const Register = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [userType, setUserType] = useState('cliente');
  const [activeStep, setActiveStep] = useState(0);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();

  const password = watch('senha');
  const steps = ['Tipo de Conta', 'Dados Pessoais', 'Confirmação'];

  const handleUserTypeChange = (event, newType) => {
    if (newType !== null) {
      setUserType(newType);
    }
  };

  const handleNext = () => {
    setActiveStep((prevStep) => prevStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };

  const onSubmit = async (data) => {
    setLoading(true);

    try {
      const userData = {
        ...data,
        tipo: userType,
      };

      const response = await authService.register(userData);
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
      toast.success('Cadastro realizado com sucesso!');
      navigate('/dashboard');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Erro ao realizar cadastro');
    } finally {
      setLoading(false);
    }
  };

  const renderStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <Box sx={{ textAlign: 'center', my: 4 }}>
            <Typography variant="h5" gutterBottom>
              Como você deseja usar a plataforma?
            </Typography>
            <ToggleButtonGroup
              value={userType}
              exclusive
              onChange={handleUserTypeChange}
              aria-label="tipo de usuário"
              sx={{ mt: 3 }}
            >
              <ToggleButton value="cliente" sx={{ px: 4, py: 2 }}>
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <ShoppingCartIcon sx={{ fontSize: 40, mb: 1 }} />
                  <Typography variant="h6">Cliente</Typography>
                  <Typography variant="body2">Buscar serviços</Typography>
                </Box>
              </ToggleButton>
              <ToggleButton value="prestador" sx={{ px: 4, py: 2 }}>
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <BuildIcon sx={{ fontSize: 40, mb: 1 }} />
                  <Typography variant="h6">Prestador</Typography>
                  <Typography variant="body2">Oferecer serviços</Typography>
                </Box>
              </ToggleButton>
            </ToggleButtonGroup>
            <Box sx={{ mt: 4 }}>
              <Button
                variant="contained"
                onClick={handleNext}
                sx={{ mt: 1 }}
              >
                Próximo
              </Button>
            </Box>
          </Box>
        );

      case 1:
        return (
          <Box>
            <Typography variant="h5" gutterBottom align="center">
              Preencha seus dados
            </Typography>
            
            <TextField
              fullWidth
              label="Nome Completo"
              margin="normal"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <PersonIcon />
                  </InputAdornment>
                ),
              }}
              {...register('nome', {
                required: 'Nome é obrigatório',
                minLength: {
                  value: 3,
                  message: 'Nome deve ter no mínimo 3 caracteres',
                },
              })}
              error={!!errors.nome}
              helperText={errors.nome?.message}
            />

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
              label="Telefone"
              margin="normal"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <PhoneIcon />
                  </InputAdornment>
                ),
              }}
              {...register('telefone', {
                pattern: {
                  value: /^\([0-9]{2}\) [0-9]{4,5}-[0-9]{4}$/,
                  message: 'Formato inválido. Use: (99) 99999-9999',
                },
              })}
              error={!!errors.telefone}
              helperText={errors.telefone?.message}
              placeholder="(99) 99999-9999"
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
                  value: 8,
                  message: 'Senha deve ter no mínimo 8 caracteres',
                },
                pattern: {
                  value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*#?&]{8,}$/,
                  message: 'Senha deve conter letras e números',
                },
              })}
              error={!!errors.senha}
              helperText={errors.senha?.message}
            />

            <TextField
              fullWidth
              label="Confirmar Senha"
              type="password"
              margin="normal"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LockIcon />
                  </InputAdornment>
                ),
              }}
              {...register('confirmarSenha', {
                required: 'Confirmação de senha é obrigatória',
                validate: (value) =>
                  value === password || 'As senhas não coincidem',
              })}
              error={!!errors.confirmarSenha}
              helperText={errors.confirmarSenha?.message}
            />

            <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 3 }}>
              <Button onClick={handleBack}>
                Voltar
              </Button>
              <Button
                variant="contained"
                onClick={handleNext}
              >
                Próximo
              </Button>
            </Box>
          </Box>
        );

      case 2:
        return (
          <Box sx={{ textAlign: 'center', my: 4 }}>
            <Avatar
              sx={{
                m: '0 auto',
                bgcolor: 'success.main',
                width: 80,
                height: 80,
                mb: 2,
              }}
            >
              <PersonAddIcon sx={{ fontSize: 40 }} />
            </Avatar>
            <Typography variant="h5" gutterBottom>
              Confirme seu cadastro
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
              Você está se cadastrando como <strong>{userType === 'cliente' ? 'Cliente' : 'Prestador de Serviços'}</strong>
            </Typography>
            
            <Alert severity="info" sx={{ mb: 3 }}>
              {userType === 'cliente' 
                ? 'Como cliente, você poderá buscar e contratar serviços de profissionais qualificados.'
                : 'Como prestador, você poderá oferecer seus serviços e ser contratado por clientes.'}
            </Alert>

            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Button onClick={handleBack}>
                Voltar
              </Button>
              <Button
                type="submit"
                variant="contained"
                disabled={loading}
                startIcon={loading ? <CircularProgress size={20} /> : <PersonAddIcon />}
              >
                {loading ? 'Cadastrando...' : 'Finalizar Cadastro'}
              </Button>
            </Box>
          </Box>
        );

      default:
        return null;
    }
  };

  return (
    <Container component="main" maxWidth="md">
      <Box
        sx={{
          marginTop: 4,
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
            width: '100%',
          }}
        >
          <Typography component="h1" variant="h4" align="center" sx={{ mb: 3 }}>
            Criar Nova Conta
          </Typography>

          <Stepper activeStep={activeStep} sx={{ mb: 4 }}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>

          <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ width: '100%' }}>
            {renderStepContent(activeStep)}
          </Box>

          <Divider sx={{ my: 3 }} />

          <Typography variant="body2" align="center">
            Já tem uma conta?{' '}
            <Link to="/login" style={{ textDecoration: 'none' }}>
              <Typography variant="body2" component="span" color="primary">
                Faça login
              </Typography>
            </Link>
          </Typography>
        </Paper>
      </Box>
    </Container>
  );
};

export default Register; 