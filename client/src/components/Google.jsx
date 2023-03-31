import React, { useState, useEffect } from 'react';
import { googleLogout, useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import GoogleIcon from '@mui/icons-material/Google';
import { Button, Typography } from '@mui/material';

export default () => {
  const [user, setUser] = useState([]);
  const [profile, setProfile] = useState([]);

  const login = useGoogleLogin({
    onSuccess: (codeResponse) => setUser(codeResponse),
    onError: (error) => console.log('Login Failed:', error),
  });

  useEffect(() => {
    if (user) {
      axios
        .get(
          `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`,
          {
            headers: {
              Authorization: `Bearer ${user.access_token}`,
              Accept: 'application/json',
            },
          }
        )
        .then((res) => {
          setProfile(res.data);
        })
        .catch((err) => console.log(err));
    }
  }, [user]);

  const logOut = () => {
    googleLogout();
    setProfile(null);
  };

  return(
    <div>
        {profile ? (
                <div style={{display:'flex', justifyContent:'space-between', width:'350px', alignItems:'center'}}>
                    <Typography>Welcome Back, {profile.name}!</Typography>
                    <Button color='secondary'variant='contained' onClick={logOut}>Log out</Button>
                </div>
            ) : (
                <Button  color='secondary' variant='contained' onClick={() => login()}> Sign In With <GoogleIcon/>  </Button>
            )}
        </div>
  )
};
