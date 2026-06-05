import React, { useState, useEffect } from 'react';
import { useAuth, api } from '../context/AuthContext';
import Layout from '../components/Layout';
import CreatePost from '../components/CreatePost';
import PostCard from '../components/PostCard';
import {
  Grid,
  Box,
  Typography,
  Button,
  CircularProgress,
  Paper,
  Avatar,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from '@mui/material';
import {
  TrendingUp as TrendingIcon,
  PeopleAlt as CommunityIcon,
} from '@mui/icons-material';

const Feed = () => {
  const { user } = useAuth();
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);

  // Fetch initial posts
  useEffect(() => {
    fetchPosts(1, false);
  }, []);

  const fetchPosts = async (pageNum, append = false) => {
    try {
      if (pageNum === 1) setLoading(true);
      else setLoadingMore(true);

      const res = await api.get(`/posts?page=${pageNum}&limit=10`);
      if (append) {
        setPosts((prev) => [...prev, ...res.data.posts]);
      } else {
        setPosts(res.data.posts);
      }
      setPage(res.data.page);
      setTotalPages(res.data.pages);
    } catch (error) {
      console.error('Error fetching posts:', error);
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  };

  const handlePostCreated = (newPost) => {
    // Put new post at the top
    setPosts((prev) => [newPost, ...prev]);
  };

  const handleLike = async (postId) => {
    try {
      const res = await api.post(`/posts/${postId}/like`);
      // Update specific post in state immediately
      setPosts((prev) =>
        prev.map((post) => (post._id === postId ? res.data : post))
      );
    } catch (error) {
      console.error('Error liking post:', error);
    }
  };

  const handleComment = async (postId, commentText) => {
    try {
      const res = await api.post(`/posts/${postId}/comment`, { text: commentText });
      // Update specific post comments in state immediately
      setPosts((prev) =>
        prev.map((post) => (post._id === postId ? res.data : post))
      );
    } catch (error) {
      console.error('Error adding comment:', error);
      throw error;
    }
  };

  const handleLoadMore = () => {
    if (page < totalPages) {
      fetchPosts(page + 1, true);
    }
  };

  return (
    <Layout>
      <Grid container spacing={3}>
        {/* Left Column: User Profile Brief (Desktop Only) */}
        <Grid item xs={12} md={3} sx={{ display: { xs: 'none', md: 'block' } }}>
          {user ? (
            <Paper sx={{ p: 3, borderRadius: 3, textAlign: 'center', boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
              <Avatar
                src={user.avatar}
                alt={user.username}
                sx={{ width: 80, height: 80, mx: 'auto', mb: 2, border: '3px solid #2563eb' }}
              />
              <Typography variant="h6" sx={{ fontWeight: 700, color: '#1e293b' }}>
                @{user.username}
              </Typography>
              <Typography variant="body2" color="textSecondary" sx={{ mb: 2 }}>
                {user.email}
              </Typography>
              <Divider sx={{ my: 2 }} />
              <Box sx={{ display: 'flex', justifyContent: 'space-around' }}>
                <Box>
                  <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>
                    {posts.filter((p) => p.user === user._id).length}
                  </Typography>
                  <Typography variant="caption" color="textSecondary">
                    My Posts
                  </Typography>
                </Box>
                <Box>
                  <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>
                    {posts.reduce((acc, curr) => acc + (curr.user === user._id ? curr.likes.length : 0), 0)}
                  </Typography>
                  <Typography variant="caption" color="textSecondary">
                    Received Likes
                  </Typography>
                </Box>
              </Box>
            </Paper>
          ) : (
            <Paper sx={{ p: 3, borderRadius: 3, textAlign: 'center', boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
              <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 1 }}>
                Welcome to SocialPlanet
              </Typography>
              <Typography variant="body2" color="textSecondary" sx={{ mb: 2 }}>
                Login to share updates, images, interact with posts, and join the community.
              </Typography>
              <Button
                variant="outlined"
                fullWidth
                href="/login"
                sx={{ textTransform: 'none', borderRadius: 2 }}
              >
                Sign In
              </Button>
            </Paper>
          )}
        </Grid>

        {/* Center Column: Posting & Feed */}
        <Grid item xs={12} md={6}>
          {user && <CreatePost onPostCreated={handlePostCreated} />}

          {loading ? (
            <Box display="flex" justifyContent="center" py={5}>
              <CircularProgress size={40} />
            </Box>
          ) : posts.length > 0 ? (
            <>
              {posts.map((post) => (
                <PostCard
                  key={post._id}
                  post={post}
                  onLike={handleLike}
                  onComment={handleComment}
                />
              ))}

              {/* Load More Button */}
              {page < totalPages && (
                <Box display="flex" justifyContent="center" mt={3} mb={5}>
                  <Button
                    variant="outlined"
                    onClick={handleLoadMore}
                    disabled={loadingMore}
                    sx={{
                      borderRadius: 3,
                      textTransform: 'none',
                      px: 4,
                      fontWeight: 600,
                      borderColor: '#cbd5e1',
                      color: '#475569',
                      '&:hover': {
                        borderColor: '#94a3b8',
                        bgcolor: '#f8fafc',
                      },
                    }}
                  >
                    {loadingMore ? <CircularProgress size={20} /> : 'Load More'}
                  </Button>
                </Box>
              )}
            </>
          ) : (
            <Paper sx={{ p: 5, borderRadius: 3, textAlign: 'center' }}>
              <Typography variant="h6" color="textSecondary" gutterBottom>
                No posts to display yet
              </Typography>
              <Typography variant="body2" color="textSecondary">
                Be the first to share your thoughts with the community!
              </Typography>
            </Paper>
          )}
        </Grid>

        {/* Right Column: Community Widgets & Trends (Desktop Only) */}
        <Grid item xs={12} md={3} sx={{ display: { xs: 'none', md: 'block' } }}>
          <Paper sx={{ p: 3, borderRadius: 3, mb: 3, boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
              <TrendingIcon color="primary" />
              <Typography variant="subtitle1" sx={{ fontWeight: 800, color: '#1e293b' }}>
                Trending Topics
              </Typography>
            </Box>
            <List dense disablePadding>
              {['#React19', '#ExpressJS', '#MaterialUI', '#MongoDBAtlas', '#TaskPlanetUI'].map((tag, i) => (
                <ListItem key={i} disableGutters>
                  <ListItemText
                    primary={tag}
                    secondary={`${10 - i}k posts`}
                    primaryTypographyProps={{ fontWeight: 600, color: '#2563eb', cursor: 'pointer' }}
                  />
                </ListItem>
              ))}
            </List>
          </Paper>

          <Paper sx={{ p: 3, borderRadius: 3, boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
              <CommunityIcon color="primary" />
              <Typography variant="subtitle1" sx={{ fontWeight: 800, color: '#1e293b' }}>
                Who to Follow
              </Typography>
            </Box>
            <List dense disablePadding>
              {[
                { name: 'TaskPlanet Dev', handle: 'taskplanet_org' },
                { name: 'Antigravity AI', handle: 'antigravity_coding' },
              ].map((suggested, idx) => (
                <React.Fragment key={idx}>
                  <ListItem disableGutters sx={{ py: 1 }}>
                    <ListItemAvatar>
                      <Avatar
                        src={`https://api.dicebear.com/7.x/adventurer/svg?seed=${suggested.handle}`}
                        sx={{ width: 36, height: 36 }}
                      />
                    </ListItemAvatar>
                    <ListItemText
                      primary={suggested.name}
                      secondary={`@${suggested.handle}`}
                      primaryTypographyProps={{ fontWeight: 700 }}
                    />
                    <Button variant="text" size="small" sx={{ textTransform: 'none', fontWeight: 600 }}>
                      Follow
                    </Button>
                  </ListItem>
                  {idx === 0 && <Divider variant="inset" component="li" />}
                </React.Fragment>
              ))}
            </List>
          </Paper>
        </Grid>
      </Grid>
    </Layout>
  );
};

export default Feed;
