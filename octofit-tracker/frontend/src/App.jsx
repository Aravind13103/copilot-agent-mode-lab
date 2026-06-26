import { Routes, Route, Link } from 'react-router-dom';

function Home() {
  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-lg-8 text-center">
          <h1 className="display-4 fw-bold">OctoFit Tracker</h1>
          <p className="lead text-muted">
            Track workouts, build teams, and stay motivated with a fun fitness companion.
          </p>
          <Link to="/" className="btn btn-primary btn-lg">
            Get started
          </Link>
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
          <a className="navbar-brand" href="/">OctoFit</a>
        </div>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </div>
  );
}

export default App;
