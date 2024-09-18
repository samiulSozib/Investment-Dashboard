import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { Box, IconButton, Menu, MenuItem, Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import { useTheme } from "@mui/material";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from "react-toastify";
import {useDispatch,useSelector} from 'react-redux'
import {businessList,deleteBusiness,insertBusiness} from '../../redux/actions/businessAction'
import {categoryList} from '../../redux/actions/categoryActions'

import AddBusinessDialog from "./addBusinessDialog";
import BusinessDetailsDialog from "./businessDetails";

const Businesses = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedRowId, setSelectedRowId] = useState(null);

  const [selectedBusiness, setSelectedBusiness] = useState(null);
  const [openDetailsDialog, setOpenDetailsDialog] = useState(false); 


  
  const dispatch=useDispatch()
  const {loading,error,businesses} =useSelector((state)=>state.businesses)
  const {categories}=useSelector((state)=>state.category)

  useEffect(()=>{
    dispatch(businessList())
    dispatch(categoryList())
  },[dispatch])



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
    dispatch(deleteBusiness(selectedRowId))
    handleMenuClose();
  };

  const handleDetails = () => {
    const business = businesses.find((b) => b.id === selectedRowId);
    setSelectedBusiness(business);
    setOpenDetailsDialog(true); // Open dialog
    handleMenuClose();
  };

  const handleDetailsClose = () => {
    setOpenDetailsDialog(false);
    setSelectedBusiness(null);
  };

  const navigate = useNavigate();

  // State for managing the modal and form data
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    min_investment: '',
    max_investment: '',
    min_investment_period: '',
    max_investment_period: '',
    profit_share_ratio: '',
    loss_share_ratio: '',
    category_id: '',
  });

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFormSubmit = () => {
    console.log('Form Data:', formData);
    dispatch(insertBusiness(formData))
    handleClose();
  };


  const columns = [
    { field: "id", headerName: "ID", flex: 0.5 },
    {
      field: "name",
      headerName: "Name",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "min_investment",
      headerName: "Min Invest",
      type: "number",
      headerAlign: "left",
      align: "left",
    },
    {
      field: "min_investment_period",
      headerName: "Min Investment Period",
      flex: 1,
    },
    {
      field: "max_investment_period",
      headerName: "Max Investment Period",
      flex: 1,
    },
    {
      field: "profit_share_ratio",
      headerName: "Return",
      flex: 1,
    },
    {
      field: "category.name", 
      headerName: "Category", 
      flex: 1,
      renderCell:(params)=>{
        return params.row.category ? params.row.category.name : "N/A";
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
  
  


  return (
    <Box m="20px">
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="Businesses" subtitle="Business List" />

        <Box>
          <Button
            onClick={handleOpen}
            sx={{
              backgroundColor: colors.blueAccent[700],
              color: colors.grey[100],
              fontSize: "14px",
              fontWeight: "bold",
              padding: "10px 20px",
              "&:hover": {
                backgroundColor: colors.blueAccent[800],
              }
            }}
          >
            Add Business
          </Button>
        </Box>
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
          rows={businesses}
          columns={columns}
          components={{ Toolbar: GridToolbar }}
        />
      </Box>

      <AddBusinessDialog open={open} handleClose={handleClose} categories={categories} handleFormSubmit={handleFormSubmit} formData={formData} colors={colors} handleChange={handleChange}/>
      <BusinessDetailsDialog open={openDetailsDialog} handleClose={handleDetailsClose} business={selectedBusiness} colors={colors}/>
      <ToastContainer/>
    </Box>
  );
};

export default Businesses;
