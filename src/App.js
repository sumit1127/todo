import React, { useState, useEffect } from 'react';
import './App.css';

const App = () => {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');
  // const [isEditing, setIsEditing] = useState(false);
  // const [editTodo, setEditTodo] = useState(null);

  useEffect(() => {
    fetch("http://localhost:5000/todos")
      .then(response => response.json())
      .then(data => setTodos(data))
      .catch(error => console.error('Error fetching todos:', error));
  }, []);

  // Add new todo
  const addTodo = () => {
    if (!newTodo.trim()) return;

    const newTodoObj = { task: newTodo, completed: false };

    fetch('http://localhost:5000/todos', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newTodoObj),
    })
      .then(response => response.json())
      
      .then((addedTodo) => {
        setTodos([...todos, addedTodo]);
        setNewTodo('');
      })
      .catch(error => console.error('Error adding todo:', error));
  };

  // Update todo (toggle completed)
  const toggleComplete = (id) => {
    const todoToUpdate = todos.find(todo => todo.id === id);
    const updatedTodo = { ...todoToUpdate, completed: !todoToUpdate.completed };

    fetch(`${'http://localhost:5000/todos'}/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedTodo),
    })
      .then(response => response.json())
      .then((updatedTodo) => {
        setTodos(todos.map(todo => (todo.id === id ? updatedTodo : todo)));
      })
      .catch(error => console.error('Error updating todo:', error));
  };

  // Delete todo
  const deleteTodo = (id) => {
    fetch(`${'http://localhost:5000/todos'}/${id}`, {
      method: 'DELETE',
    })
      .then(() => {
        setTodos(todos.filter(todo => todo.id !== id));
      })
      .catch(error => console.error('Error deleting todo:', error));
  };

  return (
    <div className="App">
      <h1>To-Do Aphjhp</h1>
      
      {/* Add new task */}
      <div>
        <input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="Enter new task"
        />
        <button onClick={addTodo}>Add Todo</button>
      </div>

      <ul>
        {todos.map(todo => (
          <li key={todo.id} className={todo.completed ? 'completed' : ''}>
            <span>{todo.task}</span>
            <button onClick={() => toggleComplete(todo.id)}>
              {todo.completed ? 'Undo' : 'Complete'}
            </button>
            <button onClick={() => deleteTodo(todo.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;


























