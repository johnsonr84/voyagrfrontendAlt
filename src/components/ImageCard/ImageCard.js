import React from 'react';
import './style.css';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import { Collapse } from '@material-ui/core';
import description from '../../static/descriptions';

const useStyles = makeStyles({
  root: {
    maxWidth: 645,
    background: 'rgba(0,0,0,0.5)',
    marginTop: '6rem',
    margin: '30px',
  },
  media: {
    height: 440,
  },
  title: {
    fontFamily: 'Roboto',
    fontWeight: 'bold',
    fontSize: '2rem',
    color: '#fff',
  },
  desc: {
    fontFamily: 'Roboto',
    fontSize: '1.1rem',
    color: '#ddd',
    padding: '2rem',
  },
});

export default function ImageCard({ description, checked }) {
  const classes = useStyles();

  return (
    <Collapse in={checked} {...(checked ? { timeout: 1000 } : {})}>
      <Card className={classes.root}>
        <CardMedia
          className={classes.media}
          image={description.imageUrl}
          title="Voyagr Image Cards"
        />
        <CardContent>
          <Typography
            gutterBottom
            variant="h5"
            component="h1"
            className={classes.title}
          >
            {description.title}
          </Typography>
          <Typography
            variant="body2"
            color="textSecondary"
            component="p"
            className={classes.desc}
          >
            {description.description}
          </Typography>
        </CardContent>
      </Card>
    </Collapse>
  );
}