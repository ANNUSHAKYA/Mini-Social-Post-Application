import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Avatar,
  Box,
  Container,
  Button,
  Tooltip,
  Paper,
  BottomNavigation,
  BottomNavigationAction,
} from '@mui/material';
import {
  Home as HomeIcon,
  AddCircleOutline as AddIcon,
  Logout as LogoutIcon,
  Login as LoginIcon,
  Person as PersonIcon,
} from '@mui/icons-material';

const Layout = ({ children, onCreatePostClick }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  // Active navigation tab index based on route
  const getNavValue = () => {
    if (location.pathname === '/') return 0;
    if (location.pathname === '/create') return 1;
    return -1;
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', bgcolor: '#f4f6f8' }}>
      {/* Top Navbar */}
      <AppBar position="sticky" sx={{ bgcolor: '#ffffff', color: '#1e293b', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
        <Container maxWidth="lg">
          <Toolbar disableGutters sx={{ justifyContent: 'space-between' }}>
            <Typography
              variant="h6"
              noWrap
              component="div"
              onClick={() => navigate('/')}
              sx={{
                fontWeight: 800,
                letterSpacing: '.1rem',
                color: '#2563eb', // Indigo Blue accent
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: 1,
              }}
            >
              🚀 SocialPlanet
            </Typography>

            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              {user ? (
                <>
                  <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center', gap: 1 }}>
                    <Typography variant="body2" sx={{ fontWeight: 600, color: '#334155' }}>
                      @{user.username}
                    </Typography>
                    <Avatar
                      alt={user.username}
                      src={user.avatar}
                      sx={{ width: 36, height: 36, border: '2px solid #2563eb' }}
                    />
                  </Box>
                  <Tooltip title="Logout">
                    <IconButton onClick={handleLogout} color="error">
                      <LogoutIcon />
                    </IconButton>
                  </Tooltip>
                </>
              ) : (
                <Button
                  variant="contained"
                  size="small"
                  startIcon={<LoginIcon />}
                  onClick={() => navigate('/login')}
                  sx={{
                    bgcolor: '#2563eb',
                    '&:hover': { bgcolor: '#1d4ed8' },
                    textTransform: 'none',
                    borderRadius: 2,
                  }}
                >
                  Login
                </Button>
              )}
            </Box>
          </Toolbar>
        </Container>
      </AppBar>

      {/* Main Content Area */}
      <Container maxWidth="lg" sx={{ mt: 3, mb: 10, flexGrow: 1 }}>
        {children}
      </Container>

      {/* Bottom Navigation for Mobile Devices */}
      {user && (
        <Paper
          sx={{
            position: 'fixed',
            bottom: 0,
            left: 0,
            right: 0,
            display: { xs: 'block', sm: 'none' },
            zIndex: 1000,
            borderTop: '1px solid #e2e8f0',
          }}
          elevation={3}
        >
          <BottomNavigation
            value={getNavValue()}
            onChange={(event, newValue) => {
              if (newValue === 0) navigate('/');
              if (newValue === 1) {
                if (onCreatePostClick) {
                  onCreatePostClick();
                } else {
                  navigate('/');
                  setTimeout(() => {
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }, 100);
                }
              }
            }}
            showLabels
          >
            <BottomNavigationAction label="Feed" icon={<HomeIcon />} />
            <BottomNavigationAction label="Create Post" icon={<AddIcon />} />
          </BottomNavigation>
        </Paper>
      )}
    </Box>
  );
};

export default Layout;
