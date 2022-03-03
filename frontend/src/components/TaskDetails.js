import React, { useState, useEffect } from 'react';
import { Button, Form } from 'react-bootstrap';

import DatePicker from 'react-datepicker';

import 'react-datepicker/dist/react-datepicker.css';

const TaskDetails = ({ tasks }) => {
  const [display, setDisplay] = useState('none');
  const [newTask, setNewTask] = useState('');
  //i think there should be a start that should manage all thease things . right ?
  //all onchanges and all values .
  const [checkVal, setCheckVal] = useState([]);

  tasks = [
    {
      task: 'Complete this website',
      deadline: '2022-03-20',
      done: true,
      _id: Math.random(),
    },
    {
      task: 'Check student management website and update thats functionality also ',
      deadline: '2022-03-20',
      done: false,
      _id:  Math.random(),
    },
    {
      task: 'Start building logic.',
      deadline: '2022-03-20',
      done: true,
      _id:  Math.random(),
    },
  ];
  useEffect(() => {
    console.log('useeffect er moddho theke render niche'); 
    let formatCheckVal = [];

    tasks.forEach((task) =>
      formatCheckVal.push({
        _id: task?._id,
        checked: task.done,
      })
    );
    setCheckVal(formatCheckVal);
  }, []);

  const markTaskHandler = (id, checked, newCheckVal) => {
    console.log(id);
    newCheckVal[id].checked = checked;
    setCheckVal(newCheckVal);
  };

  const addNewTask = () => { 
    let formatCheckVal = [];

    tasks.forEach((task) =>
      formatCheckVal.push({
        _id: task?._id,
        checked: task.done,
      })
    );
    console.log('eita add new task er moddho theke render niche'); 
    setCheckVal(formatCheckVal); 
  }

  return (
    <div
      style={{
        marginBottom: '10px',
      }}
    >
      <div style={{ margin: '10px 0' }}>
        <div style={{ display, padding: '10px 0' }}>
          <Form.Label htmlFor="inputPassword5">Add New Task</Form.Label>
          <Form.Control
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            type="text"
            id="inputPassword5"
            aria-describedby="passwordHelpBlock"
          />
          <Button onClick={addNewTask}>✅</Button>
        </div>
        <Button
          type="primary"
          onClick={() => {
            setDisplay('block');
          }}
        >
          Add New Task
        </Button>
      </div>
      let's start working here.
      <Form>
        {tasks &&
          checkVal.length > 0 &&
          tasks.map((task, id) => { 
            return (
              <Form.Check
                key={task?._id}
                type="checkbox"
                id={task?._id}
                label={task?.task}
                defaultChecked={checkVal[id]?.checked}
                onChange={(e) =>
                  markTaskHandler(id, e.target.checked, checkVal)
                }
              />
            );
          })}
      </Form>
    </div>
  );
};

export default TaskDetails;
