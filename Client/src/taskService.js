import axios from 'axios';

class TaskService {
  // Base URL for API requests
  API_URL = 'http://localhost:9900/tasks';

  // Get all tasks
  getAllTasks() {
    return axios
      .get(this.API_URL)
      .then(response => response)
      .catch(error => {
        console.error('Error fetching tasks:', error);
        throw error;
      });
  }

  // Save new task details
  saveTaskDetails(taskDetails) {
    return axios
      .post(this.API_URL, taskDetails)
      .then(response => response)
      .catch(error => {
        console.error('Error saving task:', error);
        throw error;
      });
  }

  // Update task details by ID
  updateTaskDetails(id, updatedData) {
    return axios
      .put(`${this.API_URL}/${id}`, updatedData)
      .then(response => response)
      .catch(error => {
        console.error(`Error updating task with ID ${id}:`, error);
        throw error;
      });
  }

  // Get task by ID
  getTaskById(id) {
    return axios
      .get(`${this.API_URL}/${id}`)
      .then(response => response)
      .catch(error => {
        console.error(`Error fetching task with ID ${id}:`, error);
        throw error;
      });
  }
  deleteTask(id) {
    return axios
      .delete(`${this.API_URL}/${id}`)
      .then(response => response)
      .catch(error => {
        console.error(`Error deleting task with ID ${id}:`, error);
        throw error;
      });
  }


updateTaskStatus(id, completed) {
    const url = `${this.API_URL}/tasks/${id}/${completed}`;
    console.log('Requesting URL:', url);
  
    return axios
      .put(url)
      .then(response => response.data)  // .data is often expected
      .catch(error => {
        console.error(`Error updating status for task with ID ${id}:`, error.response?.data || error);
        throw error;
      });
  }
  
  
}

export default new TaskService();
