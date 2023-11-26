import { Box, Button, TextField } from '@mui/material'
import React, { useState } from 'react'
import workoutsService from '../services/workouts'

const ModifyWorkoutDesc = ({ workout, setWorkouts, workouts }) => {
    const [ desc, setDesc ] = useState(workout.description || '')

    const handleUpdateDescription = async () => {
        try {
            const res = await workoutsService.updateDescription(workout.id, desc)
            if (res && res !== null) {
                const newWorkouts = workouts.map(w => w.id === workout.id ? res : w)
                setWorkouts(newWorkouts)
            }
        } catch (error) {
            console.log(error)
        }
    }

  return (
    <Box sx={{ textAlign: 'center' }}>
        <TextField
        type='text'
        required
        fullWidth
        value={desc}
        onChange={(e) => setDesc(e.target.value)}
        />
        <Button variant='contained'
        sx={{ my:2 }}
        onClick={handleUpdateDescription}>Update</Button>
    </Box>
  )
}

export default ModifyWorkoutDesc