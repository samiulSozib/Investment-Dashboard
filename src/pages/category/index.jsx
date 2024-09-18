import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { Box, IconButton, Menu, MenuItem, Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { tokens } from "../../theme";
import { mockPackages } from "../../data/mockData";
import Header from "../../components/Header";
import { useTheme } from "@mui/material";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {useDispatch,useSelector} from 'react-redux'
import {categoryList,insertCategory,deleteCategory} from '../../redux/actions/categoryActions'

const Category = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedRowId, setSelectedRowId] = useState(null);



  const dispatch=useDispatch()
  const {loading,error,categories} =useSelector((state)=>state.category)

  useEffect(()=>{
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
    dispatch(deleteCategory(selectedRowId))
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
      description: '',
    });
  
    const handleOpen = () => setOpen(true);
    const handleClose = () => {setOpen(false);setFormData({ name: '', description: '' });};
  
    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData({
        ...formData,
        [name]: value,
      });
    };
  


    const handleFormSubmit =  () => {
      if (!formData.name || !formData.description) {
        toast.error("Please fill in all fields");  // Show error toast if form is invalid
        return;
      }
        dispatch(insertCategory(formData));
        setFormData({ name: '', description: '' });
        handleClose();
    };


    

  

  const columns = [
    { field: "id", headerName: "ID", flex: 0.5 },
    {
      field: "name",
      headerName: "Name",
      flex: 1,
    
    },
    {
      field: "description",
      headerName: "Description",
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
  
  



 

  return (
    <Box m="20px">
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="Category" subtitle="Category List" />
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
            Add Category
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
          rows={categories}
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
          Create New Category
        </DialogTitle>
        <DialogContent sx={{ backgroundColor: colors.primary[400], color: colors.grey[100] }}>
          <TextField
            autoFocus
            margin="dense"
            name="name"
            label="Category Name"
            type="text"
            fullWidth
            required
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
            name="description"
            label="Description"
            type="text"
            fullWidth
            required
            variant="outlined"
            value={formData.description}
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

    <ToastContainer/>
    </Box>
  );
};

export default Category;
