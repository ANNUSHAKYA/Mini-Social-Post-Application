import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import {
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Avatar,
  Typography,
  IconButton,
  Box,
  Divider,
  TextField,
  Button,
  Collapse,
  Tooltip,
} from '@mui/material';
import {
  Favorite as FavoriteIcon,
  FavoriteBorder as FavoriteBorderIcon,
  ChatBubbleOutline as CommentIcon,
} from '@mui/icons-material';

const PostCard = ({ post, onLike, onComment }) => {
  const { user } = useAuth();
  const [showComments, setShowComments] = useState(false);
  const [commentText, setCommentText] = useState('');
  const [submittingComment, setSubmittingComment] = useState(false);

  const isLiked = user ? post.likes.some((like) => like.user === user._id) : false;

  const handleLikeClick = () => {
    if (!user) {
      alert('Please login to like this post!');
      return;
    }
    onLike(post._id);
  };

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      alert('Please login to comment!');
      return;
    }
    if (!commentText.trim()) return;

    setSubmittingComment(true);
    try {
      await onComment(post._id, commentText.trim());
      setCommentText('');
    } catch (error) {
      console.error(error);
    } finally {
      setSubmittingComment(false);
    }
  };

  // Format creation date
  const formatDate = (dateStr) => {
    const d = new Date(dateStr);
    return d.toLocaleDateString(undefined, {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  // Compile list of usernames who liked for tooltip
  const getLikesTooltip = () => {
    if (post.likes.length === 0) return 'No likes yet';
    const names = post.likes.map((l) => l.username);
    if (names.length <= 5) return `Liked by: ${names.join(', ')}`;
    return `Liked by: ${names.slice(0, 5).join(', ')} and ${names.length - 5} others`;
  };

  return (
    <Card sx={{ mb: 3, borderRadius: 3, boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
      {/* Header */}
      <CardHeader
        avatar={
          <Avatar
            src={post.userAvatar || `https://api.dicebear.com/7.x/adventurer/svg?seed=${post.username}`}
            alt={post.username}
          />
        }
        title={
          <Typography variant="subtitle2" sx={{ fontWeight: 700, color: '#1e293b' }}>
            @{post.username}
          </Typography>
        }
        subheader={
          <Typography variant="caption" sx={{ color: '#64748b' }}>
            {formatDate(post.createdAt)}
          </Typography>
        }
      />

      {/* Post Content */}
      <CardContent sx={{ pt: 0, pb: 1 }}>
        {post.text && (
          <Typography variant="body1" sx={{ color: '#334155', whiteSpace: 'pre-wrap', mb: post.image ? 2 : 0 }}>
            {post.text}
          </Typography>
        )}
      </CardContent>

      {post.image && (
        <Box
          sx={{
            width: '100%',
            maxHeight: 400,
            overflow: 'hidden',
            borderTop: '1px solid #f1f5f9',
            borderBottom: '1px solid #f1f5f9',
            bgcolor: '#000',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <img
            src={post.image}
            alt="Post media"
            style={{ width: '100%', maxHeight: 400, objectFit: 'contain' }}
            loading="lazy"
          />
        </Box>
      )}

      {/* Action Buttons */}
      <CardActions sx={{ px: 2, py: 1, justifyContent: 'flex-start', gap: 2 }}>
        <Tooltip title={getLikesTooltip()} placement="top" arrow>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <IconButton
              onClick={handleLikeClick}
              color={isLiked ? 'error' : 'default'}
              size="medium"
              sx={{
                transition: 'transform 0.2s',
                '&:active': { transform: 'scale(1.3)' },
              }}
            >
              {isLiked ? <FavoriteIcon /> : <FavoriteBorderIcon />}
            </IconButton>
            <Typography variant="body2" sx={{ fontWeight: 600, color: isLiked ? '#ef4444' : '#64748b', ml: 0.5 }}>
              {post.likes.length}
            </Typography>
          </Box>
        </Tooltip>

        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <IconButton onClick={() => setShowComments(!showComments)} size="medium" color="default">
            <CommentIcon />
          </IconButton>
          <Typography variant="body2" sx={{ fontWeight: 600, color: '#64748b', ml: 0.5 }}>
            {post.comments.length}
          </Typography>
        </Box>
      </CardActions>

      {/* Comments Drawer / Section */}
      <Collapse in={showComments} timeout="auto" unmountOnExit>
        <Divider />
        <CardContent sx={{ bgcolor: '#f8fafc', p: 2 }}>
          {/* List of comments */}
          {post.comments.length > 0 ? (
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mb: 2 }}>
              {post.comments.map((comment) => (
                <Box key={comment._id} sx={{ display: 'flex', gap: 1.5, alignItems: 'flex-start' }}>
                  <Avatar
                    src={`https://api.dicebear.com/7.x/adventurer/svg?seed=${comment.username}`}
                    alt={comment.username}
                    sx={{ width: 32, height: 32 }}
                  />
                  <Box
                    sx={{
                      bgcolor: '#ffffff',
                      borderRadius: 3,
                      p: 1.5,
                      flexGrow: 1,
                      border: '1px solid #e2e8f0',
                      boxShadow: '0 1px 2px rgba(0,0,0,0.02)',
                    }}
                  >
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 0.5 }}>
                      <Typography variant="subtitle2" sx={{ fontWeight: 700, fontSize: '0.85rem', color: '#1e293b' }}>
                        @{comment.username}
                      </Typography>
                      <Typography variant="caption" sx={{ color: '#94a3b8' }}>
                        {formatDate(comment.createdAt)}
                      </Typography>
                    </Box>
                    <Typography variant="body2" sx={{ color: '#334155', fontSize: '0.9rem', wordBreak: 'break-word' }}>
                      {comment.text}
                    </Typography>
                  </Box>
                </Box>
              ))}
            </Box>
          ) : (
            <Typography variant="body2" color="textSecondary" sx={{ mb: 2, fontStyle: 'italic', textAlign: 'center' }}>
              No comments yet. Be the first to share your thoughts!
            </Typography>
          )}

          {/* Add a comment */}
          {user ? (
            <Box component="form" onSubmit={handleCommentSubmit} sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
              <Avatar src={user.avatar} sx={{ width: 32, height: 32 }} />
              <TextField
                placeholder="Write a comment..."
                size="small"
                fullWidth
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 3,
                    bgcolor: '#ffffff',
                  },
                }}
              />
              <Button
                type="submit"
                variant="contained"
                disabled={submittingComment || !commentText.trim()}
                sx={{
                  borderRadius: 3,
                  textTransform: 'none',
                  bgcolor: '#2563eb',
                  '&:hover': { bgcolor: '#1d4ed8' },
                  px: 2.5,
                  minWidth: 70,
                }}
              >
                Post
              </Button>
            </Box>
          ) : (
            <Typography variant="body2" color="textSecondary" sx={{ textAlign: 'center' }}>
              Please{' '}
              <Typography
                component="span"
                variant="body2"
                color="primary"
                sx={{ cursor: 'pointer', fontWeight: 600 }}
                onClick={() => (window.location.href = '/login')}
              >
                login
              </Typography>{' '}
              to comment.
            </Typography>
          )}
        </CardContent>
      </Collapse>
    </Card>
  );
};

export default PostCard;
