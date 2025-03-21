import { useState, useEffect } from 'react';
import './App.css';
import WorkoutList from './components/WorkoutList';
import WorkoutForm from './components/WorkoutForm';
import WorkoutTypeList from './components/WorkoutTypeList';
import { Workout, CreateWorkoutRequest } from './types';
import { fetchWorkouts, createWorkout, updateWorkout, deleteWorkout } from './api/workoutService';

function App() {
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isAddingWorkout, setIsAddingWorkout] = useState(false);
  const [editingWorkout, setEditingWorkout] = useState<Workout | null>(null);
  const [activeView, setActiveView] = useState<'workouts' | 'types'>('workouts');

  const loadWorkouts = async () => {
    try {
      setLoading(true);
      const data = await fetchWorkouts();
      setWorkouts(data);
      setError(null);
    } catch (err) {
      setError('Failed to load workouts');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadWorkouts();
  }, []);

  const handleAddWorkout = async (workout: CreateWorkoutRequest) => {
    try {
      await createWorkout(workout);
      setIsAddingWorkout(false);
      await loadWorkouts();
    } catch (err) {
      setError('Failed to add workout');
      console.error(err);
    }
  };

  const handleUpdateWorkout = async (workout: CreateWorkoutRequest) => {
    if (!editingWorkout) return;
    
    try {
      await updateWorkout(editingWorkout.id, workout);
      setEditingWorkout(null);
      await loadWorkouts();
    } catch (err) {
      setError('Failed to update workout');
      console.error(err);
    }
  };

  const handleDeleteWorkout = async (id: string) => {
    if (!confirm('Are you sure you want to delete this workout?')) return;
    
    try {
      await deleteWorkout(id);
      await loadWorkouts();
    } catch (err) {
      setError('Failed to delete workout');
      console.error(err);
    }
  };

  return (
    <div className="app">
      <header className="app-header">
        <h1>Workout Tracker</h1>
        <div className="view-tabs">
          <button 
            className={`tab ${activeView === 'workouts' ? 'active' : ''}`}
            onClick={() => setActiveView('workouts')}
          >
            My Workouts
          </button>
          <button 
            className={`tab ${activeView === 'types' ? 'active' : ''}`}
            onClick={() => setActiveView('types')}
          >
            Workout Types
          </button>
        </div>
      </header>

      <main className="app-content">
        {error && <div className="error-banner">{error}</div>}

        {activeView === 'workouts' && (
          <>
            {(isAddingWorkout || editingWorkout) ? (
              <div className="form-container">
                <h2>{editingWorkout ? 'Edit Workout' : 'Add New Workout'}</h2>
                <WorkoutForm 
                  workout={editingWorkout || undefined} 
                  onSubmit={editingWorkout ? handleUpdateWorkout : handleAddWorkout}
                  onCancel={() => {
                    setIsAddingWorkout(false);
                    setEditingWorkout(null);
                  }}
                />
              </div>
            ) : (
              <>
                <div className="actions-bar">
                  <button 
                    className="btn-add" 
                    onClick={() => setIsAddingWorkout(true)}
                  >
                    Add New Workout
                  </button>
                </div>
                
                {loading ? (
                  <div className="loading">Loading workouts...</div>
                ) : (
                  <WorkoutList 
                    workouts={workouts} 
                    onEdit={setEditingWorkout}
                    onDelete={handleDeleteWorkout}
                  />
                )}
              </>
            )}
          </>
        )}

        {activeView === 'types' && (
          <WorkoutTypeList />
        )}
      </main>
    </div>
  );
}

export default App;