import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { MenuItem, FormControl, Select, Input, Button } from '@material-ui/core';
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
            width: 250,
        },
    },
};

const Form = props => {
    const classes = useStyles();
    const { lists, onSaveClick } = props;
    const [selectValue, setSelectValue] = useState('');
    const [inputListValue, setInputListValue] = useState('');
    const [inputToDoValue, setInputToDoValue] = useState('');
    const handleSelectChange = (event) => {
        setSelectValue(event.target.value);
        if (event.target.value !== NEW_LIST) setInputListValue(event.target.value);
    };
    const handleInputListChange = (event) => {
        setInputListValue(event.target.value);
    };
    const handleInputToDoChange = (event) => {
        setInputToDoValue(event.target.value);
    };
    const handleOnSubmit = (event) => {
        event.preventDefault();
        if(inputListValue && inputToDoValue) {
            onSaveClick({
                list: inputListValue,
                item: {
                    content: inputToDoValue,
                    color: '#009efb'
                }
            });
            setSelectValue('');
            setInputListValue('');
            setInputToDoValue('');
        }
    };

    return (
        <form onSubmit={handleOnSubmit} className="form-component">
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
            {selectValue === NEW_LIST && (
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
            )}
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
            <FormControl>
                <Button type="submit" variant="contained">Save</Button>
            </FormControl>
        </form>
    )
};

Form.propTypes = {
    lists: PropTypes.object,
    onSaveClick: PropTypes.func
};

export default Form