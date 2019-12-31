import React, { Fragment, useState } from 'react'
import PropTypes from 'prop-types'
import {Input, Tooltip, TextareaAutosize, Button} from "@material-ui/core"
import { makeStyles } from '@material-ui/core/styles';
import { CompactPicker } from "react-color"

const useStyles = makeStyles(theme => ({
    title: {
      margin: 0
    },
    input: {
        display: 'block'
    },
    button: {
        margin: '10px 0 0 0'
    },
    textarea: {
        margin: '10px 0',
        width: '100%',
        maxWidth: '100%',
        minHeight: '32px',
        maxHeight: '64px'
    }
}));

const Item = props => {
    const { data, index, onItemSave } = props
    const [item, setItem] = useState(data)
    const classes = useStyles();
    const handleOnItemClick = () => {
        const newItem = { ...item }

        newItem.editing = true;
        setItem(newItem);
    }
    const handleOnTitleChange = event => {
        const newItem = { ...item }

        newItem.title = event.currentTarget.value;
        setItem(newItem);
    }
    const handleOnContentChange = event => {
        const newItem = { ...item }

        newItem.content = event.currentTarget.value;
        setItem(newItem);
    }
    const handleChangeComplete = color => {
        const newItem = { ...item }

        newItem.color = color.hex;
        setItem(newItem);
    }
    const handleOnSubmit = event => {
        event.preventDefault();
        const newItem = { ...item }

        delete newItem.editing;
        setItem(newItem);
        onItemSave(index, newItem)
    }

    return (
        <form onSubmit={handleOnSubmit} className="item-component" noValidate autoComplete="off">
            {item.editing &&
            <Fragment>
                <Input
                    className={classes.input}
                    autoFocus
                    onChange={handleOnTitleChange}
                    defaultValue={item.title} />
                <TextareaAutosize
                    className={classes.textarea}
                    onChange={handleOnContentChange}
                    defaultValue={item.content} />
                <CompactPicker
                    color={item.color}
                    onChangeComplete={handleChangeComplete} />
                <Button className={classes.button} type="submit" variant="contained" color="primary">Update</Button>
            </Fragment> ||
            <Fragment>
                <Tooltip title="Click to Edit item" placement="top-start">
                    <h4
                        className={classes.title}
                        onClick={handleOnItemClick}>
                        {item.title}
                    </h4>
                </Tooltip>
                {item.content}
            </Fragment>
            }
        </form>
    )
};

Item.propTypes = {
    data: PropTypes.object,
    index: PropTypes.number,
    onItemSave: PropTypes.func,
};

export default Item