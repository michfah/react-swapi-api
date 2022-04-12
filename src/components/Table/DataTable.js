import React, { useState, useEffect } from "react";

import SearchBox from "../Search/SearchBox";
import TableWrapper from "./TableWrapper";
import TableContent from "./TableContent";

// material ui components
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import LinearProgress from '@mui/material/LinearProgress';
import Box from '@mui/material/Box';

import classes from './DataTable.module.css';

import axios from "axios";


const DataTable = () => {

    const [characters, setCharacters] = useState([]);
    const [query, setQuery] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [sort, setSort] = useState({ column: null, direction: "desc" });

    // async function to retrieve data from swapi.dev with axios
    // initial call is to /people endpoint
    // second axios call links homeworld_url to homeworld from /planets endpoint
    const getData = async () => {

        const peopleURL = `https://swapi.dev/api/people/`;
        const peopleResponse = await axios.get(peopleURL);

        for (const character of peopleResponse.data.results) {
            setIsLoading(true);
            const homeworld_url = character.homeworld;

            const homeWorldResponse = await axios.get(homeworld_url);

            character.homeworld = homeWorldResponse.data.name;
            character.homeworld_url = homeWorldResponse.data.url;
            character.diameter = homeWorldResponse.data.diameter;
            character.population = homeWorldResponse.data.population;
            character.climate = homeWorldResponse.data.climate;

            setIsLoading(false);
            setCharacters(peopleResponse.data.results);
        }
    }

    // retrieve data on render with useEffect hook
    useEffect(() => {
        getData();
    }, [])


    // input search query event
    const onSearchChange = (event) => {
        const searchQuery = event.target.value.toLocaleLowerCase();
        setQuery(searchQuery);
    }

    // filter name functionality based on query
    const filteredCharacters = characters.filter((character) => {
        return character.name.toLocaleLowerCase().includes(query);
    });

    // sort columns asc, desc
    const onSort = column => event => {
        const direction = sort.column
            ? sort.direction === "asc"
                ? "desc"
                : "asc"
            : "desc";

        const sortedData = characters.sort((a, b) => {
            if (column === "mass") {
                return a.mass - b.mass;
            } else if (column === "height") {
                return a.height - b.height;
            } else if (column === "created") {
                return a.created - b.created;
            } else if (column === "edited") {
                return a.edited - b.edited;
            } else if (column === "name") {
                if (a.name < b.name) { return -1; }
                if (a.name > b.name) { return 1; }
                return 0;
            } else if (column === "homeworld") {
                if (a.homeworld < b.homeworld) { return -1; }
                if (a.homeworld > b.homeworld) { return 1; }
                return 0;
            }
        });
        if (direction === "desc") {
            sortedData.reverse();
        }

        setCharacters(sortedData);
        setSort({ column, direction });
    };


    return (
        <>
            <div className={classes.starWarsHeader}>Star Wars Characters</div>
            {/* search name component */}
            <SearchBox onChangeHandler={onSearchChange} />
            {/* TableWrapper, TableHead, TableContent components */}
            <TableWrapper>
                {isLoading ? (
                    <Box sx={{ width: '100%', marginTop: 3 }}>
                        <LinearProgress />
                    </Box>
                ) : (
                    <>
                        <TableHead>
                            <TableRow>
                                <TableCell onClick={onSort("name")}>Name</TableCell>
                                <TableCell onClick={onSort("height")}>Height</TableCell>
                                <TableCell onClick={onSort("mass")}>Mass</TableCell>
                                <TableCell onClick={onSort("created")}>Created</TableCell>
                                <TableCell onClick={onSort("edited")}>Edited</TableCell>
                                <TableCell onClick={onSort("homeworld")}>Planet Name</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableContent characterData={filteredCharacters} />
                    </>
                )
                }
            </TableWrapper>
        </>
    );
}

export default DataTable;