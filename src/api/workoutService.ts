import { 
  WorkoutType, 
  WorkoutTypeResponse, 
  CreateWorkoutTypeRequest,
  Workout,
  WorkoutResponse,
  CreateWorkoutRequest
} from '../types';

// Workout Type API functions
export const fetchWorkoutTypes = async (): Promise<WorkoutType[]> => {
  try {
    const response = await fetch('/api/workoutType');
    if (!response.ok) {
      throw new Error('Failed to fetch workout types');
    }
    const data: WorkoutTypeResponse = await response.json();
    return data.data;
  } catch (error) {
    console.error('Error fetching workout types:', error);
    throw error;
  }
};

export const createWorkoutType = async (workoutType: CreateWorkoutTypeRequest): Promise<void> => {
  try {
    const response = await fetch('/api/workoutType', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(workoutType),
    });
    
    if (!response.ok) {
      throw new Error('Failed to create workout type');
    }
  } catch (error) {
    console.error('Error creating workout type:', error);
    throw error;
  }
};

export const updateWorkoutType = async (id: string, workoutType: CreateWorkoutTypeRequest): Promise<void> => {
  try {
    const response = await fetch(`/api/workoutType/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(workoutType),
    });
    
    if (!response.ok) {
      throw new Error('Failed to update workout type');
    }
  } catch (error) {
    console.error('Error updating workout type:', error);
    throw error;
  }
};

export const deleteWorkoutType = async (id: string): Promise<void> => {
  try {
    const response = await fetch(`/api/workoutType/${id}`, {
      method: 'DELETE',
    });
    
    if (!response.ok) {
      throw new Error('Failed to delete workout type');
    }
  } catch (error) {
    console.error('Error deleting workout type:', error);
    throw error;
  }
};

// Workout Log API functions
export const fetchWorkouts = async (): Promise<Workout[]> => {
  try {
    const response = await fetch('/api/workoutLog');
    if (!response.ok) {
      throw new Error('Failed to fetch workouts');
    }
    const data: WorkoutResponse = await response.json();
    return data.data;
  } catch (error) {
    console.error('Error fetching workouts:', error);
    throw error;
  }
};

export const createWorkout = async (workout: CreateWorkoutRequest): Promise<void> => {
  try {
    const response = await fetch('/api/workoutLog', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(workout),
    });
    
    if (!response.ok) {
      throw new Error('Failed to create workout');
    }
  } catch (error) {
    console.error('Error creating workout:', error);
    throw error;
  }
};

export const updateWorkout = async (id: string, workout: CreateWorkoutRequest): Promise<void> => {
  try {
    const response = await fetch(`/api/workoutLog/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(workout),
    });
    
    if (!response.ok) {
      throw new Error('Failed to update workout');
    }
  } catch (error) {
    console.error('Error updating workout:', error);
    throw error;
  }
};

export const deleteWorkout = async (id: string): Promise<void> => {
  try {
    const response = await fetch(`/api/workoutLog/${id}`, {
      method: 'DELETE',
    });
    
    if (!response.ok) {
      throw new Error('Failed to delete workout');
    }
  } catch (error) {
    console.error('Error deleting workout:', error);
    throw error;
  }
};