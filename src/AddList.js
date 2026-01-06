import {Checkbox, FormControlLabel, IconButton } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import SaveIcon from '@mui/icons-material/Save';
import EditIcon from '@mui/icons-material/Edit'
import { useState } from "react";

export default function AddList() {
  // listing todos
  const [todos, setTodos] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [editId, setEditId] = useState(null);
  const [editText, setEditText] = useState("");

  const startEdit = (todo) => {
    setEditId(todo.id);
    setEditText(todo.text);
  };

  const saveEdit = (id) => {
    const updatedTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, text: editText } : todo
    );
    setTodos(updatedTodos);
    setEditId(null);
    setEditText("");
  };


  // Function to add a new task
  const addTask = () => {
    if (inputValue.trim() !== "") {
      const newTodo = {
        id: Math.random(), 
        text: inputValue,
        completed: false
      };
      setTodos([...todos, newTodo]);
      setInputValue(""); 
    }
  };

  // Function to delete a task
  const deleteTask = (id) => {
    const updatedTodos = todos.filter(todo => todo.id !== id);
    setTodos(updatedTodos);
  };

 
  // Function to toggle completion status
  const toggleComplete = (id) => {
    const updatedTodos = todos.map(todo => {
      if (todo.id === id) {
        return { ...todo, completed: !todo.completed };
      }
      return todo;
    });
    setTodos(updatedTodos);
  };

  return (
    <div style={{border:"12px solid pink", width:"700px", padding:"20px", justifyContent:"center", margin: "100px"}}>
      <h1 style={{ fontFamily: "fangsong", color: "teal"}}>My Tasks</h1>

      <div className="input-section">
        <input
          type="text"
          placeholder="What needs to be done?"
          value={inputValue}
          marginLeft="100px"
          className="styling"
          onChange={(e) => setInputValue(e.target.value)}
        />
        <IconButton className="btn-style" style={{ color: "green", width: "50px" }} onClick={addTask} margin="10px"> <SaveIcon /> </IconButton>
      </div>

      <div>
        {todos.map((todo) => (
          <div key={todo.id} justifyContent = "start">
            {editId === todo.id ? (
              <>
                <input
                  type="text"
                  value={editText}
                  onChange={(e) => setEditText(e.target.value)}
                  style={{ marginRight: "10px" }}
                />

                <IconButton
                  onClick={() => saveEdit(todo.id)}
                  style={{ color: "green" }}
                >
                  <SaveIcon />
                </IconButton>
              </>
            ) : (
              <>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={todo.completed}
                      onChange={() => toggleComplete(todo.id)}
                    />
                  }
                  label={
                    <span
                      style={{
                        textDecoration: todo.completed ? "line-through" : "none",
                      }}
                    >
                      {todo.text}
                    </span>
                  }
                />

                <IconButton
                  onClick={() => startEdit(todo)}
                  style={{ color: "blue" }}
                >
                  <EditIcon />
                </IconButton>
                <IconButton
                  style={{ color: "red" }}
                  onClick={() => deleteTask(todo.id)}
                >
                  <DeleteIcon />
                </IconButton>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}