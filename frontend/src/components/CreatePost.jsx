import React, { useState, useRef } from 'react';
import { useAuth, api } from '../context/AuthContext';
import {
  Card,
  CardContent,
  Avatar,
  TextField,
  Button,
  Box,
  IconButton,
  Tooltip,
  Typography,
  Collapse,
  InputAdornment,
} from '@mui/material';
import {
  Image as ImageIcon,
  Link as LinkIcon,
  Cancel as CancelIcon,
  Send as SendIcon,
} from '@mui/icons-material';

const CreatePost = ({ onPostCreated }) => {
  const { user } = useAuth();
  const [text, setText] = useState('');
  const [image, setImage] = useState('');
  const [imageType, setImageType] = useState(null); // 'url' or 'file'
  const [imageUrlInput, setImageUrlInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const fileInputRef = useRef(null);

  // Compress image on client-side before sending
  const compressImage = (base64Str, maxWidth = 800, maxHeight = 800) => {
    return new Promise((resolve) => {
      const img = new Image();
      img.src = base64Str;
      img.onload = () => {
        const canvas = document.createElement('canvas');
        let width = img.width;
        let height = img.height;

        if (width > height) {
          if (width > maxWidth) {
            height = Math.round((height * maxWidth) / width);
            width = maxWidth;
          }
        } else {
          if (height > maxHeight) {
            width = Math.round((width * maxHeight) / height);
            height = maxHeight;
          }
        }

        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, width, height);
        // Compress using jpeg format and quality 0.7
        resolve(canvas.toDataURL('image/jpeg', 0.7));
      };
    });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setError('Please select a valid image file');
      return;
    }

    // Limit original size just in case, but we will compress
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = async () => {
      try {
        const compressed = await compressImage(reader.result);
        setImage(compressed);
        setImageType('file');
        setError('');
      } catch (err) {
        setError('Error processing image');
      }
    };
  };

  const handleAddUrl = () => {
    if (imageUrlInput.trim() !== '') {
      setImage(imageUrlInput.trim());
      setImageType('url');
      setImageUrlInput('');
      setError('');
    }
  };

  const removeImage = () => {
    setImage('');
    setImageType(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!text.trim() && !image) {
      setError('Please enter some text or select an image');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const res = await api.post('/posts', {
        text: text.trim(),
        image: image || undefined,
      });

      setText('');
      removeImage();
      if (onPostCreated) {
        onPostCreated(res.data);
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create post');
    } finally {
      setLoading(false);
    }
  };

  if (!user) return null;

  return (
    <Card sx={{ mb: 3, borderRadius: 3, boxShadow: '0 2px 8px rgba(0,0,0,0.06)', overflow: 'visible' }}>
      <CardContent>
        <Box component="form" onSubmit={handleSubmit}>
          <Box sx={{ display: 'flex', gap: 2, alignItems: 'flex-start' }}>
            <Avatar src={user.avatar} sx={{ width: 44, height: 44 }} />
            <TextField
              placeholder="What's on your mind? Share text, an image, or both..."
              multiline
              rows={3}
              value={text}
              onChange={(e) => setText(e.target.value)}
              variant="standard"
              fullWidth
              InputProps={{
                disableUnderline: true,
              }}
              sx={{
                fontSize: '1.05rem',
                color: '#1e293b',
                pt: 1,
              }}
            />
          </Box>

          {/* Error Message */}
          {error && (
            <Typography variant="caption" color="error" sx={{ mt: 1, display: 'block', fontWeight: 500 }}>
              {error}
            </Typography>
          )}

          {/* Image Previews */}
          <Collapse in={!!image}>
            <Box sx={{ position: 'relative', mt: 2, borderRadius: 2, overflow: 'hidden', border: '1px solid #e2e8f0' }}>
              <img
                src={image}
                alt="Post attachment preview"
                style={{ width: '100%', maxHeight: 350, objectFit: 'cover', display: 'block' }}
              />
              <IconButton
                onClick={removeImage}
                sx={{
                  position: 'absolute',
                  top: 8,
                  right: 8,
                  bgcolor: 'rgba(0, 0, 0, 0.6)',
                  color: '#fff',
                  '&:hover': { bgcolor: 'rgba(0, 0, 0, 0.8)' },
                }}
                size="small"
              >
                <CancelIcon />
              </IconButton>
            </Box>
          </Collapse>

          {/* URL Input Box */}
          <Collapse in={imageType === null && !image}>
            <Box sx={{ mt: 2 }}>
              <TextField
                placeholder="Or paste an image URL here..."
                variant="outlined"
                size="small"
                fullWidth
                value={imageUrlInput}
                onChange={(e) => setImageUrlInput(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LinkIcon fontSize="small" sx={{ color: '#64748b' }} />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <Button size="small" onClick={handleAddUrl} sx={{ textTransform: 'none' }}>
                        Add
                      </Button>
                    </InputAdornment>
                  ),
                }}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 2.5,
                    bgcolor: '#f8fafc',
                  },
                }}
              />
            </Box>
          </Collapse>

          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              mt: 2,
              pt: 2,
              borderTop: '1px solid #f1f5f9',
            }}
          >
            <Box sx={{ display: 'flex', gap: 1 }}>
              {/* Image Uploader */}
              <input
                type="file"
                accept="image/*"
                ref={fileInputRef}
                style={{ display: 'none' }}
                onChange={handleFileChange}
              />
              <Tooltip title="Upload Image">
                <IconButton
                  color="primary"
                  onClick={() => fileInputRef.current?.click()}
                  sx={{
                    bgcolor: '#eff6ff',
                    '&:hover': { bgcolor: '#dbeafe' },
                  }}
                >
                  <ImageIcon />
                </IconButton>
              </Tooltip>
            </Box>

            <Button
              type="submit"
              variant="contained"
              disabled={loading || (!text.trim() && !image)}
              endIcon={<SendIcon />}
              sx={{
                bgcolor: '#2563eb',
                '&:hover': { bgcolor: '#1d4ed8' },
                textTransform: 'none',
                borderRadius: 2.5,
                px: 3,
                fontWeight: 600,
                boxShadow: '0 2px 4px rgba(37,99,235,0.2)',
              }}
            >
              {loading ? 'Posting...' : 'Post'}
            </Button>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

export default CreatePost;
