import React from "react";

// material ui components
import TableContainer from '@mui/material/TableContainer';
import Table from '@mui/material/Table';
import Paper from '@mui/material/Paper';


const TableWrapper = (props) => {

    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                {props.children}
            </Table>
        </TableContainer>
    );
}

export default TableWrapper;