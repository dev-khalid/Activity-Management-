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

  /**All States needed for update */
  const [updatingTask, setUpdatingTask] = useState(false); //I will use this one to render ui component for update
  const [prevTask, setPrevTask] = useState();
  const [prevDeadline, setPrevDeadline] = useState(new Date());
  const [currentTaskId, setCurrentTaskId] = useState();

  /**All states needed for new task  */
  const [display, setDisplay] = useState('none');
  const [newTask, setNewTask] = useState(''); //here i will
  const [selectedDate, setSelectedDate] = useState(new Date());

  /**All the tasks */
  const [checkVal, setCheckVal] = useState([]); //all tasks inside a target .

  useEffect(() => {
    if (target?.tasks?.length > 0) setCheckVal(target.tasks);
  }, []);

  const udpateTaskHandler = ({ taskId, done, deadline, taskName }) => {
    /**
     * @ROUTE - patch - /api/target/updatetask
     * @Request - body {taskId,targetId,done,task,deadline}
     */
    const updateIt = async () => {
      setLoading(true);
      const { data } = await axios.patch('/api/target/updatetask', {
        userId: currentUser.uid,
        targetId: target?._id,
        done,
        taskId,
        deadline,
        taskName,
      });
      setCheckVal(data?.tasks || []);
      setLoading(false);
      setUpdatingTask(false);
    };
    updateIt();
  };

  const deleteTask = ({ taskId }) => {
    /**
     * @ROUTE - patch - /api/target/removetask
     * @Request - body {taskId,targetId}
     */
    if (window.confirm('Click Ok to delete')) {
      const deleteIt = async () => {
        setLoading(true);
        const { data } = await axios.patch('/api/target/task/remove', {
          taskId,
          targetId: target?._id,
        });
        setLoading(false);
        setCheckVal(data?.tasks);
      };
      deleteIt();
    }
  };
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
      {updatingTask && (
        <div style={{ margin: '10px 0' }}>
          <div style={{ margin: '15px 0' }}>
            <Form.Label htmlFor="taskUpdate">Update task</Form.Label>
            <Form.Control
              value={prevTask}
              onChange={(e) => setPrevTask(e.target.value)}
              type="text"
              id="taskUpdate"
            />
            <div style={{ margin: '10px 0' }}>Update deadline: </div>
            {/* by default this deadline should be set to components current deadline */}
            <DatePicker
              selected={prevDeadline}
              onChange={(nextDate) => {
                setPrevDeadline(nextDate);
              }}
            />
            <Button
              disabled={loading}
              style={{
                fontSize: '14px',
                padding: '5px 7px',
                marginTop: '10px',
              }}
              onClick={() =>
                udpateTaskHandler({
                  taskName: prevTask,
                  deadline: prevDeadline,
                  taskId: currentTaskId,
                })
              }
            >
              {!loading ? (
                'Update'
              ) : (
                <>
                  <Spinner animation="border" size="sm" />
                  &nbsp;Loading...
                </>
              )}
            </Button>
          </div>
        </div>
      )}
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
                    defaultChecked={task?.done}
                    onChange={(e) =>
                      udpateTaskHandler({
                        taskId: task?._id,
                        done: e.target.checked,
                      })
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
                    onClick={(e) => {
                      e.preventDefault();
                      setUpdatingTask(true);
                      setCurrentTaskId(task?._id);
                      setPrevDeadline(new Date(task?.deadline));
                      setPrevTask(task?.task); //taskName
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
                    disabled={loading}
                    onClick={(e) => {
                      e.preventDefault();
                      deleteTask({ taskId: task?._id });
                    }}
                  >
                    {loading ? ( 
                        <Spinner animation="border" size="sm" />  
                    ) : (
                      <i className="fas fa-trash"></i>
                    )}
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
