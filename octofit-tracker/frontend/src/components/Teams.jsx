import { useEffect, useState } from 'react';
import { getApiUrl } from '../utils/api';

function Teams() {
  const [teams, setTeams] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadTeams = async () => {
      try {
        const response = await fetch(getApiUrl('teams'));
        const data = await response.json();
        const payload = Array.isArray(data) ? data : data.results || [];
        setTeams(payload);
      } catch (err) {
        setError('Unable to load teams right now.');
      } finally {
        setLoading(false);
      }
    };

    loadTeams();
  }, []);

  return (
    <div className="container py-5">
      <h2 className="mb-4">Teams</h2>
      {loading && <p>Loading teams…</p>}
      {error && <p className="text-danger">{error}</p>}
      <div className="row g-4">
        {teams.map((team) => (
          <div className="col-md-6" key={team._id || team.id || team.name}>
            <div className="card shadow-sm h-100">
              <div className="card-body">
                <h5 className="card-title">{team.name}</h5>
                <p className="card-text mb-1"><strong>Sport:</strong> {team.sport}</p>
                <p className="card-text"><strong>Members:</strong> {team.members?.length || team.members || 0}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Teams;
