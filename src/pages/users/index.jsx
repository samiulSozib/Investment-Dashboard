import React, { useEffect, useState } from "react";
import { Box, IconButton, Menu, MenuItem } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useDispatch, useSelector } from 'react-redux';
import { userList, deleteUser } from '../../redux/actions/userActions';
import UserDetails from "./detailsUser";
import { ToastContainer } from "react-toastify";
import Header from "../../components/Header";
import { useTheme } from "@mui/material";
import { tokens } from "../../theme";

const Users = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedRowId, setSelectedRowId] = useState(null);
  const [openDetailsDialog, setOpenDetailsDialog] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  const dispatch = useDispatch();
  const { users } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(userList());
  }, [dispatch]);



  const handleMenuOpen = (event, id) => {
    setAnchorEl(event.currentTarget);
    setSelectedRowId(id);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedRowId(null);
  };

  const handleEdit = () => {
    console.log(`Edit clicked for row with id: ${selectedRowId}`);
    handleMenuClose();
  };

  const handleDelete = () => {
    dispatch(deleteUser(selectedRowId));
    handleMenuClose();
  };

  const handleDetails = () => {
    const user = users.find((user) => user.id === selectedRowId);
    setSelectedUser(user);
    setOpenDetailsDialog(true);
    handleMenuClose();
  };

  const handleCloseDetailsDialog = () => {
    setOpenDetailsDialog(false);
    setSelectedUser(null);
  };

  const columns = [
    { field: "id", headerName: "ID", flex: 0.5 },
    { field: "name", headerName: "Name", flex: 1 },
    { field: "email", headerName: "Email", flex: 1 },
    { field: "phone_number", headerName: "Phone", flex: 1 },
    { field: "role", headerName: "Role", flex: 1 },
    { field: "is_verified", headerName: "Verified", flex: 1 },
    {
      field: "actions",
      headerName: "Actions",
      flex: 1,
      renderCell: (params) => (
        <Box>
          <IconButton onClick={(event) => handleMenuOpen(event, params.row.id)}>
            <MoreVertIcon />
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl) && selectedRowId === params.row.id}
            onClose={handleMenuClose}
          >
            <MenuItem onClick={handleEdit}>Edit</MenuItem>
            <MenuItem onClick={handleDelete}>Delete</MenuItem>
            <MenuItem onClick={handleDetails}>Details</MenuItem>
          </Menu>
        </Box>
      ),
    },
  ];

  return (
    <Box m="20px">
      <Header title="Users" subtitle="User List" />
      <Box
        m="40px 0 0 0"
        height="75vh"
        sx={{
          "& .MuiDataGrid-root": { border: "none" },
          "& .MuiDataGrid-cell": { borderBottom: "none" },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: colors.blueAccent[700],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": { backgroundColor: colors.primary[400] },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
            backgroundColor: colors.blueAccent[700],
          },
        }}
      >
        <DataGrid
          rows={users}
          columns={columns}
          components={{ Toolbar: GridToolbar }}
        />
      </Box>
      <UserDetails open={openDetailsDialog} handleClose={handleCloseDetailsDialog} user={selectedUser} colors={colors} />
      <ToastContainer />
    </Box>
  );
};

export default Users;
