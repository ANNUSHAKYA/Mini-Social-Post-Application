import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import Layout from '../components/Layout';
import {
  Box,
  Typography,
  Paper,
  Button,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  Avatar,
  Divider,
} from '@mui/material';
import {
  Assignment as TaskIcon,
  CheckCircle as CheckIcon,
  Star as StarIcon,
} from '@mui/icons-material';

const Tasks = () => {
  const { user, addPoints } = useAuth();
  const [tasks, setTasks] = useState([
    { id: 1, title: 'Daily Login Reward', reward: 50, completed: false, description: 'Login to the app every day to claim bonus points.' },
    { id: 2, title: 'Install TaskPlanet Mobile App', reward: 300, completed: false, description: 'Download and register on the TaskPlanet mobile app.' },
    { id: 3, title: 'Complete Short Feedback Survey', reward: 150, completed: false, description: 'Give 5-star feedback and share your experience.' },
    { id: 4, title: 'Solve Math Quiz Challenge', reward: 100, completed: false, description: 'Solve 10 simple questions within 2 minutes.' },
  ]);

  const handleClaim = async (taskId, reward) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === taskId ? { ...t, completed: true } : t))
    );
    if (user) {
      const res = await addPoints(reward);
      if (res.success) {
        alert(`Task completed! You claimed +${reward} Points! ⭐`);
      } else {
        alert('Could not update points in the database.');
      }
    } else {
      alert(`Task completed! (Guest Mode) You claimed +${reward} Points! ⭐`);
    }
  };

  return (
    <Layout>
      <Box sx={{ maxWidth: 600, mx: 'auto', display: 'flex', flexDirection: 'column', gap: 2.5 }}>
        <Paper sx={{ p: 3, borderRadius: 4, textAlign: 'center', bgcolor: '#fff', border: '1px solid #f1f5f9' }}>
          <TaskIcon color="primary" sx={{ fontSize: '3rem', mb: 1.5 }} />
          <Typography variant="h5" sx={{ fontWeight: 800 }}>
            Earn Points Tasks
          </Typography>
          <Typography variant="body2" color="textSecondary" sx={{ mt: 0.5 }}>
            Complete simple tasks daily to boost your wallet points balance.
          </Typography>
        </Paper>

        <Paper sx={{ borderRadius: 4, bgcolor: '#fff', border: '1px solid #f1f5f9', overflow: 'hidden' }}>
          <List disablePadding>
            {tasks.map((task, idx) => (
              <React.Fragment key={task.id}>
                <ListItem sx={{ py: 2.5, px: 3, alignItems: 'flex-start', gap: 1.5 }}>
                  <Avatar sx={{ bgcolor: task.completed ? '#e6f4ea' : '#eff6ff', color: task.completed ? '#10b981' : '#0062ff', mt: 0.5 }}>
                    {task.completed ? <CheckIcon /> : <TaskIcon />}
                  </Avatar>
                  <Box sx={{ pr: 12 }}>
                    <ListItemText
                      primary={
                        <Typography variant="subtitle1" sx={{ fontWeight: 800, color: '#1e293b' }}>
                          {task.title}
                        </Typography>
                      }
                      secondary={
                        <Typography variant="body2" color="textSecondary" sx={{ mt: 0.5, fontSize: '0.85rem' }}>
                          {task.description}
                        </Typography>
                      }
                    />
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mt: 1 }}>
                      <StarIcon sx={{ color: '#fbbf24', fontSize: '1rem' }} />
                      <Typography variant="caption" sx={{ fontWeight: 700, color: '#f59e0b' }}>
                        +{task.reward} Points
                      </Typography>
                    </Box>
                  </Box>
                  <ListItemSecondaryAction sx={{ top: '45%' }}>
                    <Button
                      variant={task.completed ? 'outlined' : 'contained'}
                      disabled={task.completed}
                      onClick={() => handleClaim(task.id, task.reward)}
                      sx={{
                        borderRadius: 3.5,
                        textTransform: 'none',
                        fontWeight: 700,
                        fontSize: '0.8rem',
                        px: 2.5,
                        bgcolor: task.completed ? 'transparent' : '#0062ff',
                        color: task.completed ? '#10b981' : '#fff',
                        borderColor: task.completed ? '#10b981' : 'transparent',
                        '&:hover': {
                          bgcolor: task.completed ? 'transparent' : '#0052d9',
                        },
                      }}
                    >
                      {task.completed ? 'Completed' : 'Claim'}
                    </Button>
                  </ListItemSecondaryAction>
                </ListItem>
                {idx < tasks.length - 1 && <Divider />}
              </React.Fragment>
            ))}
          </List>
        </Paper>
      </Box>
    </Layout>
  );
};

export default Tasks;
