import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { authAPI } from "../api";
import { useAuth } from "../contexts/AuthContext";

function Login() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // Form validation
    if (!formData.email || !formData.password) {
      setError("Please fill in all fields");
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setError("Please enter a valid email address");
      return;
    }

    setLoading(true);

    try {
      const response = await authAPI.login(formData);
      login(response.data.user);

      // Redirect to Home page for all users
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.error || "Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="container-smash my-5">
      <div className="row justify-content-center">
        <div className="col-md-6 col-lg-5">
          <div className="glass p-5">
            <div className="text-center mb-4">
              <h2 className="fw-bold">Welcome Back</h2>
              <p className="text-muted">Login to your account</p>
            </div>

            {error && (
              <div className="alert alert-danger" role="alert">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label fw-bold">Email *</label>
                <input
                  type="email"
                  name="email"
                  className="form-control form-glass"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="Enter your email"
                />
              </div>

              <div className="mb-4">
                <label className="form-label fw-bold">Password *</label>
                <div className="position-relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    className="form-control form-glass"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    minLength="6"
                    placeholder="Enter your password"
                    style={{ paddingRight: '45px' }}
                  />
                  <button
                    type="button"
                    className="btn btn-sm position-absolute"
                    onClick={() => setShowPassword(!showPassword)}
                    style={{
                      right: '10px',
                      top: '50%',
                      transform: 'translateY(-50%)',
                      border: 'none',
                      background: 'transparent',
                      color: '#6c757d',
                      fontSize: '1.2rem',
                      padding: '0',
                      width: '30px',
                      height: '30px'
                    }}
                    title={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? '👁️' : '👁️‍🗨️'}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                className="btn btn-primary w-100 mb-3"
                disabled={loading}
                style={{
                  background:
                    "linear-gradient(135deg, #4078FF 0%, #3461E0 100%)",
                  border: "none",
                  padding: "12px",
                  borderRadius: "12px",
                }}
              >
                {loading ? "Logging in..." : "Login"}
              </button>

              <div className="text-center">
                <p className="mb-0">
                  Don't have an account?{" "}
                  <Link
                    to="/register"
                    className="text-decoration-none fw-bold"
                    style={{ color: "#4078FF" }}
                  >
                    Sign Up
                  </Link>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
