import React, { useState } from 'react';

const Form = ({ addTodo }) => {
  const [value, setValue] = useState("");

  const handleSubmit = e => {
    e.preventDefault();
    if (!value) return;
    addTodo(value);
    setValue("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        value={value}
        type="text"
        onChange={e => setValue(e.target.value)}
        placeholder="Add a todo"
      />
    </form>
  );
};

const StatelessComponent = () => {
    const [todos, setTodos] = useState([]);
    
    const addTodo = text => {
        const newTodos = [...todos, { text }];
        setTodos(newTodos);
    }

    const deleteTodo = index => {
        const newTodos = [...todos];
        newTodos.splice(index, 1);
        setTodos(newTodos);
    }

    return (
        <div>
            <Form addTodo={addTodo} />
            <div>
                {todos.map((todo, index) => (
                        <div key={index} onClick={() => deleteTodo(index)}>
                            <span>{todo}</span>
                        </div>
                ))}
            </div>
        </div>
    )
}

export default StatelessComponent;