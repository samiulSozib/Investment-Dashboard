// NewsBlogs.js
import React, { useEffect, useState } from "react";
import { Box, IconButton, Menu, MenuItem, Button, Typography } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import { useTheme } from "@mui/material";
import { useDispatch, useSelector } from 'react-redux';
import { newsBlogsList, deleteNewsBlog, addNewsBlog, editNewsBlog } from '../../redux/actions/newsBlogsActions';
import NewsBlogDetails from "./newsBlogsDetails";
import { ToastContainer } from "react-toastify";
import AddNewsDialog from "./addNewsDialog";

const NewsBlogs = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  // State management
  const [openAddDialog, setOpenAddDialog] = useState(false);
  const [formData, setFormData] = useState({ title: "", content: "", author_id: null, images: [] });
  const [isEditing, setIsEditing] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedRowId, setSelectedRowId] = useState(null);
  const [openDetailsDialog, setOpenDetailsDialog] = useState(false);
  const [selectedNewsBlog, setSelectedNewsBlog] = useState(null);
  const [editNewsId, setEditNewsId] = useState(null);
  const [existingImages, setExistingImages] = useState([]); // New state for existing images

  const dispatch = useDispatch();
  const { newsBlogs } = useSelector((state) => state.newsBlogs);

  useEffect(() => {
    dispatch(newsBlogsList());
  }, [dispatch]);

  // Menu actions
  const handleMenuOpen = (event, id) => {
    setAnchorEl(event.currentTarget);
    setSelectedRowId(id);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedRowId(null);
  };

  const handleDelete = () => {
    dispatch(deleteNewsBlog(selectedRowId));
    handleMenuClose();
  };

  const handleDetails = () => {
    const newsBlog = newsBlogs.find((blog) => blog.id === selectedRowId);
    setSelectedNewsBlog(newsBlog);
    setOpenDetailsDialog(true);
    handleMenuClose();
  };

  const handleEdit = () => {
    const newsBlog = newsBlogs.find((blog) => blog.id === selectedRowId);
    if (newsBlog) {
      setIsEditing(true);
      setEditNewsId(selectedRowId);
      setFormData({ 
        title: newsBlog.title, 
        content: newsBlog.content, 
        author_id: newsBlog.author_id,
        images: [] // New images will be added here
      });
      setExistingImages(newsBlog.images || []); // Assuming newsBlog.images is an array of image URLs
      setOpenAddDialog(true);
    }
    handleMenuClose();
  };

  // Add/Edit News dialog
  const handleAddNewsClick = () => {
    setIsEditing(false);
    setFormData({ title: "", content: "", images: [] });
    setExistingImages([]); // Reset existing images
    setOpenAddDialog(true);
  };

  const handleCloseAddDialog = () => {
    setOpenAddDialog(false);
    setFormData({ title: "", content: "", images: [] });
    setExistingImages([]); // Reset existing images
  };

  const handleAddNewsSubmit = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    const updatedFormData = { 
      ...formData, 
      author_id: user?.id || null,
      existingImages, // Include existing images
    };
  
    // Create FormData
    const data = new FormData();
    data.append('title', updatedFormData.title);
    data.append('content', updatedFormData.content);
    data.append('author_id', updatedFormData.author_id);
  
    // Append existing images as URLs or identifiers
    updatedFormData.existingImages.forEach((imageUrl) => {
      data.append('existingImages', imageUrl); // Adjust based on backend requirements
    });
  
    // Append new images
    if (updatedFormData.images && updatedFormData.images.length > 0) {
      Array.from(updatedFormData.images).forEach((image) => {
        data.append('news_blogs_images', image);
      });
    }
  
    // Log the FormData content
    for (let pair of data.entries()) {
      console.log(`${pair[0]}: ${pair[1]}`);
    }
  
    if (isEditing) {
      dispatch(editNewsBlog(editNewsId, data));
    } else {
      console.log(data);
      dispatch(addNewsBlog(data));
    }
  
    setIsEditing(false);
    setEditNewsId(null);
    setExistingImages([]);
    handleCloseAddDialog();
  };
  
  // Handle image selection
  const handleImageChange = (e) => {
    const newImages = Array.from(e.target.files);
    // Combine new images with existing ones
    setFormData((prevData) => ({
      ...prevData,
      images: [...prevData.images, ...newImages],
    }));
  };

  // Handle image removal (newly selected images)
  const handleRemoveImage = (index) => {
    const newImages = Array.from(formData.images);
    newImages.splice(index, 1);
    setFormData({ ...formData, images: newImages });
  };

  // Handle removal of existing images
  const handleRemoveExistingImage = (index) => {
    const newExistingImages = [...existingImages];
    newExistingImages.splice(index, 1);
    setExistingImages(newExistingImages);
  };

  // Table columns
  const columns = [
    { field: "id", headerName: "ID", flex: 0.5 },
    { field: "title", headerName: "Title", flex: 1 },
    { field: "content", headerName: "Content", flex: 1 },
    {
      field: "author.name", 
      headerName: "Author", 
      flex: 1, 
      renderCell: (params) => params.row.author?.name || "N/A"
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
        <Header title="News Blog" subtitle="News Blogs List" />
        <Button
          onClick={handleAddNewsClick}
          sx={{
            backgroundColor: colors.blueAccent[700],
            color: colors.grey[100],
            fontSize: "14px",
            fontWeight: "bold",
            padding: "10px 20px",
            "&:hover": { backgroundColor: colors.blueAccent[800] },
          }}
        >
          Add News
        </Button>
      </Box>

      <Box
        m="40px 0"
        height="75vh"
        sx={{
          "& .MuiDataGrid-root": { border: "none" },
          "& .MuiDataGrid-cell": { borderBottom: "none" },
          "& .MuiDataGrid-columnHeaders": { backgroundColor: colors.blueAccent[700], borderBottom: "none" },
          "& .MuiDataGrid-virtualScroller": { backgroundColor: colors.primary[400] },
          "& .MuiDataGrid-footerContainer": { borderTop: "none", backgroundColor: colors.blueAccent[700] },
          "& .MuiCheckbox-root": { color: `${colors.greenAccent[200]} !important` },
          "& .MuiDataGrid-toolbarContainer .MuiButton-text": { color: `${colors.grey[100]} !important` },
        }}
      >
        <DataGrid rows={newsBlogs} columns={columns} components={{ Toolbar: GridToolbar }} />
      </Box>

      {/* Add/Edit News Dialog */}
      <AddNewsDialog
        open={openAddDialog}
        handleClose={handleCloseAddDialog}
        handleFormSubmit={handleAddNewsSubmit}
        formData={formData}
        colors={colors}
        handleChange={(e) => setFormData({ ...formData, [e.target.name]: e.target.value })}
        handleImageChange={handleImageChange}
        handleRemoveImage={handleRemoveImage}
        isEditing={isEditing}
        existingImages={existingImages}
        handleRemoveExistingImage={handleRemoveExistingImage}
      />

      <NewsBlogDetails
        open={openDetailsDialog}
        handleClose={() => setOpenDetailsDialog(false)}
        newsBlog={selectedNewsBlog}
        colors={colors}
      />
      <ToastContainer />
    </Box>
  );
};

export default NewsBlogs;
