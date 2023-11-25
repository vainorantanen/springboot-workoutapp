// MovementForm.js
import React, { useState } from 'react';
import { TextField, Button, Box, FormControl, Select, MenuItem } from '@mui/material';
import workoutsService from '../services/workouts';

const MovementForm = ({ onAddMovement, movements, targetWorkoutId }) => {
    const [selectedMovement, setSelectedMovement] = useState('');
  const [description, setDescription] = useState('');

  const handleAddMovement = async () => {
    const movementToAdd = movements.find(movement => movement.movement === selectedMovement.movement);
    if (movementToAdd) {
      onAddMovement({
        first: movementToAdd,
        second: description,
      });
      // lisätään vielä tietokantaan
      const obj = {
        workoutId: targetWorkoutId,
        movementToAdd: movementToAdd,
        description: description,
      };
      await workoutsService.addMovement(obj)
      setSelectedMovement('');
      setDescription('');
    }
  };

  return (
    <Box sx={{ width: '80%', margin: 'auto' }}>
      <FormControl fullWidth style={{ marginTop: '1rem' }}>
            <Select
               value={selectedMovement}
               onChange={(e) => setSelectedMovement(e.target.value)}
              displayEmpty
              fullWidth
            >
              <MenuItem disabled value="">
                Add Movement to Workout
              </MenuItem>
              {movements && movements.map((movement, movementIndex) => (
                <MenuItem key={movementIndex} value={movement}>
                  {movement.movement}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
       <TextField
        label="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        fullWidth
        required
        style={{ marginTop: '1rem' }}
      />
      <Button
        variant="contained"
        color="primary"
        onClick={handleAddMovement}
        style={{ marginTop: '1rem' }}
      >
        Add Movement
      </Button>
    </Box>
  );
};

export default MovementForm;
