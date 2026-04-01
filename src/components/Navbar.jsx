import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import theme from '../theme/theme.jsx';

function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav style={{
      backgroundColor: theme.colors.surface,
      borderBottom: `1px solid ${theme.colors.border}`,
      padding: `${theme.spacing.md} ${theme.spacing.xl}`,
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      fontFamily: theme.fonts.main,
      boxShadow: theme.shadows.sm,
    }}>

      {/* Logo */}
      <h1 style={{
        fontSize: theme.fonts.sizes.xl,
        fontWeight: theme.fonts.weights.bold,
        color: theme.colors.primary,
        margin: 0,
      }}>
        TodoApp
      </h1>

      {/* Right side */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: theme.spacing.md,
      }}>
        <span style={{
          fontSize: theme.fonts.sizes.md,
          color: theme.colors.textSecondary,
        }}>
          Welcome, <strong style={{ color: theme.colors.textPrimary }}>
            {user?.name}
          </strong>
        </span>

        <button
          onClick={handleLogout}
          style={{
            padding: `${theme.spacing.xs} ${theme.spacing.md}`,
            backgroundColor: 'transparent',
            color: theme.colors.danger,
            border: `1px solid ${theme.colors.danger}`,
            borderRadius: theme.borderRadius.sm,
            fontSize: theme.fonts.sizes.md,
            fontWeight: theme.fonts.weights.medium,
            cursor: 'pointer',
            transition: theme.transitions.fast,
          }}
          onMouseEnter={e => {
            e.target.style.backgroundColor = theme.colors.dangerBg;
          }}
          onMouseLeave={e => {
            e.target.style.backgroundColor = 'transparent';
          }}
        >
          Logout
        </button>
      </div>
    </nav>
  );
}

export default Navbar;