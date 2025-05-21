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































































































// import React, { useState, useEffect } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import TaskService from './taskService';

// function TaskForm() {
//   const [title, setTitle] = useState('');
//   const [description, setDescription] = useState('');
//   const [tasks, setTasks] = useState([]);
//   const navigate = useNavigate();

//   // Add new task
//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!title.trim()) {
//       alert('Title is required.');
//       return;
//     }

//     const taskData = { title, description };

//     try {
//       await TaskService.saveTaskDetails(taskData);
//       alert('Task added successfully!');
//       setTitle('');
//       setDescription('');
//       fetchTasks();
//     } catch (error) {
//       console.error('Error saving task:', error);
//       alert('Failed to add task.');
//     }
//   };

//   // Fetch tasks from backend
//   const fetchTasks = async () => {
//     try {
//       const response = await TaskService.getAllTasks();
//       setTasks(response.data);
//     } catch (error) {
//       console.error('Error fetching tasks:', error);
//       alert('Failed to load tasks.');
//     }
//   };

//   // Delete task
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

//   useEffect(() => {
//     fetchTasks();
//   }, []);

//   return (
//     <div style={styles.wrapper}>
//       <div style={styles.card}>
//         <h2 style={styles.heading}>Add New Task</h2>
//         <form onSubmit={handleSubmit} style={styles.form}>
//           <input
//             type="text"
//             placeholder="Task Title"
//             value={title}
//             onChange={(e) => setTitle(e.target.value)}
//             style={styles.input}
//           />
//           <textarea
//             placeholder="Task Description"
//             value={description}
//             onChange={(e) => setDescription(e.target.value)}
//             style={styles.textarea}
//           />
//           <button type="submit" style={styles.button}>Add Task</button>
//         </form>
//         <button onClick={fetchTasks} style={{ ...styles.button, backgroundColor: '#28a745', marginTop: '10px' }}>
//           Show Tasks
//         </button>
//       </div>

//       {tasks.length > 0 && (
//         <div style={styles.taskSection}>
//           <h3 style={styles.taskHeading}>All Tasks</h3>
//           {tasks.map((task) => (
//             <div key={task.id} style={styles.taskItem}>
//               <strong>{task.title}</strong>
//               <p>{task.description}</p>
//               <div style={{ display: 'flex', gap: '10px' }}>
//                 <Link to={`/TaskUpdate/${task.id}`} style={styles.editButton}>Edit</Link>
//                 <button onClick={() => handleDelete(task.id)} style={styles.deleteButton}>Delete</button>
//               </div>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }

// // Internal CSS styles
// const styles = {
//   wrapper: {
//     maxWidth: '600px',
//     margin: '30px auto',
//     fontFamily: 'Arial, sans-serif',
//     padding: '20px',
//     backgroundColor: '#f9f9f9',
//     boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
//     borderRadius: '8px',
//   },
//   card: {
//     backgroundColor: '#fff',
//     padding: '20px',
//     borderRadius: '8px',
//     boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
//   },
//   heading: {
//     textAlign: 'center',
//     color: '#333',
//     marginBottom: '20px',
//   },
//   form: {
//     display: 'flex',
//     flexDirection: 'column',
//     marginBottom: '20px',
//   },
//   input: {
//     padding: '10px',
//     marginBottom: '15px',
//     border: '1px solid #ccc',
//     borderRadius: '4px',
//     fontSize: '16px',
//   },
//   textarea: {
//     padding: '10px',
//     marginBottom: '15px',
//     border: '1px solid #ccc',
//     borderRadius: '4px',
//     fontSize: '16px',
//     height: '80px',
//     resize: 'vertical',
//   },
//   button: {
//     padding: '12px',
//     backgroundColor: '#007bff',
//     color: '#fff',
//     border: 'none',
//     borderRadius: '4px',
//     fontSize: '16px',
//     cursor: 'pointer',
//     width: '100%',
//   },
//   taskSection: {
//     marginTop: '20px',
//   },
//   taskHeading: {
//     fontSize: '18px',
//     color: '#333',
//     textAlign: 'center',
//     marginBottom: '15px',
//   },
//   taskItem: {
//     padding: '10px',
//     backgroundColor: '#fff',
//     border: '1px solid #ddd',
//     borderRadius: '4px',
//     marginBottom: '10px',
//     boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
//   },
//   editButton: {
//     padding: '8px 16px',
//     backgroundColor: '#ffc107',
//     color: '#fff',
//     textDecoration: 'none',
//     borderRadius: '4px',
//     textAlign: 'center',
//     cursor: 'pointer',
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

