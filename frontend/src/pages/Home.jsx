import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
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
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import TelegramIcon from '@mui/icons-material/Telegram';
import YouTubeIcon from '@mui/icons-material/YouTube';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';

const Home = () => {
  const { user, addPoints } = useAuth();
  const navigate = useNavigate();
  const [points, setPoints] = useState(user?.points || 300);
  const [wallet, setWallet] = useState(user?.wallet || 0.0);
  const [openSpin, setOpenSpin] = useState(false);
  const [spinning, setSpinning] = useState(false);
  const [spinResult, setSpinResult] = useState(null);
  const [wheelRotation, setWheelRotation] = useState(0);
  const [activeSlide, setActiveSlide] = useState(0);

  const slides = [
    {
      type: 'buy',
      title: 'Buy Referrals',
      tag: 'TRENDING',
      cashback: '50% Cashback ⭐',
      description: '🚀 Boost Your Earnings with Smart Referrals',
      subtext: '💰 Buy high-quality referrals to maximize your earnings.',
      highlight: '📈 Increase your Leaderboard Rank Instantly',
      buttonText: 'Buy Referral Now ➜',
      action: () => alert('Redirecting to referral shop...'),
    },
    {
      type: 'premium',
      title: 'Premium Membership',
      tag: 'Exclusive',
      description: '💎 Unlock Bigger Rewards with Premium Access',
      subtext: '💠 Exclusive perks and faster ranking awaits you.',
      highlight: '👑 Upgrade to Premium and climb the leaderboard faster.',
      buttonText: 'Premium Plus Membership ➜',
      action: () => alert('Redirecting to premium upgrade page...'),
    },
    {
      type: 'refer',
      title: 'Refer to Friends',
      tag: 'Boost',
      description: '🤝 Invite & Get Rewards',
      subtext: '🔗 Now you can send your referral link to anyone with a single click.',
      highlight: '🏆 Every referral moves you up the leaderboard!',
      buttonText: 'Share Your Refer Link ➜',
      action: () => {
        const inviteLink = `https://taskplanet.org/signup?ref=PLANET-${user ? user.username.toUpperCase() : 'GUEST'}`;
        navigator.clipboard.writeText(inviteLink);
        alert('Referral link copied to clipboard!');
      },
    },
  ];

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
    // Rotate 5 times + segment offset
    const degrees = 1800 + (360 - segmentIndex * (360 / segments.length));

    setWheelRotation(degrees);

    setTimeout(async () => {
      setSpinning(false);
      setSpinResult(winPoints);
      setPoints((prev) => prev + winPoints);
      if (user) {
        await addPoints(winPoints);
      }
    }, 3500);
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

        {/* Movable Carousel Card (Buy Referrals / Premium Membership / Refer friends) */}
        <Box sx={{ width: '100%', position: 'relative' }}>
          <Paper
            elevation={0}
            sx={{
              p: 2.5,
              borderRadius: 5,
              border: '2px solid #eff6ff',
              bgcolor: '#fff',
              position: 'relative',
              minHeight: 180,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              boxShadow: '0 2px 8px rgba(0,0,0,0.02)',
            }}
          >
            {/* Header tags inside active slide */}
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1 }}>
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
                {slides[activeSlide].type === 'buy' ? '🔥 ' : slides[activeSlide].type === 'premium' ? '💎 ' : '🤝 '} 
                {slides[activeSlide].tag.toUpperCase()}
              </Box>
              {slides[activeSlide].cashback && (
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
                  {slides[activeSlide].cashback}
                </Box>
              )}
            </Box>

            {/* Slide Body Details */}
            <Box sx={{ my: 1 }}>
              <Typography variant="h6" sx={{ fontWeight: 800, color: '#1e293b', fontSize: '1.1rem' }}>
                {slides[activeSlide].title}
              </Typography>
              <Typography variant="body2" color="textSecondary" sx={{ mt: 0.5, fontSize: '0.85rem' }}>
                {slides[activeSlide].description}
              </Typography>
              <Typography variant="caption" color="textSecondary" sx={{ display: 'block', mt: 0.5, fontSize: '0.75rem' }}>
                {slides[activeSlide].subtext}
              </Typography>
              <Box
                sx={{
                  mt: 1,
                  bgcolor: '#eff6ff',
                  color: '#0062ff',
                  px: 1.5,
                  py: 0.5,
                  borderRadius: 2,
                  display: 'inline-block',
                }}
              >
                <Typography variant="caption" sx={{ fontWeight: 700, fontSize: '0.75rem' }}>
                  {slides[activeSlide].highlight}
                </Typography>
              </Box>
            </Box>

            {/* Slide Action Button */}
            <Button
              variant="contained"
              fullWidth
              onClick={slides[activeSlide].action}
              sx={{
                bgcolor: '#0062ff',
                '&:hover': { bgcolor: '#0052d9' },
                borderRadius: 3.5,
                py: 1.25,
                textTransform: 'none',
                fontWeight: 800,
                mt: 1.5,
              }}
            >
              {slides[activeSlide].buttonText}
            </Button>

            {/* Carousel Side Arrows (Absolute overlay) */}
            <IconButton
              size="small"
              onClick={() => setActiveSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1))}
              sx={{
                position: 'absolute',
                left: -15,
                top: '40%',
                bgcolor: '#fff',
                border: '1px solid #e2e8f0',
                boxShadow: '0 2px 5px rgba(0,0,0,0.05)',
                zIndex: 10,
                '&:hover': { bgcolor: '#f8fafc' },
              }}
            >
              <LeftIcon fontSize="small" />
            </IconButton>

            <IconButton
              size="small"
              onClick={() => setActiveSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1))}
              sx={{
                position: 'absolute',
                right: -15,
                top: '40%',
                bgcolor: '#fff',
                border: '1px solid #e2e8f0',
                boxShadow: '0 2px 5px rgba(0,0,0,0.05)',
                zIndex: 10,
                '&:hover': { bgcolor: '#f8fafc' },
              }}
            >
              <RightIcon fontSize="small" />
            </IconButton>
          </Paper>

          {/* Dots Indicators below the card */}
          <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1, mt: 1.5, mb: 1 }}>
            {slides.map((_, idx) => (
              <Box
                key={idx}
                onClick={() => setActiveSlide(idx)}
                sx={{
                  width: idx === activeSlide ? 16 : 8,
                  height: 8,
                  borderRadius: 4,
                  bgcolor: idx === activeSlide ? '#0062ff' : '#cbd5e1',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                }}
              />
            ))}
          </Box>
        </Box>

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
            onClick={() => navigate('/tasks')}
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
            onClick={async () => {
              setPoints((p) => p + 300);
              if (user) {
                await addPoints(300);
              }
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

        {/* Connect With Us - Centered title and horizontal line of circle social buttons */}
        <Paper
          elevation={0}
          sx={{
            p: 3,
            borderRadius: 5,
            bgcolor: '#fff',
            border: '1px solid #f1f5f9',
            mb: 4,
            textAlign: 'center',
          }}
        >
          <Typography variant="subtitle1" sx={{ fontWeight: 800, mb: 2.5, color: '#1e293b' }}>
            Connect With Us
          </Typography>
          
          <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1.75, flexWrap: 'wrap' }}>
            {[
              { label: 'WhatsApp', color: '#25D366', icon: <WhatsAppIcon fontSize="small" />, url: '#' },
              { label: 'Telegram', color: '#0088cc', icon: <TelegramIcon fontSize="small" />, url: '#' },
              { label: 'YouTube', color: '#ff0000', icon: <YouTubeIcon fontSize="small" />, url: '#' },
              { label: 'Twitter/X', color: '#111111', icon: <TwitterIcon fontSize="small" />, url: '#' },
              { label: 'Instagram', color: '#C13584', icon: <InstagramIcon fontSize="small" />, url: '#' },
              { label: 'Facebook', color: '#3b5998', icon: <FacebookIcon fontSize="small" />, url: '#' },
            ].map((social, i) => (
              <IconButton
                key={i}
                href={social.url}
                sx={{
                  bgcolor: social.color,
                  color: '#ffffff',
                  width: 36,
                  height: 36,
                  p: 0,
                  boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
                  '&:hover': {
                    bgcolor: social.color,
                    opacity: 0.85,
                    transform: 'translateY(-2px)',
                  },
                  transition: 'all 0.2s ease',
                }}
              >
                {social.icon}
              </IconButton>
            ))}
          </Box>
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
        <DialogContent sx={{ overflow: 'visible' }}>
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3, py: 2 }}>
            <Typography variant="body2" color="textSecondary">
              Tap the wheel or click SPIN to win bonus coins instantly!
            </Typography>

            {/* Inline keyframes styling for flashing lights and pointer wiggling */}
            <style>{`
              @keyframes pointer-wiggle {
                0%, 100% { transform: rotate(0deg); }
                25% { transform: rotate(-12deg); }
                75% { transform: rotate(12deg); }
              }
              @keyframes light-blink {
                0%, 100% { opacity: 0.3; }
                50% { opacity: 1; }
              }
            `}</style>

            {/* Spinner Wheel representation */}
            <Box sx={{ position: 'relative', width: 220, height: 220, mx: 'auto', mt: 1 }}>
              {/* Wiggling Pointer Arrow */}
              <Box
                sx={{
                  position: 'absolute',
                  top: -8,
                  left: 'calc(50% - 12px)',
                  width: 24,
                  height: 24,
                  zIndex: 10,
                  animation: spinning ? 'pointer-wiggle 0.15s infinite ease-in-out' : 'none',
                  transformOrigin: 'top center',
                }}
              >
                <svg width="24" height="24" viewBox="0 0 24 24">
                  <polygon points="12,24 2,4 22,4" fill="#ef4444" stroke="#ffffff" strokeWidth="2" />
                </svg>
              </Box>

              {/* Spinning Outer Wheel */}
              <Box
                onClick={handleSpinWheel}
                sx={{
                  width: 220,
                  height: 220,
                  cursor: spinning ? 'default' : 'pointer',
                  transition: spinning ? 'transform 3.5s cubic-bezier(0.1, 0.8, 0.2, 1)' : 'none',
                  transform: `rotate(${wheelRotation}deg)`,
                  transformOrigin: 'center center',
                  filter: 'drop-shadow(0 8px 16px rgba(0,0,0,0.15))',
                }}
              >
                {/* SVG Wheel */}
                <svg width="220" height="220" viewBox="0 0 100 100">
                  {/* Outer Golden Border */}
                  <circle cx="50" cy="50" r="48" fill="#1e293b" stroke="#fbbf24" strokeWidth="2" />
                  
                  {/* Slices (Gradients / Colors) */}
                  <path d="M 50 50 L 50 4 A 46 46 0 0 1 93.8 36.4 Z" fill="#fbbf24" /> {/* Yellow segment */}
                  <path d="M 50 50 L 93.8 36.4 A 46 46 0 0 1 77 87.2 Z" fill="#ef4444" /> {/* Red segment */}
                  <path d="M 50 50 L 77 87.2 A 46 46 0 0 1 23 87.2 Z" fill="#10b981" /> {/* Green segment */}
                  <path d="M 50 50 L 23 87.2 A 46 46 0 0 1 6.2 36.4 Z" fill="#3b82f6" /> {/* Blue segment */}
                  <path d="M 50 50 L 6.2 36.4 A 46 46 0 0 1 50 4 Z" fill="#8b5cf6" /> {/* Purple segment */}

                  {/* Point Labels Text */}
                  <text x="63" y="22" fill="#1e293b" fontSize="5" fontWeight="900" transform="rotate(36 63 22)">+50</text>
                  <text x="74" y="60" fill="#ffffff" fontSize="5" fontWeight="900" transform="rotate(108 74 60)">+100</text>
                  <text x="50" y="80" fill="#ffffff" fontSize="5" fontWeight="900" textAnchor="middle">+200</text>
                  <text x="26" y="60" fill="#ffffff" fontSize="5" fontWeight="900" transform="rotate(-108 26 60)">+500</text>
                  <text x="37" y="22" fill="#ffffff" fontSize="5" fontWeight="900" transform="rotate(-36 37 22)">+1000</text>

                  {/* Glowing Outer Lights */}
                  {[0, 36, 72, 108, 144, 180, 216, 252, 288, 324].map((deg, index) => {
                    const rad = (deg * Math.PI) / 180;
                    const cx = 50 + 48 * Math.sin(rad);
                    const cy = 50 - 48 * Math.cos(rad);
                    return (
                      <circle
                        key={index}
                        cx={cx}
                        cy={cy}
                        r="1.5"
                        fill="#ffffff"
                        style={{
                          animation: 'light-blink 0.6s infinite',
                          animationDelay: `${index * 0.15}s`,
                        }}
                      />
                    );
                  })}

                  {/* Shiny Center Pin Ring */}
                  <circle cx="50" cy="50" r="12" fill="#1e293b" stroke="#ffffff" strokeWidth="1.5" />
                  <circle cx="50" cy="50" r="9" fill="#fbbf24" />
                  <text x="50" y="52" fill="#1e293b" fontSize="4.5" fontWeight="900" textAnchor="middle">SPIN</text>
                </svg>
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
                px: 6,
                py: 1.25,
                mt: 1,
              }}
            >
              {spinning ? 'Spinning...' : 'SPIN'}
            </Button>

            {spinResult !== null && (
              <Typography variant="h6" sx={{ fontWeight: 900, color: '#10b981', mt: 1 }}>
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
