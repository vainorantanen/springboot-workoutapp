// NewMovementForm.js
import React, { useState } from 'react';
import { TextField, Button, Box } from '@mui/material';
import movements from '../services/movements';

const NewMovementForm = ({ onAddNewMovement }) => {
  const [movement, setMovement] = useState('');

  const handleAddNewMovement = async () => {
    const newMovement = {
      movement,
    };
    const res = await movements.create(newMovement);
    onAddNewMovement(res);
    setMovement('');
  };

  return (
    <Box sx={{ width: '80%', margin: 'auto' }}>
      <TextField
        label="New Movement"
        value={movement}
        onChange={(e) => setMovement(e.target.value)}
        fullWidth
        required
      />
      <Button
        variant="contained"
        color="primary"
        onClick={handleAddNewMovement}
        style={{ marginTop: '1rem' }}
      >
        Add New Movement
      </Button>
    </Box>
  );
};

export default NewMovementForm;
