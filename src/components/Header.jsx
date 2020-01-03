import React, { useState } from 'react'
import Link from 'next/link'
import { makeStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import MenuIcon from '@material-ui/icons/Menu'

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
        marginBottom: '20px'
    },
    title: {
        flexGrow: 1
    },
    link: {
        minWidth: '100px'
    }
}))

const Header = () => {
    const classes = useStyles()
    const [anchorEl, setAnchorEl] = useState(null)
    const handleClick = event => {
        setAnchorEl(event.currentTarget)
    }
    const handleClose = () => {
        setAnchorEl(null)
    }

    return (
        <div className="header-component">
            <div className={classes.root}>
                <AppBar position="static">
                    <Toolbar>
                        <IconButton onClick={handleClick} edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                            <MenuIcon />
                        </IconButton>
                        <Menu
                            id="simple-menu"
                            anchorEl={anchorEl}
                            keepMounted
                            open={Boolean(anchorEl)}
                            onClose={handleClose}
                        >
                            <MenuItem className={classes.link} key="0" onClick={handleClose}>
                                <Link href="/">
                                    <a title="Home Page">Home</a>
                                </Link>
                            </MenuItem>
                            <MenuItem className={classes.link} key="1" onClick={handleClose}>
                                <Link href="/about">
                                    <a title="About Page">About</a>
                                </Link>
                            </MenuItem>
                        </Menu>
                        <Typography variant="h6" className={classes.title}>
                            Todo&apos;s
                        </Typography>
                    </Toolbar>
                </AppBar>
            </div>
        </div>
    )
}

export default Header
