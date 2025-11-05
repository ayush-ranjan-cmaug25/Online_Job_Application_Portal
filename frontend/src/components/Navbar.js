import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

function Navbar() {
  const { user, logout, isEmployer, isSeeker } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-glass sticky-top">
      <div className="container-fluid px-4">
        <Link className="navbar-brand fw-bold" to="/">
          JobPortal
        </Link>
        <button 
          className="navbar-toggler" 
          type="button" 
          data-bs-toggle="collapse" 
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto align-items-center gap-1">
            <li className="nav-item">
              <Link className="nav-link px-3" to="/">Home</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link px-3" to="/jobs">Find Jobs</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link px-3" to="/about">About</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link px-3" to="/contact">Contact</Link>
            </li>
            
            {user ? (
              <>
                {isEmployer && (
                  <>
                    <li className="nav-item">
                      <Link className="nav-link px-3" to="/employer/dashboard">Dashboard</Link>
                    </li>
                    <li className="nav-item">
                      <Link className="nav-link px-3" to="/post-job">Post Job</Link>
                    </li>
                    <li className="nav-item">
                      <Link className="nav-link px-3" to="/manage-jobs">Manage Jobs</Link>
                    </li>
                  </>
                )}
                {isSeeker && (
                  <li className="nav-item">
                    <Link className="nav-link px-3" to="/dashboard">My Dashboard</Link>
                  </li>
                )}
                {user?.role === 'admin' && (
                  <li className="nav-item">
                    <Link className="nav-link px-3" to="/admin/dashboard">Admin Dashboard</Link>
                  </li>
                )}
                <li className="nav-item dropdown ms-2">
                  <a 
                    className="nav-link dropdown-toggle px-3" 
                    href="#" 
                    id="navbarDropdown" 
                    role="button" 
                    data-bs-toggle="dropdown"
                  >
                    <span className="me-2">👤</span>
                    {user.name}
                  </a>
                  <ul className="dropdown-menu dropdown-menu-end glass">
                    <li><Link className="dropdown-item" to="/profile">Profile</Link></li>
                    <li><hr className="dropdown-divider" style={{opacity: 0.2}} /></li>
                    <li><button className="dropdown-item" onClick={handleLogout}>Logout</button></li>
                  </ul>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <Link className="nav-link px-3" to="/login">Login</Link>
                </li>
                <li className="nav-item ms-2">
                  <Link to="/register">
                    <button className="btn btn-glass btn-sm">Sign Up</button>
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
