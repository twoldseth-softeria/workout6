import { useEffect, useState } from 'react';
import { WorkoutType } from '../types';
import { fetchWorkoutTypes, createWorkoutType, updateWorkoutType, deleteWorkoutType } from '../api/workoutService';

const WorkoutTypeList = () => {
  const [workoutTypes, setWorkoutTypes] = useState<WorkoutType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [newTypeName, setNewTypeName] = useState('');

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

  useEffect(() => {
    loadWorkoutTypes();
  }, []);

  const handleAdd = async () => {
    if (!newTypeName.trim()) return;
    
    try {
      await createWorkoutType({ name: newTypeName.trim() });
      setNewTypeName('');
      setIsAdding(false);
      await loadWorkoutTypes();
    } catch (err) {
      setError('Failed to create workout type');
      console.error(err);
    }
  };

  const handleUpdate = async (id: string) => {
    if (!newTypeName.trim()) return;
    
    try {
      await updateWorkoutType(id, { name: newTypeName.trim() });
      setNewTypeName('');
      setEditingId(null);
      await loadWorkoutTypes();
    } catch (err) {
      setError('Failed to update workout type');
      console.error(err);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this workout type?')) return;
    
    try {
      await deleteWorkoutType(id);
      await loadWorkoutTypes();
    } catch (err) {
      setError('Failed to delete workout type');
      console.error(err);
    }
  };

  const startEdit = (type: WorkoutType) => {
    setEditingId(type.id);
    setNewTypeName(type.name);
  };

  if (loading) return <div className="loading">Loading workout types...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="workout-type-list">
      <h2>Workout Types</h2>
      
      <div className="workout-types-container">
        {workoutTypes.map((type) => (
          <div key={type.id} className="workout-type-card">
            {editingId === type.id ? (
              <div className="type-edit-form">
                <input
                  type="text"
                  value={newTypeName}
                  onChange={(e) => setNewTypeName(e.target.value)}
                  placeholder="Type name"
                />
                <div className="edit-actions">
                  <button 
                    className="btn-save" 
                    onClick={() => handleUpdate(type.id)}
                  >
                    Save
                  </button>
                  <button 
                    className="btn-cancel" 
                    onClick={() => {
                      setEditingId(null);
                      setNewTypeName('');
                    }}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <>
                <div className="workout-type-name">{type.name}</div>
                <div className="workout-type-actions">
                  <button 
                    className="btn-edit" 
                    onClick={() => startEdit(type)}
                    aria-label={`Edit ${type.name}`}
                  >
                    Edit
                  </button>
                  <button 
                    className="btn-delete" 
                    onClick={() => handleDelete(type.id)}
                    aria-label={`Delete ${type.name}`}
                  >
                    Delete
                  </button>
                </div>
              </>
            )}
          </div>
        ))}
      </div>
      
      {isAdding ? (
        <div className="add-type-form">
          <input
            type="text"
            value={newTypeName}
            onChange={(e) => setNewTypeName(e.target.value)}
            placeholder="New workout type name"
          />
          <div className="add-actions">
            <button 
              className="btn-save" 
              onClick={handleAdd}
            >
              Add
            </button>
            <button 
              className="btn-cancel" 
              onClick={() => {
                setIsAdding(false);
                setNewTypeName('');
              }}
            >
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <button 
          className="btn-add-type" 
          onClick={() => setIsAdding(true)}
        >
          Add New Workout Type
        </button>
      )}
    </div>
  );
};

export default WorkoutTypeList;