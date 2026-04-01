import { useState, useEffect } from 'react';
import theme from '../theme/theme.jsx';

function EditModal({ task, onSave, onClose }) {
  const [taskText, setTaskText] = useState('');

  useEffect(() => {
    if (task) setTaskText(task.taskText);
  }, [task]);

  const handleSave = () => {
    if (!taskText.trim()) return;
    onSave(task._id, taskText);
  };

  return (
    // Backdrop
    <div style={{
      position: 'fixed',
      inset: 0,
      backgroundColor: 'rgba(0,0,0,0.5)',
      backdropFilter: 'blur(4px)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 1000,
      fontFamily: theme.fonts.main,
    }}>

      {/* Modal */}
      <div style={{
        backgroundColor: theme.colors.surface,
        borderRadius: theme.borderRadius.lg,
        boxShadow: theme.shadows.lg,
        padding: theme.spacing.xl,
        width: '100%',
        maxWidth: '460px',
        margin: theme.spacing.md,
      }}>

        <h3 style={{
          fontSize: theme.fonts.sizes.xl,
          fontWeight: theme.fonts.weights.bold,
          color: theme.colors.textPrimary,
          margin: `0 0 ${theme.spacing.md}`,
        }}>
          Edit Task
        </h3>

        <input
          type="text"
          value={taskText}
          onChange={e => setTaskText(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && handleSave()}
          autoFocus
          style={{
            width: '100%',
            padding: theme.spacing.sm,
            border: `1px solid ${theme.colors.borderFocus}`,
            borderRadius: theme.borderRadius.sm,
            fontSize: theme.fonts.sizes.lg,
            color: theme.colors.textPrimary,
            outline: 'none',
            boxSizing: 'border-box',
            marginBottom: theme.spacing.lg,
          }}
        />

        <div style={{
          display: 'flex',
          gap: theme.spacing.sm,
          justifyContent: 'flex-end',
        }}>

          {/* Cancel */}
          <button
            onClick={onClose}
            style={{
              padding: `${theme.spacing.sm} ${theme.spacing.lg}`,
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

          {/* Save */}
          <button
            onClick={handleSave}
            style={{
              padding: `${theme.spacing.sm} ${theme.spacing.lg}`,
              backgroundColor: theme.colors.primary,
              color: '#FFFFFF',
              border: 'none',
              borderRadius: theme.borderRadius.sm,
              fontSize: theme.fonts.sizes.md,
              fontWeight: theme.fonts.weights.semibold,
              cursor: 'pointer',
              transition: theme.transitions.fast,
            }}
            onMouseEnter={e => e.target.style.backgroundColor = theme.colors.primaryHover}
            onMouseLeave={e => e.target.style.backgroundColor = theme.colors.primary}
          >
            Save Changes
          </button>

        </div>
      </div>
    </div>
  );
}

export default EditModal;