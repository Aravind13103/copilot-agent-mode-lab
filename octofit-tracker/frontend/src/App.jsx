import { Routes, Route, NavLink } from 'react-router-dom';
import Activities from './components/Activities';
import Leaderboard from './components/Leaderboard';
import Teams from './components/Teams';
import Users from './components/Users';
import Workouts from './components/Workouts';

function Home() {
  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-lg-8 text-center">
          <h1 className="display-4 fw-bold">OctoFit Tracker</h1>
          <p className="lead text-muted">
            Track workouts, build teams, and stay motivated with a fun fitness companion.
          </p>
          <p className="text-muted">
            Configure VITE_CODESPACE_NAME in .env.local to enable the Codespaces API URL for the backend.
          </p>
          <div className="d-flex justify-content-center gap-2 flex-wrap">
            <NavLink to="/users" className="btn btn-primary btn-lg">Explore users</NavLink>
            <NavLink to="/activities" className="btn btn-outline-secondary btn-lg">View activities</NavLink>
          </div>
        </div>
      </div>
    </div>
  );
}

function App() {
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container">
          <NavLink className="navbar-brand" to="/">OctoFit</NavLink>
          <div className="navbar-nav ms-auto">
            <NavLink className="nav-link" to="/users">Users</NavLink>
            <NavLink className="nav-link" to="/teams">Teams</NavLink>
            <NavLink className="nav-link" to="/activities">Activities</NavLink>
            <NavLink className="nav-link" to="/leaderboard">Leaderboard</NavLink>
            <NavLink className="nav-link" to="/workouts">Workouts</NavLink>
          </div>
        </div>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/users" element={<Users />} />
        <Route path="/teams" element={<Teams />} />
        <Route path="/activities" element={<Activities />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
        <Route path="/workouts" element={<Workouts />} />
      </Routes>
    </div>
  );
}

export default App;
