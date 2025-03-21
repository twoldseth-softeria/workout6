import { Workout } from '../types';

interface WorkoutListProps {
  workouts: Workout[];
  onEdit: (workout: Workout) => void;
  onDelete: (id: string) => void;
}

const WorkoutList = ({ workouts, onEdit, onDelete }: WorkoutListProps) => {
  // Sort workouts by date (newest first)
  const sortedWorkouts = [...workouts].sort((a, b) => 
    new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  if (sortedWorkouts.length === 0) {
    return <div className="no-workouts">No workouts found. Add your first workout!</div>;
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="workout-list">
      <h2>Your Workouts</h2>
      <div className="workouts-container">
        {sortedWorkouts.map((workout) => (
          <div key={workout.id} className="workout-card">
            <div className="workout-date">{formatDate(workout.date)}</div>
            <div className="workout-type">{workout.workoutType.name}</div>
            <div className="workout-duration">{workout.minutes} minutes</div>
            <div className="workout-actions">
              <button 
                className="btn-edit" 
                onClick={() => onEdit(workout)}
                aria-label={`Edit workout from ${formatDate(workout.date)}`}
              >
                Edit
              </button>
              <button 
                className="btn-delete" 
                onClick={() => onDelete(workout.id)}
                aria-label={`Delete workout from ${formatDate(workout.date)}`}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WorkoutList;