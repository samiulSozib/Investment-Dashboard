import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { Box, IconButton, Menu, MenuItem, Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField, Select, InputLabel, FormControl } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import { useTheme } from "@mui/material";
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch, useSelector } from 'react-redux';
import { businessPerformanceList, deleteBusinessPerformance, insertBusinessPerformance } from '../../redux/actions/businessPerformanceActions';
import { businessList } from '../../redux/actions/businessAction';
import { toast, ToastContainer } from "react-toastify";

const BusinessPerformce = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedRowId, setSelectedRowId] = useState(null);
  const [open, setOpen] = useState(false);  // State for Dialog open/close
  const [formData, setFormData] = useState({
    businessId: '',
    profit: '',
    loss: '',
    date: ''  // Add date field to formData
  });  // State for form data

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
    dispatch(deleteBusinessPerformance(selectedRowId))
    handleMenuClose();
  };

  const handleDetails = () => {
    console.log(`Details clicked for row with id: ${selectedRowId}`);
    handleMenuClose();
  };

  const navigate = useNavigate();
  
  const dispatch = useDispatch();
  const { loading, error, businessPerformances } = useSelector((state) => state.businessPerformance);
  const { businesses } = useSelector((state) => state.businesses);  // Get business list

  useEffect(() => {
    dispatch(businessList()); 
    dispatch(businessPerformanceList());
   
  }, [dispatch]);

  useEffect(()=>{
    console.log(businessPerformances)
  },[])

  const columns = [
    { field: "id", headerName: "ID", flex: 0.5 },
    {
      field: "business.name",
      headerName: "Business Name",
      flex: 1,
      renderCell: (params) => {
        return params.row.business?.name||"N/A";
      }
    },
    {
      field: "profit",
      headerName: "Profit",
      flex: 1,
    },
    {
      field: "loss",
      headerName: "Loss",
      flex: 1,
    },
    {
      field: "date",  // Corrected field name
      headerName: "Date",
      flex: 1,
      renderCell: (params) => {
        const date = new Date(params.value);
        return date.toLocaleDateString();  // Formats the date
      },
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
          </Menu>
        </Box>
      ),
    },
  ];

  // Dialog and Form handling
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setFormData({
      businessId: '',
      profit: '',
      loss: '',
      date: ''  // Reset the date field
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({ ...prevState, [name]: value }));
  };

  const handleFormSubmit = () => {
    if (!formData.businessId || !formData.profit || !formData.loss || !formData.date) {
      toast.error("Please fill in all fields");
      return;
    }

    const newPerformance = {
      business_id: formData.businessId,
      profit: formData.profit,
      loss: formData.loss,
      date: formData.date  // Include the date in the submission
    };

    dispatch(insertBusinessPerformance(newPerformance));
    handleClose(); // Close dialog after submitting
  };

  return (
    <Box m="20px">
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="Business Performance" subtitle="Business Performance List" />
        <Box>
          <Button
            onClick={handleOpen}  // Open the dialog for inserting new performance
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
            Add Performance
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
          rows={businessPerformances}
          columns={columns}
          components={{ Toolbar: GridToolbar }}
          
        />
      </Box>

      {/* Insert Business Performance Dialog */}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle sx={{ backgroundColor: colors.blueAccent[700] }}>Add New Business Performance</DialogTitle>
        <DialogContent sx={{ backgroundColor: colors.primary[400] }}>
          <FormControl fullWidth margin="dense">
            <InputLabel id="business-select-label" sx={{ color: colors.grey[100] }}>Business</InputLabel>
            <Select
              labelId="business-select-label"
              id="business-select"
              name="businessId"
              value={formData.businessId}
              onChange={handleChange}
              sx={{
                color: colors.grey[100],
                '.MuiOutlinedInput-notchedOutline': {
                  borderColor: colors.grey[100],
                },
                '&:hover .MuiOutlinedInput-notchedOutline': {
                  borderColor: colors.grey[100],
                },
                '.MuiSvgIcon-root ': {
                  fill: colors.grey[100],
                },
              }}
            >
              {businesses && businesses.map((business) => (
                <MenuItem key={business.id} value={business.id}>
                  {business.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <TextField
            margin="dense"
            name="profit"
            label="Profit"
            type="number"
            fullWidth
            required
            value={formData.profit}
            onChange={handleChange}
            sx={{ input: { color: colors.grey[100] }, label: { color: colors.grey[100] } }}
          />
          <TextField
            margin="dense"
            name="loss"
            label="Loss"
            type="number"
            fullWidth
            required
            value={formData.loss}
            onChange={handleChange}
            sx={{ input: { color: colors.grey[100] }, label: { color: colors.grey[100] } }}
          />
          {/* Date Field for Date Input */}
          <TextField
            margin="dense"
            name="date"
            label="Date"
            type="date"
            fullWidth
            required
            value={formData.date}
            onChange={handleChange}
            InputLabelProps={{ shrink: true }}  // Ensure the label doesn't overlap with the input
            sx={{ input: { color: colors.grey[100] }, label: { color: colors.grey[100] } }}
          />
        </DialogContent>
        <DialogActions sx={{ backgroundColor: colors.primary[400] }}>
          <Button
            onClick={handleClose}
            sx={{
              backgroundColor: colors.redAccent[700],
              color: colors.grey[100],
              fontSize: "14px",
              fontWeight: "bold",
              padding: "10px 20px",
              "&:hover": {
                backgroundColor: colors.blueAccent[800],
              }
            }}
          >
            Cancel
          </Button>
          <Button
            onClick={handleFormSubmit}
            sx={{
              backgroundColor: colors.greenAccent[700],
              color: colors.grey[100],
              fontSize: "14px",
              fontWeight: "bold",
              padding: "10px 20px",
              "&:hover": {
                backgroundColor: colors.greenAccent[800],
              }
            }}
          >
            Submit
          </Button>
        </DialogActions>
      </Dialog>
      <ToastContainer/>
    </Box>
  );
};

export default BusinessPerformce;
