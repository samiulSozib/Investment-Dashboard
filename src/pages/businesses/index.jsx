import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { Box, IconButton, Menu, MenuItem, Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { tokens } from "../../theme";
import { mockPackages } from "../../data/mockData";
import Header from "../../components/Header";
import { useTheme } from "@mui/material";
import {useDispatch,useSelector} from 'react-redux'
import {businessList} from '../../redux/actions/businessAction'

const Businesses = () => {
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

  // State for managing the modal and form data
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    duration: '',
    return: ''
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
    // Handle form submission here (e.g., API call to save the package)
    handleClose();
  };

  // const columns = [
  //   { field: "id", headerName: "ID", flex: 0.5 },
  //   {
  //     field: "name",
  //     headerName: "Package",
  //     flex: 1,
  //     cellClassName: "name-column--cell",
  //   },
  //   {
  //     field: "price",
  //     headerName: "Price",
  //     type: "number",
  //     headerAlign: "left",
  //     align: "left",
  //   },
  //   {
  //     field: "duration",
  //     headerName: "Duration",
  //     flex: 1,
  //   },
  //   {
  //     field: "return",
  //     headerName: "Return",
  //     flex: 1,
  //   },
  //   {
  //       field: "actions",
  //       headerName: "Actions",
  //       flex: 1,
  //       renderCell: (params) => (
  //         <Box>
  //           <IconButton
  //             onClick={(event) => handleMenuOpen(event, params.row.id)}
  //           >
  //             <MoreVertIcon />
  //           </IconButton>
  //           <Menu
  //             anchorEl={anchorEl}
  //             open={Boolean(anchorEl) && selectedRowId === params.row.id}
  //             onClose={handleMenuClose}
  //           >
  //             <MenuItem onClick={handleEdit}>Edit</MenuItem>
  //             <MenuItem onClick={handleDelete}>Delete</MenuItem>
  //             <MenuItem onClick={handleDetails}>Details</MenuItem>
  //           </Menu>
  //         </Box>
  //       ),
  //     },
  // ];


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
        return params.row.category.name
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
  const {loading,error,businesses} =useSelector((state)=>state.businesses)

  useEffect(()=>{
    dispatch(businessList())
  },[dispatch])

  useEffect(()=>{
    console.log(businesses)
  },[])

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
            Add Package
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

      <Dialog 
        open={open} 
        onClose={handleClose}
        sx={{
          "& .MuiPaper-root": {
            backgroundColor: colors.primary[400],
            color: colors.grey[100],
          }
        }}
      >
        <DialogTitle sx={{ backgroundColor: colors.blueAccent[700], color: colors.grey[100] }}>
          Create New Package
        </DialogTitle>
        <DialogContent sx={{ backgroundColor: colors.primary[400], color: colors.grey[100] }}>
          <TextField
            autoFocus
            margin="dense"
            name="name"
            label="Package Name"
            type="text"
            fullWidth
            variant="outlined"
            value={formData.name}
            onChange={handleChange}
            sx={{ 
              input: { color: colors.grey[100] },
              label: { color: colors.grey[100] },
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  borderColor: colors.grey[100],
                },
                '&:hover fieldset': {
                  borderColor: colors.blueAccent[700],
                },
              }
            }}
          />
          <TextField
            margin="dense"
            name="price"
            label="Price"
            type="number"
            fullWidth
            variant="outlined"
            value={formData.price}
            onChange={handleChange}
            sx={{ 
              input: { color: colors.grey[100] },
              label: { color: colors.grey[100] },
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  borderColor: colors.grey[100],
                },
                '&:hover fieldset': {
                  borderColor: colors.blueAccent[700],
                },
              }
            }}
          />
          <TextField
            margin="dense"
            name="duration"
            label="Duration"
            type="text"
            fullWidth
            variant="outlined"
            value={formData.duration}
            onChange={handleChange}
            sx={{ 
              input: { color: colors.grey[100] },
              label: { color: colors.grey[100] },
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  borderColor: colors.grey[100],
                },
                '&:hover fieldset': {
                  borderColor: colors.blueAccent[700],
                },
              }
            }}
          />
          <TextField
            margin="dense"
            name="return"
            label="Return"
            type="text"
            fullWidth
            variant="outlined"
            value={formData.return}
            onChange={handleChange}
            sx={{ 
              input: { color: colors.grey[100] },
              label: { color: colors.grey[100] },
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  borderColor: colors.grey[100],
                },
                '&:hover fieldset': {
                  borderColor: colors.blueAccent[700],
                },
              }
            }}
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
            Create
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Businesses;
