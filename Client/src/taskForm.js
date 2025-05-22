import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import TaskService from './taskService';
import TaskList from './taskList';

function TaskForm() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [tasks, setTasks] = useState([]);
  const [showTasks, setShowTasks] = useState(false); // Track task visibility
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title.trim()) {
      alert('Title is required.');
      return;
    }

    const taskData = { title, description };

    try {
      await TaskService.saveTaskDetails(taskData);
      alert('Task added successfully!');
      setTitle('');
      setDescription('');
      if (showTasks) fetchTasks(); // Refresh task list only if shown
    } catch (error) {
      console.error('Error saving task:', error);
      alert('Failed to add task.');
    }
  };

  const fetchTasks = async () => {
    try {
      const response = await TaskService.getAllTasks();
      setTasks(response.data);
      setShowTasks(true); // Show task section
    } catch (error) {
      console.error('Error fetching tasks:', error);
      alert('Failed to load tasks.');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this task?')) return;

    try {
      await TaskService.deleteTask(id);
      alert('Task deleted successfully!');
      fetchTasks(); // Refresh task list after deletion
    } catch (error) {
      console.error('Error deleting task:', error);
      alert('Failed to delete task.');
    }
  };

  return (
    <div style={styles.wrapper}>
      <div style={styles.card}>
        <h2 style={styles.heading}>Add New Task</h2>
        <form onSubmit={handleSubmit} style={styles.form}>
          <input
            type="text"
            placeholder="Task Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            style={styles.input}
          />
          <textarea
            placeholder="Task Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            style={styles.textarea}
          />
          <button type="submit" style={styles.button}>Add Task</button>
        </form>
        {/* <button
          onClick={fetchTasks}
          style={{ ...styles.button, backgroundColor: '#28a745', marginTop: '10px' }}
        >
          Show Tasks
        </button> */}
        <button onClick={() => navigate('/taskList')} 
        style={{ ...styles.button, backgroundColor: '#28a745', marginTop: '10px' }}>Show Tasks
        </button>
      </div>

      {showTasks && tasks.length > 0 && (
        <div style={styles.taskSection}>
          <h3 style={styles.taskHeading}>All Tasks</h3>
          {tasks.map((task) => (
            <div key={task.id} style={styles.taskItem}>
              <strong>{task.title}</strong>
              <p>{task.description}</p>
              <div style={{ display: 'flex', gap: '10px' }}>
                <Link to={`/TaskUpdate/${task.id}`} style={styles.editButton}>Edit</Link>
                <button onClick={() => handleDelete(task.id)} style={styles.deleteButton}>Delete</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// Reuse the same styles from your version
const styles = {
  wrapper: {
    maxWidth: '600px',
    margin: '30px auto',
    fontFamily: 'Arial, sans-serif',
    padding: '20px',
    backgroundColor: '#f9f9f9',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
    borderRadius: '8px',
  },
  card: {
    backgroundColor: '#fff',
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
  },
  heading: {
    textAlign: 'center',
    color: '#333',
    marginBottom: '20px',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    marginBottom: '20px',
  },
  input: {
    padding: '10px',
    marginBottom: '15px',
    border: '1px solid #ccc',
    borderRadius: '4px',
    fontSize: '16px',
  },
  textarea: {
    padding: '10px',
    marginBottom: '15px',
    border: '1px solid #ccc',
    borderRadius: '4px',
    fontSize: '16px',
    height: '80px',
    resize: 'vertical',
  },
  button: {
    padding: '12px',
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    fontSize: '16px',
    cursor: 'pointer',
    width: '100%',
  },
  taskSection: {
    marginTop: '20px',
  },
  taskHeading: {
    fontSize: '18px',
    color: '#333',
    textAlign: 'center',
    marginBottom: '15px',
  },
  taskItem: {
    padding: '10px',
    backgroundColor: '#fff',
    border: '1px solid #ddd',
    borderRadius: '4px',
    marginBottom: '10px',
    boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
  },
  editButton: {
    padding: '8px 16px',
    backgroundColor: '#ffc107',
    color: '#fff',
    textDecoration: 'none',
    borderRadius: '4px',
    textAlign: 'center',
    cursor: 'pointer',
  },
  deleteButton: {
    padding: '8px 16px',
    backgroundColor: '#dc3545',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
};

export default TaskForm;































































































