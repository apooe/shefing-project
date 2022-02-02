import "./App.css";
import React from "react";
import UsersTable from "./UsersTable";
import Typography from "@mui/material/Typography";
import { SnackbarProvider } from "notistack";

function App() {
  return (
    <>
      <SnackbarProvider>
        <div id="mainContainer">
          <Typography variant="h3" component={"h1"} align={"center"} p>
            Users
          </Typography>
            <UsersTable />
          </div>

      </SnackbarProvider>
    </>
  );
}

export default App;
