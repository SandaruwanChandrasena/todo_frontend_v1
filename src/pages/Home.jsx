import { useState, useEffect } from 'react';
import API from '../api/axios.js';
import { useAuth } from '../context/AuthContext.jsx';
import Navbar from '../components/Navbar.jsx';
import TaskItem from '../components/TaskItem.jsx';
import EditModal from '../components/EditModal.jsx';
import theme from '../theme/theme.jsx';

function Home() {
  const { user } = useAuth();

  const [tasks, setTasks] = useState([]);
  const [taskText, setTaskText] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [editTask, setEditTask] = useState(null);
  const [deleteConfirm, setDeleteConfirm] = useState(null);

  // Fetch all tasks on load
  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      setLoading(true);
      const res = await API.get('/tasks');
      setTasks(res.data);
    } catch (err) {
      setError('Failed to load tasks');
    } finally {
      setLoading(false);
    }
  };

  // Create task
  const handleCreateTask = async () => {
    if (!taskText.trim()) return;
    try {
      const res = await API.post('/tasks', { taskText });
      setTasks([res.data, ...tasks]);
      setTaskText('');
    } catch (err) {
      setError('Failed to create task');
    }
  };

  // Handle Enter key on input
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') handleCreateTask();
  };

  // Complete task toggle
  const handleComplete = async (id) => {
    try {
      const res = await API.put(`/tasks/${id}/complete`);
      setTasks(tasks.map(t => t._id === id ? res.data : t));
    } catch (err) {
      setError('Failed to update task');
    }
  };

  // Edit task
  const handleEdit = async (id, newText) => {
    try {
      const res = await API.put(`/tasks/${id}`, { taskText: newText });
      setTasks(tasks.map(t => t._id === id ? res.data : t));
      setEditTask(null);
    } catch (err) {
      setError('Failed to update task');
    }
  };

  // Delete task — show confirm first
  const handleDeleteConfirm = (id) => {
    setDeleteConfirm(id);
  };

  // Delete task — confirmed
  const handleDelete = async () => {
    try {
      await API.delete(`/tasks/${deleteConfirm}`);
      setTasks(tasks.filter(t => t._id !== deleteConfirm));
      setDeleteConfirm(null);
    } catch (err) {
      setError('Failed to delete task');
    }
  };

  // Task counts
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(t => t.isCompleted).length;
  const pendingTasks = tasks.filter(t => !t.isCompleted).length;

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: theme.colors.background,
      fontFamily: theme.fonts.main,
    }}>

      <Navbar />

      {/* Banner */}
      <div style={{
        backgroundColor: theme.colors.primary,
        padding: `${theme.spacing.xl} ${theme.spacing.xl}`,
        textAlign: 'center',
      }}>
        <h2 style={{
          color: '#FFFFFF',
          fontSize: theme.fonts.sizes.heading,
          fontWeight: theme.fonts.weights.bold,
          margin: 0,
        }}>
          Welcome! This is your daily planner 📋
        </h2>
        <p style={{
          color: 'rgba(255,255,255,0.85)',
          fontSize: theme.fonts.sizes.md,
          margin: `${theme.spacing.xs} 0 0`,
        }}>
          Stay focused. Get things done one task at a time.
        </p>
      </div>

      {/* Main content */}
      <div style={{
        maxWidth: '680px',
        margin: '0 auto',
        padding: theme.spacing.xl,
      }}>

        {/* Stats */}
        <div style={{
          display: 'flex',
          gap: theme.spacing.md,
          marginBottom: theme.spacing.xl,
        }}>
          {[
            { label: 'Total', value: totalTasks, color: theme.colors.primary },
            { label: 'Pending', value: pendingTasks, color: theme.colors.warning },
            { label: 'Completed', value: completedTasks, color: theme.colors.success },
          ].map((stat) => (
            <div key={stat.label} style={{
              flex: 1,
              backgroundColor: theme.colors.surface,
              border: `1px solid ${theme.colors.border}`,
              borderRadius: theme.borderRadius.md,
              padding: theme.spacing.md,
              textAlign: 'center',
              boxShadow: theme.shadows.sm,
            }}>
              <p style={{
                fontSize: theme.fonts.sizes.xxl,
                fontWeight: theme.fonts.weights.bold,
                color: stat.color,
                margin: 0,
              }}>
                {stat.value}
              </p>
              <p style={{
                fontSize: theme.fonts.sizes.sm,
                color: theme.colors.textSecondary,
                margin: `${theme.spacing.xs} 0 0`,
              }}>
                {stat.label}
              </p>
            </div>
          ))}
        </div>

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

        {/* Add task input */}
        <div style={{
          display: 'flex',
          gap: theme.spacing.sm,
          marginBottom: theme.spacing.xl,
        }}>
          <input
            type="text"
            placeholder="Type a new task..."
            value={taskText}
            onChange={e => setTaskText(e.target.value)}
            onKeyDown={handleKeyDown}
            style={{
              flex: 1,
              padding: theme.spacing.md,
              border: `1px solid ${theme.colors.border}`,
              borderRadius: theme.borderRadius.md,
              fontSize: theme.fonts.sizes.lg,
              color: theme.colors.textPrimary,
              outline: 'none',
              boxSizing: 'border-box',
              transition: theme.transitions.fast,
              boxShadow: theme.shadows.sm,
            }}
            onFocus={e => e.target.style.borderColor = theme.colors.borderFocus}
            onBlur={e => e.target.style.borderColor = theme.colors.border}
          />
          <button
            onClick={handleCreateTask}
            style={{
              width: '52px',
              height: '52px',
              backgroundColor: theme.colors.primary,
              color: '#FFFFFF',
              border: 'none',
              borderRadius: theme.borderRadius.md,
              fontSize: '24px',
              cursor: 'pointer',
              transition: theme.transitions.fast,
              boxShadow: theme.shadows.sm,
              flexShrink: 0,
            }}
            onMouseEnter={e => e.target.style.backgroundColor = theme.colors.primaryHover}
            onMouseLeave={e => e.target.style.backgroundColor = theme.colors.primary}
          >
            +
          </button>
        </div>

        {/* Task list */}
        {loading ? (
          <p style={{
            textAlign: 'center',
            color: theme.colors.textSecondary,
            fontSize: theme.fonts.sizes.lg,
          }}>
            Loading tasks...
          </p>
        ) : tasks.length === 0 ? (
          <div style={{
            textAlign: 'center',
            padding: theme.spacing.xxl,
            color: theme.colors.textLight,
          }}>
            <p style={{ fontSize: '48px', margin: 0 }}>📝</p>
            <p style={{
              fontSize: theme.fonts.sizes.lg,
              marginTop: theme.spacing.md,
            }}>
              No tasks yet! Add your first task above.
            </p>
          </div>
        ) : (
          <div>
            {/* Pending tasks */}
            {tasks.filter(t => !t.isCompleted).length > 0 && (
              <div style={{ marginBottom: theme.spacing.lg }}>
                <p style={{
                  fontSize: theme.fonts.sizes.sm,
                  fontWeight: theme.fonts.weights.semibold,
                  color: theme.colors.textSecondary,
                  textTransform: 'uppercase',
                  letterSpacing: '0.08em',
                  marginBottom: theme.spacing.sm,
                }}>
                  Pending
                </p>
                {tasks
                  .filter(t => !t.isCompleted)
                  .map(task => (
                    <TaskItem
                      key={task._id}
                      task={task}
                      onComplete={handleComplete}
                      onEdit={setEditTask}
                      onDelete={handleDeleteConfirm}
                    />
                  ))}
              </div>
            )}

            {/* Completed tasks */}
            {tasks.filter(t => t.isCompleted).length > 0 && (
              <div>
                <p style={{
                  fontSize: theme.fonts.sizes.sm,
                  fontWeight: theme.fonts.weights.semibold,
                  color: theme.colors.textSecondary,
                  textTransform: 'uppercase',
                  letterSpacing: '0.08em',
                  marginBottom: theme.spacing.sm,
                }}>
                  Completed
                </p>
                {tasks
                  .filter(t => t.isCompleted)
                  .map(task => (
                    <TaskItem
                      key={task._id}
                      task={task}
                      onComplete={handleComplete}
                      onEdit={setEditTask}
                      onDelete={handleDeleteConfirm}
                    />
                  ))}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Edit Modal */}
      {editTask && (
        <EditModal
          task={editTask}
          onSave={handleEdit}
          onClose={() => setEditTask(null)}
        />
      )}

      {/* Delete Confirmation Modal */}
      {deleteConfirm && (
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
          <div style={{
            backgroundColor: theme.colors.surface,
            borderRadius: theme.borderRadius.lg,
            boxShadow: theme.shadows.lg,
            padding: theme.spacing.xl,
            width: '100%',
            maxWidth: '400px',
            margin: theme.spacing.md,
            textAlign: 'center',
          }}>
            <p style={{ fontSize: '40px', margin: 0 }}>🗑️</p>
            <h3 style={{
              fontSize: theme.fonts.sizes.xl,
              fontWeight: theme.fonts.weights.bold,
              color: theme.colors.textPrimary,
              margin: `${theme.spacing.md} 0 ${theme.spacing.sm}`,
            }}>
              Delete Task?
            </h3>
            <p style={{
              fontSize: theme.fonts.sizes.md,
              color: theme.colors.textSecondary,
              marginBottom: theme.spacing.lg,
            }}>
              Are you sure you want to delete this task? This action cannot be undone.
            </p>
            <div style={{
              display: 'flex',
              gap: theme.spacing.sm,
              justifyContent: 'center',
            }}>
              <button
                onClick={() => setDeleteConfirm(null)}
                style={{
                  padding: `${theme.spacing.sm} ${theme.spacing.lg}`,
                  backgroundColor: 'transparent',
                  color: theme.colors.textSecondary,
                  border: `1px solid ${theme.colors.border}`,
                  borderRadius: theme.borderRadius.sm,
                  fontSize: theme.fonts.sizes.md,
                  fontWeight: theme.fonts.weights.medium,
                  cursor: 'pointer',
                }}
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                style={{
                  padding: `${theme.spacing.sm} ${theme.spacing.lg}`,
                  backgroundColor: theme.colors.danger,
                  color: '#FFFFFF',
                  border: 'none',
                  borderRadius: theme.borderRadius.sm,
                  fontSize: theme.fonts.sizes.md,
                  fontWeight: theme.fonts.weights.semibold,
                  cursor: 'pointer',
                }}
                onMouseEnter={e => e.target.style.backgroundColor = theme.colors.dangerHover}
                onMouseLeave={e => e.target.style.backgroundColor = theme.colors.danger}
              >
                Yes, Delete
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

export default Home;