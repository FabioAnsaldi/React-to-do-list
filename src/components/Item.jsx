import React, { Fragment, useState } from 'react'
import PropTypes from 'prop-types'
import { Input, Tooltip, TextareaAutosize, Button, Chip, Avatar } from "@material-ui/core"
import { makeStyles } from '@material-ui/core/styles';
import { CompactPicker } from "react-color"

const useStyles = makeStyles(theme => ({
    title: {
        margin: 0,
        cursor: 'pointer',
        '&:hover': {
            textDecoration: 'underline',
        },
    },
    input: {
        display: 'block'
    },
    button: {
        margin: '10px 0 0 0'
    },
    textarea: {
        margin: '6px 0',
        width: '100%',
        maxWidth: '100%',
        minHeight: '32px',
        maxHeight: '64px'
    },
    paper: {
        display: 'flex',
        justifyContent: 'center',
        flexWrap: 'wrap',
        marginTop: '10px',
        padding: 0,
    },
    chip: {
        margin: theme.spacing(0.5),
    },
    plus: {
        fontSize: '16px'
    }
}));

const Item = props => {
    const { data, index, onItemSave, onColorChange } = props
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

        newItem.content = event.currentTarget.value
        setItem(newItem);
    }
    const handleChangeComplete = color => {
        const newItem = { ...item }

        newItem.color = color.hex;
        setItem(newItem);
        onColorChange(index, color.hex)
    }
    const handleOnSubmit = event => {
        event.preventDefault();
        const newItem = { ...item }

        delete newItem.editing;
        if (newItem.tags) {
            newItem.tags.map((data, index) => {
                delete data.editing
            })
        }
        setItem(newItem);
        onItemSave(index, newItem)
    }
    const handleAddClick = event => {
        event.preventDefault();
        const newItem = { ...item }

        if (!newItem.tags) {
            newItem.tags = []
        }
        newItem.tags.push({
            id: newItem.tags.length,
            editing: true,
            label: 'Edit me'
        })
        setItem(newItem);
    }
    const handleOnTagChange = event => {
        const newItem = { ...item }
        const index = event.currentTarget.parentNode.dataset.index;
        const tag = newItem.tags[index]

        tag.label = event.currentTarget.value
        newItem.tags.splice(index, 1, tag)
        setItem(newItem);
    }
    const handleChipDelete = event => {
        const newItem = { ...item }
        const index = event.currentTarget.parentNode.dataset.index;

        newItem.tags.splice(index, 1)
        setItem(newItem);
    }

    return (
        <div className="item-component">
            {item.editing &&
            <form onSubmit={handleOnSubmit} noValidate autoComplete="off">
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
                <Chip
                    className={classes.chip}
                    avatar={<Avatar><strong className={classes.plus}>+</strong></Avatar>}
                    label="Add Tag"
                    onClick={handleAddClick} />
                <div className={classes.paper}>
                {item.tags && item.tags.map((data, index) =>
                    <Chip
                        key={data.id}
                        data-index={index}
                        label={!data.editing && data.label || <Input autoFocus data-index={index} onChange={handleOnTagChange} />}
                        onDelete={handleChipDelete}
                        className={classes.chip}
                    />
                )}
                </div>
                <Button className={classes.button} type="submit" variant="contained" color="primary">Done</Button>
            </form> ||
            <Fragment>
                <Tooltip title="Click to Edit item" placement="top-start">
                    <h4
                        className={classes.title}
                        onClick={handleOnItemClick}>
                        {item.title}
                    </h4>
                </Tooltip>
                {item.content}
                <div className={classes.paper}>
                    {item.tags && item.tags.map((data, index) =>
                        <Chip
                            key={data.label}
                            label={data.label}
                            className={classes.chip}
                        />
                    )}
                </div>
            </Fragment>
            }
        </div>
    )
};

Item.propTypes = {
    data: PropTypes.object,
    index: PropTypes.number,
    onItemSave: PropTypes.func,
    onColorChange: PropTypes.func,
};

export default Item