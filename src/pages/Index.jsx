import React, { useState } from 'react'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'
import Layout from '../components/Layout'
import { Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const Index = () => {
    // fake data generator
    const getItems = (count, offset = 0) =>
        Array.from({ length: count }, (v, k) => k).map(k => ({
            id: `item-${k + offset}`,
            content: `item ${k + offset}`
        }))
    // a little function to help us with reordering the result
    const reorder = (list, startIndex, endIndex) => {
        const result = Array.from(list)
        const [removed] = result.splice(startIndex, 1)
        result.splice(endIndex, 0, removed)

        return result
    }
    const move = (source, destination, droppableSource, droppableDestination) => {
        const sourceClone = Array.from(source)
        const destClone = Array.from(destination)
        const [removed] = sourceClone.splice(droppableSource.index, 1)

        destClone.splice(droppableDestination.index, 0, removed)

        const result = {}
        result[droppableSource.droppableId] = sourceClone
        result[droppableDestination.droppableId] = destClone

        return result
    }
    const grid = 8
    const getItemStyle = (isDragging, draggableStyle) => ({
        // some basic styles to make the items look a bit nicer
        userSelect: 'none',
        padding: grid * 2,
        margin: `0 0 ${grid}px 0`,
        // change background colour if dragging
        background: isDragging ? 'lightgreen' : 'grey',
        // styles we need to apply on draggables
        ...draggableStyle
    })
    const getListStyle = isDraggingOver => ({
        background: isDraggingOver ? 'lightblue' : 'lightgrey',
        padding: grid,
        width: 250
    })
    const defaultState = {
        items: getItems(10),
        selected: getItems(5, 10)
    }
    const [listsState, setListsState] = useState(defaultState)
    const id2List = {
        droppable: 'items',
        droppable2: 'selected'
    }
    const getList = id => listsState[id2List[id]]
    const onDragEnd = result => {
        const { source, destination } = result
        // dropped outside the list
        if (!destination) {
            return
        }
        if (source.droppableId === destination.droppableId) {
            const items = reorder(
                getList(source.droppableId),
                source.index,
                destination.index
            )

            let newState = { items, selected: listsState.selected }
            if (source.droppableId === 'droppable2') {
                newState = { items: listsState.items, selected: items }
            }
            setListsState(newState)
        } else {
            const result = move(
                getList(source.droppableId),
                getList(destination.droppableId),
                source,
                destination
            )

            setListsState({
                items: result.droppable,
                selected: result.droppable2
            })
        }
    }

    return (
        <Layout>
            <DragDropContext onDragEnd={onDragEnd}>
                <Grid container justify="center" spacing={2}>
                    <Grid key="0" item>
                        <Droppable droppableId="droppable">
                    {(provided, snapshot) => (
                        <div
                            ref={provided.innerRef}
                            style={getListStyle(snapshot.isDraggingOver)}>
                            {listsState.items.map((item, index) => (
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
                    </Grid>
                    <Grid key="1" item>
                        <Droppable droppableId="droppable2">
                    {(provided, snapshot) => (
                        <div
                            ref={provided.innerRef}
                            style={getListStyle(snapshot.isDraggingOver)}>
                            {listsState.selected.map((item, index) => (
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
                    </Grid>
                </Grid>
            </DragDropContext>
        </Layout>
    )
}

export default Index
