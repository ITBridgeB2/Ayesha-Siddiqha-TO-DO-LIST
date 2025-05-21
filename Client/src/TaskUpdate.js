// TaskUpdate.jsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom'; // Use useNavigate instead of useHistory
import TaskService from './taskService';

function TaskUpdate() {
  const { id } = useParams(); // Get task id from the URL
  const navigate = useNavigate(); // useNavigate to handle navigation after the update
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    // Fetch the task details based on ID when the component mounts
    const fetchTaskDetails = async () => {
      try {
        const response = await TaskService.getTaskById(id); // Make sure to implement this in TaskService
        setTitle(response.data.title);
        setDescription(response.data.description);
      } catch (error) {
        console.error('Error fetching task:', error);
        // alert('Failed to fetch task.');
      }
    };

    fetchTaskDetails();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!title.trim()) {
      alert('Title is required.');
      return;
    }

    const taskData = { title, description };

    try {
      await TaskService.updateTaskDetails(id, taskData);
      alert('Task updated successfully!');
      navigate('/'); // Redirect back to the task list page
    } catch (error) {
      console.error('Error updating task:', error);
      alert('Failed to update task.');
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Update Task</h2>
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
        <button type="submit" style={styles.button}>Update Task</button>
      </form>
    </div>
  );
}

// Internal CSS styles
const styles = {
  container: {
    maxWidth: '600px',
    margin: '40px auto',
    fontFamily: 'Arial, sans-serif',
  },
  heading: {
    textAlign: 'center',
    color: '#333',
    marginBottom: '20px',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
  },
  input: {
    padding: '10px',
    marginBottom: '15px',
    border: '1px solid #ccc',
    borderRadius: '4px',
    fontSize: '15px',
  },
  textarea: {
    padding: '10px',
    marginBottom: '15px',
    border: '1px solid #ccc',
    borderRadius: '4px',
    fontSize: '15px',
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
  },
};

export default TaskUpdate;














































































// // TaskUpdate.jsx
// import React, { useState, useEffect } from 'react';
// import { useParams, useHistory } from 'react-router-dom';
// import TaskService from './taskService';

// function TaskUpdate() {
//   const { id } = useParams(); // Get task id from the URL
//   const history = useHistory(); // To navigate after the update
//   const [title, setTitle] = useState('');
//   const [description, setDescription] = useState('');

//   useEffect(() => {
//     // Fetch the task details based on ID when the component mounts
//     const fetchTaskDetails = async () => {
//       try {
//         const response = await TaskService.getTaskById(id); // Make sure to implement this in TaskService
//         setTitle(response.data.title);
//         setDescription(response.data.description);
//       } catch (error) {
//         console.error('Error fetching task:', error);
//         alert('Failed to fetch task.');
//       }
//     };

//     fetchTaskDetails();
//   }, [id]);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
    
//     if (!title.trim()) {
//       alert('Title is required.');
//       return;
//     }

//     const taskData = { title, description };

//     try {
//       await TaskService.updateTaskDetails(id, taskData);
//       alert('Task updated successfully!');
//       history.push('/'); // Redirect back to the task list page
//     } catch (error) {
//       console.error('Error updating task:', error);
//       alert('Failed to update task.');
//     }
//   };

//   return (
//     <div style={styles.container}>
//       <h2 style={styles.heading}>Update Task</h2>
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
//         <button type="submit" style={styles.button}>Update Task</button>
//       </form>
//     </div>
//   );
// }

// // Internal CSS styles
// const styles = {
//   container: {
//     maxWidth: '600px',
//     margin: '40px auto',
//     fontFamily: 'Arial, sans-serif',
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
// };

// export default TaskUpdate;
