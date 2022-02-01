import React, { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { useSnackbar } from "notistack";
import UserPosts from "./UserPosts";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";

const columns = [
  { field: "name", headerName: "Name", flex: 1 },
  { field: "email", headerName: "Email", flex: 1 },
  { field: "companyName", headerName: "Company Name", flex: 1 },
];

/**
 * Display table of users
 */
export default function UserTable() {

  const [users, setUsers] = useState([]);
  const [userSelected, setUserSelected] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const { enqueueSnackbar } = useSnackbar(); //unable to load users list case

  /**
   *Get users list from the API
   */
  useEffect(() => {
    setIsLoading(true);
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((res) => res.json())
      .then((users) => setUsers(users))
      .catch(() => {
        enqueueSnackbar("Unable to load users list !", { variant: "error" });
      })
      .finally(() => setIsLoading(false));
  }, []);

  /**
   * Get the user and the index of the selected row
   * @param rowTableIndex - Index of selected row
   */
  const onRowSelected = (rowTableIndex) => {
    const userIndex = rowTableIndex - 1;
    const user = users[userIndex];
    setUserSelected(user);
  };

  /**
   *
   * @type {{companyName: *, name: *, id: *, email: *}[]} - Each row of the table corresponds to an user
   */
  const rows = users.map((user) => {
    const { id, name, email } = user;
    const companyName = user.company.name;
    return { id, name, email, companyName };
  });

  return (
    <>
      <DataGrid
        rows={rows}
        localeText={{ noRowsLabel: "No users" }}
        columns={columns}
        loading={isLoading}
        onSelectionModelChange={onRowSelected}
        autoHeight
        sx={{ maxWidth: "80vw", margin: "auto" }}
      />
      <SwipeableDrawer
        open={!!userSelected}
        onClose={() => setUserSelected(null)}
        anchor={"right"}
      >
        <div style={{ maxWidth: "80vw" }}>
          <UserPosts user={userSelected} />
        </div>
      </SwipeableDrawer>
    </>
  );
}
