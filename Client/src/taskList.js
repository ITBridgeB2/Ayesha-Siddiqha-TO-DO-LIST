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
































































// import React, { useEffect, useState } from 'react';
// import { Link } from 'react-router-dom';
// import TaskService from './taskService';

// function TaskList() {
//   const [tasks, setTasks] = useState([]);

//   useEffect(() => {
//     fetchTasks();
//   }, []);

//   const fetchTasks = async () => {
//     try {
//       const response = await TaskService.getAllTasks();
//       setTasks(response.data);
//     } catch (error) {
//       console.error('Error fetching tasks:', error);
//       alert('Failed to load tasks.');
//     }
//   };

//   const handleDelete = async (id) => {
//     if (!window.confirm('Are you sure you want to delete this task?')) return;

//     try {
//       await TaskService.deleteTask(id);
//       alert('Task deleted successfully!');
//       fetchTasks();
//     } catch (error) {
//       console.error('Error deleting task:', error);
//       alert('Failed to delete task.');
//     }
//   };

// const handleToggleStatus = async (id, currentStatus) => {
//     // Toggle between 0 (Pending) and 1 (Completed)
//     const newStatus = currentStatus === 1 ? 0 : 1;
  
//     try {
//       // Call the API to update the task status
//       await TaskService.updateTaskStatus(id, newStatus);
      
//       // Fetch the updated tasks after the status change
//       fetchTasks();
//     } catch (error) {
//       console.error('Error updating task status:', error);
//       alert('Failed to update task status.');
//     }
//   };
//  return (
//     <div style={styles.wrapper}>
//       <h2 style={styles.heading}>All Tasks</h2>
//       {tasks.length === 0 ? (
//         <p>No tasks found.</p>
//       ) : (
//         tasks.map((task) => (
//           <div key={task.id} style={styles.taskItem}>
//             <strong>{task.title}</strong>
//             <p>{task.description}</p>
//             <p>Status: <strong>{task.completed === 1 ? 'Completed' : 'Pending'}</strong></p>
//             <div style={{ display: 'flex', gap: '10px' }}>
//               <Link to={`/TaskUpdate/${task.id}`} style={styles.editButton}>Edit</Link>
//               <button onClick={() => handleDelete(task.id)} style={styles.deleteButton}>Delete</button>
//               <button
//                 onClick={() => handleToggleStatus(task.id, task.completed)}
//                 style={styles.statusButton}
//               >
//                 Mark as {task.completed === 1 ? 'Pending' : 'Completed'}
//               </button>
       
//             </div>
//           </div>
//         ))
//       )}
//     </div>
//   );
// }

// const styles = {
//   wrapper: {
//     maxWidth: '600px',
//     margin: '30px auto',
//     padding: '20px',
//     backgroundColor: '#f9f9f9',
//     borderRadius: '8px',
//     boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
//     fontFamily: 'Arial, sans-serif',
//   },
//   heading: {
//     textAlign: 'center',
//     color: '#333',
//     marginBottom: '20px',
//   },
//   taskItem: {
//     padding: '10px',
//     backgroundColor: '#fff',
//     border: '1px solid #ddd',
//     borderRadius: '4px',
//     marginBottom: '10px',
//   },
//   editButton: {
//     padding: '8px 16px',
//     backgroundColor: '#ffc107',
//     color: '#fff',
//     textDecoration: 'none',
//     borderRadius: '4px',
//   },
//   deleteButton: {
//     padding: '8px 16px',
//     backgroundColor: '#dc3545',
//     color: '#fff',
//     border: 'none',
//     borderRadius: '4px',
//     cursor: 'pointer',
//   },
//   statusButton: {
//     padding: '8px 16px',
//     backgroundColor: '#007bff',
//     color: '#fff',
//     border: 'none',
//     borderRadius: '4px',
//     cursor: 'pointer',
//   },
// };

// export default TaskList;

























































// TaskList.jsx
// import React, { useEffect, useState } from 'react';
// import { Link } from 'react-router-dom';
// import TaskService from './taskService';

// function TaskList() {
//   const [tasks, setTasks] = useState([]);

//   useEffect(() => {
//     fetchTasks();
//   }, []);

//   const fetchTasks = async () => {
//     try {
//       const response = await TaskService.getAllTasks();
//       setTasks(response.data);
//     } catch (error) {
//       console.error('Error fetching tasks:', error);
//       alert('Failed to load tasks.');
//     }
//   };

//   const handleDelete = async (id) => {
//     if (!window.confirm('Are you sure you want to delete this task?')) return;

//     try {
//       await TaskService.deleteTask(id);
//       alert('Task deleted successfully!');
//       fetchTasks();
//     } catch (error) {
//       console.error('Error deleting task:', error);
//       alert('Failed to delete task.');
//     }
//   };

//   return (
//     <div style={styles.wrapper}>
//       <h2 style={styles.heading}>All Tasks</h2>
//       {tasks.length === 0 ? (
//         <p>No tasks found.</p>
//       ) : (
//         tasks.map((task) => (
//           <div key={task.id} style={styles.taskItem}>
//             <strong>{task.title}</strong>
//             <p>{task.description}</p>
//             <div style={{ display: 'flex', gap: '10px' }}>
//               <Link to={`/TaskUpdate/${task.id}`} style={styles.editButton}>Edit</Link>
//               <button onClick={() => handleDelete(task.id)} style={styles.deleteButton}>Delete</button>
//             </div>
//           </div>
//         ))
//       )}
//     </div>
//   );
// }

// const styles = {
//   wrapper: {
//     maxWidth: '600px',
//     margin: '30px auto',
//     padding: '20px',
//     backgroundColor: '#f9f9f9',
//     borderRadius: '8px',
//     boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
//     fontFamily: 'Arial, sans-serif',
//   },
//   heading: {
//     textAlign: 'center',
//     color: '#333',
//     marginBottom: '20px',
//   },
//   taskItem: {
//     padding: '10px',
//     backgroundColor: '#fff',
//     border: '1px solid #ddd',
//     borderRadius: '4px',
//     marginBottom: '10px',
//   },
//   editButton: {
//     padding: '8px 16px',
//     backgroundColor: '#ffc107',
//     color: '#fff',
//     textDecoration: 'none',
//     borderRadius: '4px',
//   },
//   deleteButton: {
//     padding: '8px 16px',
//     backgroundColor: '#dc3545',
//     color: '#fff',
//     border: 'none',
//     borderRadius: '4px',
//     cursor: 'pointer',
//   },
// };

// export default TaskList;
