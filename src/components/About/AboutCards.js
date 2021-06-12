import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ImageCard from '../ImageCard/ImageCard';
import descriptions from '../../static/descriptions';
import useWindowPosition from '../../hook/useWindowPosition';
import "./style.css";

const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: '70vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    [theme.breakpoints.down('md')]: {
      flexDirection: 'column',
    },
  },
}));
export default function () {
  const classes = useStyles();
  const checked = useWindowPosition('header');
  return (
    <>
      <div className="landing-border" />
      <div className={classes.root} id="various-descriptions">
        <ImageCard description={descriptions[0]} checked={checked} />
        <ImageCard description={descriptions[1]} checked={checked} />
      </div>
    </>
  );
}