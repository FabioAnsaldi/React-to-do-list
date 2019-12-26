import React, { useState } from 'react'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'
import fetch from 'node-fetch'
import nextCookie from 'next-cookies'
import { Grid, Typography } from '@material-ui/core'
import Layout from '../components/Layout'
import List from '../components/List'
import Form from '../components/Form'
import Save from '../components/Save'

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
    const defaultItem = props.data;
    const defaultList = Object.keys(defaultItem).reduce((acc, current) => {
        acc['droppable' + Object.keys(acc).length] = current;
        return acc;
    }, {});
    const [listsState, setListsState] = useState(defaultItem)
    const [id2List, setId2List] = useState(defaultList)
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
    const handleOnSubmitClick = data => {
        let newState = {...listsState};
        if (!newState.hasOwnProperty(data.list)) {
            newState[data.list] = [];
            let newId2List = {...id2List};
            let last = Object.keys(newId2List)[Object.keys(newId2List).length - 1];
            last = last.replace('droppable', '');
            newId2List[`droppable${parseInt(last) + 1}`] = data.list;
            setId2List(newId2List);
        }
        newState[data.list].push(data.item);
        setListsState(newState);
    }

    return (
        <Layout>
            <Typography variant="h5" gutterBottom>Todo List Generator</Typography>
            <br/>
            <Grid container justify="center" spacing={2}>
                <Form lists={id2List} onSubmitClick={handleOnSubmitClick}/>
            </Grid>
            <br />
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
            <br/>
            <Grid container justify="center" spacing={2}>
                <Save listItems={listsState}/>
            </Grid>
        </Layout>
    )
}

Index.getInitialProps = async ctx => {
    const { data } = nextCookie(ctx);
    const string = data || process.env.INITIAL_DATA;
    const res = await fetch(process.env.API_URL + process.env.API_VERSION + string);
    const json = await res.json();

    return { data: json };
};

export default Index
