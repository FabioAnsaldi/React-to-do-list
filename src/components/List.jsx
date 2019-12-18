import React from 'react'
import PropTypes from 'prop-types'
import { Typography } from '@material-ui/core';
import { Draggable, Droppable } from "react-beautiful-dnd";

const List = props => {
    const { droppableId, getListStyle, getItemStyle, items, listName } = props;

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
                                key={item.id}
                                draggableId={item.id}
                                index={index}>
                                {(provided, snapshot) => (
                                    <div
                                        ref={provided.innerRef}
                                        {...provided.draggableProps}
                                        {...provided.dragHandleProps}
                                        style={getItemStyle(
                                            snapshot.isDragging,
                                            provided.draggableProps.style
                                        )}>
                                        {item.content}
                                    </div>
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
    getListStyle: PropTypes.func,
    getItemStyle: PropTypes.func,
    items: PropTypes.array,
    listName: PropTypes.string
};

export default List