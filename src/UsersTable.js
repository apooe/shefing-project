import React, { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { useSnackbar } from "notistack";
import UserPosts from "./UserPosts";
import Drawer from "@mui/material/Drawer";

const columns = [
  { field: "name", headerName: "Name", flex: 1 },
  { field: "email", headerName: "Email", flex: 1 },
  {
    headerName: "Company Name",
    flex: 1,
    valueGetter: (params) => params?.row?.company?.name,
  },
];

/**
 * Display table of users
 */
export default function UserTable() {

  const [users, setUsers] = useState([]);
  const [userSelected, setUserSelected] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const { enqueueSnackbar } = useSnackbar(); // Toast message provider

  /**
   *Get users list from the API
   */
  useEffect(() => {
    setIsLoading(true);
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((res) => res.json())
      .then((users) => setUsers(users))
        .catch(() =>
            enqueueSnackbar("Unable to load users list !", { variant: "error" })
        )
      .finally(() => setIsLoading(false));
  }, []);

  /**
   * Get the user and the index of the selected row
   * @param rowTableIndex - Index of selected row (starting at 1)
   */
  const onRowSelected = (rowTableIndex) => {
    const userIndex = rowTableIndex - 1;
    const user = users[userIndex];
    setUserSelected(user);
  };



  return (
    <>
      <DataGrid
        rows={users}
        localeText={{ noRowsLabel: "No users" }}
        columns={columns}
        loading={isLoading}
        onSelectionModelChange={onRowSelected}
        autoHeight
        sx={{ maxWidth: "80vw", margin: "auto" }}
      />
      <Drawer
        open={!!userSelected}
        onClose={() => setUserSelected(null)}
        anchor={"right"}
      >
        <div style={{ maxWidth: "80vw" }}>
          <UserPosts user={userSelected} />
        </div>
      </Drawer>
    </>
  );
}
