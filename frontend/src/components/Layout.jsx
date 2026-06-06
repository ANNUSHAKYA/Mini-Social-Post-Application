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
  Paper,
  BottomNavigation,
  BottomNavigationAction,
  Badge,
} from '@mui/material';
import {
  Home as HomeIcon,
  Assignment as TaskIcon,
  VolumeUp as ReferIcon,
  Public as SocialIcon,
  EmojiEvents as LeaderboardIcon,
  CardGiftcard as GiftIcon,
  Notifications as BellIcon,
} from '@mui/icons-material';

const Layout = ({ children }) => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // Active navigation tab index based on route path
  const getNavValue = () => {
    switch (location.pathname) {
      case '/':
        return 0;
      case '/tasks':
        return 1;
      case '/refer':
        return 2;
      case '/social':
        return 3;
      case '/leaderboard':
        return 4;
      default:
        return 0;
    }
  };

  const getPageTitle = () => {
    switch (location.pathname) {
      case '/':
        return 'Home';
      case '/tasks':
        return 'Tasks';
      case '/refer':
        return 'Refer';
      case '/social':
        return 'Social';
      case '/leaderboard':
        return 'Leaderboard';
      default:
        return 'Home';
    }
  };

  // Map Bottom Nav Action to path redirects
  const handleNavChange = (newValue) => {
    switch (newValue) {
      case 0:
        navigate('/');
        break;
      case 1:
        navigate('/tasks');
        break;
      case 2:
        navigate('/refer');
        break;
      case 3:
        navigate('/social');
        break;
      case 4:
        navigate('/leaderboard');
        break;
      default:
        navigate('/');
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
        bgcolor: '#f1f5f9', // TaskPlanet standard page light grey backdrop
      }}
    >
      {/* Centered App Container wrapper to mirror screenshots mobile view ratio on desktop */}
      <Box
        sx={{
          maxWidth: 600,
          width: '100%',
          mx: 'auto',
          bgcolor: '#fafafa',
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          boxShadow: { sm: '0 0 20px rgba(0,0,0,0.05)' },
          position: 'relative',
        }}
      >
        {/* Top Header Navbar */}
        <AppBar
          position="sticky"
          elevation={0}
          sx={{
            bgcolor: '#ffffff',
            color: '#1e293b',
            borderBottom: '1px solid #f1f5f9',
            top: 0,
            zIndex: 1100,
          }}
        >
          <Container maxWidth="sm">
            <Toolbar
              disableGutters
              sx={{
                justifyContent: 'space-between',
                minHeight: '56px !important',
                px: 1,
              }}
            >
              {/* Left Page Title */}
              <Typography
                variant="subtitle1"
                sx={{
                  fontWeight: 900,
                  fontSize: '1.05rem',
                  color: '#1e293b',
                }}
              >
                {getPageTitle()}
              </Typography>

              {/* Right Side Info Widgets */}
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75 }}>
                
                {/* Points Star Badge */}
                <Box
                  sx={{
                    bgcolor: '#fef3c7',
                    border: '1px solid #fde68a',
                    borderRadius: 4,
                    px: 1.25,
                    py: 0.5,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 0.5,
                  }}
                >
                  <Typography
                    variant="caption"
                    sx={{
                      fontWeight: 800,
                      color: '#d97706',
                      fontSize: '0.75rem',
                    }}
                  >
                    {user?.points || 300}
                  </Typography>
                  <Box sx={{ display: 'flex', color: '#f59e0b', fontSize: '0.9rem' }}>⭐</Box>
                </Box>

                {/* Wallet Balance Badge */}
                <Box
                  sx={{
                    bgcolor: '#ecfdf5',
                    border: '1px solid #d1fae5',
                    borderRadius: 4,
                    px: 1.25,
                    py: 0.5,
                    display: 'flex',
                    alignItems: 'center',
                  }}
                >
                  <Typography
                    variant="caption"
                    sx={{
                      fontWeight: 800,
                      color: '#059669',
                      fontSize: '0.75rem',
                    }}
                  >
                    ₹{(user?.wallet || 0.00).toFixed(2)}
                  </Typography>
                </Box>

                {/* Gift Box Icon button */}
                <IconButton
                  size="small"
                  sx={{
                    bgcolor: '#f8fafc',
                    border: '1px solid #e2e8f0',
                    p: 0.5,
                  }}
                >
                  <GiftIcon sx={{ fontSize: '1.1rem', color: '#64748b' }} />
                </IconButton>

                {/* Notification Bell Icon button */}
                <IconButton
                  size="small"
                  sx={{
                    bgcolor: '#f8fafc',
                    border: '1px solid #e2e8f0',
                    p: 0.5,
                  }}
                >
                  <Badge variant="dot" color="success" overlap="circular">
                    <BellIcon sx={{ fontSize: '1.1rem', color: '#64748b' }} />
                  </Badge>
                </IconButton>

                {/* User Avatar with Green Active dot status indicator */}
                <Box sx={{ position: 'relative', display: 'inline-flex' }}>
                  <Avatar
                    src={user?.avatar || `https://api.dicebear.com/7.x/adventurer/svg?seed=guest`}
                    onClick={() => navigate(user ? '/' : '/login')}
                    sx={{
                      width: 28,
                      height: 28,
                      cursor: 'pointer',
                      border: '1px solid #e2e8f0',
                    }}
                  />
                  {user && (
                    <Box
                      sx={{
                        position: 'absolute',
                        bottom: 0,
                        right: 0,
                        width: 8,
                        height: 8,
                        bgcolor: '#10b981',
                        borderRadius: '50%',
                        border: '1.5px solid #fff',
                      }}
                    />
                  )}
                </Box>

              </Box>
            </Toolbar>
          </Container>
        </AppBar>

        {/* Main Content Viewport */}
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            px: 2,
            py: 2,
            pb: 10, // Margin bottom to clear fixed navigation bar
            width: '100%',
          }}
        >
          {children}
        </Box>

        {/* Bottom TaskPlanet Navigation Panel */}
        <Paper
          elevation={10}
          sx={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            zIndex: 1000,
            borderTop: '1px solid #f1f5f9',
            borderRadius: 0,
          }}
        >
          <BottomNavigation
            value={getNavValue()}
            onChange={(event, newValue) => handleNavChange(newValue)}
            showLabels={false}
            sx={{
              bgcolor: '#0062ff', // TaskPlanet solid active blue bottom navigation
              height: 56,
              '& .MuiBottomNavigationAction-root': {
                color: 'rgba(255, 255, 255, 0.7)',
                minWidth: 'auto',
                padding: '6px 0',
                '&.Mui-selected': {
                  color: '#ffffff',
                  '& .MuiSvgIcon-root': {
                    transform: 'scale(1.15)',
                    color: '#ffffff',
                  },
                },
              },
            }}
          >
            <BottomNavigationAction label="Home" icon={<HomeIcon />} />
            <BottomNavigationAction label="Tasks" icon={<TaskIcon />} />
            <BottomNavigationAction label="Refer" icon={<ReferIcon />} />
            <BottomNavigationAction label="Social" icon={<SocialIcon />} />
            <BottomNavigationAction label="Leaderboard" icon={<LeaderboardIcon />} />
          </BottomNavigation>
        </Paper>

      </Box>
    </Box>
  );
};

export default Layout;
