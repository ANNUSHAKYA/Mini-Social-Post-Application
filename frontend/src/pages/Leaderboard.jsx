import React from 'react';
import { useAuth } from '../context/AuthContext';
import Layout from '../components/Layout';
import {
  Box,
  Typography,
  Paper,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Avatar,
  Divider,
} from '@mui/material';
import {
  EmojiEvents as TrophyIcon,
  Star as StarIcon,
} from '@mui/icons-material';

const Leaderboard = () => {
  const { user } = useAuth();

  const rankData = [
    { rank: 1, username: 'amit_dev', points: 15450, avatarSeed: 'amit' },
    { rank: 2, username: 'priya_s', points: 12100, avatarSeed: 'priya' },
    { rank: 3, username: 'rahul_m', points: 11050, avatarSeed: 'rahul' },
    { rank: 4, username: 'varun_r', points: 9400, avatarSeed: 'varun' },
    { rank: 5, username: user ? user.username : 'guest_user', points: user ? user.points : 300, avatarSeed: user ? user.username : 'guest', isMe: !!user },
    { rank: 6, username: 'sneha_k', points: 7200, avatarSeed: 'sneha' },
    { rank: 7, username: 'vijay_p', points: 6800, avatarSeed: 'vijay' },
  ];

  // Sort list descending by points
  const sortedRanks = [...rankData]
    .sort((a, b) => b.points - a.points)
    .map((item, idx) => ({ ...item, rank: idx + 1 }));

  const getRankEmoji = (rank) => {
    if (rank === 1) return '🥇';
    if (rank === 2) return '🥈';
    if (rank === 3) return '🥉';
    return `#${rank}`;
  };

  return (
    <Layout>
      <Box sx={{ maxWidth: 600, mx: 'auto', display: 'flex', flexDirection: 'column', gap: 2.5 }}>
        
        {/* Banner header */}
        <Paper
          elevation={0}
          sx={{
            p: 3,
            borderRadius: 4,
            textAlign: 'center',
            bgcolor: '#f59e0b',
            color: '#fff',
            boxShadow: '0 4px 15px rgba(245,158,11,0.15)',
          }}
        >
          <TrophyIcon sx={{ fontSize: '3.5rem', mb: 1, color: '#ffefc2' }} />
          <Typography variant="h5" sx={{ fontWeight: 800 }}>
            Global Leaderboard
          </Typography>
          <Typography variant="body2" sx={{ opacity: 0.9, mt: 0.5 }}>
            See who is top in points and earnings this month!
          </Typography>
        </Paper>

        {/* List of ranks */}
        <Paper sx={{ borderRadius: 4, bgcolor: '#fff', border: '1px solid #f1f5f9', overflow: 'hidden' }}>
          <List disablePadding>
            {sortedRanks.map((item, idx) => (
              <React.Fragment key={item.username}>
                <ListItem
                  sx={{
                    py: 2,
                    px: 3,
                    bgcolor: item.isMe ? '#eff6ff' : 'transparent',
                    borderLeft: item.isMe ? '4px solid #0062ff' : 'none',
                    display: 'flex',
                    alignItems: 'center',
                  }}
                >
                  {/* Rank Badge */}
                  <Box sx={{ width: 44, display: 'flex', justifyContent: 'center' }}>
                    <Typography variant="h6" sx={{ fontWeight: 800, color: item.rank <= 3 ? 'inherit' : '#64748b' }}>
                      {getRankEmoji(item.rank)}
                    </Typography>
                  </Box>

                  {/* User Profile Avatar */}
                  <ListItemAvatar sx={{ ml: 1 }}>
                    <Avatar
                      src={item.isMe && user?.avatar ? user.avatar : `https://api.dicebear.com/7.x/adventurer/svg?seed=${item.avatarSeed}`}
                      sx={{ border: item.isMe ? '2px solid #0062ff' : 'none' }}
                    />
                  </ListItemAvatar>

                  {/* Username info */}
                  <ListItemText
                    primary={
                      <Typography variant="subtitle1" sx={{ fontWeight: 800, color: item.isMe ? '#0062ff' : '#1e293b' }}>
                        @{item.username} {item.isMe && '(You)'}
                      </Typography>
                    }
                  />

                  {/* Points score */}
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                    <StarIcon sx={{ color: '#fbbf24', fontSize: '1.2rem' }} />
                    <Typography variant="subtitle1" sx={{ fontWeight: 800, color: '#f59e0b' }}>
                      {item.points.toLocaleString()}
                    </Typography>
                  </Box>
                </ListItem>
                {idx < sortedRanks.length - 1 && <Divider />}
              </React.Fragment>
            ))}
          </List>
        </Paper>

      </Box>
    </Layout>
  );
};

export default Leaderboard;
