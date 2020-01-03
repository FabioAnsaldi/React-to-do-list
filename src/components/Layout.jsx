import React, { Fragment, useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { Container, Grid } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import Header from './Header'
import Preloader from './Preloader'

const useStyles = makeStyles(theme => ({
    grid: {
        flexGrow: 1
    }
}));

const Layout = props => {
    const classes = useStyles();
    const [loaded, setLoaded] = useState(false)

    useEffect(() => {
        setLoaded(true);
    }, [])

    return (
        <div className="layout-component">
            {(!loaded &&
            <Preloader />) ||
            <Fragment>
                <Header />
                <Container fixed>
                    <Grid container className={classes.grid} spacing={2}>
                        <Grid item xs={12}>
                            {props.children}
                        </Grid>
                    </Grid>
                </Container>
            </Fragment>
            }
        </div>
    )
}

Layout.propTypes = {
    children: PropTypes.node.isRequired
}

export default Layout
