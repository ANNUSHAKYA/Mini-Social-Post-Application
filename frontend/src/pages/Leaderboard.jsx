import React, { useState, useEffect } from 'react';
import { useAuth, api } from '../context/AuthContext';
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
  CircularProgress,
} from '@mui/material';
import {
  EmojiEvents as TrophyIcon,
  Star as StarIcon,
} from '@mui/icons-material';

const Leaderboard = () => {
  const { user } = useAuth();
  const [sortedRanks, setSortedRanks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        setLoading(true);
        const res = await api.get('/auth/leaderboard');
        const dbUsers = res.data; // Array of { username, points, avatar }

        // Core mock users to ensure leaderboard is always full and premium-looking
        const mockUsers = [
          { username: 'amit_dev', points: 15450, avatar: '' },
          { username: 'priya_s', points: 12100, avatar: '' },
          { username: 'rahul_m', points: 11050, avatar: '' },
          { username: 'varun_r', points: 9400, avatar: '' },
          { username: 'sneha_k', points: 7200, avatar: '' },
          { username: 'vijay_p', points: 6800, avatar: '' },
        ];

        // Merge DB users and Mock users
        // Use a Map to filter duplicates by username, giving preference to DB users
        const mergedMap = new Map();

        // Add mock users first
        mockUsers.forEach((u) => {
          mergedMap.set(u.username, {
            username: u.username,
            points: u.points,
            avatar: u.avatar || `https://api.dicebear.com/7.x/adventurer/svg?seed=${u.username}`,
            isMe: false,
          });
        });

        // Overwrite or add with real database users
        if (Array.isArray(dbUsers)) {
          dbUsers.forEach((u) => {
            mergedMap.set(u.username, {
              username: u.username,
              points: u.points,
              avatar: u.avatar || `https://api.dicebear.com/7.x/adventurer/svg?seed=${u.username}`,
              isMe: user ? u.username === user.username : false,
            });
          });
        }

        // Ensure the logged in user is represented in the list if not already there
        if (user && !mergedMap.has(user.username)) {
          mergedMap.set(user.username, {
            username: user.username,
            points: user.points,
            avatar: user.avatar || `https://api.dicebear.com/7.x/adventurer/svg?seed=${user.username}`,
            isMe: true,
          });
        }

        // Convert map back to list, sort by points desc, and assign ranks
        const sorted = Array.from(mergedMap.values())
          .sort((a, b) => b.points - a.points)
          .map((item, idx) => ({ ...item, rank: idx + 1 }));

        setSortedRanks(sorted);
      } catch (err) {
        console.error('Failed to fetch leaderboard:', err);
        // Fallback to purely mock ranks if API fails
        const fallbackRanks = [
          { rank: 1, username: 'amit_dev', points: 15450, avatar: 'https://api.dicebear.com/7.x/adventurer/svg?seed=amit' },
          { rank: 2, username: 'priya_s', points: 12100, avatar: 'https://api.dicebear.com/7.x/adventurer/svg?seed=priya' },
          { rank: 3, username: 'rahul_m', points: 11050, avatar: 'https://api.dicebear.com/7.x/adventurer/svg?seed=rahul' },
          { rank: 4, username: 'varun_r', points: 9400, avatar: 'https://api.dicebear.com/7.x/adventurer/svg?seed=varun' },
          { rank: 5, username: user ? user.username : 'guest_user', points: user ? user.points : 300, avatar: user ? user.avatar : 'https://api.dicebear.com/7.x/adventurer/svg?seed=guest', isMe: !!user },
          { rank: 6, username: 'sneha_k', points: 7200, avatar: 'https://api.dicebear.com/7.x/adventurer/svg?seed=sneha' },
          { rank: 7, username: 'vijay_p', points: 6800, avatar: 'https://api.dicebear.com/7.x/adventurer/svg?seed=vijay' },
        ].sort((a, b) => b.points - a.points).map((item, idx) => ({ ...item, rank: idx + 1 }));
        setSortedRanks(fallbackRanks);
      } finally {
        setLoading(false);
      }
    };

    fetchLeaderboard();
  }, [user]);

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
          {loading ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', py: 5 }}>
              <CircularProgress />
            </Box>
          ) : (
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
                        src={item.avatar}
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
          )}
        </Paper>

      </Box>
    </Layout>
  );
};

export default Leaderboard;
