import React, { useState } from 'react';
import './App.css';

function App() {
  const [tasks, settasks] = useState([]);
  const [newtask, setnewtask] = useState('');
  const [edittid, edittaskid] = useState(null);
  const [editttext, edittasktext] = useState('');

  const addtask = () => {
    if (newtask.trim()) {
      settasks([...tasks, { id: Date.now(), text: newtask }]);
      setnewtask('');
    }
  };

  const deletetask = (id) => {
    settasks(tasks.filter(task => task.id !== id));
  };

  const editt = (id, text) => {
    edittaskid(id);
    edittasktext(text);
  };

  const savetask = (id) => {
    settasks(tasks.map(task => (task.id === id ? { ...task, text: editttext } : task)));
    edittaskid(null);
    edittasktext('');
  };

  return (
    <div className="App">
      <h1>To-Do List</h1>
      <div>
        <input
          type="text"
          value={newtask}
          onChange={(e) => setnewtask(e.target.value)}
          placeholder="Add new task"
        />
        <button onClick={addtask}>Add</button>
      </div>
      <ul>
        {tasks.map((task) => (
          <li key={task.id}>
            {edittid === task.id ? (
              <>
                <input
                  type="text"
                  value={editttext}
                  onChange={(e) => edittasktext(e.target.value)}
                />
                <button onClick={() => savetask(task.id)}>Save</button>
              </>
            ) : (
              <>
                {task.text}
                <button onClick={() => editt(task.id, task.text)}>Edit</button>
                <button onClick={() => deletetask(task.id)}>Delete</button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
