import React, { useState, useEffect } from 'react';
import { Button, Form, Spinner } from 'react-bootstrap';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import { useAuth } from '../contexts/AuthContext';
import 'react-datepicker/dist/react-datepicker.css';
import moment from 'moment';

const TaskDetails = ({ target }) => {
  const { currentUser } = useAuth();
  const [loading, setLoading] = useState(false);
  const [display, setDisplay] = useState('none');
  const [newTask, setNewTask] = useState(''); //here i will
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [checkVal, setCheckVal] = useState([]); //all tasks inside a target .
  useEffect(() => {
    if (target?.tasks?.length > 0) setCheckVal(target.tasks);
  }, []);
  const markTaskHandler = (id, done, newCheckVal) => {
    //here update will go ...
    console.log(id);
    newCheckVal[id].done = done;
    setCheckVal(newCheckVal);
  };

  const updateTask = () => {};
  const deleteTask = () => {};
  const addNewTask = () => {
    const addTask = async () => {
      setLoading(true);
      /**
       * BACKEND
       * @ROUTE - patch - /api/target/createtask
       * @Request - body - {task,deadline,targetId,userId}
       */
      const { data } = await axios.patch('/api/target/createtask', {
        task: newTask,
        targetId: target?._id,
        deadline: selectedDate,
        userId: currentUser?.uid,
      });
      console.log(data.tasks);
      setLoading(false);
      setCheckVal(data?.tasks || []);
      setDisplay('none');
    };
    addTask();
  };

  return (
    <div
      style={{
        marginBottom: '10px',
      }}
    >
      <div style={{ margin: '10px 0' }}>
        <div style={{ display, margin: '15px 0' }}>
          <Form.Label htmlFor="task">Set task</Form.Label>
          <Form.Control
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            type="text"
            id="task"
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
            disabled={loading}
            style={{
              fontSize: '14px',
              padding: '5px 7px',
              marginTop: '10px',
            }}
            onClick={addNewTask}
          >
            {!loading ? (
              'Submit'
            ) : (
              <>
                <Spinner animation="border" size="sm" />
                &nbsp;Loading...
              </>
            )}
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
      <Form>
        {checkVal.length > 0 &&
          checkVal.map((task, id) => {
            return (
              <div
                key={task?._id}
                className="d-flex justify-content-between border p-2"
              >
                <div>
                  <Form.Check
                    type="checkbox"
                    id={task?._id}
                    label={task?.task}
                    defaultChecked={checkVal[id]?.done}
                    onChange={(e) =>
                      markTaskHandler(id, e.target.checked, checkVal)
                    }
                  />
                  <span>
                    Deadline:{' '}
                    <strong
                      className={
                        moment(task?.deadline).endOf('day') >=
                        moment().endOf('day')
                          ? 'text-success'
                          : 'text-danger'
                      }
                    >
                      {moment(task.deadline).format('ddd DD-MM-yyyy')}
                    </strong>
                  </span>
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
