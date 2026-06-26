import { useEffect, useState } from 'react';

function Activities() {
  const [activities, setActivities] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadActivities = async () => {
      try {
        const apiUrl = `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/activities`;
        const response = await fetch(apiUrl);
        const data = await response.json();
        const payload = Array.isArray(data) ? data : data.results || [];
        setActivities(payload);
      } catch (err) {
        setError('Unable to load activities right now.');
      } finally {
        setLoading(false);
      }
    };

    loadActivities();
  }, []);

  return (
    <div className="container py-5">
      <h2 className="mb-4">Activities</h2>
      {loading && <p>Loading activities…</p>}
      {error && <p className="text-danger">{error}</p>}
      <div className="row g-4">
        {activities.map((activity) => (
          <div className="col-md-6" key={activity._id || activity.id || activity.type}>
            <div className="card shadow-sm h-100">
              <div className="card-body">
                <h5 className="card-title">{activity.type}</h5>
                <p className="card-text mb-1"><strong>Duration:</strong> {activity.durationMinutes} min</p>
                <p className="card-text mb-1"><strong>Calories:</strong> {activity.caloriesBurned}</p>
                <p className="card-text"><strong>Distance:</strong> {activity.distanceKm} km</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Activities;
