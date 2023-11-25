// WorkoutForm.js
import React, { useState } from 'react';
import { TextField, Button, Grid, Box } from '@mui/material';
import workouts from '../services/workouts';

const WorkoutForm = ({ onAddWorkout }) => {
  const [date, setDate] = useState('');
  const [description, setDescription] = useState('');
  const [duration, setDuration] = useState('');

  const handleAddWorkout = async () => {
    const newWorkout = {
      date,
      description,
      duration: parseInt(duration),
      movements: [],
    };
    const res = await workouts.create(newWorkout)
    onAddWorkout(res);
    setDate('');
    setDescription('');
    setDuration('');
  };

  return (
    <Box sx={{ width: '80%', margin: 'auto' }}>
      <Grid container spacing={2} alignItems="center">
        <Grid item xs={4}>
          <TextField
            label="Date"
            type="date"
            required
            value={date}
            onChange={(e) => setDate(e.target.value)}
            fullWidth
            InputLabelProps={{
              shrink: true,
            }}
          />
        </Grid>
        <Grid item xs={4}>
          <TextField
            label="Description"
            value={description}
            required
            onChange={(e) => setDescription(e.target.value)}
            fullWidth
          />
        </Grid>
        <Grid item xs={3}>
          <TextField
            label="Duration (mins)"
            type="number"
            value={duration}
            required
            onChange={(e) => setDuration(e.target.value)}
            fullWidth
          />
        </Grid>
        <Grid item xs={1}>
          <Button variant="contained" color="primary" onClick={handleAddWorkout}>
            Add
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default WorkoutForm;
