import theme from '../theme/theme.jsx';

function Spinner({ size = '40px', fullScreen = false }) {
  const spinner = (
    <div style={{
      width: size,
      height: size,
      border: `3px solid ${theme.colors.border}`,
      borderTop: `3px solid ${theme.colors.primary}`,
      borderRadius: '50%',
      animation: 'spin 0.8s linear infinite',
    }} />
  );

  if (fullScreen) {
    return (
      <div style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(255,255,255,0.7)',
        backdropFilter: 'blur(3px)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 2000,
        gap: theme.spacing.md,
        fontFamily: theme.fonts.main,
      }}>
        {spinner}
        <p style={{
          color: theme.colors.textSecondary,
          fontSize: theme.fonts.sizes.md,
          margin: 0,
        }}>
          Please wait...
        </p>
      </div>
    );
  }

  return spinner;
}

export default Spinner;