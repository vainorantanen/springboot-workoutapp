import { Box, Button, TextField } from '@mui/material'
import React, { useState } from 'react'
import movementsService from '../services/movements';

const ModifyMovement = ({ movement, movements, setMovements }) => {
 const [ updatedMovementText, setupdatedMovementText ] = useState(movement.movement || '');

const handleUpdateMovement = async () => {
    try {
        const res = await movementsService.update(movement.id, updatedMovementText)
        if (res && res != null) {
            const newMovements = movements.map(m => m.id === movement.id ? res : m )
            setMovements(newMovements)
        }
    } catch (error) {
        console.log(error)
    }
}

  return (
    <Box>
        <TextField
          fullWidth
          required
          type='text'
          value={updatedMovementText}
          onChange={(e) => setupdatedMovementText(e.target.value)}
          />
          <Button variant='contained'
          onClick={handleUpdateMovement}
          >Update</Button>
    </Box>
  )
}

export default ModifyMovement