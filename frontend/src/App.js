import React, { useState, useEffect } from 'react'
import { Button, Container, Divider, Paper, TextField, Typography } from '@mui/material';
import MovementForm from './components/MovementForm';
import WorkoutForm from './components/WorkoutForm';
import workoutsService from './services/workouts';
import movementsService from './services/movements';
import NewMovementForm from './components/NewMovementForm';
import ModifyWorkoutDesc from './components/ModifyWorkoutDesc';
import ModifyMovement from './components/ModifyMovement';

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

  const handleDeleteWorkout = async (workoutId) => {
    try {
      const res = await workoutsService.remove(workoutId)
      if (res && res === workoutId) {
        const newWorkouts = workouts.filter(w => w.id !== workoutId)
        setWorkouts(newWorkouts)
      }
    } catch(error) {
      console.log(error)
    }
  }

  const handleDeleteMovement = async (movementId) => {
    try {
      const res = await movementsService.remove(movementId)
      if (res && res === movementId) {
        const newMovements = movements.filter(w => w.id !== movementId)
        setMovements(newMovements)
      }
    } catch(error) {
      console.log(error)
    }
  }

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
          <ModifyWorkoutDesc workout={workout} setWorkouts={setWorkouts} workouts={workouts}/>
          <Button sx={{ color: 'red' }}
          onClick={() => handleDeleteWorkout(workout.id)}
          >Delete workout</Button>
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
          <Button sx={{ color: 'red' }} onClick={() => handleDeleteMovement(m.id)}>Delete movement</Button>
          <ModifyMovement movement={m} movements={movements} setMovements={setMovements}/>
        </Paper>
      ))}
    </Container>
  );
}

export default App;
