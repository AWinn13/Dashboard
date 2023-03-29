import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Select,
  MenuItem,
  InputLabel,
  Card,
  CardMedia,
  CardContent,
  Typography,
  FormControl,
  Grid,
} from '@mui/material';

const News = () => {
  const [headlines, setHeadlines] = useState();
  const [filter, setFilter] = useState('category=general&');
  const [newsUrl, setNewsUrl] = useState(
    'https://newsapi.org/v2/top-headlines?country=us&apiKey=246e4e292504483db0537da3e66a37b9'
  );

  /* author, content, description, publishedAt, source, title, url, urlToImage */

  const changeFilter = (e) => {
    e.preventDefault();
    setFilter(e.target.value);
    setNewsUrl(
      'https://newsapi.org/v2/top-headlines?' +
        `category=${e.target.value}&` +
        'country=us&apiKey=246e4e292504483db0537da3e66a37b9'
    );
  };

  useEffect(() => {
    axios
      .get(newsUrl)
      .then((response) => {
        console.log(response.data);
        setHeadlines(response.data.articles);
      })
      .catch((err) => console.log(err));
  }, [newsUrl]);

  const Headline = ({ data }) => {
    return (
      <Card sx={{ maxWidth: 345, marginLeft: '5px', marginRight: '5px' }} className='newsCard'>
        <CardMedia
          image={data.urlToImage}
          sx={{ height: 140, width: 345 }}
          alt=''
        />
        <CardContent>
          <Typography variant='body'>{data.source.name}</Typography>
          <Typography gutterBottom variant='body' component='div' >
            <a style={{color:'gray'}} href={data.url}>{data.title}</a>
          </Typography>
          <Typography variant='body2'>{data.description}</Typography>
        </CardContent>
      </Card>
    );
  };

  return (
    <div>
      <FormControl sx={{ marginTop: 3 }}>
        <InputLabel id='select'>Topics</InputLabel>
        <Select
          onChange={changeFilter}
          selectedValue='general'
          labelId='select'
          label='Topics'
          sx={{ width: 150 }}
        >
          <MenuItem value='business'>Business</MenuItem>
          <MenuItem value='entertainment'>Entertainment</MenuItem>
          <MenuItem value='general' selected>
            General
          </MenuItem>
          <MenuItem value='health'>Health</MenuItem>
          <MenuItem value='science'>Science</MenuItem>
          <MenuItem value='sports'>Sports</MenuItem>
        </Select>
      </FormControl>
      <Grid container sx={{}}>
        <Grid
          item
          sx={{
            display: 'flex',
            marginTop: '5px',
            width: '100%',
            justifyContent: 'space-evenly',
          }}
        >
          {headlines &&
            headlines
              .slice(0, 5)
              .map((headline, i) => <Headline key={i} data={headline} />)}
        </Grid>
      </Grid>
    </div>
  );
};

export default News;
