import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { Box, IconButton, Menu, MenuItem, Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField, Typography } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import { useTheme } from "@mui/material";
import {useDispatch,useSelector} from 'react-redux'
import {userList,deleteUser} from '../../redux/actions/userActions'
import { ToastContainer } from "react-toastify";
import UserDetails from "./detailsUsre";

const Users = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedRowId, setSelectedRowId] = useState(null);

  const [openDetailsDialog, setOpenDetailsDialog] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

 

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
    dispatch(deleteUser(selectedRowId))
    handleMenuClose();
  };

  const handleDetails = () => {
    const user = users.find((user) => user.id === selectedRowId);
    setSelectedUser(user);
    setOpenDetailsDialog(true);
    handleMenuClose();
  };
  
  // Close dialog
  const handleCloseDetailsDialog = () => {
    setOpenDetailsDialog(false);
    setSelectedUser(null);
  };

  const navigate = useNavigate();

  

  const columns = [
    { field: "id", headerName: "ID", flex: 0.5 },
    {
      field: "name",
      headerName: "Name",
      flex: 1,
    
    },
    {
      field: "email",
      headerName: "Email",
      flex: 1,
    },
    {
        field: "phone_number",
        headerName: "Phone",
        flex: 1,
      },
      {
        field: "role",
        headerName: "Role",
        flex: 1,
      },
      {
        field: "is_varified",
        headerName: "Verified",
        flex: 1,
      },
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
  
  

  const dispatch=useDispatch()
  const {loading,error,users} =useSelector((state)=>state.user)

  useEffect(()=>{
    dispatch(userList())
  },[dispatch])

 

  return (
    <Box m="20px">
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="Users" subtitle="User List" />

      </Box>

      <Box
        m="40px 0 0 0"
        height="75vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .name-column--cell": {
            color: colors.greenAccent[300],
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: colors.blueAccent[700],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: colors.primary[400],
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
            backgroundColor: colors.blueAccent[700],
          },
          "& .MuiCheckbox-root": {
            color: `${colors.greenAccent[200]} !important`,
          },
          "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
            color: `${colors.grey[100]} !important`,
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
        <ToastContainer/>

    </Box>
  );
};

export default Users;
