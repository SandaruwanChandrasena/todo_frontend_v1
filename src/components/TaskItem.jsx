import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import theme from '../theme/theme.jsx';

function TaskItem({ task, onComplete, onEdit, onDelete }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: task._id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
    cursor: isDragging ? 'grabbing' : 'default',
  };

  return (
    <div
      ref={setNodeRef}
      style={{
        ...style,
        display: 'flex',
        alignItems: 'center',
        gap: theme.spacing.md,
        padding: theme.spacing.md,
        backgroundColor: task.isCompleted
          ? theme.colors.background
          : theme.colors.surface,
        border: `1px solid ${isDragging ? theme.colors.primary : theme.colors.border}`,
        borderRadius: theme.borderRadius.md,
        marginBottom: theme.spacing.sm,
        transition: theme.transitions.normal,
        fontFamily: theme.fonts.main,
        boxShadow: isDragging ? theme.shadows.lg : theme.shadows.sm,
      }}
    >

      {/* Drag handle */}
      <div
        {...attributes}
        {...listeners}
        style={{
          cursor: 'grab',
          color: theme.colors.textLight,
          fontSize: '18px',
          flexShrink: 0,
          padding: '0 4px',
          display: 'flex',
          flexDirection: 'column',
          gap: '3px',
          alignItems: 'center',
        }}
      >
        <div style={{ display: 'flex', gap: '3px' }}>
          <div style={{ width: '4px', height: '4px', borderRadius: '50%', backgroundColor: theme.colors.textLight }} />
          <div style={{ width: '4px', height: '4px', borderRadius: '50%', backgroundColor: theme.colors.textLight }} />
        </div>
        <div style={{ display: 'flex', gap: '3px' }}>
          <div style={{ width: '4px', height: '4px', borderRadius: '50%', backgroundColor: theme.colors.textLight }} />
          <div style={{ width: '4px', height: '4px', borderRadius: '50%', backgroundColor: theme.colors.textLight }} />
        </div>
        <div style={{ display: 'flex', gap: '3px' }}>
          <div style={{ width: '4px', height: '4px', borderRadius: '50%', backgroundColor: theme.colors.textLight }} />
          <div style={{ width: '4px', height: '4px', borderRadius: '50%', backgroundColor: theme.colors.textLight }} />
        </div>
      </div>

      {/* Complete toggle */}
      <div
        onClick={() => onComplete(task._id)}
        style={{
          width: '20px',
          height: '20px',
          borderRadius: '50%',
          border: `2px solid ${task.isCompleted ? theme.colors.success : theme.colors.border}`,
          backgroundColor: task.isCompleted ? theme.colors.success : 'transparent',
          cursor: 'pointer',
          flexShrink: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transition: theme.transitions.fast,
        }}
      >
        {task.isCompleted && (
          <span style={{
            color: '#FFFFFF',
            fontSize: '11px',
            fontWeight: 'bold',
            lineHeight: 1,
          }}>
            ✓
          </span>
        )}
      </div>

      {/* Task text */}
      <span style={{
        flex: 1,
        fontSize: theme.fonts.sizes.lg,
        color: task.isCompleted
          ? theme.colors.textLight
          : theme.colors.textPrimary,
        textDecoration: task.isCompleted ? 'line-through' : 'none',
        transition: theme.transitions.normal,
      }}>
        {task.taskText}
      </span>

      {/* Action buttons */}
      <div style={{
        display: 'flex',
        gap: theme.spacing.sm,
        flexShrink: 0,
      }}>
        <button
          onClick={() => onEdit(task)}
          style={{
            padding: `${theme.spacing.xs} ${theme.spacing.sm}`,
            backgroundColor: 'transparent',
            color: theme.colors.primary,
            border: `1px solid ${theme.colors.primary}`,
            borderRadius: theme.borderRadius.sm,
            fontSize: theme.fonts.sizes.sm,
            fontWeight: theme.fonts.weights.medium,
            cursor: 'pointer',
            transition: theme.transitions.fast,
          }}
          onMouseEnter={e => e.target.style.backgroundColor = '#EEF2FF'}
          onMouseLeave={e => e.target.style.backgroundColor = 'transparent'}
        >
          ✏️ Edit
        </button>

        <button
          onClick={() => onDelete(task._id)}
          style={{
            padding: `${theme.spacing.xs} ${theme.spacing.sm}`,
            backgroundColor: 'transparent',
            color: theme.colors.danger,
            border: `1px solid ${theme.colors.danger}`,
            borderRadius: theme.borderRadius.sm,
            fontSize: theme.fonts.sizes.sm,
            fontWeight: theme.fonts.weights.medium,
            cursor: 'pointer',
            transition: theme.transitions.fast,
          }}
          onMouseEnter={e => e.target.style.backgroundColor = theme.colors.dangerBg}
          onMouseLeave={e => e.target.style.backgroundColor = 'transparent'}
        >
          🗑️ Delete
        </button>
      </div>
    </div>
  );
}

export default TaskItem;