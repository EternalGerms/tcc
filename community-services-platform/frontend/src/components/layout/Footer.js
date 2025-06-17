import React from 'react';
import { Box, Container, Grid, Typography, Link, IconButton } from '@mui/material';
import {
  Facebook as FacebookIcon,
  Twitter as TwitterIcon,
  Instagram as InstagramIcon,
  LinkedIn as LinkedInIcon,
  Email as EmailIcon,
  Phone as PhoneIcon,
  LocationOn as LocationIcon,
} from '@mui/icons-material';

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: '#1976d2',
        color: 'white',
        py: 6,
        mt: 'auto',
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <Typography variant="h6" gutterBottom>
              Serviços Comunitários
            </Typography>
            <Typography variant="body2" sx={{ mb: 2 }}>
              Conectando profissionais e clientes em sua comunidade. 
              Encontre serviços de qualidade de forma rápida e segura.
            </Typography>
            <Box>
              <IconButton color="inherit" aria-label="Facebook">
                <FacebookIcon />
              </IconButton>
              <IconButton color="inherit" aria-label="Twitter">
                <TwitterIcon />
              </IconButton>
              <IconButton color="inherit" aria-label="Instagram">
                <InstagramIcon />
              </IconButton>
              <IconButton color="inherit" aria-label="LinkedIn">
                <LinkedInIcon />
              </IconButton>
            </Box>
          </Grid>

          <Grid item xs={12} md={4}>
            <Typography variant="h6" gutterBottom>
              Links Úteis
            </Typography>
            <Link href="/about" color="inherit" display="block" sx={{ mb: 1 }}>
              Sobre Nós
            </Link>
            <Link href="/services" color="inherit" display="block" sx={{ mb: 1 }}>
              Serviços
            </Link>
            <Link href="/faq" color="inherit" display="block" sx={{ mb: 1 }}>
              Perguntas Frequentes
            </Link>
            <Link href="/terms" color="inherit" display="block" sx={{ mb: 1 }}>
              Termos de Uso
            </Link>
            <Link href="/privacy" color="inherit" display="block" sx={{ mb: 1 }}>
              Política de Privacidade
            </Link>
          </Grid>

          <Grid item xs={12} md={4}>
            <Typography variant="h6" gutterBottom>
              Contato
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
              <EmailIcon sx={{ mr: 1 }} />
              <Typography variant="body2">
                contato@servicoscomunitarios.com.br
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
              <PhoneIcon sx={{ mr: 1 }} />
              <Typography variant="body2">
                (11) 1234-5678
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'flex-start' }}>
              <LocationIcon sx={{ mr: 1 }} />
              <Typography variant="body2">
                Rua dos Serviços, 123<br />
                Bairro Comunidade<br />
                São Paulo - SP
              </Typography>
            </Box>
          </Grid>
        </Grid>

        <Box mt={5}>
          <Typography variant="body2" align="center">
            © {new Date().getFullYear()} Serviços Comunitários. Todos os direitos reservados.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer; 