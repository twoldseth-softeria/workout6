export interface WorkoutType {
  id: string;
  sequence: number;
  name: string;
}

export interface Workout {
  id: string;
  sequence: number;
  date: string;
  workoutType: WorkoutType;
  minutes: number;
}

export interface WorkoutTypeResponse {
  data: WorkoutType[];
  meta: {
    count: number;
  };
}

export interface WorkoutResponse {
  data: Workout[];
  meta: {
    count: number;
  };
}

export interface CreateWorkoutTypeRequest {
  name: string;
}

export interface CreateWorkoutRequest {
  date: string;
  workoutType: WorkoutType;
  minutes: number;
}