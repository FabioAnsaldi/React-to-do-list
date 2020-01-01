import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { MenuItem, FormControl, Select, Input, Button, Grid } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    margin: {
        margin: theme.spacing(1)
    }
}));
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const NEW_LIST = 'New list';
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 450,
        },
    },
};

const Form = props => {
    const classes = useStyles();
    const { lists, onSubmitClick } = props;
    const [selectValue, setSelectValue] = useState('');
    const [inputListValue, setInputListValue] = useState('');
    const [inputToDoValue, setInputToDoValue] = useState('');
    const handleSelectChange = (event) => {
        setSelectValue(event.target.value);
        if (event.target.value !== NEW_LIST) {
            setInputListValue(event.target.value);
        } else {
            setInputListValue('');
        }
    };
    const handleInputListChange = (event) => {
        setInputListValue(event.target.value);
    };
    const handleInputToDoChange = (event) => {
        setInputToDoValue(event.target.value);
    };
    const handleOnSubmit = (event) => {
        event.preventDefault();
        if (inputListValue && inputToDoValue) {
            onSubmitClick({
                list: inputListValue,
                item: {
                    title: inputToDoValue,
                    content: '',
                    color: '#009efb',
                    done: false
                }
            });
            setSelectValue('');
            setInputListValue('');
            setInputToDoValue('');
        }
    };

    return (
        <form onSubmit={handleOnSubmit} className="form-component">
            <Grid container>
                <Grid item xs={12} md={3}>
                    <FormControl className={classes.margin}>
                        <Select
                            displayEmpty
                            value={selectValue}
                            onChange={handleSelectChange}
                            input={<Input />}
                            renderValue={selected => {
                                if (selected.length === 0) return <em>Select a List</em>;
                                return selected;
                            }}
                            MenuProps={MenuProps}
                        >
                            <MenuItem value={NEW_LIST}>
                                <em>{NEW_LIST}</em>
                            </MenuItem>
                            {Object.keys(lists).map((key, index) => (
                                <MenuItem key={key} value={lists[key]}>
                                    {lists[key]}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Grid>
                {selectValue === NEW_LIST && (
                    <Grid item xs={12} md={3}>
                        <FormControl className={classes.margin}>
                            <Input
                                id="standard-adornment-weight"
                                placeholder="New list name"
                                value={inputListValue}
                                onChange={handleInputListChange}
                                aria-describedby="standard-weight-helper-text"
                                inputProps={{
                                    'aria-label': 'weight',
                                }}
                            />
                        </FormControl>
                    </Grid>
                )}
                <Grid item xs={12} md={3}>
                    <FormControl className={classes.margin}>
                        <Input
                            id="standard-adornment-weight"
                            placeholder="New todo name"
                            value={inputToDoValue}
                            onChange={handleInputToDoChange}
                            aria-describedby="standard-weight-helper-text"
                            inputProps={{
                                'aria-label': 'weight',
                            }}
                        />
                    </FormControl>
                </Grid>
                {inputListValue &&
                inputToDoValue &&
                (<Grid item xs={12} md={3}>
                    <FormControl>
                        <Button type="submit" variant="contained">Add</Button>
                    </FormControl>
                </Grid>)}
            </Grid>
        </form>
    )
};

Form.propTypes = {
    lists: PropTypes.object,
    onSubmitClick: PropTypes.func
};

export default Form