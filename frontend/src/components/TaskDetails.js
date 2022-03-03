import React, { useState, useEffect } from 'react';
import { Button, Form } from 'react-bootstrap';

import DatePicker from 'react-datepicker';

import 'react-datepicker/dist/react-datepicker.css';

const TaskDetails = ({ tasks }) => {
  const [display, setDisplay] = useState('none');
  const [newTask, setNewTask] = useState('');
  const [selectedDate, setSelectedDate] = useState(new Date());
  //i think there should be a start that should manage all thease things . right ?
  //all onchanges and all values .
  const [checkVal, setCheckVal] = useState([]);//all tasks inside a target . 

  tasks = [
    {
      task: 'Complete this website',
      deadline: '2022-03-20',
      done: true,
      _id: Math.random(),
    },
    {
      task: 'Check student management website and update thats functionality also this text can be much more larger right ?  ok start on working this text',
      deadline: '2022-03-20',
      done: false,
      _id: Math.random(),
    },
    {
      task: 'Start building logic.',
      deadline: '2022-03-20',
      done: true,
      _id: Math.random(),
    },
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
      _id: Math.random(),
    },
    {
      task: 'Start building logic.',
      deadline: '2022-03-20',
      done: true,
      _id: Math.random(),
    },
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
      _id: Math.random(),
    },
    {
      task: 'Start building logic.',
      deadline: '2022-03-20',
      done: true,
      _id: Math.random(),
    },
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
      _id: Math.random(),
    },
    {
      task: 'Start building logic.',
      deadline: '2022-03-20',
      done: true,
      _id: Math.random(),
    },
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
      _id: Math.random(),
    },
    {
      task: 'Start building logic.',
      deadline: '2022-03-20',
      done: true,
      _id: Math.random(),
    },
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
      _id: Math.random(),
    },
    {
      task: 'Start building logic.',
      deadline: '2022-03-20',
      done: true,
      _id: Math.random(),
    },
  ];
  //this will be removed soon . 
  useEffect(() => {

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
  };

  return (
    <div
      style={{
        marginBottom: '10px',
      }}
    >
      <div style={{ margin: '10px 0' }}>
        <div style={{ display, margin: '15px 0' }}>
          <Form.Label htmlFor="inputPassword5">Set task</Form.Label>
          <Form.Control
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            type="text"
            id="inputPassword5"
            placeholder="Enter task information here..."
          />
          <div style={{ margin: '10px 0' }}>Please set a deadline: </div>
          {/* by default this deadline should be set to components current deadline */}
          <DatePicker
            selected={selectedDate}
            onChange={(nextDate) => {
              console.log(nextDate);
              setSelectedDate(nextDate);
            }}
          />
          <Button
            style={{
              fontSize: '14px',
              padding: '5px 7px',
              marginTop: '10px',
            }}
            onClick={addNewTask}
          >
            Submit
          </Button>
        </div>
        <Button
          style={{
            fontSize: '14px',
            padding: '5px 7px',
          }}
          type="primary"
          disabled={display === 'block'}
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
              <div className="d-flex justify-content-between border p-2">
                <div>
                  <Form.Check
                    type="checkbox"
                    id={task?._id}
                    label={task?.task}
                    defaultChecked={checkVal[id]?.checked}
                    onChange={(e) =>
                      markTaskHandler(id, e.target.checked, checkVal)
                    }
                  />
                </div>
                <div style={{ width: '50px' }}>
                  <Button
                    type="primary"
                    style={{
                      fontSize: '10px',
                      padding: '3px',
                      margin: '0 2px',
                    }}
                  >
                    <i className="fas fa-pen"></i>
                  </Button>
                  <Button
                    type="primary"
                    style={{
                      fontSize: '10px',
                      padding: '3px',
                      margin: '0 2px',
                    }}
                  >
                    <i className="fas fa-trash"></i>
                  </Button>
                </div>
              </div>
            );
          })}
      </Form>
    </div>
  );
};

export default TaskDetails;

/**
 * @TODO
 * 1.Deadline picker
 * 2.style of submit button on add new file should be updated .
 * 3.keep the option to delete or edit each element also .
 */
