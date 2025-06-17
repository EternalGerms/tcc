import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Menu,
  MenuItem,
  Box,
  Avatar,
  Drawer,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Divider,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import {
  Menu as MenuIcon,
  Home as HomeIcon,
  Build as BuildIcon,
  Person as PersonIcon,
  Dashboard as DashboardIcon,
  Logout as LogoutIcon,
  Login as LoginIcon,
  PersonAdd as PersonAddIcon,
} from '@mui/icons-material';
import { logout } from '../../store/slices/authSlice';
import { toast } from 'react-toastify';

const Navbar = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isAuthenticated, user } = useSelector((state) => state.auth);

  const [anchorEl, setAnchorEl] = useState(null);
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
    toast.success('Logout realizado com sucesso!');
    handleClose();
  };

  const menuItems = [
    { text: 'Início', icon: <HomeIcon />, path: '/' },
    { text: 'Serviços', icon: <BuildIcon />, path: '/services' },
  ];

  const authMenuItems = isAuthenticated
    ? [
        { text: 'Dashboard', icon: <DashboardIcon />, path: '/dashboard' },
        { text: 'Perfil', icon: <PersonIcon />, path: '/profile' },
        { text: 'Sair', icon: <LogoutIcon />, action: handleLogout },
      ]
    : [
        { text: 'Entrar', icon: <LoginIcon />, path: '/login' },
        { text: 'Cadastrar', icon: <PersonAddIcon />, path: '/register' },
      ];

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        Serviços Comunitários
      </Typography>
      <Divider />
      <List>
        {menuItems.map((item) => (
          <ListItem key={item.text} disablePadding>
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText primary={item.text} />
          </ListItem>
        ))}
        <Divider sx={{ my: 1 }} />
        {authMenuItems.map((item) => (
          <ListItem
            key={item.text}
            disablePadding
            onClick={item.action || (() => navigate(item.path))}
          >
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText primary={item.text} />
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <>
      <AppBar position="sticky" elevation={2}>
        <Toolbar>
          {isMobile && (
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
          )}

          <Typography
            variant="h6"
            component={Link}
            to="/"
            sx={{
              flexGrow: 1,
              textDecoration: 'none',
              color: 'inherit',
              fontWeight: 'bold',
            }}
          >
            Serviços Comunitários
          </Typography>

          {!isMobile && (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              {menuItems.map((item) => (
                <Button
                  key={item.text}
                  color="inherit"
                  component={Link}
                  to={item.path}
                  startIcon={item.icon}
                >
                  {item.text}
                </Button>
              ))}

              {isAuthenticated ? (
                <>
                  <IconButton
                    size="large"
                    aria-label="account of current user"
                    aria-controls="menu-appbar"
                    aria-haspopup="true"
                    onClick={handleMenu}
                    color="inherit"
                  >
                    <Avatar sx={{ width: 32, height: 32 }}>
                      {user?.nome?.charAt(0).toUpperCase()}
                    </Avatar>
                  </IconButton>
                  <Menu
                    id="menu-appbar"
                    anchorEl={anchorEl}
                    anchorOrigin={{
                      vertical: 'bottom',
                      horizontal: 'right',
                    }}
                    keepMounted
                    transformOrigin={{
                      vertical: 'top',
                      horizontal: 'right',
                    }}
                    open={Boolean(anchorEl)}
                    onClose={handleClose}
                  >
                    <MenuItem onClick={() => navigate('/dashboard')}>
                      <ListItemIcon>
                        <DashboardIcon fontSize="small" />
                      </ListItemIcon>
                      Dashboard
                    </MenuItem>
                    <MenuItem onClick={() => navigate('/profile')}>
                      <ListItemIcon>
                        <PersonIcon fontSize="small" />
                      </ListItemIcon>
                      Perfil
                    </MenuItem>
                    <Divider />
                    <MenuItem onClick={handleLogout}>
                      <ListItemIcon>
                        <LogoutIcon fontSize="small" />
                      </ListItemIcon>
                      Sair
                    </MenuItem>
                  </Menu>
                </>
              ) : (
                <>
                  <Button
                    color="inherit"
                    component={Link}
                    to="/login"
                    startIcon={<LoginIcon />}
                  >
                    Entrar
                  </Button>
                  <Button
                    color="inherit"
                    component={Link}
                    to="/register"
                    variant="outlined"
                    startIcon={<PersonAddIcon />}
                    sx={{ borderColor: 'white' }}
                  >
                    Cadastrar
                  </Button>
                </>
              )}
            </Box>
          )}
        </Toolbar>
      </AppBar>

      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true,
        }}
        sx={{
          display: { xs: 'block', md: 'none' },
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: 240 },
        }}
      >
        {drawer}
      </Drawer>
    </>
  );
};

export default Navbar; 