import React, { useState } from 'react';
import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import format from 'date-fns/format';
import parse from 'date-fns/parse';
import startOfWeek from 'date-fns/startOfWeek';
import getDay from 'date-fns/getDay';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import 'react-datepicker/dist/react-datepicker.css';
import DatePicker from 'react-datepicker';
import {
  TextField,
  Modal,
  Button,
  Box,
  FormControl,
  Typography,
} from '@mui/material';

//  ? Here is the link to the docs with all the props that affect calendar http://jquense.github.io/react-big-calendar/examples/

// These two blocks are required to set the format to US time
const locales = {
  'en-US': require('date-fns/locale/en-US'),
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

// This is a sample event so I didn't have to input a new one everytime I reloaded the page.
// Can be removed after database is set up.
const events = [
  {
    // Note that the second value in Date needs to be -1 to get the correct month - probably relates to indeces
    title: 'Test Event 1',
    start: new Date('2023-03-15T13:00:00Z'),
    end: new Date('2023-03-15T13:45:00Z'),
  },
];

function CalendarDisplay() {
  const [newEvent, setNewEvent] = useState({ title: '', start: '', end: '' });
  const [allEvents, setAllEvents] = useState(events);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleAddEvent = () => {
    setAllEvents([...allEvents, newEvent]);
    console.log(allEvents);
  };

  const wrapperStyle = {
    width: '50px',
  };

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 300,
    height: 300,
    border: '2px solid #000',
    backgroundColor: 'gray',
    boxShadow: 24,
    alignContent: 'center',
    textAlign: 'center',
  };

  return (
    <div>
      <Modal open={open} onClose={handleClose}>
        <Box sx={style}>
          <FormControl>
            <Typography>Create Event</Typography>
            <input
              type='text'
              placeholder='Add Title'
              value={newEvent.title}
              onChange={(e) =>
                setNewEvent({ ...newEvent, title: e.target.value })
              }
            />
            Start
            <DatePicker
              wrapperClassName='datepicker'
              sx={{}}
              type='date'
              selected={newEvent.start}
              onChange={(start) => setNewEvent({ ...newEvent, start })}
            />
            End
            <DatePicker
              type='date'
              selected={newEvent.end}
              onChange={(end) => setNewEvent({ ...newEvent, end })}
            />
            <Button type='submit' variant='contained' onClick={handleAddEvent}>
              Add Event
            </Button>
          </FormControl>
        </Box>
      </Modal>
      <div className='calButton' >
        <Button variant='contained' onClick={handleOpen}>
          Create A New Event
        </Button>
      </div>
      <Calendar

        localizer={localizer}
        events={allEvents}
        startAccessor='start'
        endAccessor='end'
        style={{ height: 400, fontSize: '15px' }}
      />
    </div>
  );
}

export default CalendarDisplay;