// export default TaskForm;





















































// import React, { useState, useEffect } from 'react';
// import { Link, useNavigate } from 'react-router-dom'; // Import useNavigate for programmatic navigation
// import TaskService from './taskService';

// function TaskForm() {
//   const [title, setTitle] = useState('');
//   const [description, setDescription] = useState('');
//   const [tasks, setTasks] = useState([]);
//   const navigate = useNavigate(); // Hook for programmatic navigation

//   // Function to handle form submission for adding new tasks
//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!title.trim()) {
//       alert('Title is required.');
//       return;
//     }

//     const taskData = { title, description };

//     try {
//       await TaskService.saveTaskDetails(taskData);
//       alert('Task added successfully!');
//       setTitle('');
//       setDescription('');
//       fetchTasks();  // Fetch updated tasks list after adding a new task
//     } catch (error) {
//       console.error('Error saving task:', error);
//       alert('Failed to add task.');
//     }
//   };

//   // Function to fetch tasks from the API
//   const fetchTasks = async () => {
//     try {
//       const response = await TaskService.getAllTasks();
//       setTasks(response.data);  // Update tasks state with fetched tasks
//     } catch (error) {
//       console.error('Error fetching tasks:', error);
//       alert('Failed to load tasks.');
//     }
//   };

//   // Use useEffect to fetch tasks when the component mounts
//   useEffect(() => {
//     fetchTasks();
//   }, []);

//   return (
//     <div style={styles.wrapper}>
//       <div style={styles.card}>
//         <h2 style={styles.heading}>Add New Task</h2>
//         <form onSubmit={handleSubmit} style={styles.form}>
//           <input
//             type="text"
//             placeholder="Task Title"
//             value={title}
//             onChange={(e) => setTitle(e.target.value)}
//             style={styles.input}
//           />
//           <textarea
//             placeholder="Task Description"
//             value={description}
//             onChange={(e) => setDescription(e.target.value)}
//             style={styles.textarea}
//           />
//           <button type="submit" style={styles.button}>Add Task</button>
//         </form>
//         <button onClick={fetchTasks} style={{ ...styles.button, backgroundColor: '#28a745', marginTop: '10px' }}>
//           Show Tasks
//         </button>
//       </div>

//       {tasks.length > 0 && (
//         <div style={styles.taskSection}>
//           <h3 style={styles.taskHeading}>All Tasks</h3>
//           {tasks.map((task) => (
//             <div key={task.id} style={styles.taskItem}>
//               <strong>{task.title}</strong>
//               <p>{task.description}</p>
//               {/* <p>Status: {task.completed ? '✅ Completed' : '❌ Not completed'}</p> */}
//               {/* Using Link to navigate to the update page of the clicked task */}
//               <Link to={`/TaskUpdate/${task.id}`} style={styles.editButton}>
//                 Edit
//               </Link>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }

// // Internal CSS styles
// const styles = {
//   wrapper: {
//     maxWidth: '600px',
//     margin: '30px auto',
//     fontFamily: 'Arial, sans-serif',
//     padding: '20px',
//     backgroundColor: '#f9f9f9',
//     boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
//     borderRadius: '8px',
//   },
//   card: {
//     backgroundColor: '#fff',
//     padding: '20px',
//     borderRadius: '8px',
//     boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
//   },
//   heading: {
//     textAlign: 'center',
//     color: '#333',
//     marginBottom: '20px',
//   },
//   form: {
//     display: 'flex',
//     flexDirection: 'column',
//     marginBottom: '20px',
//   },
//   input: {
//     padding: '10px',
//     marginBottom: '15px',
//     border: '1px solid #ccc',
//     borderRadius: '4px',
//     fontSize: '16px',
//   },
//   textarea: {
//     padding: '10px',
//     marginBottom: '15px',
//     border: '1px solid #ccc',
//     borderRadius: '4px',
//     fontSize: '16px',
//     height: '80px',
//     resize: 'vertical',
//   },
//   button: {
//     padding: '12px',
//     backgroundColor: '#007bff',
//     color: '#fff',
//     border: 'none',
//     borderRadius: '4px',
//     fontSize: '16px',
//     cursor: 'pointer',
//     width: '100%',
//   },
//   taskSection: {
//     marginTop: '20px',
//   },
//   taskHeading: {
//     fontSize: '18px',
//     color: '#333',
//     textAlign: 'center',
//     marginBottom: '15px',
//   },
//   taskItem: {
//     padding: '10px',
//     backgroundColor: '#fff',
//     border: '1px solid #ddd',
//     borderRadius: '4px',
//     marginBottom: '10px',
//     boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
//   },
//   editButton: {
//     display: 'inline-block',
//     padding: '8px 16px',
//     backgroundColor: '#ffc107',
//     color: '#fff',
//     textDecoration: 'none',
//     borderRadius: '4px',
//     marginTop: '10px',
//     textAlign: 'center',
//     cursor: 'pointer',
//   },
// };

