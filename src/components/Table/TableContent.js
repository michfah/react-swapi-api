import React, { useState } from "react";
import PlanetInfo from "../Popup/PlanetInfo";

// material ui components
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import Link from '@mui/material/Link';
import { MdInfoOutline } from "react-icons/md";

import classes from './TableContent.module.css';


const TableContent = ({ characterData }) => {

    const [showPopup, setShowPopup] = useState(0);

    const getPopup = value => {
        setShowPopup(value);
    };
    const hidePopup = value => {
        setShowPopup(0);
    };

    return (
        <TableBody>
            {characterData.length > 0 ? characterData.map((character) => {
                return (
                    <>
                        <TableRow>
                            <TableCell>{character.name}</TableCell>
                            <TableCell>{character.height} cm</TableCell>
                            <TableCell>{character.mass}</TableCell>
                            <TableCell>{character.created.match(/([^T]+)/)[0].split("-").reverse().join("/")}</TableCell>
                            <TableCell>{character.edited.match(/([^T]+)/)[0].split("-").reverse().join("/")}</TableCell>
                            <TableCell>
                                <Link
                                    component="button"
                                    variant="body2"
                                    onClick={() => getPopup(character.homeworld)}
                                >
                                    {character.homeworld}
                                    <MdInfoOutline className={classes.planetInfoIcon} />
                                </Link>

                            </TableCell>
                        </TableRow>
                        <PlanetInfo
                            show={showPopup === character.homeworld}
                            onHide={() => hidePopup(character.homeworld)}
                            name={character.homeworld}
                            diameter={character.diameter}
                            climate={character.climate}
                            population={character.population}
                        />
                    </>
                )
            }) : (<TableRow>
                <TableCell colSpan="6" className={classes.noDataLabel}>
                    No data found!!
                </TableCell>
            </TableRow>
            )}
        </TableBody>
    );
}

export default TableContent;