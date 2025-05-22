import cors from 'cors'
import express from 'express'
import mysql from 'mysql2/promise'

var app = express();
app.use(express.json());
app.use(express.urlencoded());
app.use(cors())

let db = ({
    host: "localhost",
    user: "root",
    password: 'root',
    database: 'project1'
});
// to get
app.get("/tasks", async function (request, response) {    //localhost:9090/tasks
    const query = "SELECT * FROM tasks"
    const connection = await mysql.createConnection(db);
    const [result] = await connection.execute(query);
    return response.json(result);   //all the tasks
})

app.post('/tasks', async (req, res) => {
    try {
      const connection = await mysql.createConnection(db);
      const { title, description } = req.body;
  
      if (!title) {
        return res.status(400).json({ message: 'Title is required' });
      }
  
      const [result] = await connection.execute(
        'INSERT INTO tasks (title, description) VALUES (?, ?)',
        [title, description]
      );
  
      const [rows] = await connection.execute(
        'SELECT * FROM tasks WHERE id = ?',
        [result.insertId]
      );
  
      await connection.end();
  
      res.status(201).json(rows[0]); // Now 'rows' is defined
    } catch (error) {
      console.error('Error creating task:', error);
      res.status(500).json({ error: 'Failed to create task' });
    }
  });


app.put('/tasks/:id', async (req, res) => {
    try {
      const connection = await mysql.createConnection(db);
      const { title, description, completed } = req.body;
      const { id } = req.params;
  
      // Convert string "1" or "0" to boolean true or false
      const completedValue = (completed === "1" || completed === true) ? 1 : 0;
   
      const [result] = await connection.execute(
        'UPDATE tasks SET title = ?, description = ?, completed = ? WHERE id = ?',
        [title, description, completedValue, id]
      );
  
      await connection.end();
  
      if (result.affectedRows === 0) {
        return res.status(404).json({ error: 'Task not found' });
      }
  
      res.json({ message: 'Task updated successfully' });
    } catch (error) {
      console.error('Error updating task:', error);
      res.status(500).json({ error: 'Failed to update task' });
    }
  });
  

  // DELETE endpoint to remove a task from the database
app.delete('/tasks/:id', async (req, res) => {
  try {
    const connection = await mysql.createConnection(db);
    const { id } = req.params; // Get the task ID from the URL params

    // Execute DELETE query to remove the task by ID
    const [result] = await connection.execute(
      'DELETE FROM tasks WHERE id = ?',
      [id]
    );

    await connection.end();

    // If no rows were affected, it means the task with the given ID doesn't exist
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Task not found' });
    }

    // Send success message if task is deleted
    res.json({ message: 'Task deleted successfully' });
  } catch (error) {
    console.error('Error deleting task:', error);
    res.status(500).json({ error: 'Failed to delete task' });
  }
});

app.put('/tasks/:id/:completed', async (req, res) => {
    const { id, completed } = req.params;
  
    const newStatus = parseInt(completed);
    if (![0, 1].includes(newStatus)) {
      return res.status(400).json({ error: 'Invalid status value. Use 0 or 1.' });
    }
  
    try {
      const connection = await mysql.createConnection(db);
      const [result] = await connection.execute(
        'UPDATE tasks SET completed = ? WHERE id = ?',
        [newStatus, id]
      );
      await connection.end();
  
      if (result.affectedRows === 0) {
        return res.status(404).json({ error: 'Task not found.' });
      }
  
      res.json({ message: 'Task status updated successfully.' });
    } catch (err) {
      console.error('Database error:', err);
      res.status(500).json({ error: 'Internal server error.' });
    }
  });
  
  
  
  app.listen("9900")
console.log("project1 app started on 9900 port")
  
