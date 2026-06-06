import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import Layout from '../components/Layout';
import {
  Box,
  Typography,
  Paper,
  Grid,
  Button,
  Avatar,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Card,
  CardContent,
} from '@mui/material';
import {
  AccountBalanceWallet as WalletIcon,
  Star as StarIcon,
  Share as ShareIcon,
  Notifications as BellIcon,
  PlayArrow as PlayIcon,
  TrendingUp as TrendingIcon,
  ChevronLeft as LeftIcon,
  ChevronRight as RightIcon,
  Close as CloseIcon,
} from '@mui/icons-material';

const Home = () => {
  const { user } = useAuth();
  const [points, setPoints] = useState(user?.points || 300);
  const [wallet, setWallet] = useState(user?.wallet || 0.0);
  const [openSpin, setOpenSpin] = useState(false);
  const [spinning, setSpinning] = useState(false);
  const [spinResult, setSpinResult] = useState(null);
  const [wheelRotation, setWheelRotation] = useState(0);

  // Fake Live Offerwall Activity Ticker
  const [tickerIndex, setTickerIndex] = useState(0);
  const tickers = [
    'Congratulations! Varun R earned 58.50 points from offerwall',
    'Success! Priya S completed Daily Poll and won 20 points',
    'Congratulations! Amit K referred a friend and earned 100 points',
    'Success! Rahul M completed App Install task and earned 150 points',
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setTickerIndex((prev) => (prev + 1) % tickers.length);
    }, 4500);
    return () => clearInterval(interval);
  }, []);

  // Update local points if user object updates
  useEffect(() => {
    if (user) {
      setPoints(user.points);
      setWallet(user.wallet);
    }
  }, [user]);

  const handleSpinWheel = () => {
    if (spinning) return;
    setSpinning(true);
    setSpinResult(null);

    // Random spin angle (multiple rotations + random segment)
    const segments = [0, 50, 100, 200, 500, 1000];
    const segmentIndex = Math.floor(Math.random() * segments.length);
    const winPoints = segments[segmentIndex];
    const degrees = 1800 + segmentIndex * (360 / segments.length);

    setWheelRotation(degrees);

    setTimeout(() => {
      setSpinning(false);
      setSpinResult(winPoints);
      setPoints((prev) => prev + winPoints);
    }, 3000);
  };

  return (
    <Layout>
      <Box sx={{ maxWidth: 600, mx: 'auto', display: 'flex', flexDirection: 'column', gap: 2 }}>
        
        {/* Top Orange Announcement Marquee Card */}
        <Paper
          elevation={0}
          sx={{
            background: 'linear-gradient(90deg, #ff9900, #ff5500)',
            color: '#fff',
            p: 1.5,
            borderRadius: 3,
            display: 'flex',
            alignItems: 'center',
            gap: 1.5,
            boxShadow: '0 4px 12px rgba(255, 85, 0, 0.15)',
          }}
        >
          <Box
            sx={{
              bgcolor: 'rgba(255,255,255,0.2)',
              p: 0.5,
              borderRadius: 1.5,
              display: 'flex',
              alignItems: 'center',
            }}
          >
            📢
          </Box>
          <Typography
            variant="body2"
            sx={{
              fontWeight: 700,
              fontSize: '0.85rem',
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
            }}
          >
            Spin Every Hour 🔔 Update: Free Spin Every Hour is Active!
          </Typography>
        </Paper>

        {/* User welcome capsule */}
        <Box sx={{ display: 'flex', justifyContent: 'flex-start' }}>
          <Box
            sx={{
              bgcolor: '#0062ff',
              color: '#fff',
              px: 2.5,
              py: 0.75,
              borderRadius: 5,
              fontWeight: 800,
              fontSize: '0.85rem',
              letterSpacing: '0.05em',
            }}
          >
            {user ? user.username.toUpperCase() : 'GUEST'}!
          </Box>
        </Box>

        {/* Notification slider / Earning toast */}
        <Box
          sx={{
            bgcolor: '#2563eb',
            color: '#fff',
            p: 2,
            borderRadius: 4,
            display: 'flex',
            alignItems: 'center',
            gap: 2,
            boxShadow: '0 4px 15px rgba(37,99,235,0.2)',
            transition: 'all 0.5s ease-in-out',
          }}
        >
          <Avatar sx={{ bgcolor: 'rgba(255,255,255,0.2)', width: 40, height: 40 }}>
            📈
          </Avatar>
          <Box sx={{ flexGrow: 1 }}>
            <Typography variant="caption" sx={{ opacity: 0.8, fontSize: '0.75rem', fontWeight: 600 }}>
              Live Earning Activity
            </Typography>
            <Typography variant="body2" sx={{ fontWeight: 700, fontSize: '0.85rem' }}>
              {tickers[tickerIndex]}
            </Typography>
          </Box>
        </Box>

        {/* Wallet, Points, Referrals - Three Column Card Grid */}
        <Grid container spacing={1.5}>
          <Grid item xs={4}>
            <Paper
              elevation={0}
              sx={{
                p: 2,
                borderRadius: 4,
                bgcolor: '#fff',
                border: '1px solid #f1f5f9',
                display: 'flex',
                flexDirection: 'column',
                gap: 0.5,
              }}
            >
              <Typography variant="caption" color="textSecondary" sx={{ fontWeight: 600 }}>
                Wallet
              </Typography>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography variant="subtitle1" sx={{ fontWeight: 800, color: '#10b981' }}>
                  ₹{wallet.toFixed(2)}
                </Typography>
                <Avatar sx={{ bgcolor: '#e6f4ea', width: 28, height: 28, color: '#10b981' }}>
                  <WalletIcon fontSize="small" />
                </Avatar>
              </Box>
            </Paper>
          </Grid>

          <Grid item xs={4}>
            <Paper
              elevation={0}
              sx={{
                p: 2,
                borderRadius: 4,
                bgcolor: '#fff',
                border: '1px solid #f1f5f9',
                display: 'flex',
                flexDirection: 'column',
                gap: 0.5,
              }}
            >
              <Typography variant="caption" color="textSecondary" sx={{ fontWeight: 600 }}>
                Points
              </Typography>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography variant="subtitle1" sx={{ fontWeight: 800, color: '#f59e0b' }}>
                  {points}
                </Typography>
                <Avatar sx={{ bgcolor: '#fffbeb', width: 28, height: 28, color: '#f59e0b' }}>
                  <StarIcon fontSize="small" />
                </Avatar>
              </Box>
            </Paper>
          </Grid>

          <Grid item xs={4}>
            <Paper
              elevation={0}
              sx={{
                p: 2,
                borderRadius: 4,
                bgcolor: '#fff',
                border: '1px solid #f1f5f9',
                display: 'flex',
                flexDirection: 'column',
                gap: 0.5,
              }}
            >
              <Typography variant="caption" color="textSecondary" sx={{ fontWeight: 600 }}>
                Referrals
              </Typography>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography variant="subtitle1" sx={{ fontWeight: 800, color: '#3b82f6' }}>
                  0
                </Typography>
                <Avatar sx={{ bgcolor: '#eff6ff', width: 28, height: 28, color: '#3b82f6' }}>
                  <ShareIcon fontSize="small" />
                </Avatar>
              </Box>
            </Paper>
          </Grid>
        </Grid>

        {/* Spin Wheel Banner Card */}
        <Card sx={{ borderRadius: 5, boxShadow: '0 2px 10px rgba(0,0,0,0.03)', border: '1px solid #f1f5f9' }}>
          <CardContent sx={{ display: 'flex', alignItems: 'center', gap: 3, py: '20px !important' }}>
            <Box sx={{ flexGrow: 1 }}>
              <Typography variant="h6" sx={{ fontWeight: 800, color: '#1e293b', fontSize: '1.1rem' }}>
                Open App for Referral Spin
              </Typography>
              <Typography variant="body2" color="textSecondary" sx={{ mb: 2, mt: 0.5, fontSize: '0.85rem' }}>
                Open the app to spin and win up to 20 referrals
              </Typography>
              <Button
                variant="contained"
                onClick={() => setOpenSpin(true)}
                sx={{
                  bgcolor: '#0062ff',
                  '&:hover': { bgcolor: '#0052d9' },
                  borderRadius: 3,
                  textTransform: 'none',
                  fontWeight: 700,
                  px: 3,
                }}
              >
                Play Now
              </Button>
            </Box>
            
            {/* Mock Spin Wheel Graphic (SVG) */}
            <Box sx={{ width: 100, height: 100, position: 'relative' }}>
              <svg width="100" height="100" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="45" fill="#f8fafc" stroke="#e2e8f0" strokeWidth="2" />
                <path d="M 50 50 L 50 5 A 45 45 0 0 1 95 50 Z" fill="#f59e0b" />
                <path d="M 50 50 L 95 50 A 45 45 0 0 1 50 95 Z" fill="#ef4444" />
                <path d="M 50 50 L 50 95 A 45 45 0 0 1 5 50 Z" fill="#10b981" />
                <path d="M 50 50 L 5 50 A 45 45 0 0 1 50 5 Z" fill="#3b82f6" />
                <circle cx="50" cy="50" r="10" fill="#fff" stroke="#94a3b8" strokeWidth="2" />
                {/* Pointer */}
                <polygon points="50,2 47,10 53,10" fill="#1e293b" />
              </svg>
            </Box>
          </CardContent>
        </Card>

        {/* Active Referrals Reward Gradient Card */}
        <Paper
          elevation={0}
          sx={{
            background: 'linear-gradient(135deg, #a855f7 0%, #ec4899 100%)',
            color: '#fff',
            p: 3,
            borderRadius: 5,
            position: 'relative',
            overflow: 'hidden',
            boxShadow: '0 4px 15px rgba(236,72,153,0.15)',
          }}
        >
          <Box sx={{ position: 'relative', zIndex: 1 }}>
            <Typography variant="h6" sx={{ fontWeight: 800, fontSize: '1.1rem' }}>
              Active Referrals Reward
            </Typography>
            <Typography variant="body2" sx={{ opacity: 0.9, mt: 0.5, mb: 3, fontSize: '0.85rem' }}>
              Track rewards earned from your active referrals
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <StarIcon sx={{ color: '#fbbf24' }} />
              <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>
                Earn Up to 100 ⭐ Daily
              </Typography>
            </Box>
          </Box>
          {/* Backdrop Graphic Icons */}
          <Box sx={{ position: 'absolute', right: 20, bottom: 10, opacity: 0.15, fontSize: '5rem' }}>
            👥
          </Box>
        </Paper>

        {/* Buy Referrals Card with Arrow Control Indicators */}
        <Paper
          elevation={0}
          sx={{
            p: 2.5,
            borderRadius: 5,
            border: '2px solid #eff6ff',
            bgcolor: '#fff',
            position: 'relative',
          }}
        >
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1.5 }}>
            <Box
              sx={{
                bgcolor: '#ffefe5',
                color: '#ff5500',
                px: 1.5,
                py: 0.5,
                borderRadius: 2,
                fontWeight: 800,
                fontSize: '0.7rem',
                display: 'flex',
                alignItems: 'center',
                gap: 0.5,
              }}
            >
              🔥 TRENDING
            </Box>
            <Box
              sx={{
                border: '1px solid #ef4444',
                color: '#ef4444',
                px: 1.5,
                py: 0.25,
                borderRadius: 2,
                fontWeight: 700,
                fontSize: '0.7rem',
              }}
            >
              50% Cashback ⭐
            </Box>
          </Box>
          
          <Typography variant="h6" sx={{ fontWeight: 800, color: '#1e293b', fontSize: '1.1rem' }}>
            Buy Referrals
          </Typography>
          <Typography variant="body2" color="textSecondary" sx={{ mt: 0.5, mb: 1, fontSize: '0.85rem' }}>
            🚀 Boost Your Earnings with Smart Referrals
          </Typography>
          <Typography variant="caption" color="primary" sx={{ fontWeight: 600, display: 'block' }}>
            📈 Increase your Leaderboard Rank Instantly
          </Typography>

          <Box sx={{ display: 'flex', gap: 1, position: 'absolute', right: 20, top: '45%' }}>
            <IconButton size="small" sx={{ border: '1px solid #e2e8f0' }}>
              <LeftIcon fontSize="small" />
            </IconButton>
            <IconButton size="small" sx={{ border: '1px solid #e2e8f0' }}>
              <RightIcon fontSize="small" />
            </IconButton>
          </Box>
        </Paper>

        {/* Refer to Friends Card */}
        <Paper
          elevation={0}
          sx={{
            p: 3,
            borderRadius: 5,
            bgcolor: '#fff',
            border: '1px solid #f1f5f9',
            display: 'flex',
            flexDirection: 'column',
            gap: 1.5,
          }}
        >
          <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
            <Avatar sx={{ bgcolor: '#eff6ff', color: '#0062ff', width: 44, height: 44 }}>
              🤝
            </Avatar>
            <Box>
              <Typography variant="subtitle1" sx={{ fontWeight: 800 }}>
                Refer to Friends
              </Typography>
              <Typography variant="body2" color="textSecondary" sx={{ fontSize: '0.85rem' }}>
                Invite & Get Rewards
              </Typography>
            </Box>
          </Box>
          <Button
            variant="contained"
            fullWidth
            sx={{
              bgcolor: '#0062ff',
              '&:hover': { bgcolor: '#0052d9' },
              borderRadius: 3.5,
              py: 1.25,
              textTransform: 'none',
              fontWeight: 800,
            }}
          >
            Share Your Refer Link ➜
          </Button>
        </Paper>

        {/* Earn Up to 10,000 Points/Month! Yellow Border Card */}
        <Paper
          elevation={0}
          sx={{
            p: 3,
            borderRadius: 5,
            bgcolor: '#fff',
            border: '2px solid #f59e0b',
            display: 'flex',
            flexDirection: 'column',
            gap: 1,
          }}
        >
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 800, color: '#f59e0b', display: 'flex', alignItems: 'center', gap: 1 }}>
              📈 Earn Up to 10,000 Points/Month!
            </Typography>
            <Box sx={{ bgcolor: '#fffbeb', color: '#f59e0b', px: 1.5, py: 0.5, borderRadius: 2, fontWeight: 700, fontSize: '0.7rem' }}>
              TRENDING
            </Box>
          </Box>
          <Typography variant="body2" color="textSecondary" sx={{ fontSize: '0.85rem', mb: 1 }}>
            Complete Tasks and Boost your Leaderboard Rank and Earning instantly
          </Typography>
          <Button
            variant="contained"
            sx={{
              bgcolor: '#f59e0b',
              '&:hover': { bgcolor: '#d97706' },
              borderRadius: 3,
              textTransform: 'none',
              fontWeight: 800,
            }}
          >
            Start Earning
          </Button>
        </Paper>

        {/* Claim 300 Points Instantly Button Card */}
        <Paper
          elevation={0}
          sx={{
            p: 3,
            borderRadius: 5,
            bgcolor: '#fff',
            border: '1px solid #f1f5f9',
            textAlign: 'center',
          }}
        >
          <Typography variant="subtitle1" sx={{ fontWeight: 800, mb: 1 }}>
            🔥 Claim Your 300 Points Instantly!
          </Typography>
          <Typography variant="body2" color="textSecondary" sx={{ mb: 2.5, fontSize: '0.85rem' }}>
            Just one step away from bonus rewards 🎁
          </Typography>
          <Button
            variant="contained"
            fullWidth
            onClick={() => {
              setPoints((p) => p + 300);
              alert('300 Points claimed successfully! ⭐');
            }}
            sx={{
              bgcolor: '#0062ff',
              '&:hover': { bgcolor: '#0052d9' },
              borderRadius: 3.5,
              py: 1.25,
              textTransform: 'none',
              fontWeight: 800,
            }}
          >
            Claim Now ➜
          </Button>
        </Paper>

        {/* Connect With Us grid */}
        <Paper
          elevation={0}
          sx={{
            p: 3,
            borderRadius: 5,
            bgcolor: '#fff',
            border: '1px solid #f1f5f9',
            mb: 4,
          }}
        >
          <Typography variant="subtitle1" sx={{ fontWeight: 800, mb: 2, textAlign: 'center' }}>
            Connect With Us
          </Typography>
          <Grid container spacing={1.5} sx={{ justifyContent: 'center' }}>
            {[
              { label: 'WhatsApp', color: '#25D366', icon: '💬' },
              { label: 'Telegram', color: '#0088cc', icon: '✈️' },
              { label: 'YouTube', color: '#ff0000', icon: '📺' },
              { label: 'Twitter/X', color: '#111111', icon: '🐦' },
              { label: 'Instagram', color: '#C13584', icon: '📸' },
              { label: 'Facebook', color: '#3b5998', icon: '👥' },
            ].map((social, i) => (
              <Grid item xs={4} key={i}>
                <Button
                  variant="outlined"
                  fullWidth
                  sx={{
                    borderColor: '#f1f5f9',
                    color: '#1e293b',
                    textTransform: 'none',
                    fontWeight: 700,
                    borderRadius: 3,
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 0.5,
                    py: 1.5,
                    bgcolor: '#f8fafc',
                    '&:hover': {
                      bgcolor: '#f1f5f9',
                      borderColor: social.color,
                      color: social.color,
                    },
                  }}
                >
                  <Typography variant="h5" component="span">{social.icon}</Typography>
                  <Typography variant="caption" sx={{ fontWeight: 700 }}>{social.label}</Typography>
                </Button>
              </Grid>
            ))}
          </Grid>
        </Paper>

      </Box>

      {/* Interactive Spin Wheel Modal Dialog */}
      <Dialog
        open={openSpin}
        onClose={() => !spinning && setOpenSpin(false)}
        PaperProps={{
          sx: { borderRadius: 5, p: 2, maxWidth: 400, textAlign: 'center' },
        }}
      >
        <DialogTitle sx={{ fontWeight: 800 }}>
          🌀 Play Referral Spin
          <IconButton
            onClick={() => setOpenSpin(false)}
            disabled={spinning}
            sx={{ position: 'absolute', right: 12, top: 12 }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3, py: 2 }}>
            <Typography variant="body2" color="textSecondary">
              Spin the wheel to win bonus coins or referrals instantly!
            </Typography>

            {/* Spinner Wheel representation */}
            <Box
              sx={{
                width: 200,
                height: 200,
                position: 'relative',
                transition: spinning ? 'transform 3s cubic-bezier(0.1, 0.8, 0.3, 1)' : 'none',
                transform: `rotate(${wheelRotation}deg)`,
              }}
            >
              <svg width="200" height="200" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="45" fill="#f8fafc" stroke="#334155" strokeWidth="2" />
                {/* Segments */}
                <path d="M 50 50 L 50 5 A 45 45 0 0 1 95 50 Z" fill="#f59e0b" />
                <path d="M 50 50 L 95 50 A 45 45 0 0 1 72.5 89 Z" fill="#ef4444" />
                <path d="M 50 50 L 72.5 89 A 45 45 0 0 1 27.5 89 Z" fill="#10b981" />
                <path d="M 50 50 L 27.5 89 A 45 45 0 0 1 5 50 Z" fill="#3b82f6" />
                <path d="M 50 50 L 5 50 A 45 45 0 0 1 50 5 Z" fill="#a855f7" />

                {/* Texts in segments */}
                <text x="65" y="30" fill="#fff" fontSize="5" fontWeight="bold" transform="rotate(25 65 30)">+50</text>
                <text x="75" y="65" fill="#fff" fontSize="5" fontWeight="bold" transform="rotate(70 75 65)">+100</text>
                <text x="50" y="80" fill="#fff" fontSize="5" fontWeight="bold">+200</text>
                <text x="20" y="65" fill="#fff" fontSize="5" fontWeight="bold" transform="rotate(-70 20 65)">+500</text>
                <text x="25" y="30" fill="#fff" fontSize="5" fontWeight="bold" transform="rotate(-25 25 30)">+1000</text>
                
                <circle cx="50" cy="50" r="8" fill="#fff" stroke="#1e293b" strokeWidth="2" />
              </svg>
              {/* Pointer indicator */}
              <Box
                sx={{
                  position: 'absolute',
                  top: -10,
                  left: 'calc(50% - 10px)',
                  width: 20,
                  height: 20,
                  transform: 'rotate(180deg)',
                  zIndex: 2,
                }}
              >
                📐
              </Box>
            </Box>

            <Button
              variant="contained"
              disabled={spinning}
              onClick={handleSpinWheel}
              sx={{
                bgcolor: '#0062ff',
                '&:hover': { bgcolor: '#0052d9' },
                borderRadius: 4,
                textTransform: 'none',
                fontWeight: 800,
                px: 5,
                py: 1.25,
              }}
            >
              {spinning ? 'Spinning...' : 'SPIN'}
            </Button>

            {spinResult !== null && (
              <Typography variant="h6" sx={{ fontWeight: 800, color: '#10b981', mt: 1 }}>
                🎉 You won +{spinResult} Points!
              </Typography>
            )}
          </Box>
        </DialogContent>
      </Dialog>
    </Layout>
  );
};

export default Home;
