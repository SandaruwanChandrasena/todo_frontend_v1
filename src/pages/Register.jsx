import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import API from '../api/axios.js';
import { useAuth } from '../context/AuthContext.jsx';
import Spinner from '../components/Spinner.jsx';
import theme from '../theme/theme.jsx';

function Register() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    age: '',
    password: '',
    confirmPassword: '',
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, age, password, confirmPassword } = formData;

    if (!name || !email || !age || !password || !confirmPassword) {
      return setError('All fields are required');
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return setError('Please enter a valid email address');
    }

    if (password.length < 6) {
      return setError('Password must be at least 6 characters');
    }

    if (password !== confirmPassword) {
      return setError('Passwords do not match');
    }

    try {
      setLoading(true);
      const res = await API.post('/auth/register', { name, email, age, password });
      login(
        {
          _id: res.data._id,
          name: res.data.name,
          email: res.data.email,
          age: res.data.age,
        },
        res.data.token
      );
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: theme.colors.background,
      fontFamily: theme.fonts.main,
    }}>

      {loading && <Spinner fullScreen />}

      {/* Banner */}
      <div style={{
        backgroundColor: theme.colors.primary,
        padding: `${theme.spacing.lg} ${theme.spacing.xl}`,
        textAlign: 'center',
      }}>
        <h1 style={{
          color: '#FFFFFF',
          fontSize: theme.fonts.sizes.xxl,
          fontWeight: theme.fonts.weights.bold,
          margin: 0,
        }}>
          TodoApp
        </h1>
        <p style={{
          color: 'rgba(255,255,255,0.85)',
          fontSize: theme.fonts.sizes.md,
          margin: `${theme.spacing.xs} 0 0`,
        }}>
          Create an account and start managing your tasks today!
        </p>
      </div>

      {/* Form */}
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: `${theme.spacing.xl} ${theme.spacing.md}`,
      }}>
        <div style={{
          backgroundColor: theme.colors.surface,
          borderRadius: theme.borderRadius.lg,
          boxShadow: theme.shadows.lg,
          padding: theme.spacing.xl,
          width: '100%',
          maxWidth: '420px',
        }}>
          <h2 style={{
            fontSize: theme.fonts.sizes.xxl,
            fontWeight: theme.fonts.weights.bold,
            color: theme.colors.textPrimary,
            margin: `0 0 ${theme.spacing.xs}`,
          }}>
            Register
          </h2>
          <p style={{
            fontSize: theme.fonts.sizes.md,
            color: theme.colors.textSecondary,
            margin: `0 0 ${theme.spacing.lg}`,
          }}>
            Fill in your details to create an account
          </p>

          {error && (
            <div style={{
              backgroundColor: theme.colors.dangerBg,
              color: theme.colors.danger,
              padding: theme.spacing.sm,
              borderRadius: theme.borderRadius.sm,
              fontSize: theme.fonts.sizes.md,
              marginBottom: theme.spacing.md,
            }}>
              {error}
            </div>
          )}

          {/* Name */}
          <div style={{ marginBottom: theme.spacing.md }}>
            <label style={{
              display: 'block',
              fontSize: theme.fonts.sizes.md,
              fontWeight: theme.fonts.weights.medium,
              color: theme.colors.textPrimary,
              marginBottom: theme.spacing.xs,
            }}>
              Full Name
            </label>
            <input
              type="text"
              name="name"
              placeholder="Enter your full name"
              value={formData.name}
              onChange={handleChange}
              style={{
                width: '100%',
                padding: theme.spacing.sm,
                border: `1px solid ${theme.colors.border}`,
                borderRadius: theme.borderRadius.sm,
                fontSize: theme.fonts.sizes.md,
                color: theme.colors.textPrimary,
                outline: 'none',
                boxSizing: 'border-box',
                transition: theme.transitions.fast,
              }}
              onFocus={e => e.target.style.borderColor = theme.colors.borderFocus}
              onBlur={e => e.target.style.borderColor = theme.colors.border}
            />
          </div>

          {/* Email */}
          <div style={{ marginBottom: theme.spacing.md }}>
            <label style={{
              display: 'block',
              fontSize: theme.fonts.sizes.md,
              fontWeight: theme.fonts.weights.medium,
              color: theme.colors.textPrimary,
              marginBottom: theme.spacing.xs,
            }}>
              Email
            </label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              style={{
                width: '100%',
                padding: theme.spacing.sm,
                border: `1px solid ${theme.colors.border}`,
                borderRadius: theme.borderRadius.sm,
                fontSize: theme.fonts.sizes.md,
                color: theme.colors.textPrimary,
                outline: 'none',
                boxSizing: 'border-box',
                transition: theme.transitions.fast,
              }}
              onFocus={e => e.target.style.borderColor = theme.colors.borderFocus}
              onBlur={e => e.target.style.borderColor = theme.colors.border}
            />
          </div>

          {/* Age */}
          <div style={{ marginBottom: theme.spacing.md }}>
            <label style={{
              display: 'block',
              fontSize: theme.fonts.sizes.md,
              fontWeight: theme.fonts.weights.medium,
              color: theme.colors.textPrimary,
              marginBottom: theme.spacing.xs,
            }}>
              Age
            </label>
            <input
              type="number"
              name="age"
              placeholder="Enter your age"
              value={formData.age}
              onChange={handleChange}
              style={{
                width: '100%',
                padding: theme.spacing.sm,
                border: `1px solid ${theme.colors.border}`,
                borderRadius: theme.borderRadius.sm,
                fontSize: theme.fonts.sizes.md,
                color: theme.colors.textPrimary,
                outline: 'none',
                boxSizing: 'border-box',
                transition: theme.transitions.fast,
              }}
              onFocus={e => e.target.style.borderColor = theme.colors.borderFocus}
              onBlur={e => e.target.style.borderColor = theme.colors.border}
            />
          </div>

          {/* Password */}
          <div style={{ marginBottom: theme.spacing.md }}>
            <label style={{
              display: 'block',
              fontSize: theme.fonts.sizes.md,
              fontWeight: theme.fonts.weights.medium,
              color: theme.colors.textPrimary,
              marginBottom: theme.spacing.xs,
            }}>
              Password
            </label>
            <div style={{ position: 'relative' }}>
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                placeholder="Create a password"
                value={formData.password}
                onChange={handleChange}
                style={{
                  width: '100%',
                  padding: `${theme.spacing.sm} 40px ${theme.spacing.sm} ${theme.spacing.sm}`,
                  border: `1px solid ${theme.colors.border}`,
                  borderRadius: theme.borderRadius.sm,
                  fontSize: theme.fonts.sizes.md,
                  color: theme.colors.textPrimary,
                  outline: 'none',
                  boxSizing: 'border-box',
                  transition: theme.transitions.fast,
                }}
                onFocus={e => e.target.style.borderColor = theme.colors.borderFocus}
                onBlur={e => e.target.style.borderColor = theme.colors.border}
              />
              <span
                onClick={() => setShowPassword(!showPassword)}
                style={{
                  position: 'absolute',
                  right: theme.spacing.sm,
                  top: '50%',
                  transform: 'translateY(-50%)',
                  cursor: 'pointer',
                  color: theme.colors.textSecondary,
                  fontSize: theme.fonts.sizes.lg,
                  userSelect: 'none',
                }}
              >
                {showPassword ? '🙈' : '👁️'}
              </span>
            </div>
          </div>

          {/* Confirm Password */}
          <div style={{ marginBottom: theme.spacing.lg }}>
            <label style={{
              display: 'block',
              fontSize: theme.fonts.sizes.md,
              fontWeight: theme.fonts.weights.medium,
              color: theme.colors.textPrimary,
              marginBottom: theme.spacing.xs,
            }}>
              Confirm Password
            </label>
            <div style={{ position: 'relative' }}>
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                name="confirmPassword"
                placeholder="Re-enter your password"
                value={formData.confirmPassword}
                onChange={handleChange}
                style={{
                  width: '100%',
                  padding: `${theme.spacing.sm} 40px ${theme.spacing.sm} ${theme.spacing.sm}`,
                  border: `1px solid ${theme.colors.border}`,
                  borderRadius: theme.borderRadius.sm,
                  fontSize: theme.fonts.sizes.md,
                  color: theme.colors.textPrimary,
                  outline: 'none',
                  boxSizing: 'border-box',
                  transition: theme.transitions.fast,
                }}
                onFocus={e => e.target.style.borderColor = theme.colors.borderFocus}
                onBlur={e => e.target.style.borderColor = theme.colors.border}
              />
              <span
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                style={{
                  position: 'absolute',
                  right: theme.spacing.sm,
                  top: '50%',
                  transform: 'translateY(-50%)',
                  cursor: 'pointer',
                  color: theme.colors.textSecondary,
                  fontSize: theme.fonts.sizes.lg,
                  userSelect: 'none',
                }}
              >
                {showConfirmPassword ? '🙈' : '👁️'}
              </span>
            </div>
          </div>

          {/* Submit Button */}
          <button
            onClick={handleSubmit}
            disabled={loading}
            style={{
              width: '100%',
              padding: theme.spacing.sm,
              backgroundColor: loading ? theme.colors.textLight : theme.colors.primary,
              color: '#FFFFFF',
              border: 'none',
              borderRadius: theme.borderRadius.sm,
              fontSize: theme.fonts.sizes.lg,
              fontWeight: theme.fonts.weights.semibold,
              cursor: loading ? 'not-allowed' : 'pointer',
              transition: theme.transitions.fast,
              marginBottom: theme.spacing.md,
            }}
            onMouseEnter={e => { if (!loading) e.target.style.backgroundColor = theme.colors.primaryHover }}
            onMouseLeave={e => { if (!loading) e.target.style.backgroundColor = theme.colors.primary }}
          >
            {loading ? 'Creating account...' : 'Create Account'}
          </button>

          <p style={{
            textAlign: 'center',
            fontSize: theme.fonts.sizes.md,
            color: theme.colors.textSecondary,
            margin: 0,
          }}>
            Already have an account?{' '}
            <Link to="/login" style={{
              color: theme.colors.primary,
              fontWeight: theme.fonts.weights.semibold,
              textDecoration: 'none',
            }}>
              Sign in here
            </Link>
          </p>

        </div>
      </div>
    </div>
  );
}

export default Register;