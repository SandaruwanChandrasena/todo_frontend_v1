import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../api/axios.js';
import { useAuth } from '../context/AuthContext.jsx';
import Navbar from '../components/Navbar.jsx';
import Spinner from '../components/Spinner.jsx';
import theme from '../theme/theme.jsx';

function Profile() {
  const { user, login } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    age: '',
    password: '',
    confirmPassword: '',
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Load user profile on mount
  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      setLoading(true);
      const res = await API.get('/users/profile');
      setFormData({
        name: res.data.name,
        email: res.data.email,
        age: res.data.age,
        password: '',
        confirmPassword: '',
      });
    } catch (err) {
      setError('Failed to load profile');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError('');
    setSuccess('');
  };

  const handleSubmit = async () => {
    const { name, email, age, password, confirmPassword } = formData;

    // Validations
    if (!name || !email || !age) {
      return setError('Name, email and age are required');
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return setError('Please enter a valid email address');
    }

    if (password && password.length < 6) {
      return setError('Password must be at least 6 characters');
    }

    if (password && password !== confirmPassword) {
      return setError('Passwords do not match');
    }

    try {
      setSaving(true);
      const updateData = { name, email, age };
      if (password) updateData.password = password;

      const res = await API.put('/users/profile', updateData);

      // Update auth context with new name/email
      login(
        {
          _id: res.data._id,
          name: res.data.name,
          email: res.data.email,
          age: res.data.age,
        },
        localStorage.getItem('token')
      );

      setSuccess('Profile updated successfully!');
      setFormData(prev => ({ ...prev, password: '', confirmPassword: '' }));
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update profile');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: theme.colors.background,
      fontFamily: theme.fonts.main,
    }}>

      {saving && <Spinner fullScreen />}

      <Navbar />

      {/* Banner */}
      <div style={{
        backgroundColor: '#1E1B4B',
        padding: `${theme.spacing.xl} ${theme.spacing.xl}`,
        textAlign: 'center',
      }}>
        <div style={{
          width: '64px',
          height: '64px',
          borderRadius: '50%',
          backgroundColor: theme.colors.primary,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '28px',
          fontWeight: theme.fonts.weights.bold,
          color: '#FFFFFF',
          margin: '0 auto',
          marginBottom: theme.spacing.sm,
        }}>
          {user?.name?.charAt(0).toUpperCase()}
        </div>
        <h2 style={{
          color: '#FFFFFF',
          fontSize: theme.fonts.sizes.xxl,
          fontWeight: theme.fonts.weights.bold,
          margin: 0,
        }}>
          {user?.name}
        </h2>
        <p style={{
          color: 'rgba(255,255,255,0.6)',
          fontSize: theme.fonts.sizes.md,
          margin: `${theme.spacing.xs} 0 0`,
        }}>
          {user?.email}
        </p>
      </div>

      {/* Form */}
      <div style={{
        maxWidth: '480px',
        margin: '0 auto',
        padding: theme.spacing.xl,
      }}>

        {loading ? (
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            padding: theme.spacing.xxl,
          }}>
            <Spinner size="48px" />
          </div>
        ) : (
          <div style={{
            backgroundColor: theme.colors.surface,
            borderRadius: theme.borderRadius.lg,
            boxShadow: theme.shadows.lg,
            padding: theme.spacing.xl,
          }}>

            <h3 style={{
              fontSize: theme.fonts.sizes.xl,
              fontWeight: theme.fonts.weights.bold,
              color: theme.colors.textPrimary,
              margin: `0 0 ${theme.spacing.lg}`,
            }}>
              Edit Profile
            </h3>

            {/* Success message */}
            {success && (
              <div style={{
                backgroundColor: theme.colors.successBg,
                color: theme.colors.success,
                padding: theme.spacing.sm,
                borderRadius: theme.borderRadius.sm,
                fontSize: theme.fonts.sizes.md,
                marginBottom: theme.spacing.md,
              }}>
                ✅ {success}
              </div>
            )}

            {/* Error message */}
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

            {/* Divider */}
            <div style={{
              borderTop: `1px solid ${theme.colors.border}`,
              margin: `${theme.spacing.lg} 0`,
            }} />

            <p style={{
              fontSize: theme.fonts.sizes.sm,
              color: theme.colors.textSecondary,
              margin: `0 0 ${theme.spacing.md}`,
            }}>
              Leave password fields empty to keep current password
            </p>

            {/* New Password */}
            <div style={{ marginBottom: theme.spacing.md }}>
              <label style={{
                display: 'block',
                fontSize: theme.fonts.sizes.md,
                fontWeight: theme.fonts.weights.medium,
                color: theme.colors.textPrimary,
                marginBottom: theme.spacing.xs,
              }}>
                New Password
              </label>
              <div style={{ position: 'relative' }}>
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  placeholder="Enter new password"
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
                Confirm New Password
              </label>
              <div style={{ position: 'relative' }}>
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  name="confirmPassword"
                  placeholder="Re-enter new password"
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
                    fontSize: theme.fonts.sizes.lg,
                    userSelect: 'none',
                  }}
                >
                  {showConfirmPassword ? '🙈' : '👁️'}
                </span>
              </div>
            </div>

            {/* Buttons */}
            <div style={{
              display: 'flex',
              gap: theme.spacing.sm,
            }}>
              <button
                onClick={() => navigate('/')}
                style={{
                  flex: 1,
                  padding: theme.spacing.sm,
                  backgroundColor: 'transparent',
                  color: theme.colors.textSecondary,
                  border: `1px solid ${theme.colors.border}`,
                  borderRadius: theme.borderRadius.sm,
                  fontSize: theme.fonts.sizes.md,
                  fontWeight: theme.fonts.weights.medium,
                  cursor: 'pointer',
                  transition: theme.transitions.fast,
                }}
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                disabled={saving}
                style={{
                  flex: 1,
                  padding: theme.spacing.sm,
                  backgroundColor: saving ? theme.colors.textLight : theme.colors.primary,
                  color: '#FFFFFF',
                  border: 'none',
                  borderRadius: theme.borderRadius.sm,
                  fontSize: theme.fonts.sizes.md,
                  fontWeight: theme.fonts.weights.semibold,
                  cursor: saving ? 'not-allowed' : 'pointer',
                  transition: theme.transitions.fast,
                }}
                onMouseEnter={e => { if (!saving) e.target.style.backgroundColor = theme.colors.primaryHover }}
                onMouseLeave={e => { if (!saving) e.target.style.backgroundColor = theme.colors.primary }}
              >
                Save Changes
              </button>
            </div>

          </div>
        )}
      </div>
    </div>
  );
}

export default Profile;