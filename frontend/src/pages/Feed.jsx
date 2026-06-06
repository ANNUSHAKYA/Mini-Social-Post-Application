import React, { useState, useEffect } from 'react';
import { useAuth, api } from '../context/AuthContext';
import Layout from '../components/Layout';
import CreatePost from '../components/CreatePost';
import PostCard from '../components/PostCard';
import {
  Box,
  Typography,
  Button,
  CircularProgress,
  Paper,
} from '@mui/material';

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
      <Box sx={{ maxWidth: 600, mx: 'auto', display: 'flex', flexDirection: 'column', gap: 1.5 }}>
        
        {/* Posting card (only shown if logged in) */}
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
              <Box display="flex" justifyContent="center" mt={2} mb={4}>
                <Button
                  variant="outlined"
                  onClick={handleLoadMore}
                  disabled={loadingMore}
                  sx={{
                    borderRadius: 3.5,
                    textTransform: 'none',
                    px: 4,
                    fontWeight: 700,
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
          <Paper sx={{ p: 5, borderRadius: 4, textAlign: 'center', border: '1px solid #f1f5f9' }}>
            <Typography variant="h6" color="textSecondary" gutterBottom sx={{ fontWeight: 700 }}>
              No posts to display yet
            </Typography>
            <Typography variant="body2" color="textSecondary">
              Be the first to share your thoughts with the community!
            </Typography>
          </Paper>
        )}
      </Box>
    </Layout>
  );
};

export default Feed;
