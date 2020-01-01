import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { DragDropContext } from 'react-beautiful-dnd'
import fetch from 'node-fetch'
import nextCookie from 'next-cookies'
import { Grid, makeStyles, Typography } from '@material-ui/core'
import Layout from '../components/Layout'
import List from '../components/List'
import Form from '../components/Form'
import Save from '../components/Save'

const useStyles = makeStyles(theme => ({
    container: {
        zIndex: 99
    }
}))

const Index = props => {
    const { defaultData } = props
    const classes = useStyles()
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
    const defaultList = Object.keys(defaultData).reduce((acc, current) => {
        acc['droppable' + Object.keys(acc).length] = current
        return acc
    }, {})
    const defaultColor = '#d3d3d3';
    const [listsState, setListsState] = useState(defaultData)
    const [id2List, setId2List] = useState(defaultList)
    const getList = id => listsState[id2List[id]].items
    const onDragEnd = result => {
        const { source, destination } = result
        // dropped outside the list
        if (!destination) {
            return
        }
        const newState = { ...listsState }
        if (source.droppableId === destination.droppableId) {
            const items = reorder(
                getList(source.droppableId),
                source.index,
                destination.index
            )
            Object.keys(id2List).map((key, index) => {
                if (source.droppableId === key) {
                    newState[id2List[key]].items = items
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
                newState[id2List[key]].items = result[key]
            })
            setListsState(newState)
        }
    }
    const handleOnSubmitClick = data => {
        const newState = { ...listsState }

        if (!newState.hasOwnProperty(data.list)) {
            const newId2List = { ...id2List }

            newState[data.list] = {
                items: [],
                color: defaultColor
            }
            let last = 0
            if (newId2List.length > 0) {
                last = Object.keys(newId2List)[Object.keys(newId2List).length - 1]
                last = last.replace('droppable', '')
            }
            newId2List[`droppable${parseInt(last) + 1}`] = data.list
            setId2List(newId2List)
        }
        newState[data.list].items.push(data.item)
        setListsState(newState)
    }
    const deleteByVal = (obj, val) => {
        for (var key in obj) {
            if (obj.hasOwnProperty(key) && obj[key] === val) {
                delete obj[key]
            }
        }
    }
    const getKeyByValue = (object, value) => {
        return Object.keys(object).find(key => object[key] === value);
    }
    const handleOnRemove = (list, index) => {
        const newState = { ...listsState }
        const newId2List = { ...id2List }

        newState[list].items.splice(index, 1)
        setListsState(newState)
        if (newState[list].items && newState[list].items.length === 0) {
            delete newState[list]
            deleteByVal(newId2List, list)
            setId2List(newId2List)
        }
    }
    const handleOnMarkDone = (list, index) => {
        const newState = { ...listsState }
        const mark = newState[list].items[index]

        mark.done = !mark.done
        newState[list].items.splice(index, 1, mark)
        setListsState(newState)
    }
    const handleOnItemColorChange = (list, index, color) => {
        const newState = { ...listsState }
        const mark = newState[list].items[index]

        mark.color = color
        newState[list].items.splice(index, 1, mark)
        setListsState(newState)
    }
    const handleOnItemChange = (list, index, item) => {
        const newState = { ...listsState }

        newState[list].items.splice(index, 1, item)
        setListsState(newState)
    }
    const handleOnListChange = (list, title, color) => {
        const newState = { ...listsState }
        const newId2List = { ...id2List }
        const mark = {
            items: newState[list].items,
            color: color
        }

        delete newState[list]
        let id = getKeyByValue(newId2List, list)
        newState[title] = mark
        newId2List[id] = title
        setListsState(newState)
        setId2List(newId2List)
    }

    return (
        <Layout>
            <Grid container justify="center" spacing={2}>
                <Grid item>
                    <Typography variant="h5" gutterBottom>Todo List Generator</Typography>
                </Grid>
            </Grid>
            <br/>
            <Grid container justify="center" spacing={2}>
                <Grid item xs={12} md={5} lg={6}>
                    <Form lists={id2List} onSubmitClick={handleOnSubmitClick}/>
                </Grid>
            </Grid>
            <br />
            <Grid container justify="center" spacing={2}>
                <DragDropContext onDragEnd={onDragEnd}>
                    {Object.keys(listsState).map((key, index) => (
                        <Grid key={key} item className={classes.container}>
                            <List
                                droppableId={`droppable${index}`}
                                items={listsState[key].items}
                                listColor={listsState[key].color}
                                listName={key}
                                onRemove={handleOnRemove}
                                onMarkDone={handleOnMarkDone}
                                onItemChange={handleOnItemChange}
                                onListChange={handleOnListChange}
                                onItemColorChange={handleOnItemColorChange}
                            />
                        </Grid>
                    ))}
                </DragDropContext>
            </Grid>
            <br/>
            <Grid container justify="center" spacing={2}>
                <Grid item>
                    <Save listItems={listsState}/>
                </Grid>
            </Grid>
        </Layout>
    )
}

Index.getInitialProps = async ctx => {
    const { data } = nextCookie(ctx)
    const string = data || process.env.INITIAL_DATA
    const res = await fetch(process.env.API_URL + process.env.API_VERSION + string)
    const json = await res.json()

    return { defaultData: json }
}

Index.propTypes = {
    defaultData: PropTypes.object
}

export default Index
