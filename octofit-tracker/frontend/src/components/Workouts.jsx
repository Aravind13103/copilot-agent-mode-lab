import { useEffect, useState } from 'react';
import { getApiUrl } from '../utils/api';

function Workouts() {
  const [workouts, setWorkouts] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadWorkouts = async () => {
      try {
        const response = await fetch(getApiUrl('workouts'));
        const data = await response.json();
        const payload = Array.isArray(data) ? data : data.results || [];
        setWorkouts(payload);
      } catch (err) {
        setError('Unable to load workouts right now.');
      } finally {
        setLoading(false);
      }
    };

    loadWorkouts();
  }, []);

  return (
    <div className="container py-5">
      <h2 className="mb-4">Workouts</h2>
      {loading && <p>Loading workouts…</p>}
      {error && <p className="text-danger">{error}</p>}
      <div className="row g-4">
        {workouts.map((workout) => (
          <div className="col-md-6" key={workout._id || workout.id || workout.name}>
            <div className="card shadow-sm h-100">
              <div className="card-body">
                <h5 className="card-title">{workout.name}</h5>
                <p className="card-text mb-1"><strong>Focus:</strong> {workout.focus}</p>
                <p className="card-text mb-1"><strong>Duration:</strong> {workout.durationMinutes} min</p>
                <p className="card-text"><strong>Difficulty:</strong> {workout.difficulty}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Workouts;
