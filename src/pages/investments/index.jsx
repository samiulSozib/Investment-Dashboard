import React, { useEffect, useState } from "react";
import { Box, IconButton, Menu, MenuItem } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { tokens } from "../../theme";
import { mockDataInvestors } from "../../data/mockData";
import Header from "../../components/Header";
import { useTheme } from "@mui/material";
import {useDispatch,useSelector} from 'react-redux'
import {investmentList} from '../../redux/actions/investmentAction'

const InvestmentRequests = () => {
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

  

  // const columns = [
  //   { field: "id", headerName: "ID", flex: 0.5 },
  //   { field: "registrarId", headerName: "Registrar ID" },
  //   {
  //     field: "name",
  //     headerName: "Name",
  //     flex: 1,
  //     cellClassName: "name-column--cell",
  //   },
  //   {
  //     field: "age",
  //     headerName: "Age",
  //     type: "number",
  //     headerAlign: "left",
  //     align: "left",
  //   },
  //   {
  //     field: "phone",
  //     headerName: "Phone Number",
  //     flex: 1,
  //   },
  //   {
  //     field: "email",
  //     headerName: "Email",
  //     flex: 1,
  //   },
  //   {
  //     field: "address",
  //     headerName: "Address",
  //     flex: 1,
  //   },
  //   {
  //     field: "city",
  //     headerName: "City",
  //     flex: 1,
  //   },
  //   {
  //     field: "zipCode",
  //     headerName: "Zip Code",
  //     flex: 1,
  //   },
  //   {
  //     field: "actions",
  //     headerName: "Actions",
  //     flex: 1,
  //     renderCell: (params) => (
  //       <Box>
  //         <IconButton
  //           onClick={(event) => handleMenuOpen(event, params.row.id)}
  //         >
  //           <MoreVertIcon />
  //         </IconButton>
  //         <Menu
  //           anchorEl={anchorEl}
  //           open={Boolean(anchorEl) && selectedRowId === params.row.id}
  //           onClose={handleMenuClose}
  //         >
  //           <MenuItem onClick={handleEdit}>Edit</MenuItem>
  //           <MenuItem onClick={handleDelete}>Delete</MenuItem>
  //           <MenuItem onClick={handleDetails}>Details</MenuItem>
  //         </Menu>
  //       </Box>
  //     ),
  //   },
  // ];

  const columns = [
    { field: "id", headerName: "ID", flex: 0.5 },
    {
      field: "amount",
      headerName: "Amount",
      flex: 1,
      type: "number",
    },
    {
      field: "investment_period",
      headerName: "Investment Period",
      flex: 1,
      type: "number",
    },
    {
      field: "expected_return",
      headerName: "Expected Return",
      flex: 1,
      type: "number",
    },
    {
      field: "status",
      headerName: "Status",
      flex: 1,
    },
    {
      fild:'user.name',
      headerName:"Investor",
      flex:1,
      renderCell:(params)=>{
        return params.row.user.name
      }
    },
    {
      fild:'business.name',
      headerName:"Business",
      flex:1,
      renderCell:(params)=>{
        return params.row.business.name
      }
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
  const {investments,loading,error}=useSelector((state)=>state.investments)

  useEffect(()=>{
    dispatch(investmentList())
  },[dispatch])

  

  return (
    <Box m="20px">
      <Header title="Investors" subtitle="List of Investors" />
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
          rows={investments}
          columns={columns}
          components={{ Toolbar: GridToolbar }}
        />
      </Box>
    </Box>
  );
};

export default InvestmentRequests;
