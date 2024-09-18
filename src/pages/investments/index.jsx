import React, { useEffect, useState } from "react";
import { Box, IconButton, Menu, MenuItem } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { tokens } from "../../theme";
import { mockDataInvestors } from "../../data/mockData";
import Header from "../../components/Header";
import { useTheme } from "@mui/material";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from "react-toastify";
import {useDispatch,useSelector} from 'react-redux'
import {investmentList,deleteInvestment} from '../../redux/actions/investmentAction'
import InvestmentDetails from "./investmentDetails";

const InvestmentRequests = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedRowId, setSelectedRowId] = useState(null);

  const [openDetailsDialog, setOpenDetailsDialog] = useState(false);
  const [selectedInvestment, setSelectedInvestment] = useState(null);

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
    dispatch(deleteInvestment(selectedRowId))
    handleMenuClose();
  };

  const handleDetails = () => {
    const investment = investments.find((inv) => inv.id === selectedRowId);
    setSelectedInvestment(investment);
    setOpenDetailsDialog(true);
    handleMenuClose();
  };

  const handleCloseDetailsDialog = () => {
    setOpenDetailsDialog(false);
    setSelectedInvestment(null);
  };

  


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
      field:'user.name',
      headerName:"Investor",
      flex:1,
      renderCell:(params)=>{
        return params.row.user.name
      }
    },
    {
      field:'business.name',
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
      <Header title="Investmetns" subtitle="List of Investments" />
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

        <InvestmentDetails open={openDetailsDialog} handleClose={handleCloseDetailsDialog} investment={selectedInvestment} colors={colors} />
        <ToastContainer/>
    </Box>
  );
};

export default InvestmentRequests;
