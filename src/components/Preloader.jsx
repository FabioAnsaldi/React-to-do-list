import React from 'react'
import {Grid, Typography} from "@material-ui/core";

const preloader = {
    alignItems: 'center',
    background: 'rgb(245, 245, 245)',
    display: 'flex',
    height: '100vh',
    justifyContent: 'center',
    left: 0,
    position: 'fixed',
    top: 0,
    transition: 'opacity 0.3s linear',
    width: '100%',
    zIndex: 99,
};

const Preloader = props => {

    return (
        <div className="preloader-component" style={preloader}>
            <h2 style={{fontFamily: 'initial', fontSize: 'initial'}}>Loading ...</h2>
        </div>
    )
};

export default Preloader