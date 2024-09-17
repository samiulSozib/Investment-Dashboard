import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { Box, IconButton, Menu, MenuItem, Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField, Typography } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { tokens } from "../../theme";
import { mockPackages } from "../../data/mockData";
import Header from "../../components/Header";
import { useTheme } from "@mui/material";
import {useDispatch,useSelector} from 'react-redux'
import {contractList} from '../../redux/actions/contractActions'

const Contracts = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedRowId, setSelectedRowId] = useState(null);

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
    console.log(`Delete clicked for row with id: ${selectedRowId}`);
    handleMenuClose();
  };

  const handleDetails = () => {
    console.log(`Details clicked for row with id: ${selectedRowId}`);
    handleMenuClose();
  };

  const navigate = useNavigate();

  

  const columns = [
    { field: "id", headerName: "ID", flex: 0.5 },
    {
      field: "investment.amount",
      headerName: "Amount",
      flex: 1,
      renderCell: (params) => `$${params.row.investment.amount}`, // Display investment amount
    },
    {
      field: "investment.investment_period",
      headerName: "Investment Period (Months)",
      type: "number",
      headerAlign: "left",
      align: "left",
      renderCell: (params) => `${params.row.investment.investment_period} months`, // Display period
    },
    {
      field: "investment.expected_return",
      headerName: "Expected Return",
      flex: 1,
      renderCell: (params) => `$${params.row.investment.expected_return}`, // Display expected return
    },
    {
      field: "status",
      headerName: "Status",
      flex: 1,
      renderCell: (params) => (
        <Typography color={params.row.status === 'active' ? 'green' : 'red'}>
          {params.row.status.charAt(0).toUpperCase() + params.row.status.slice(1)}
        </Typography>
      ),
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
  const {loading,error,contracts} =useSelector((state)=>state.contracts)

  useEffect(()=>{
    dispatch(contractList())
  },[dispatch])

 

  return (
    <Box m="20px">
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="Contracts" subtitle="Contracts List" />

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
          rows={contracts}
          columns={columns}
          components={{ Toolbar: GridToolbar }}
        />
      </Box>


    </Box>
  );
};

export default Contracts;
