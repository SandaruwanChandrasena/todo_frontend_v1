import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import Spinner from './Spinner.jsx';
import theme from '../theme/theme.jsx';

function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [loggingOut, setLoggingOut] = useState(false);

  const handleLogout = () => {
    setLoggingOut(true);
    setTimeout(() => {
      logout();
      navigate('/login');
    }, 800);
  };

  return (
    <>
      {loggingOut && <Spinner fullScreen />}

      <nav style={{
        backgroundColor: '#1E1B4B',
        padding: `${theme.spacing.md} ${theme.spacing.xl}`,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        fontFamily: theme.fonts.main,
        boxShadow: '0 2px 12px rgba(30,27,75,0.4)',
      }}>

        {/* Logo left side */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: theme.spacing.sm,
        }}>
          <div style={{
            width: '32px',
            height: '32px',
            backgroundColor: theme.colors.primary,
            borderRadius: theme.borderRadius.sm,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '16px',
          }}>
            
          </div>
          <h1 style={{
            fontSize: theme.fonts.sizes.xl,
            fontWeight: theme.fonts.weights.bold,
            color: '#FFFFFF',
            margin: 0,
            letterSpacing: '0.02em',
          }}>
            TodoApp
          </h1>
        </div>

        {/* Right side */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: theme.spacing.md,
        }}>

          {/* User avatar + name pill */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: theme.spacing.sm,
            backgroundColor: 'rgba(255,255,255,0.08)',
            padding: `${theme.spacing.xs} ${theme.spacing.md}`,
            borderRadius: theme.borderRadius.full,
            border: '1px solid rgba(255,255,255,0.12)',
          }}>
            {/* Avatar circle */}
            <div style={{
              width: '28px',
              height: '28px',
              borderRadius: '50%',
              backgroundColor: theme.colors.primary,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: theme.fonts.sizes.sm,
              fontWeight: theme.fonts.weights.bold,
              color: '#FFFFFF',
              flexShrink: 0,
            }}>
              {user?.name?.charAt(0).toUpperCase()}
            </div>

            {/* Welcome text */}
            <div>
              <p style={{
                fontSize: theme.fonts.sizes.xs,
                color: 'rgba(255,255,255,0.55)',
                margin: 0,
                lineHeight: 1,
              }}>
                Welcome back
              </p>
              <p style={{
                fontSize: theme.fonts.sizes.md,
                fontWeight: theme.fonts.weights.semibold,
                color: '#FFFFFF',
                margin: '2px 0 0',
                lineHeight: 1,
              }}>
                {user?.name}
              </p>
            </div>
          </div>

          {/* Profile button */}
          <Link
            to="/profile"
            style={{
              padding: `${theme.spacing.xs} ${theme.spacing.md}`,
              backgroundColor: 'transparent',
              color: 'rgba(255,255,255,0.85)',
              border: '1px solid rgba(255,255,255,0.2)',
              borderRadius: theme.borderRadius.sm,
              fontSize: theme.fonts.sizes.md,
              fontWeight: theme.fonts.weights.medium,
              cursor: 'pointer',
              transition: theme.transitions.fast,
              textDecoration: 'none',
              display: 'flex',
              alignItems: 'center',
              gap: theme.spacing.xs,
            }}
            onMouseEnter={e => e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.08)'}
            onMouseLeave={e => e.currentTarget.style.backgroundColor = 'transparent'}
          >
            👤 Profile
          </Link>

          {/* Logout button */}
          <button
            onClick={handleLogout}
            style={{
              padding: `${theme.spacing.xs} ${theme.spacing.md}`,
              backgroundColor: 'transparent',
              color: '#FDA4AF',
              border: '1px solid rgba(253,164,175,0.4)',
              borderRadius: theme.borderRadius.sm,
              fontSize: theme.fonts.sizes.md,
              fontWeight: theme.fonts.weights.medium,
              cursor: 'pointer',
              transition: theme.transitions.fast,
              display: 'flex',
              alignItems: 'center',
              gap: theme.spacing.xs,
            }}
            onMouseEnter={e => {
              e.currentTarget.style.backgroundColor = 'rgba(253,164,175,0.1)';
              e.currentTarget.style.borderColor = 'rgba(253,164,175,0.8)';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.backgroundColor = 'transparent';
              e.currentTarget.style.borderColor = 'rgba(253,164,175,0.4)';
            }}
          >
            🚪 Logout
          </button>

        </div>
      </nav>
    </>
  );
}

export default Navbar;