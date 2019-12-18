import React, { useState } from 'react'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'
import { Grid } from '@material-ui/core';
import Layout from '../components/Layout'
import List from '../components/List'

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
        list0: getItems(3),
        list1: getItems(2, 3)
    }
    const [listsState, setListsState] = useState(defaultState)
    const id2List = {
        droppable0: 'list0',
        droppable1: 'list1'
    }
    const getList = id => listsState[id2List[id]]
    const onDragEnd = result => {
        const { source, destination } = result
        // dropped outside the list
        if (!destination) {
            return
        }
        let newState = {...listsState};
        if (source.droppableId === destination.droppableId) {
            const items = reorder(
                getList(source.droppableId),
                source.index,
                destination.index
            )

            Object.keys(id2List).map((key, index) => {
                if (source.droppableId === key) {
                    newState[id2List[key]] = items;
                }
            })
            setListsState(newState)
        } else {
            const result = move(
                getList(source.droppableId),
                getList(destination.droppableId),
                source,
                destination
            )

            Object.keys(id2List).map((key, index) => {
                newState[id2List[key]] = result[key];
            })
            setListsState(newState);
        }
    }

    return (
        <Layout>
            <DragDropContext onDragEnd={onDragEnd}>
                <Grid container justify="center" spacing={2}>
                    {Object.keys(listsState).map((key, index) => (
                        <Grid key={key} item>
                            <List
                                droppableId={`droppable${index}`}
                                getListStyle={getListStyle}
                                getItemStyle={getItemStyle}
                                items={listsState[key]}
                                listName={key}
                            />
                        </Grid>
                    ))}
                </Grid>
            </DragDropContext>
        </Layout>
    )
}

export default Index
