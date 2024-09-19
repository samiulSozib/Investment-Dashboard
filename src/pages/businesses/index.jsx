import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { Box, IconButton, Menu, MenuItem, Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import { useTheme } from "@mui/material";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from "react-toastify";
import {useDispatch,useSelector} from 'react-redux'
import {businessList,deleteBusiness,insertBusiness,editBusiness} from '../../redux/actions/businessAction'
import {categoryList} from '../../redux/actions/categoryActions'

import AddBusinessDialog from "./addBusinessDialog";
import BusinessDetailsDialog from "./businessDetails";

const Businesses = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const extractId = (rowId) => {
    const parts = rowId.split("-");
    return parts.length > 1 ? parseInt(parts[1], 10) : null;
  };

  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedRowId, setSelectedRowId] = useState(null);

  const [selectedBusiness, setSelectedBusiness] = useState(null);
  const [openDetailsDialog, setOpenDetailsDialog] = useState(false); 

  const [isEditing, setIsEditing] = useState(false);
  const [editBusinessId, setEditBusinessId] = useState(null);


  const [expandedRowId, setExpandedRowId] = useState(null);
  const [firstParentId, setFirstParentId] = useState(null);


  
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
    const id=extractId(selectedRowId)
    const business = businesses.find((b) => b.id === id);
    setFormData({
      name: business.name,
      min_investment: business.min_investment,
      max_investment: business.max_investment,
      min_investment_period: business.min_investment_period,
      max_investment_period: business.max_investment_period,
      profit_share_ratio: business.profit_share_ratio,
      loss_share_ratio: business.loss_share_ratio,
      category_id: business.category ? business.category.id : '',
    });
    setIsEditing(true); 
    setEditBusinessId(id)
    handleOpen();
    handleMenuClose();
  };

  const handleDelete = () => {
    const id=extractId(selectedRowId)
    dispatch(deleteBusiness(id))
    handleMenuClose();
  };

  const handleDetails = () => {
    const id=extractId(selectedRowId)
    const business = businesses.find((b) => b.id === id);
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
    if (isEditing) {
      dispatch(editBusiness(editBusinessId, formData)); 
    } else {
      dispatch(insertBusiness(formData));
    }
    setFormData({
      name: '',
      min_investment: '',
      max_investment: '',
      min_investment_period: '',
      max_investment_period: '',
      profit_share_ratio: '',
      loss_share_ratio: '',
      category_id: '',
    });
    setIsEditing(false);
    setEditBusinessId(null); 
    handleClose();
  };


  const toggleExpand = (id) => {
    setExpandedRowId((prevExpandedRowId) =>
      prevExpandedRowId === id ? null : id
    );
  };

  
  const transformData = (businesses) => {
    let rows = [];
  
    businesses.forEach((business) => {
      const parentRow = {
        id: `business-${business.id}`,
        business_name: business.name,
        min_investment: business.min_investment,
        max_investment: business.max_investment,
        min_investment_period: business.min_investment_period,
        profit_share_ratio: business.profit_share_ratio,
        loss_share_ratio: business.loss_share_ratio,
        status: business.status,
        isParent: true,
      };
      rows.push(parentRow);
  
      if (expandedRowId === `business-${business.id}`) {
        business.investments.forEach((investment) => {
          rows.push({
            id: `investment-${investment.id}`,
            investment_id: investment.id,
            amount: investment.amount,
            investment_date: investment.investment_date,
            investment_period: investment.investment_period,
            expected_return: investment.expected_return,
            termination_date: investment.termination_date,
            status: investment.status,
            parentId: `business-${business.id}`,
            isChild: true,
          });
        });
      }
    });
  
    return rows;
  };
  


  const parentColumns = [
    {
      field: "expand",
      headerName: "",
      flex: 0.2,
      renderCell: (params) => {
        if (params.row.isParent) {
          return (
            <IconButton onClick={() => toggleExpand(params.row.id)}>
              {expandedRowId === params.row.id ? <ExpandLessIcon /> : <ExpandMoreIcon />}
            </IconButton>
          );
        }
        return null;
      },
    },
    { field: "business_name", headerName: "Business Name", flex: 1 },
    { field: "min_investment", headerName: "Min Investment", flex: 1, type: "number" },
    { field: "max_investment", headerName: "Max Investment", flex: 1, type: "number" },
    { field: "min_investment_period", headerName: "Min Investment Period", flex: 1 },
    { field: "profit_share_ratio", headerName: "Profit Share (%)", flex: 1, type: "number" },
    { field: "loss_share_ratio", headerName: "Loss Share (%)", flex: 1, type: "number" },
    { field: "status", headerName: "Status", flex: 1 },
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

  const childColumns = [
    { field: "investment_id", headerName: "Investment ID", flex: 0.5 },
    { field: "amount", headerName: "Amount", flex: 1, type: "number" },
    { field: "investment_date", headerName: "Investment Date", flex: 1, type: "date" },
    { field: "investment_period", headerName: "Investment Period", flex: 1 },
    { field: "expected_return", headerName: "Expected Return", flex: 1 },
    { field: "termination_date", headerName: "Termination Date", flex: 1, type: "date" },
    { field: "status", headerName: "Status", flex: 1 },
  ];
  
  const rows = transformData(businesses);

  useEffect(() => {
    if (rows.length > 0) {
      const firstParent = rows.find(row => row.isParent);
      if (firstParent) {
        setFirstParentId(firstParent.id);
      }
    }
  }, [rows]);


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
          "& .MuiDataGrid-columnHeaders": {
            display: "none", // Hide column headers by default for parent rows
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
        {rows.map((row, index) => {
          if (row.isParent) {
            return (
              <div key={row.id}>
                <DataGrid
                  rows={[row]}
                  columns={parentColumns}
                  pageSize={5}
                  autoHeight
                  hideFooter
                 
                  sx={{
                    "& .MuiDataGrid-columnHeaders": {
                      display: row.id === firstParentId ? "flex" : "none", // Show headers only for the first parent row
                    },
                    "& .MuiDataGrid-cell": {
                      borderBottom: "0.5px solid", // Add border bottom for each cell
                      borderColor: colors.grey[700],
                    },
                    "& .MuiDataGrid-root": {
                      borderBottom: "0.5px solid", // Border bottom for the entire parent grid
                      borderColor: colors.grey[700],
                    },
                  }}
                />
                {expandedRowId === row.id && (
                  <DataGrid
                    rows={rows.filter(childRow => childRow.parentId === row.id)}
                    columns={childColumns}
                    pageSize={5}
                    autoHeight
                    sx={{
                      "& .MuiDataGrid-columnHeaders": {
                        display: "flex", // Ensure headers are displayed for child grid
                      },
                    }}
                  />
                )}
              </div>
            );
          }
          return null;
        })}
      </Box>

      <AddBusinessDialog open={open} handleClose={handleClose} categories={categories} handleFormSubmit={handleFormSubmit} formData={formData} colors={colors} handleChange={handleChange} isEditing={isEditing}/>
      <BusinessDetailsDialog open={openDetailsDialog} handleClose={handleDetailsClose} business={selectedBusiness} colors={colors}/>
      <ToastContainer/>
    </Box>
  );
};

export default Businesses;
