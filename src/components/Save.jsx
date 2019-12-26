import React from 'react'
import PropTypes from 'prop-types'
import { Button } from '@material-ui/core'
import FormData from "form-data";
import fetch from "node-fetch";
import cookie from "js-cookie";

const Save = props => {
    const { listItems } = props;
    const handleOnSaveClick = async () => {
        const form = new FormData();

        form.append('body', JSON.stringify(listItems));
        form.append('charset', 'UTF-8');
        form.append('contenttype', 'application/json');
        form.append('statuscode', '200');
        let res = await fetch(process.env.API_URL, {
            method: 'post',
            body:    form,
        });
        let json = await res.json();
        let string = json.url.substring(json.url.lastIndexOf('/') + 1);
        cookie.set('data', string, { expires: 1 });
    }

    return (
        <div className="save-component">
            <Button variant="contained" color="primary" onClick={handleOnSaveClick}>Save</Button>
        </div>
    )
};

Save.propTypes = {
    listItems: PropTypes.object
};

export default Save