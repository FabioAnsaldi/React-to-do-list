import React, {useState} from 'react'
import PropTypes from 'prop-types'
import { Typography, Grid, Input, Tooltip } from '@material-ui/core';
import DeleteForeverOutlinedIcon from '@material-ui/icons/DeleteForeverOutlined';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import DoneOutlineIcon from '@material-ui/icons/DoneOutline';
import { Draggable, Droppable } from "react-beautiful-dnd";
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    icon: {
        cursor: 'pointer'
    }
}));

const List = props => {
    const { droppableId, items, listName, onRemove, onMarkDone } = props;
    const [list, setList] = useState(items)
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
        width: 300
    })
    const handleOnRemoveClick = event => {
        event.preventDefault();
        let index = event.currentTarget && event.currentTarget.dataset && event.currentTarget.dataset.index;
        onRemove(listName, index);
    };
    const handleOnMarkDoneClick = event => {
        event.preventDefault();
        let index = event.currentTarget && event.currentTarget.dataset && event.currentTarget.dataset.index;
        onMarkDone(listName, index);
    };
    const handleOnItemClick = event => {
        event.preventDefault();
        const newList = [ ...list ];

        let index = event.currentTarget.parentNode.dataset.index;
        newList[index].editing = true;
        setList(newList);
    };
    const handleOnItemBlur = event => {
        event.preventDefault();
        const newList = [ ...list ];

        let index = event.currentTarget.parentNode.parentNode.dataset.index;
        newList[index].editing = false;
        newList[index].content = event.currentTarget.value;
        setList(newList);
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
                        {list.map((item, index) => (
                            <Draggable
                                key={item.content.split(' ').join('_')}
                                draggableId={item.content.split(' ').join('_')}
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
                                        <Grid
                                            data-index={index}
                                            item
                                            xs={9}>
                                            {item.editing &&
                                            <Input
                                                autoFocus
                                                defaultValue={item.content}
                                                onBlur={handleOnItemBlur}/> ||
                                            <Tooltip title="Click to Edit, Focus out to save" placement="top-start">
                                                <div
                                                    onClick={handleOnItemClick}>
                                                    {item.content}
                                                </div>
                                            </Tooltip>
                                            }
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
};

export default List