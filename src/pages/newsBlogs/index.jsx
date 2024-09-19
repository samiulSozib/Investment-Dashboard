import React, { useEffect, useState } from "react";
import { Box, IconButton, Menu, MenuItem, Button } from "@mui/material";
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
  const [formData, setFormData] = useState({ title: "", content: "", author_id: null });
  const [isEditing, setIsEditing] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedRowId, setSelectedRowId] = useState(null);
  const [openDetailsDialog, setOpenDetailsDialog] = useState(false);
  const [selectedNewsBlog, setSelectedNewsBlog] = useState(null);
  const [editNewsId, setEditNewsId] = useState(null);

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
      setFormData({ title: newsBlog.title, content: newsBlog.content, author_id: newsBlog.author_id });
      setOpenAddDialog(true);
    }
    handleMenuClose();
  };

  // Add/Edit News dialog
  const handleAddNewsClick = () => {
    setIsEditing(false);
    setFormData({ title: "", content: "" });
    setOpenAddDialog(true);
  };

  const handleCloseAddDialog = () => {
    setOpenAddDialog(false);
    setFormData({ title: "", content: "" });
  };

  const handleAddNewsSubmit = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    const updatedFormData = { ...formData, author_id: user?.id || null };

    if (isEditing) {
      dispatch(editNewsBlog(editNewsId, updatedFormData));
    } else {
      dispatch(addNewsBlog(updatedFormData));
    }

    setIsEditing(false);
    setEditNewsId(null);
    handleCloseAddDialog();
  };

  // Table columns
  const columns = [
    { field: "id", headerName: "ID", flex: 0.5 },
    { field: "title", headerName: "Title", flex: 1 },
    { field: "content", headerName: "Content", flex: 1 },
    {
      field: "author.name", headerName: "Author", flex: 1, renderCell: (params) => {
        return params.row.author?.name || "N/A";
      }
    },
    {
      field: "actions", headerName: "Actions", flex: 1, renderCell: (params) => (
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
        isEditing={isEditing}
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
