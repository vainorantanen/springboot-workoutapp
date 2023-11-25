import React, { useState, useEffect } from 'react'
import { Container, Divider, Paper, Typography } from '@mui/material';
import MovementForm from './components/MovementForm';
import WorkoutForm from './components/WorkoutForm';
import workoutsService from './services/workouts';
import movementsService from './services/movements';
import NewMovementForm from './components/NewMovementForm';

 const App = () => {
  const [workouts, setWorkouts] = useState([]);
  const [movements, setMovements] = useState([]);

  useEffect(() => {
    const fetchWorkouts = async () => {
      const workoutsFromApi = await workoutsService.getAll();
      setWorkouts(workoutsFromApi)
    }

    const fetchMovements = async () => {
      const movementsFromApi = await movementsService.getAll();
      setMovements(movementsFromApi)
    }

    fetchWorkouts()
    fetchMovements()

  }, [])
  
  const handleAddWorkout = (newWorkout) => {
    setWorkouts([...workouts, newWorkout]);
  };

  const handleAddMovement = (movement, index) => {
    const updatedWorkouts = [...workouts];
    updatedWorkouts[index].movements.push(movement);
    setWorkouts(updatedWorkouts);
  };

  const handleAddNewMovement = (newMovement) => {
    setMovements([...movements, newMovement]);
  };

  console.log(workouts)

  return (
    <Container>
      <Typography variant="h4" align="center" gutterBottom>
        Workout Tracker
      </Typography>
      <WorkoutForm onAddWorkout={handleAddWorkout} />
      <Divider style={{ margin: '2rem 0' }} />
      <Typography variant="h4" align="center" gutterBottom>
        All workouts
      </Typography>
      {workouts.map((workout, index) => (
        <div key={index}>
          <Typography variant="h6">
            Workout {index + 1}: {workout.description} on {workout.date} for{' '}
            {workout.duration} mins
          </Typography>
          <MovementForm
            onAddMovement={(movement) => handleAddMovement(movement, index)}
            movements={movements}
            targetWorkoutId={workout.id}
          />
            {workout.movements.map((movement, movementIndex) => (
              <Paper key={movementIndex} elevation={3} sx={{ my:2, p: 1 }}>
                <Typography variant='h6'>{movement.first.movement}, {movement.second}</Typography>
              </Paper>
            ))}
          <Divider style={{ margin: '1rem 0' }} />
        </div>
      ))}
      <Typography variant="h4" align="center" gutterBottom>
       Add a new movement
      </Typography>
      <NewMovementForm onAddNewMovement={handleAddNewMovement} />
      <Divider style={{ margin: '2rem 0' }} />
      <Typography variant="h4" align="center" gutterBottom>
        All movements
      </Typography>
      {movements.map(m => (
        <Paper key={m.id} elevation={3} sx={{ my:2, p: 1 }}>
          <Typography variant='h6'>{m.movement}</Typography>
        </Paper>
      ))}
    </Container>
  );
}

export default App;
