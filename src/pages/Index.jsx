import React, { useState } from 'react'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'
import fetch from 'node-fetch';
import { Grid, Typography } from '@material-ui/core';
import Layout from '../components/Layout'
import List from '../components/List'
import Form from '../components/Form'

const Index = props => {
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
        backgroundColor: isDragging ? 'lightgreen' : '',
        // styles we need to apply on draggables
        ...draggableStyle
    })
    const getListStyle = isDraggingOver => ({
        backgroundColor: isDraggingOver ? 'lightblue' : 'lightgrey',
        padding: grid,
        width: 250
    })
    const defaultState = {
        default: [props.data]
    }
    const [listsState, setListsState] = useState(defaultState)
    const id2List = {
        droppable0: 'default'
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
    const handleOnSaveClick = data => {
        debugger
        return false;
    }

    return (
        <Layout>
            <Typography variant="h5" gutterBottom>Todo List Generator</Typography>
            <Grid container justify="center" spacing={2}>
                <Form lists={id2List} onSaveClick={handleOnSaveClick}/>
            </Grid>
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

Index.getInitialProps = async function() {
    //const res = await fetch('process.env.API_URL' + process.env.INITIAL_DATA);
    const res = await fetch('http://www.mocky.io/v2/' + '5e0209872f00003688dcd513');
    const data = await res.json();

    return { data };
};

export default Index
