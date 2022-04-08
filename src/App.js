import React from "react";
import "./styles.css";
import DataTable from "./components/Table/DataTable";
import Container from '@mui/material/Container';

const App = () => {

  return (
    <div className="App">
      <Container maxWidth="xl">
        <DataTable />
      </Container>
    </div>
  );
}

export default App;