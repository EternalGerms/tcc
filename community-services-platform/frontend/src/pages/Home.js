import React from 'react';
import { Link } from 'react-router-dom';
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Button,
  Paper,
  Avatar,
  Rating,
  Chip,
} from '@mui/material';
import {
  Build as BuildIcon,
  CleaningServices as CleaningIcon,
  Grass as GrassIcon,
  Brush as BrushIcon,
  Bolt as BoltIcon,
  Water as WaterIcon,
  Search as SearchIcon,
  Star as StarIcon,
  TrendingUp as TrendingUpIcon,
  Security as SecurityIcon,
  Speed as SpeedIcon,
} from '@mui/icons-material';

const Home = () => {
  const categories = [
    { id: 1, name: 'Manutenção', icon: <BuildIcon />, color: '#FF6B6B' },
    { id: 2, name: 'Limpeza', icon: <CleaningIcon />, color: '#4ECDC4' },
    { id: 3, name: 'Jardinagem', icon: <GrassIcon />, color: '#45B7D1' },
    { id: 4, name: 'Pintura', icon: <BrushIcon />, color: '#F7DC6F' },
    { id: 5, name: 'Elétrica', icon: <BoltIcon />, color: '#BB8FCE' },
    { id: 6, name: 'Hidráulica', icon: <WaterIcon />, color: '#85C1E2' },
  ];

  const featuredProviders = [
    {
      id: 1,
      name: 'João Silva',
      service: 'Eletricista',
      rating: 4.8,
      reviews: 127,
      image: 'https://via.placeholder.com/150',
    },
    {
      id: 2,
      name: 'Maria Santos',
      service: 'Diarista',
      rating: 4.9,
      reviews: 89,
      image: 'https://via.placeholder.com/150',
    },
    {
      id: 3,
      name: 'Pedro Costa',
      service: 'Encanador',
      rating: 4.7,
      reviews: 156,
      image: 'https://via.placeholder.com/150',
    },
  ];

  const features = [
    {
      icon: <SecurityIcon sx={{ fontSize: 40 }} />,
      title: 'Segurança Garantida',
      description: 'Todos os profissionais são verificados e avaliados pela comunidade.',
    },
    {
      icon: <SpeedIcon sx={{ fontSize: 40 }} />,
      title: 'Rápido e Eficiente',
      description: 'Encontre o profissional ideal em minutos, não em horas.',
    },
    {
      icon: <TrendingUpIcon sx={{ fontSize: 40 }} />,
      title: 'Preços Justos',
      description: 'Compare orçamentos e escolha o melhor custo-benefício.',
    },
  ];

  return (
    <Box>
      {/* Hero Section */}
      <Box
        sx={{
          background: 'linear-gradient(135deg, #1976d2 0%, #42a5f5 100%)',
          color: 'white',
          py: 10,
          mb: 8,
        }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={6}>
              <Typography
                variant="h2"
                component="h1"
                gutterBottom
                sx={{ fontWeight: 'bold' }}
              >
                Encontre os Melhores Profissionais da sua Comunidade
              </Typography>
              <Typography variant="h5" sx={{ mb: 4, opacity: 0.9 }}>
                Conectamos você aos prestadores de serviço mais qualificados da região.
                Rápido, seguro e confiável.
              </Typography>
              <Box sx={{ display: 'flex', gap: 2 }}>
                <Button
                  variant="contained"
                  size="large"
                  color="secondary"
                  component={Link}
                  to="/services"
                  startIcon={<SearchIcon />}
                >
                  Buscar Serviços
                </Button>
                <Button
                  variant="outlined"
                  size="large"
                  sx={{ color: 'white', borderColor: 'white' }}
                  component={Link}
                  to="/register"
                >
                  Cadastrar como Prestador
                </Button>
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box
                component="img"
                src="https://via.placeholder.com/600x400"
                alt="Serviços Comunitários"
                sx={{
                  width: '100%',
                  borderRadius: 2,
                  boxShadow: '0 20px 40px rgba(0,0,0,0.2)',
                }}
              />
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Categories Section */}
      <Container maxWidth="lg" sx={{ mb: 8 }}>
        <Typography variant="h3" align="center" gutterBottom sx={{ mb: 4 }}>
          Categorias Populares
        </Typography>
        <Grid container spacing={3}>
          {categories.map((category) => (
            <Grid item xs={6} sm={4} md={2} key={category.id}>
              <Card
                sx={{
                  textAlign: 'center',
                  cursor: 'pointer',
                  transition: 'transform 0.3s',
                  '&:hover': {
                    transform: 'translateY(-10px)',
                  },
                }}
                component={Link}
                to={`/services?category=${category.id}`}
              >
                <CardContent>
                  <Avatar
                    sx={{
                      bgcolor: category.color,
                      width: 60,
                      height: 60,
                      margin: '0 auto',
                      mb: 2,
                    }}
                  >
                    {category.icon}
                  </Avatar>
                  <Typography variant="h6">{category.name}</Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Featured Providers */}
      <Box sx={{ bgcolor: '#f5f5f5', py: 8 }}>
        <Container maxWidth="lg">
          <Typography variant="h3" align="center" gutterBottom sx={{ mb: 4 }}>
            Profissionais em Destaque
          </Typography>
          <Grid container spacing={4}>
            {featuredProviders.map((provider) => (
              <Grid item xs={12} md={4} key={provider.id}>
                <Card sx={{ height: '100%' }}>
                  <CardMedia
                    component="img"
                    height="200"
                    image={provider.image}
                    alt={provider.name}
                  />
                  <CardContent>
                    <Typography variant="h5" gutterBottom>
                      {provider.name}
                    </Typography>
                    <Typography variant="body1" color="text.secondary" gutterBottom>
                      {provider.service}
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', mt: 2 }}>
                      <Rating value={provider.rating} precision={0.1} readOnly />
                      <Typography variant="body2" sx={{ ml: 1 }}>
                        {provider.rating} ({provider.reviews} avaliações)
                      </Typography>
                    </Box>
                    <Button
                      variant="contained"
                      fullWidth
                      sx={{ mt: 2 }}
                      component={Link}
                      to={`/provider/${provider.id}`}
                    >
                      Ver Perfil
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Features Section */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Typography variant="h3" align="center" gutterBottom sx={{ mb: 6 }}>
          Por que escolher nossa plataforma?
        </Typography>
        <Grid container spacing={4}>
          {features.map((feature, index) => (
            <Grid item xs={12} md={4} key={index}>
              <Paper
                elevation={0}
                sx={{
                  p: 4,
                  textAlign: 'center',
                  height: '100%',
                  border: '2px solid #e0e0e0',
                  borderRadius: 2,
                }}
              >
                <Box sx={{ color: 'primary.main', mb: 2 }}>{feature.icon}</Box>
                <Typography variant="h5" gutterBottom>
                  {feature.title}
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  {feature.description}
                </Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* CTA Section */}
      <Box
        sx={{
          background: 'linear-gradient(135deg, #dc004e 0%, #e33371 100%)',
          color: 'white',
          py: 8,
          textAlign: 'center',
        }}
      >
        <Container maxWidth="md">
          <Typography variant="h3" gutterBottom>
            Pronto para começar?
          </Typography>
          <Typography variant="h6" sx={{ mb: 4 }}>
            Junte-se a milhares de pessoas que já encontraram os melhores profissionais
            em nossa plataforma.
          </Typography>
          <Button
            variant="contained"
            size="large"
            sx={{
              bgcolor: 'white',
              color: 'secondary.main',
              '&:hover': {
                bgcolor: 'grey.100',
              },
            }}
            component={Link}
            to="/register"
          >
            Cadastre-se Gratuitamente
          </Button>
        </Container>
      </Box>
    </Box>
  );
};

export default Home; 