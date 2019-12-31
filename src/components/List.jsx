import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { Typography, Grid, Input, Tooltip } from '@material-ui/core';
import DeleteForeverOutlinedIcon from '@material-ui/icons/DeleteForeverOutlined';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import DoneOutlineIcon from '@material-ui/icons/DoneOutline';
import { Draggable, Droppable } from "react-beautiful-dnd";
import { makeStyles } from '@material-ui/core/styles';
import Item from '../components/Item'

const useStyles = makeStyles(theme => ({
    icon: {
        cursor: 'pointer'
    },
    container: {
        zIndex: 99
    },
    grid: {
        maxHeight: '30px'
    }
}));

const List = props => {
    const { droppableId, items, listName, onRemove, onMarkDone, onItemChange } = props;
    const classes = useStyles();
    const grid = 8;
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
        backgroundColor: isDraggingOver ? 'lightblue' : 'lightgrey',
        padding: grid,
        width: 340
    })
    const handleOnRemoveClick = event => {
        event.preventDefault();
        let index = event.currentTarget.dataset && event.currentTarget.dataset.index;
        onRemove(listName, index);
    }
    const handleOnMarkDoneClick = event => {
        event.preventDefault();
        let index = event.currentTarget.dataset && event.currentTarget.dataset.index;
        onMarkDone(listName, index);
    }
    const handleOnItemSave = (index, item) => {
        onItemChange(listName, index, item)
    }

    return (
        <div className="list-component">
            <Typography variant="h6" gutterBottom>
                {listName}
            </Typography>
            <Droppable droppableId={droppableId}>
                {(provided, snapshot) => (
                    <div
                        ref={provided.innerRef}
                        style={getListStyle(snapshot.isDraggingOver)}>
                        {items.map((item, index) => (
                            <Draggable
                                key={item.title.split(' ').join('_')}
                                draggableId={item.title.split(' ').join('_')}
                                index={index}>
                                {(provided, snapshot) => (
                                    <Grid
                                        container
                                        ref={provided.innerRef}
                                        {...provided.draggableProps}
                                        {...provided.dragHandleProps}
                                        style={getItemStyle(
                                            snapshot.isDragging,
                                            {backgroundColor: item.color, ...provided.draggableProps.style}
                                        )}>
                                        <Grid
                                            item xs={2}
                                            className={classes.icon}
                                            data-index={index}
                                            onClick={handleOnMarkDoneClick}>
                                            {item.done &&
                                            <DoneOutlineIcon /> ||
                                            <CheckBoxOutlineBlankIcon />}
                                        </Grid>
                                        <Grid item xs={9}>
                                            <Item data={item} index={index} onItemSave={handleOnItemSave} />
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
};

List.propTypes = {
    droppableId: PropTypes.string,
    items: PropTypes.array,
    listName: PropTypes.string,
    onRemove: PropTypes.func,
    onMarkDone: PropTypes.func,
    onItemChange: PropTypes.func,
};

export default List