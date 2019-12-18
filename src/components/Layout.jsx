import React from 'react'
import Header from './Header'
import PropTypes from 'prop-types'
import { Container, Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1
    }
}));

const Layout = props => {
    const classes = useStyles();

    return (
        <div className="layout-component">
            <Header />
            <Container fixed>
                <Grid container className={classes.root} spacing={2}>
                    <Grid item xs={12}>
                        {props.children}
                    </Grid>
                </Grid>
            </Container>
        </div>
    )
};

Layout.propTypes = {
    children: PropTypes.node.isRequired
};

export default Layout