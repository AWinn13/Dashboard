import React, { useState } from 'react';
import {
  Grid,
  Card,
  Box,
  AppBar,
  Toolbar,
  Drawer,
  Switch,
} from '@mui/material';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import MenuIcon from '@mui/icons-material/Menu';
import { MuiColorInput } from 'mui-color-input';
import WeatherAPI from '../components/WeatherAPI';
import News from '../components/News';
import ToDoList from '../components/ToDoList';
import Google from '../components/Google';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import CalendarDisplay from '../components/Calendar';
import ChatGPT from '../components/ChatGPT';
import Socket from '../components/Socket';

function Main() {
  const [drawer, setDrawer] = useState(false);
  const [mode, setMode] = useState('light');
  const [color, setColor] = useState('#000000');

  const openDrawer = () => {
    setDrawer(true);
  };

  const closeDrawer = () => {
    setDrawer(false);
  };

  const handleChange = (cL) => {
    setColor(cL);
  };



  const darkTheme = createTheme({
    palette: {
      mode: 'dark',
      primary: {
        main: '#6d8cbd',
      },
      secondary: {
        main: '#000000',
      },
    },
  });

  const lightTheme = createTheme({
    palette: {
      mode: 'light',
      primary: {
        main: '#6d8cbd',
      },
      secondary: {
        main: '#000000',
      },
    },
  });
  const selectedTheme = mode === 'dark' ? darkTheme : lightTheme;
  return (
    <ThemeProvider theme={selectedTheme}>
      <CssBaseline>
        <Box>
          <AppBar position='static' >
            <Toolbar>
              <Typography
                variant='h4'
                component='div'
                sx={{ flexGrow: 1 }}
                className='title'
              >
                Daily Dash
              </Typography>

              <Google color='secondary' />
              <IconButton
                size='large'
                edge='end'
                aria-label='menu'
                sx={{ mr: 2 }}
              >
                <MenuIcon onClick={openDrawer} />
              </IconButton>
            </Toolbar>
          </AppBar>
          <Drawer
            color='secondary'
            open={drawer}
            anchor='right'
            variant='persistent'
          >
            <Grid container rowSpacing={3} sx={{ maxWidth: '450px' }}>
              <Grid item>
                <ChevronRightIcon
                  onClick={closeDrawer}
                  sx={{ fontSize: '35px' }}
                />
              </Grid>
              <Grid xs={12} item sx={{ maxWidth: '400px' }}>
                <Typography variant='h5' sx={{ maxWidth: '400px' }}>
                  Customize Your Dashboard
                </Typography>
              </Grid>
              <Grid
                item
                xs={12}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  maxWidth: '400px',
                }}
              >
                {mode === 'dark' ? (
                  <Typography>Dark Mode</Typography>
                ) : (
                  <Typography>Light Mode</Typography>
                )}
                <Switch
                  onChange={() => setMode(mode === 'light' ? 'dark' : 'light')}
                />
              </Grid>
              <Grid item xs={12} sx={{ maxWidth: '400px' }}>
                <MuiColorInput value={color} onChange={handleChange} />
              </Grid>
            </Grid>
          </Drawer>
          <Box
            backgroundColor={color}
            marginTop={1}
            sx={{ paddingLeft: 3, paddingRight: 3 }}
            onClick={closeDrawer}
          >
            <Grid container spacing={1}>
              <Grid item xs={12} md={6}>
                <Card
                  variant='outlined'
                  sx={{ boxShadow: 2, textAlign: 'center' }}
                >
                  <CalendarDisplay />
                </Card>
              </Grid>
              <Grid item xs={12} md={6}>
                <Card
                  variant='outlined'
                  sx={{ boxShadow: 2, textAlign: 'center' }}
                >
                  <ToDoList />
                </Card>
              </Grid>
              <Grid item xs={12} md={3}>
                <Card
                  variant='outlined'
                  sx={{ boxShadow: 2, textAlign: 'center' }}
                >
                  <Typography variant='h5'>Current Weather Conditions</Typography>
                  <WeatherAPI />
                </Card>
              </Grid>
              <Grid item xs={12} md={4.5}>
                <Card
                  variant='outlined'
                  sx={{ boxShadow: 2, textAlign: 'center', minHeight:'300px' }}
                >
                  <Typography variant='h5'>Ask Me Anything</Typography>
                  <ChatGPT />
                </Card>
              </Grid>
              <Grid item xs={12} md={4.5}>
                <Card
                  variant='outlined'
                  sx={{ boxShadow: 2, textAlign: 'center', minHeight: '300px' }}
                >
                  <Socket />
                </Card>
              </Grid>
              <Grid item xs={12} md={12} sx={{ marginBottom: '30px' }}>
                <Card
                  variant='outlined'
                  sx={{ boxShadow: 2, textAlign: 'center' }}
                >
                  <News />
                </Card>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </CssBaseline>
    </ThemeProvider>
  );
}

export default Main;
