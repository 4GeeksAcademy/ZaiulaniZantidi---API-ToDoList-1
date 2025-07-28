import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';


const TodoListApp = () => {
  
  const [todos, setTodos] = useState([]);
  
  const [inputValue, setInputValue] = useState('');

  
  const handleAddTodo = () => {

    if (inputValue.trim() === '') {

      console.log("Input cannot be empty!");
      return;
    }

    const newTodo = {
      id: Date.now(), 
      text: inputValue.trim(), 
    };

   
    setTodos([...todos, newTodo]);

    setInputValue('');
  };

  const handleDeleteTodo = (idToDelete) => {

    const updatedTodos = todos.filter(todo => todo.id !== idToDelete);
    setTodos(updatedTodos);
  };

  const handleResetList = () => {
    setTodos([]);
  };


  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  return (
    <div className="todo-app-container">

      <h1>My To-Do List</h1>

      <div className="input-section">
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          placeholder="Add a new to-do item..."
          onKeyPress={(e) => { 
            if (e.key === 'Enter') {
              handleAddTodo();
            }
          }}
        />
        <button className="add-button" onClick={handleAddTodo}>
          Add To-Do
        </button>
      </div>

      {todos.length === 0 ? (
        <p className="text-muted" style={{ fontSize: '1.2rem', color: '#c2185b', fontStyle: 'italic' }}>
          No to-do items yet. Add some!
        </p>
      ) : (
        <ul className="todo-list">
          {todos.map(todo => (
            <li key={todo.id} className="todo-item">
              <span className="todo-item-text">{todo.text}</span>
              <button className="delete-button" onClick={() => handleDeleteTodo(todo.id)}>
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}

      <button className="reset-button" onClick={handleResetList} disabled={todos.length === 0}>
        Reset List
      </button>
    </div>
  );
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<TodoListApp />);

export default TodoListApp;
