import React from "react";

// material ui components
import Table from '@mui/material/Table';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import Button from '@mui/material/Button';
import { MdCancel } from "react-icons/md";

import classes from "./PlanetInfo.module.css";

const PlanetInfo = (props) => {

    return (
        <>
            {props.show && (
                <div className={classes.popup}>
                    <h2>Planet Name: {props.name}</h2>
                    <Table className={classes.popupTable}>
                        <TableRow>
                            <TableCell>Diameter:</TableCell>
                            <TableCell>{props.diameter}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>Climate:</TableCell>
                            <TableCell>{props.climate}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>Population:</TableCell>
                            <TableCell>{props.population}</TableCell>
                        </TableRow>
                    </Table>
                    <Button onClick={props.onHide}>
                        Close <MdCancel />
                    </Button>
                </div>
            )}
        </>
    );
}

export default PlanetInfo;