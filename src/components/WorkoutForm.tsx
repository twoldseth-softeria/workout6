import { useState } from 'react';
import { Workout, WorkoutType, CreateWorkoutRequest } from '../types';
import WorkoutTypeSelector from './WorkoutTypeSelector';

interface WorkoutFormProps {
  workout?: Workout;
  onSubmit: (workout: CreateWorkoutRequest) => void;
  onCancel: () => void;
}

const WorkoutForm = ({ workout, onSubmit, onCancel }: WorkoutFormProps) => {
  const [date, setDate] = useState(workout?.date || new Date().toISOString().split('T')[0]);
  const [workoutType, setWorkoutType] = useState<WorkoutType | null>(workout?.workoutType || null);
  const [minutes, setMinutes] = useState(workout?.minutes?.toString() || '');
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};
    
    if (!date) {
      newErrors.date = 'Date is required';
    }
    
    if (!workoutType) {
      newErrors.workoutType = 'Workout type is required';
    }
    
    if (!minutes) {
      newErrors.minutes = 'Duration is required';
    } else if (isNaN(Number(minutes)) || Number(minutes) <= 0) {
      newErrors.minutes = 'Duration must be a positive number';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validate()) return;
    
    if (workoutType) {
      onSubmit({
        date,
        workoutType,
        minutes: Number(minutes),
      });
    }
  };

  return (
    <form className="workout-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="date">Date</label>
        <input
          id="date"
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
        {errors.date && <div className="error">{errors.date}</div>}
      </div>
      
      <div className="form-group">
        <label htmlFor="workoutType">Workout Type</label>
        <WorkoutTypeSelector 
          value={workoutType} 
          onChange={setWorkoutType} 
        />
        {errors.workoutType && <div className="error">{errors.workoutType}</div>}
      </div>
      
      <div className="form-group">
        <label htmlFor="minutes">Duration (minutes)</label>
        <input
          id="minutes"
          type="number"
          value={minutes}
          onChange={(e) => setMinutes(e.target.value)}
          min="1"
        />
        {errors.minutes && <div className="error">{errors.minutes}</div>}
      </div>
      
      <div className="form-actions">
        <button type="button" className="btn-cancel" onClick={onCancel}>
          Cancel
        </button>
        <button type="submit" className="btn-submit">
          {workout ? 'Update' : 'Create'} Workout
        </button>
      </div>
    </form>
  );
};

export default WorkoutForm;