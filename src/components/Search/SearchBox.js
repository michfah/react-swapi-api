import React from "react";

import TextField from '@mui/material/TextField';
import classes from './SearchBox.module.css';

const SearchBox = ({ onChangeHandler }) => {

    return (
        <div className={classes.searchInputBox}>
            <TextField
                label="Filter Character"
                variant="outlined"
                onChange={onChangeHandler}
                type="search"
            />
        </div>
    )
}

export default SearchBox;