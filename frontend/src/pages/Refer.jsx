import React from 'react';
import { useAuth } from '../context/AuthContext';
import Layout from '../components/Layout';
import {
  Box,
  Typography,
  Paper,
  Button,
  TextField,
  InputAdornment,
  IconButton,
  Card,
  CardContent,
} from '@mui/material';
import {
  Share as ShareIcon,
  ContentCopy as CopyIcon,
  Group as PeopleIcon,
  EmojiEvents as TrophyIcon,
} from '@mui/icons-material';

const Refer = () => {
  const { user } = useAuth();
  const referralCode = `PLANET-${user ? user.username.toUpperCase() : 'GUEST'}`;
  const inviteLink = `https://taskplanet.org/signup?ref=${referralCode}`;

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    alert('Copied to clipboard!');
  };

  return (
    <Layout>
      <Box sx={{ maxWidth: 600, mx: 'auto', display: 'flex', flexDirection: 'column', gap: 2.5 }}>
        
        {/* Banner Card */}
        <Paper
          elevation={0}
          sx={{
            p: 3,
            borderRadius: 4,
            textAlign: 'center',
            bgcolor: '#0062ff',
            color: '#fff',
            boxShadow: '0 4px 15px rgba(0,98,255,0.15)',
          }}
        >
          <PeopleIcon sx={{ fontSize: '3rem', mb: 1 }} />
          <Typography variant="h5" sx={{ fontWeight: 800 }}>
            Invite & Get Rewards
          </Typography>
          <Typography variant="body2" sx={{ opacity: 0.9, mt: 0.5 }}>
            Share your link and earn up to 100 points for every friend who joins!
          </Typography>
        </Paper>

        {/* Code & Link Section */}
        <Paper sx={{ p: 3, borderRadius: 4, bgcolor: '#fff', border: '1px solid #f1f5f9' }}>
          <Typography variant="subtitle1" sx={{ fontWeight: 800, mb: 2 }}>
            Your Referral Details
          </Typography>

          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
            <Box>
              <Typography variant="caption" color="textSecondary" sx={{ fontWeight: 700, mb: 1, display: 'block' }}>
                REFERRAL CODE
              </Typography>
              <TextField
                value={referralCode}
                fullWidth
                InputProps={{
                  readOnly: true,
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={() => copyToClipboard(referralCode)} color="primary">
                        <CopyIcon fontSize="small" />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 3,
                    bgcolor: '#f8fafc',
                    fontWeight: 700,
                  },
                }}
              />
            </Box>

            <Box>
              <Typography variant="caption" color="textSecondary" sx={{ fontWeight: 700, mb: 1, display: 'block' }}>
                INVITE LINK
              </Typography>
              <TextField
                value={inviteLink}
                fullWidth
                InputProps={{
                  readOnly: true,
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={() => copyToClipboard(inviteLink)} color="primary">
                        <CopyIcon fontSize="small" />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 3,
                    bgcolor: '#f8fafc',
                  },
                }}
              />
            </Box>
          </Box>
        </Paper>

        {/* Refer Stats */}
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Card sx={{ flex: 1, borderRadius: 4, boxShadow: 'none', border: '1px solid #f1f5f9' }}>
            <CardContent sx={{ textAlign: 'center' }}>
              <Typography variant="h4" sx={{ fontWeight: 800, color: '#0062ff' }}>0</Typography>
              <Typography variant="body2" color="textSecondary" sx={{ mt: 0.5, fontWeight: 600 }}>
                Total Referrals
              </Typography>
            </CardContent>
          </Card>

          <Card sx={{ flex: 1, borderRadius: 4, boxShadow: 'none', border: '1px solid #f1f5f9' }}>
            <CardContent sx={{ textAlign: 'center' }}>
              <Typography variant="h4" sx={{ fontWeight: 800, color: '#10b981' }}>₹0.00</Typography>
              <Typography variant="body2" color="textSecondary" sx={{ mt: 0.5, fontWeight: 600 }}>
                Referral Earnings
              </Typography>
            </CardContent>
          </Card>
        </Box>

      </Box>
    </Layout>
  );
};

export default Refer;
