import { useEffect, useState } from 'react';
import { getApiUrl } from '../utils/api';

function Users() {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadUsers = async () => {
      try {
        const response = await fetch(getApiUrl('users'));
        const data = await response.json();
        const payload = Array.isArray(data) ? data : data.results || [];
        setUsers(payload);
      } catch (err) {
        setError('Unable to load users right now.');
      } finally {
        setLoading(false);
      }
    };

    loadUsers();
  }, []);

  return (
    <div className="container py-5">
      <h2 className="mb-4">Users</h2>
      {loading && <p>Loading users…</p>}
      {error && <p className="text-danger">{error}</p>}
      <div className="row g-4">
        {users.map((user) => (
          <div className="col-md-6" key={user._id || user.id || user.email}>
            <div className="card shadow-sm h-100">
              <div className="card-body">
                <h5 className="card-title">{user.name}</h5>
                <p className="card-text mb-1"><strong>Email:</strong> {user.email}</p>
                <p className="card-text mb-1"><strong>Location:</strong> {user.location}</p>
                <p className="card-text"><strong>Goal:</strong> {user.fitnessGoal}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Users;
