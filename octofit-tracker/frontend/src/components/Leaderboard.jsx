import { useEffect, useState } from 'react';

function Leaderboard() {
  const [entries, setEntries] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadLeaderboard = async () => {
      try {
        const apiUrl = `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/leaderboard`;
        const response = await fetch(apiUrl);
        const data = await response.json();
        const payload = Array.isArray(data) ? data : data.results || [];
        setEntries(payload);
      } catch (err) {
        setError('Unable to load leaderboard right now.');
      } finally {
        setLoading(false);
      }
    };

    loadLeaderboard();
  }, []);

  return (
    <div className="container py-5">
      <h2 className="mb-4">Leaderboard</h2>
      {loading && <p>Loading leaderboard…</p>}
      {error && <p className="text-danger">{error}</p>}
      <div className="list-group">
        {entries.map((entry) => (
          <div className="list-group-item d-flex justify-content-between align-items-center" key={entry._id || entry.id || entry.rank}>
            <div>
              <h6 className="mb-1">#{entry.rank} {entry.userId?.name || entry.name}</h6>
              <small className="text-muted">Badge: {entry.badge}</small>
            </div>
            <span className="badge bg-primary rounded-pill">{entry.score} pts</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Leaderboard;
