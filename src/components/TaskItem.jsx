import theme from "../theme/theme.jsx";

function TaskItem({ task, onComplete, onEdit, onDelete }) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: theme.spacing.md,
        padding: theme.spacing.md,
        backgroundColor: task.isCompleted
          ? theme.colors.background
          : theme.colors.surface,
        border: `1px solid ${theme.colors.border}`,
        borderRadius: theme.borderRadius.md,
        marginBottom: theme.spacing.sm,
        transition: theme.transitions.normal,
        fontFamily: theme.fonts.main,
      }}
    >
      {/* Custom toggle button */}
      <div
        onClick={() => onComplete(task._id)}
        style={{
          width: "20px",
          height: "20px",
          borderRadius: "50%",
          border: `2px solid ${task.isCompleted ? theme.colors.success : theme.colors.border}`,
          backgroundColor: task.isCompleted
            ? theme.colors.success
            : "transparent",
          cursor: "pointer",
          flexShrink: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          transition: theme.transitions.fast,
        }}
      >
        {task.isCompleted && (
          <span
            style={{
              color: "#FFFFFF",
              fontSize: "11px",
              fontWeight: "bold",
              lineHeight: 1,
            }}
          >
            ✓
          </span>
        )}
      </div>

      {/* Task text */}
      <span
        style={{
          flex: 1,
          fontSize: theme.fonts.sizes.lg,
          color: task.isCompleted
            ? theme.colors.textLight
            : theme.colors.textPrimary,
          textDecoration: task.isCompleted ? "line-through" : "none",
          transition: theme.transitions.normal,
        }}
      >
        {task.taskText}
      </span>

      {/* Action buttons */}
      <div
        style={{
          display: "flex",
          gap: theme.spacing.sm,
          flexShrink: 0,
        }}
      >
        {/* Edit button */}
        <button
          onClick={() => onEdit(task)}
          style={{
            padding: `${theme.spacing.xs} ${theme.spacing.sm}`,
            backgroundColor: "transparent",
            color: theme.colors.primary,
            border: `1px solid ${theme.colors.primary}`,
            borderRadius: theme.borderRadius.sm,
            fontSize: theme.fonts.sizes.sm,
            fontWeight: theme.fonts.weights.medium,
            cursor: "pointer",
            transition: theme.transitions.fast,
          }}
          onMouseEnter={(e) => (e.target.style.backgroundColor = "#EEF2FF")}
          onMouseLeave={(e) => (e.target.style.backgroundColor = "transparent")}
        >
          ✏️ Edit
        </button>

        {/* Delete button */}
        <button
          onClick={() => onDelete(task._id)}
          style={{
            padding: `${theme.spacing.xs} ${theme.spacing.sm}`,
            backgroundColor: "transparent",
            color: theme.colors.danger,
            border: `1px solid ${theme.colors.danger}`,
            borderRadius: theme.borderRadius.sm,
            fontSize: theme.fonts.sizes.sm,
            fontWeight: theme.fonts.weights.medium,
            cursor: "pointer",
            transition: theme.transitions.fast,
          }}
          onMouseEnter={(e) =>
            (e.target.style.backgroundColor = theme.colors.dangerBg)
          }
          onMouseLeave={(e) => (e.target.style.backgroundColor = "transparent")}
        >
          🗑️ Delete
        </button>
      </div>
    </div>
  );
}

export default TaskItem;
