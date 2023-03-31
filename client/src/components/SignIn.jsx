import React, { useState } from 'react';
import { TextField, Button, FormControl, Typography } from '@mui/material';

const SignIn = (props) => {
  const [username, setUsername] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    props.submit(username);
  };

  return (
    <form onClick={handleSubmit}>
      <div>
        <Typography variant='h5'>Chat</Typography>
        <FormControl>
          <TextField
            type='text'
            placeholder='Enter a Username'
            onChange={(e) => setUsername(e.target.value)}
          />
          <Button variant='contained' type='submit'>Enter Chat</Button>
        </FormControl>
      </div>
    </form>
  );
};

export default SignIn;
