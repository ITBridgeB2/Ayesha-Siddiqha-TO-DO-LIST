import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import TaskService from './taskService';

function TaskList() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await TaskService.getAllTasks();
      setTasks(response.data);
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
      fetchTasks();
    } catch (error) {
      console.error('Error deleting task:', error);
      alert('Failed to delete task.');
    }
  };



const handleToggleStatus = async (id, newStatus) => {
    try {
      await TaskService.updateTaskStatus(id, newStatus);
      alert('Status updated successfully!');
      fetchTasks();
    } catch (error) {
      console.error('Error updating task status:', error);
      alert('Failed to update task status.');
    }
  };
  
  

  return (
    <div className="wrapper">
      <style>{`
        .wrapper {
          max-width: 1000px;
          margin: 40px auto;
          padding: 30px;
          background-color: #fff;
          border-radius: 10px;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        }

        h2 {
          text-align: center;
          color: #2c3e50;
          margin-bottom: 30px;
          font-size: 28px;
        }

        table {
          width: 100%;
          border-collapse: separate;
          border-spacing: 0 10px;
        }

        thead th {
          background-color: #f3f3f3;
          text-align: left;
          padding: 12px;
          font-size: 16px;
          border-bottom: 2px solid #ddd;
        }

        tbody tr {
          background-color: #fff;
          transition: background-color 0.2s ease;
        }

        tbody tr:hover {
          background-color: #f1f9ff;
        }

        td {
          padding: 12px;
          vertical-align: top;
          border-bottom: 1px solid #eee;
        }

        .button-group {
          display: flex;
          gap: 10px;
        }

        .edit-btn,
        .delete-btn,
        .status-btn {
          padding: 8px 14px;
          color: #fff;
          border: none;
          border-radius: 6px;
          cursor: pointer;
          transition: 0.3s ease;
          text-decoration: none;
          display: inline-block;
        }

        .edit-btn {
          background-color: #f0ad4e;
        }

        .delete-btn {
          background-color: #e74c3c;
        }

        .status-btn {
          background-color: #3498db;
        }

        .edit-btn:hover,
        .delete-btn:hover,
        .status-btn:hover {
          opacity: 0.9;
          transform: scale(1.02);
        }
      `}</style>

      <h2>All Tasks</h2>
      {tasks.length === 0 ? (
        <p>No tasks found.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Title</th>
              <th>Description</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {tasks.map((task) => (
              <tr key={task.id}>
                <td>{task.title}</td>
                <td>{task.description}</td>
                {/* <td><strong>{task.completed === 1 ? 'Completed' : 'Pending'}</strong></td> */}
                {/* <label style={{ display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer' }}>
          <input
            type="checkbox"
            checked={task.completed === 1}
            onChange={() => handleToggleStatus(task.id, task.completed)}
            style={{ width: '16px', height: '16px' }}
          />
          <span>{task.completed === 1 ? 'Completed' : 'Pending'}</span>
        </label> */}
        <td>
  <label style={{ display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer' }}>
    <input
      type="checkbox"
      checked={task.completed === 1}  // Show checked if completed
      onChange={(e) => handleToggleStatus(task.id, e.target.checked ? 0 : 1)} // Toggle logic here
      style={{ width: '16px', height: '16px' }}
    />
    <span>{task.completed === 1 ? 'Completed' : 'Pending'}</span>
  </label>
</td>

                <td>
                  <div className="button-group">
                    <Link to={`/TaskUpdate/${task.id}`} className="edit-btn">Edit</Link>
                    <button onClick={() => handleDelete(task.id)} className="delete-btn">Delete</button>
                    {/* <button
                      onClick={() => handleToggleStatus(task.id, task.completed)}
                      className="status-btn"
                    >
                      Mark as {task.completed === 1 ? 'Pending' : 'Completed'}
                    </button> */}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default TaskList;
































































