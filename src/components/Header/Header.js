import React, { useEffect, useState } from 'react';
import './style.css';
import NavbarSignup from '../../components/NavbarSignup';
import { makeStyles } from '@material-ui/core/styles';
import { AppBar, IconButton, Toolbar, Collapse } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { Link as Scroll } from 'react-scroll';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '60vh',
        fontFamily: 'Roboto',
    },
    appbar: {
        width: '100%',
        background: 'none',
    },
    appbarWrapper: {
        width: '100%',
        margin: '0 auto',
    },
    appbarTitle: {
        flexGrow: '1',
    },
    icon: {
        color: '#fff',
        fontSize: '2rem',
    },
    colorText: {
        color: '#61DAFB',
    },
    container: {
        textAlign: 'center',
    },
    title: {
        color: '#fff',
        fontSize: '4.5rem',
    },
    goDown: {
        color: '#61DAFB',
        background: "#7D7D7D",
        border: '3px solid #fff',
        borderRadius: '24rem',
        fontSize: '10rem',
        marginBottom: '-20rem',
    },
}));
export default function Header() {
    const classes = useStyles();
    const [checked, setChecked] = useState(false);
    useEffect(() => {
        setChecked(true);
    }, []);
    return (
        <div className={classes.root} id="header">
            <AppBar className={classes.appbar} elevation={0}>
                <Toolbar className={classes.appbarWrapper}>
                    <NavbarSignup />
                </Toolbar>
            </AppBar>

            <Collapse
                in={checked}
                {...(checked ? { timeout: 1000 } : {})}
                collapsedHeight={80}
            >
                <div className={classes.container}>
                    <h1 className={classes.title}>
                        Adventure starts with <br />
                        <span> <img
                            src="/voyagr.png"
                            // width="30"
                            height="60"
                            className="voyagr-logo"
                            alt="Voyagr logo"
                        /></span>
                    </h1>
                    <Scroll to="various-descriptions" smooth={true}>
                        <IconButton>
                            <ExpandMoreIcon className={classes.goDown} />
                        </IconButton>
                    </Scroll>
                </div>
            </Collapse>
        </div>
    );
}