// export default TaskForm;





















































































// TaskForm.jsx
// import React, { useState } from 'react';
// import { Link } from 'react-router-dom'; 
// import TaskService from './taskService';
// import TaskUpdate from './TaskUpdate';

// function TaskForm() {
//   const [title, setTitle] = useState('');
//   const [description, setDescription] = useState('');
//   const [tasks, setTasks] = useState([]);

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!title.trim()) {
//       alert('Title is required.');
//       return;
//     }

//     const taskData = { title, description };

//     try {
//       await TaskService.saveTaskDetails(taskData);
//       alert('Task added successfully!');
//       setTitle('');
//       setDescription('');
//       fetchTasks();
//     } catch (error) {
//       console.error('Error saving task:', error);
//       alert('Failed to add task.');
//     }
//   };

//   const fetchTasks = async () => {
//     try {
//       const response = await TaskService.getAllTasks();
//       setTasks(response.data);
//     } catch (error) {
//       console.error('Error fetching tasks:', error);
//       alert('Failed to load tasks.');
//     }
//   };

//   return (
//     <div style={styles.wrapper}>
//       <div style={styles.card}>
//         <h2 style={styles.heading}>Add New Task</h2>
//         <form onSubmit={handleSubmit} style={styles.form}>
//           <input
//             type="text"
//             placeholder="Task Title"
//             value={title}
//             onChange={(e) => setTitle(e.target.value)}
//             style={styles.input}
//           />
//           <textarea
//             placeholder="Task Description"
//             value={description}
//             onChange={(e) => setDescription(e.target.value)}
//             style={styles.textarea}
//           />
//           <button type="submit" style={styles.button}>Add Task</button>
//         </form>
//         <button onClick={fetchTasks} style={{ ...styles.button, backgroundColor: '#28a745', marginTop: '10px' }}>
//           Show Tasks
//         </button>
//       </div>

//       {tasks.length > 0 && (
//         <div style={styles.taskSection}>
//           <h3 style={styles.taskHeading}>All Tasks</h3>
//           {tasks.map((task) => (
//             <div key={task.id} style={styles.taskItem}>
//               <strong>{task.title}</strong>
//               <p>{task.description}</p>
//               <p>Status: {task.completed ? '✅ Completed' : '❌ Not completed'}</p>
//               <Link to={`/update/${task.id}`} style={styles.editButton}>Edit</Link>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }

// // Internal CSS styles
// const styles = {
//   wrapper: {
//     maxWidth: '600px',
//     margin: '30px auto',
//     fontFamily: 'Arial, sans-serif',
//     padding: '20px',
//     backgroundColor: '#f9f9f9',
//     boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
//     borderRadius: '8px',
//   },
//   card: {
//     backgroundColor: '#fff',
//     padding: '20px',
//     borderRadius: '8px',
//     boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
//   },
//   heading: {
//     textAlign: 'center',
//     color: '#333',
//     marginBottom: '20px',
//   },
//   form: {
//     display: 'flex',
//     flexDirection: 'column',
//     marginBottom: '20px',
//   },
//   input: {
//     padding: '10px',
//     marginBottom: '15px',
//     border: '1px solid #ccc',
//     borderRadius: '4px',
//     fontSize: '16px',
//   },
//   textarea: {
//     padding: '10px',
//     marginBottom: '15px',
//     border: '1px solid #ccc',
//     borderRadius: '4px',
//     fontSize: '16px',
//     height: '80px',
//     resize: 'vertical',
//   },
//   button: {
//     padding: '12px',
//     backgroundColor: '#007bff',
//     color: '#fff',
//     border: 'none',
//     borderRadius: '4px',
//     fontSize: '16px',
//     cursor: 'pointer',
//     width: '100%',
//   },
//   taskSection: {
//     marginTop: '20px',
//   },
//   taskHeading: {
//     fontSize: '18px',
//     color: '#333',
//     textAlign: 'center',
//     marginBottom: '15px',
//   },
//   taskItem: {
//     padding: '10px',
//     backgroundColor: '#fff',
//     border: '1px solid #ddd',
//     borderRadius: '4px',
//     marginBottom: '10px',
//     boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
//   },
//   editButton: {
//     display: 'inline-block',
//     padding: '8px 16px',
//     backgroundColor: '#ffc107',
//     color: '#fff',
//     textDecoration: 'none',
//     borderRadius: '4px',
//     marginTop: '10px',
//     textAlign: 'center',
//     cursor: 'pointer',
//   },
// };

// export default TaskForm;











































// import React, { useState } from 'react';
// import TaskService from './taskService';

// function TaskForm() {
//   const [title, setTitle] = useState('');
//   const [description, setDescription] = useState('');
//   const [tasks, setTasks] = useState([]);
//   const [isEditing, setIsEditing] = useState(false);
//   const [currentTaskId, setCurrentTaskId] = useState(null);

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!title.trim()) {
//       alert('Title is required.');
//       return;
//     }

//     const taskData = { title, description };

//     try {
//       if (isEditing) {
//         await TaskService.updateTaskDetails(currentTaskId, taskData);
//         alert('Task updated successfully!');
//         setIsEditing(false);
//         setCurrentTaskId(null);
//       } else {
//         await TaskService.saveTaskDetails(taskData);
//         alert('Task added successfully!');
//       }

//       setTitle('');
//       setDescription('');
//       fetchTasks();
//     } catch (error) {
//       console.error('Error saving/updating task:', error);
//       alert('Failed to save task.');
//     }
//   };

//   const fetchTasks = async () => {
//     try {
//       const response = await TaskService.getAllTasks();
//       setTasks(response.data);
//     } catch (error) {
//       console.error('Error fetching tasks:', error);
//       alert('Failed to load tasks.');
//     }
//   };

//   const handleEdit = (task) => {
//     setIsEditing(true);
//     setCurrentTaskId(task.id);
//     setTitle(task.title);
//     setDescription(task.description);
//     window.scrollTo({ top: 0, behavior: 'smooth' });
//   };

//   return (
//     <div style={styles.wrapper}>
//       <div style={styles.card}>
//         <h2 style={styles.heading}>{isEditing ? 'Edit Task' : 'Add New Task'}</h2>
//         <form onSubmit={handleSubmit} style={styles.form}>
//           <label style={styles.label}>Task Title</label>
//           <input
//             type="text"
//             placeholder="Enter task title"
//             value={title}
//             onChange={(e) => setTitle(e.target.value)}
//             style={styles.input}
//           />
//           <label style={styles.label}>Task Description</label>
//           <textarea
//             placeholder="Enter task description"
//             value={description}
//             onChange={(e) => setDescription(e.target.value)}
//             style={styles.textarea}
//           />
//           <button type="submit" style={styles.button}>
//             {isEditing ? 'Update Task' : 'Add Task'}
//           </button>
//         </form>
//         <button onClick={fetchTasks} style={{ ...styles.button, backgroundColor: '#28a745', marginTop: '10px' }}>
//           Show Tasks
//         </button>
//       </div>

//       {tasks.length > 0 && (
//         <div style={styles.taskSection}>
//           <h3 style={styles.taskHeading}>All Tasks</h3>
//           {tasks.map((task) => (
//             <div key={task.id} style={styles.taskItem}>
//               <strong>{task.title}</strong>
//               <p>{task.description}</p>
//               <p>Status: {task.completed ? '✅ Completed' : '❌ Not completed'}</p>
//               <button style={styles.editButton} onClick={() => handleEdit(task)}>Edit</button>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }

// // Internal CSS
// const styles = {
//   wrapper: {
//     maxWidth: '600px',
//     margin: '40px auto',
//     fontFamily: 'Arial, sans-serif',
//   },
//   card: {
//     padding: '25px',
//     border: '1px solid #ddd',
//     borderRadius: '8px',
//     backgroundColor: '#f8f9fa',
//     boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
//   },
//   heading: {
//     textAlign: 'center',
//     color: '#333',
//     marginBottom: '20px',
//   },
//   form: {
//     display: 'flex',
//     flexDirection: 'column',
//   },
//   label: {
//     marginBottom: '6px',
//     fontWeight: 'bold',
//     color: '#555',
//   },
//   input: {
//     padding: '10px',
//     marginBottom: '15px',
//     border: '1px solid #ccc',
//     borderRadius: '4px',
//     fontSize: '15px',
//   },
//   textarea: {
//     padding: '10px',
//     marginBottom: '15px',
//     border: '1px solid #ccc',
//     borderRadius: '4px',
//     fontSize: '15px',
//     height: '80px',
//     resize: 'vertical',
//   },
//   button: {
//     padding: '12px',
//     backgroundColor: '#007bff',
//     color: '#fff',
//     border: 'none',
//     borderRadius: '4px',
//     fontSize: '16px',
//     cursor: 'pointer',
//   },
//   taskSection: {
//     marginTop: '30px',
//   },
//   taskHeading: {
//     borderBottom: '1px solid #ccc',
//     paddingBottom: '8px',
//     marginBottom: '16px',
//   },
//   taskItem: {
//     padding: '12px',
//     border: '1px solid #ddd',
//     borderRadius: '4px',
//     backgroundColor: '#fff',
//     marginBottom: '10px',
//     position: 'relative',
//   },
//   editButton: {
//     position: 'absolute',
//     top: '12px',
//     right: '12px',
//     backgroundColor: '#ffc107',
//     color: '#000',
//     border: 'none',
//     borderRadius: '4px',
//     padding: '5px 10px',
//     cursor: 'pointer',
//   },
// };

// export default TaskForm;


















































// import React, { useState } from 'react';
// import axios from 'axios';

// function TaskForm() {
//   const [title, setTitle] = useState('');
//   const [description, setDescription] = useState('');
//   const [tasks, setTasks] = useState([]);

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!title.trim()) {
//       alert("Title is required.");
//       return;
//     }

//     try {
//       await axios.post('http://localhost:3001/tasks', {
//         title,
//         description,
//       });
//       alert('Task added successfully!');
//       setTitle('');
//       setDescription('');
//     } catch (error) {
//       console.error('Error adding task:', error);
//       alert('Failed to add task.');
//     }
//   };

//   const fetchTasks = async () => {
//     try {
//       const response = await axios.get('http://localhost:3001/tasks');
//       setTasks(response.data);
//     } catch (error) {
//       console.error('Error fetching tasks:', error);
//       alert('Failed to load tasks.');
//     }
//   };

//   return (
//     <div style={styles.container}>
//       <h2 style={styles.heading}>Add New Task</h2>
//       <form onSubmit={handleSubmit} style={styles.form}>
//         <input
//           type="text"
//           placeholder="Task Title"
//           value={title}
//           onChange={(e) => setTitle(e.target.value)}
//           style={styles.input}
//         />
//         <textarea
//           placeholder="Task Description"
//           value={description}
//           onChange={(e) => setDescription(e.target.value)}
//           style={styles.textarea}
//         />
//         <button type="submit" style={styles.button}>Add Task</button>
//       </form>

//       <button onClick={fetchTasks} style={{ ...styles.button, marginTop: '15px', backgroundColor: '#28a745' }}>
//         Show Tasks
//       </button>

//       <div style={styles.taskList}>
//         {tasks.length > 0 && <h3>All Tasks</h3>}
//         {tasks.map(task => (
//           <div key={task.id} style={styles.taskItem}>
//             <strong>{task.title}</strong>
//             <p>{task.description}</p>
//             <p>Status: {task.completed ? '✅ Completed' : '❌ Not completed'}</p>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

// const styles = {
//   container: {
//     maxWidth: '500px',
//     margin: '30px auto',
//     padding: '20px',
//     border: '1px solid #ddd',
//     borderRadius: '8px',
//     backgroundColor: '#f9f9f9',
//     boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
//   },
//   heading: {
//     textAlign: 'center',
//     color: '#333',
//   },
//   form: {
//     display: 'flex',
//     flexDirection: 'column',
//   },
//   input: {
//     padding: '10px',
//     marginBottom: '10px',
//     border: '1px solid #ccc',
//     borderRadius: '4px',
//     fontSize: '16px',
//   },
//   textarea: {
//     padding: '10px',
//     height: '80px',
//     marginBottom: '10px',
//     border: '1px solid #ccc',
//     borderRadius: '4px',
//     fontSize: '16px',
//   },
//   button: {
//     padding: '10px',
//     backgroundColor: '#007bff',
//     color: '#fff',
//     border: 'none',
//     borderRadius: '4px',
//     fontSize: '16px',
//     cursor: 'pointer',
//   },
//   taskList: {
//     marginTop: '20px',
//   },
//   taskItem: {
//     padding: '10px',
//     marginBottom: '10px',
//     border: '1px solid #ddd',
//     borderRadius: '4px',
//     backgroundColor: '#fff',
//   },
// };

// export default TaskForm;
