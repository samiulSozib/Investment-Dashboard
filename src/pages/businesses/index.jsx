import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { Box, IconButton, Menu, MenuItem, Button, Popover, Typography } from "@mui/material";
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
import {businessList,deleteBusiness,insertBusiness,editBusiness,updateBusinessStatus} from '../../redux/actions/businessAction'
import {updateInvestmentStatus} from '../../redux/actions/investmentAction'
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



  // Status Popover state
  const [statusAnchorEl, setStatusAnchorEl] = useState(null);
  const [hoveredRowId, setHoveredRowId] = useState(null);

  const [investmentStatusAnchorEl, setInvestmentStatusAnchorEl] = useState(null);
  const [hoveredInvestmentId, setHoveredInvestmentId] = useState(null);

  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedRowId, setSelectedRowId] = useState(null);

  const [selectedBusiness, setSelectedBusiness] = useState(null);
  const [openDetailsDialog, setOpenDetailsDialog] = useState(false); 

  const [isEditing, setIsEditing] = useState(false);
  const [editBusinessId, setEditBusinessId] = useState(null);


  const [expandedRowId, setExpandedRowId] = useState(null);
  const [firstParentId, setFirstParentId] = useState(null);

  const [page, setPage] = useState(0); 
  const [pageSize, setPageSize] = useState(10);


  
  const dispatch=useDispatch()
  const {loading,error,businesses,totalItems} =useSelector((state)=>state.businesses)
  const {categories}=useSelector((state)=>state.category)

  useEffect(()=>{
    dispatch(businessList(page+1,pageSize))
    dispatch(categoryList())
  },[dispatch,page,pageSize])


    // Status Popover open/close handlers
    const handleBusinessStatusMenuOpen = (event, id) => {
      setHoveredRowId(id);
      setStatusAnchorEl(event.currentTarget);
    };

    const handleBusinessStatusMenuClose = () => {
      setStatusAnchorEl(null);
      setHoveredRowId(null);
    };
  
    const handleBusinessStatusChange = (id, status) => {
      const business_id=extractId(id)
      dispatch(updateBusinessStatus(business_id, status));
      handleBusinessStatusMenuClose();
    };

    // Open/close handlers for investment status popover
    const handleInvestmentStatusMenuOpen = (event, id) => {
      setHoveredInvestmentId(id);
      setInvestmentStatusAnchorEl(event.currentTarget);
    };

    const handleInvestmentStatusMenuClose = () => {
      setInvestmentStatusAnchorEl(null);
      setHoveredInvestmentId(null);
    };

    // Handle investment status change
    const handleInvestmentStatusChange = (id, status) => {
      const investment_id = extractId(id); // Extract ID in a similar way as for business
      dispatch(updateInvestmentStatus(investment_id, status));
      handleInvestmentStatusMenuClose();
    };

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
    if(business){
      setFormData({
        name: business.name,
        min_investment: business.min_investment,
        max_investment: business.max_investment,
        min_investment_period: business.min_investment_period,
        max_investment_period: business.max_investment_period,
        profit_share_ratio: business.profit_share_ratio,
        loss_share_ratio: business.loss_share_ratio,
        category_id: business.category ? business.category.id : '',
        images:[]
      });
      setbusiness_images(business.business_images)
      setIsEditing(true); 
      setEditBusinessId(id)
      handleOpen();
    }
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
    images:[]
  });
  const [business_images, setbusiness_images] = useState([]);

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
    const updatedFormData = {
      ...formData,
    };
  
    // Create a FormData object
    const data = new FormData();
  
    // Append regular fields
    data.append('name', updatedFormData.name);
    data.append('min_investment', updatedFormData.min_investment);
    data.append('max_investment', updatedFormData.max_investment);
    data.append('min_investment_period', updatedFormData.min_investment_period);
    data.append('max_investment_period', updatedFormData.max_investment_period);
    data.append('profit_share_ratio', updatedFormData.profit_share_ratio);
    data.append('loss_share_ratio', updatedFormData.loss_share_ratio);
    data.append('category_id', updatedFormData.category_id);
  
    // Append existing images if editing
    if (isEditing) {
      data.append('existing_images', JSON.stringify(business_images.map(img => img.image_url)));
    }
  
    // Append new images as files
    if (updatedFormData.images && updatedFormData.images.length > 0) {
      Array.from(updatedFormData.images).forEach((image) => {
        data.append('business_images', image);
      });
    }
  
    // Debugging FormData contents
    for (let pair of data.entries()) {
      console.log(`${pair[0]}:`, pair[1]);
    }
  
    // Dispatch the action (Redux or API call)
    if (isEditing) {
      dispatch(editBusiness(editBusinessId, data));  // Update existing business
    } else {
      dispatch(insertBusiness(data));  // Create new business
    }
  
    // Reset form data after submission
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
    setbusiness_images([]); // Reset images if needed
    setIsEditing(false);
    setEditBusinessId(null);
    handleClose();
  };
  
  


  const toggleExpand = (id) => {
    
    setExpandedRowId((prevExpandedRowId) =>
      prevExpandedRowId === id ? null : id
    );
  };

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
    const businessImages = [...business_images];
    businessImages.splice(index, 1);
    setbusiness_images(businessImages);
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
    {
      field: "status",
      headerName: "Status",
      
      flex: 1,
      renderCell: (params) => (
        <Box
        display="flex"
      
      alignItems="center"
      width="100%"
      height="100%"
          onMouseEnter={(event) => handleBusinessStatusMenuOpen(event, params.row.id)}
          onMouseLeave={handleBusinessStatusMenuClose}
        >
          <Typography>{params.value}</Typography>
          <Popover
            open={Boolean(statusAnchorEl) && hoveredRowId === params.row.id}
            anchorEl={statusAnchorEl}
            onClose={handleBusinessStatusMenuClose}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'left',
            }}
          >
            <MenuItem onClick={() => handleBusinessStatusChange(params.row.id, 'active')}>Active</MenuItem>
            <MenuItem onClick={() => handleBusinessStatusChange(params.row.id, 'inactive')}>Inactive</MenuItem>
            <MenuItem onClick={() => handleBusinessStatusChange(params.row.id, 'closed')}>Closed</MenuItem>
          </Popover>
        </Box>
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

  const childColumns = [
    { field: "investment_id", headerName: "Investment ID", flex: 0.5 },
    { field: "amount", headerName: "Amount", flex: 1, type: "number" },
    { field: "investment_date", headerName: "Investment Date", flex: 1, type: "date" },
    { field: "investment_period", headerName: "Investment Period", flex: 1 },
    { field: "expected_return", headerName: "Expected Return", flex: 1 },
    { field: "termination_date", headerName: "Termination Date", flex: 1, type: "date" },
    { field: "status", headerName: "Status", flex: 1,
      renderCell: (params) => (
        <Box
          display="flex"
          alignItems="center"
          width="100%"
          height="100%"
          onMouseEnter={(event) => handleInvestmentStatusMenuOpen(event, params.row.id)}
          onMouseLeave={handleInvestmentStatusMenuClose}
        >
          <Typography>{params.value}</Typography>
          <Popover
            open={Boolean(investmentStatusAnchorEl) && hoveredInvestmentId === params.row.id}
            anchorEl={investmentStatusAnchorEl}
            onClose={handleInvestmentStatusMenuClose}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'left',
            }}
          >
            <MenuItem onClick={() => handleInvestmentStatusChange(params.row.id, 'active')}>Active</MenuItem>
            <MenuItem onClick={() => handleInvestmentStatusChange(params.row.id, 'inactive')}>Inactive</MenuItem>
            <MenuItem onClick={() => handleInvestmentStatusChange(params.row.id, 'terminated')}>Terminated</MenuItem>
            <MenuItem onClick={() => handleInvestmentStatusChange(params.row.id, 'completed')}>Completed</MenuItem>
          </Popover>
        </Box>
      ),
    },
  ];
  
  const rows = transformData(businesses);

  useEffect(() => {
    console.log(rows)
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
                  pagination
                  paginationMode="server"
                  rowCount={totalItems}
                  paginationModel={{
                    page: page,
                    pageSize: pageSize,
                  }}  // Control pagination fully with this model
                  onPaginationModelChange={(model) => {
                    setPage(model.page);       // Update the page state
                    setPageSize(model.pageSize);  // Update the pageSize state
                  }}
                  pageSizeOptions={[3, 10, 20]}
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
                  components={{ Toolbar: GridToolbar }}
                />
                {expandedRowId === row.id && (
                  <DataGrid
                    rows={rows.filter(childRow => childRow.parentId === row.id)}
                    columns={childColumns}
                    hideFooter
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

      <AddBusinessDialog 
      open={open} 
      handleClose={handleClose} 
      categories={categories} 
      handleFormSubmit={handleFormSubmit} 
      formData={formData} 
      colors={colors}
      handleChange={handleChange}
      handleImageChange={handleImageChange}
      handleRemoveImage={handleRemoveImage}
      handleRemoveExistingImage={handleRemoveExistingImage}
      business_images={business_images}
      isEditing={isEditing}/>


      <BusinessDetailsDialog open={openDetailsDialog} handleClose={handleDetailsClose} business={selectedBusiness} colors={colors}/>
      <ToastContainer/>
    </Box>
  );
};

export default Businesses;
