import React from "react";
import "./style.css";
import { makeStyles } from '@material-ui/core/styles';
import { CssBaseline } from '@material-ui/core';
import Header from '../../components/Header/Header';
import PlacesToVisit from '../../components/About/AboutCards';
import Footer from '../../components/Footer';
import Image from '../../assets/images/bg.png';
import UserInfo from "../../components/UserInfo";


const RegisterUser = () => {

  const useStyles = makeStyles((theme) => ({
    root: {
      maxHeight: '60vh',
      backgroundImage: `url(${Image})`,
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'cover',
    },
  }));
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <CssBaseline />
      <Header />
     
      {/* <UserInfo /> */}
      <PlacesToVisit />
      <Footer />
    </div>
  );
}

export default RegisterUser;