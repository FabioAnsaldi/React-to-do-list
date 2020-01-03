import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Grid, Input, Tooltip, Button } from '@material-ui/core'
import DeleteForeverOutlinedIcon from '@material-ui/icons/DeleteForeverOutlined'
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank'
import DoneOutlineIcon from '@material-ui/icons/DoneOutline'
import { Draggable, Droppable } from 'react-beautiful-dnd'
import { makeStyles } from '@material-ui/core/styles'
import { CompactPicker } from 'react-color'
import Item from '../components/Item'

const useStyles = makeStyles(theme => ({
    title: {
        margin: '0 0 10px 0',
        cursor: 'pointer'
    },
    icon: {
        cursor: 'pointer'
    },
    grid: {
        maxHeight: '30px'
    },
    input: {
        display: 'block'
    },
    button: {
        margin: '10px 0'
    }
}))

const List = props => {
    const { droppableId, items, listColor, listName, onListRemove, onListChange, onRemove, onMarkDone, onItemChange, onItemColorChange } = props
    const classes = useStyles()
    const [edit, setEdit] = useState(false)
    const [title, setTitle] = useState(listName)
    const [color, setColor] = useState(listColor)
    const grid = 8
    const getItemStyle = (isDragging, draggableStyle) => ({
        // some basic styles to make the items look a bit nicer
        userSelect: 'none',
        padding: grid * 2,
        margin: `0 0 ${grid}px 0`,
        // change background colour if dragging
        backgroundColor: isDragging ? 'lightgreen' : '',
        // styles we need to apply on draggables
        ...draggableStyle
    })
    const getListStyle = isDraggingOver => ({
        backgroundColor: isDraggingOver ? 'lightblue' : color,
        padding: grid,
        width: 340
    })
    const handleOnTitleClick = () => {
        setEdit(true)
    }
    const handleOnTitleChange = event => {
        setTitle(event.currentTarget.value)
    }
    const handleChangeComplete = color => {
        setColor(color.hex)
    }
    const handleOnSubmit = event => {
        event.preventDefault()
        setEdit(false)
        onListChange(listName, title, color)
    }
    const handleOnListRemoveClick = () => {
        onListRemove(listName)
    }
    const handleOnRemoveClick = event => {
        event.preventDefault()
        const index = event.currentTarget.dataset.index

        onRemove(listName, index)
    }
    const handleOnMarkDoneClick = event => {
        event.preventDefault()
        const index = event.currentTarget.dataset.index
        onMarkDone(listName, index)
    }
    const handleOnItemSave = (index, item) => {
        onItemChange(listName, index, item)
    }
    const handleOnColorChange = (index, color) => {
        onItemColorChange(listName, index, color)
    }

    return (
        <div className="list-component">
            {(edit &&
            <form onSubmit={handleOnSubmit} noValidate autoComplete="off">
                <Input
                    className={classes.input}
                    autoFocus
                    onChange={handleOnTitleChange}
                    defaultValue={title} />
                <CompactPicker
                    color={color}
                    onChangeComplete={handleChangeComplete} />
                <div>
                    <Button className={classes.button} type="submit" variant="contained" color="primary">Done</Button>
                </div>
            </form>) ||
            <Grid container>
                <Grid xs={11} item>
                    <Tooltip title="Click to Edit item" placement="top-start">
                        <h3 onClick={handleOnTitleClick} className={classes.title}>
                            {listName}
                        </h3>
                    </Tooltip>
                </Grid>
                <Grid item xs={1} className={classes.icon} onClick={handleOnListRemoveClick}>
                    <DeleteForeverOutlinedIcon />
                </Grid>
            </Grid>
            }
            <Droppable droppableId={droppableId}>
                {(provided, snapshot) => (
                    <div
                        ref={provided.innerRef}
                        style={getListStyle(snapshot.isDraggingOver)}>
                        {items.map((item, index) => (
                            <Draggable
                                key={`${item.title.split(' ').join('_')}-${listName}-${index}`}
                                draggableId={`${item.title.split(' ').join('_')}-${listName}-${index}`}
                                index={index}>
                                {(provided, snapshot) => (
                                    <Grid
                                        container
                                        ref={provided.innerRef}
                                        {...provided.draggableProps}
                                        {...provided.dragHandleProps}
                                        style={getItemStyle(
                                            snapshot.isDragging,
                                            { backgroundColor: item.color, ...provided.draggableProps.style }
                                        )}>
                                        <Grid
                                            item xs={2}
                                            className={classes.icon}
                                            data-index={index}
                                            onClick={handleOnMarkDoneClick}>
                                            {(item.done &&
                                            <DoneOutlineIcon />) ||
                                            <CheckBoxOutlineBlankIcon />}
                                        </Grid>
                                        <Grid item xs={9}>
                                            <Item
                                                data={item}
                                                index={index}
                                                onItemSave={handleOnItemSave}
                                                onColorChange={handleOnColorChange} />
                                        </Grid>
                                        <Grid
                                            item xs={1}
                                            className={classes.icon}
                                            data-index={index}
                                            onClick={handleOnRemoveClick}>
                                            <DeleteForeverOutlinedIcon />
                                        </Grid>
                                    </Grid>
                                )}
                            </Draggable>
                        ))}
                        {provided.placeholder}
                    </div>
                )}
            </Droppable>
        </div>
    )
}

List.propTypes = {
    droppableId: PropTypes.string,
    items: PropTypes.array,
    listColor: PropTypes.string,
    listName: PropTypes.string,
    onRemove: PropTypes.func,
    onMarkDone: PropTypes.func,
    onItemChange: PropTypes.func,
    onListRemove: PropTypes.func,
    onListChange: PropTypes.func,
    onItemColorChange: PropTypes.func
}

export default List
