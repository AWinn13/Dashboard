import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Button from '@mui/material/Button';
import {
  TextField,
  Grid,
  TableContainer,
  Table,
  TableBody,
  TableRow,
  TableCell,
  Paper,
} from '@mui/material';
import Checkbox from '@mui/material/Checkbox';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';

const ToDoList = () => {
  const [taskList, setTaskList] = useState();

  const [newTask, setNewTask] = useState('');

  // ================================================this handles the check_complete mark to switch back and forth
  const checkerThingy = (task) => {
    // console.log(task)
    axios
      .put(`http://localhost:8000/api/tasks/${task._id}`, {
        task: task.task,
        check_complete: !task.check_complete,
      })
      .then(() => {
        setTaskList(
          taskList.map((item) => {
            if (item._id === task._id) {
              console.log(item);
              item.check_complete = !item.check_complete;
            }
            return item;
          })
        );
      })
      .catch((err) => console.log(err));
  };

  // ===============================================submit for the form
  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post('http://localhost:8000/api/tasks', {
        task: newTask,
        check_complete: false,
      })
      .then((res) => setTaskList([...taskList, res.data]))
      .catch((err) => console.log(err));
    setNewTask('');
  };

  // =============================================To delete a task
  const deleteTask = (taskId) => {
    axios.delete(`http://localhost:8000/api/tasks/${taskId}`).then(() => {
      setTaskList(taskList.filter((task) => task._id !== taskId));
    });
  };

  // ================================================To display the tasks
  useEffect(() => {
    axios
      .get('http://localhost:8000/api/tasks')
      .then((res) => {
        console.log(res.data);
        setTaskList(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div>
      <h4>ToDo List</h4>
      <div>
        <form onSubmit={handleSubmit}>
          <Grid container sx={{ justifyContent: 'space-evenly' }}>
            <TextField
              variant='standard'
              type='text'
              placeholder='Add to list'
              onChange={(e) => setNewTask(e.target.value)}
              value={newTask}
            />
            <Button type='submit' variant='outlined'>
              <AddIcon />
            </Button>
          </Grid>
        </form>
      </div>
      <TableContainer component={Paper}>
        <Table>
          <TableBody>
            {taskList &&
              taskList.map((task, idx) => (
                <TableRow key={idx}>
                  <TableCell
                    style={{
                      textDecoration: task.check_complete
                        ? 'line-through'
                        : ' ',
                    }}
                  >
                    {task.task}
                  </TableCell>
                  <TableCell align='left'>
                    <Checkbox
                      type='checkbox'
                      onChange={() => checkerThingy(task)}
                      checked={task.check_complete}
                    />
                  </TableCell>
                  <TableCell>
                    <DeleteIcon
                      color='primary'
                      onClick={() => deleteTask(task._id)}
                    />
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default ToDoList;
