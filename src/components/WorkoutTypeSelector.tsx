import { useEffect, useState } from 'react';
import { WorkoutType } from '../types';
import { fetchWorkoutTypes } from '../api/workoutService';

interface WorkoutTypeSelectorProps {
  value: WorkoutType | null;
  onChange: (workoutType: WorkoutType) => void;
}

const WorkoutTypeSelector = ({ value, onChange }: WorkoutTypeSelectorProps) => {
  const [workoutTypes, setWorkoutTypes] = useState<WorkoutType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadWorkoutTypes = async () => {
      try {
        setLoading(true);
        const types = await fetchWorkoutTypes();
        setWorkoutTypes(types);
        setError(null);
      } catch (err) {
        setError('Failed to load workout types');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadWorkoutTypes();
  }, []);

  if (loading) return <div className="loading">Loading workout types...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="workout-type-selector">
      <select 
        value={value?.id || ''} 
        onChange={(e) => {
          const selectedType = workoutTypes.find(type => type.id === e.target.value);
          if (selectedType) {
            onChange(selectedType);
          }
        }}
      >
        <option value="">Select a workout type</option>
        {workoutTypes.map((type) => (
          <option key={type.id} value={type.id}>
            {type.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default WorkoutTypeSelector;