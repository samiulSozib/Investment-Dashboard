import React, { useEffect,useState } from "react";
import {
  Box,
  Typography,
  useTheme,
  IconButton,
  MenuItem,
  Menu,
  CircularProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Grid,
  
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import TimerIcon from '@mui/icons-material/Timer';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import BusinessIcon from '@mui/icons-material/Business';
import { useParams } from 'react-router-dom';
import { getInvestmentRequestById } from '../../redux/actions/investmentRequestActions';
import {investementOffertListByRequestId} from '../../redux/actions/investmentOfferActions'
import { useDispatch, useSelector } from 'react-redux';
import { tokens } from "../../theme";
import Header from '../../components/Header';
import { ToastContainer } from "react-toastify";

// Importing the carousel
import 'react-responsive-carousel/lib/styles/carousel.min.css'; 
import { Carousel } from 'react-responsive-carousel';


const InvestmentRequestDetailsPage = () => {

  const theme = useTheme();
const colors = tokens(theme.palette.mode);


  const { id } = useParams();
  const dispatch = useDispatch();
  const { selectedInvestmentRequest, loading, error } = useSelector((state) => state.investmentRequests);
  const {investmentOffers}=useSelector((state)=>state.investmentOffer)
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedRowId, setSelectedRowId] = useState(null);
  const [selectedRow, setSelectedRow] = useState(null);

  useEffect(() => {
    dispatch(getInvestmentRequestById(id));
    dispatch(investementOffertListByRequestId(id))
  }, [dispatch, id]);


  useEffect(()=>{
    console.log(selectedInvestmentRequest)
  },[dispatch,id])





  const handleMenuOpen = (event, id, row) => {
    setAnchorEl(event.currentTarget);
    setSelectedRowId(id);
    setSelectedRow(row);
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

  const columns = [
    { field: "id", headerName: "ID" },
   {
    field:'status',
    headerName:"Status",
    flex:1,
   },
    
    {
      field:'investor.name',
      headerName:"Investor",
      flex:1,
      renderCell:(params)=>{
        return params.row.investor.name
      }
    },
    {
      field: "offered_amount",
      headerName: "Offered Amount",
      flex: 1,
      
    },
    {
      field: "proposed_share",
      headerName: "Proposed Share",
      flex: 1,
      renderCell: (params) => (
        <Typography>
          {params.row.proposed_share}%
        </Typography>
      ),
    },
   
    {
      field: "actions",
      headerName: "Actions",
      flex: 1,
      renderCell: (params) => (
        <Box>
          <IconButton
            onClick={(event) => handleMenuOpen(event, params.row.id, params.row)}
          >
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





  return (
    <Box m="20px">
      <Header title="Investment Request Details" subtitle="" />

      <Box m="40px 0 0 0">
        <Grid container spacing={2}>

          {/* Left side: Image Carousel */}
          <Grid item xs={12} md={6} >
            {selectedInvestmentRequest?.investment_request_images && selectedInvestmentRequest.investment_request_images.length > 0 ? (
              <Carousel 
                showThumbs={false}
                showStatus={false}
                infiniteLoop
                useKeyboardArrows
                autoPlay
                dynamicHeight={false}
                sx={{ marginBottom: 3 }}
              >
                {selectedInvestmentRequest.investment_request_images.map((image, index) => (
                  <div key={index}>
                    <img src={image.image_url} alt={`investment-request-image-${index}`} style={{ maxHeight: '400px', objectFit: 'cover' }}/>
                  </div>
                ))}
              </Carousel>
            ) : (
              <Typography variant="body1" color="text.secondary">
                No images available.
              </Typography>
            )}
          </Grid>

          {/* Right side: Investment Request Information */}
          <Grid item xs={12} md={6}>
            <Box>
              <Grid container spacing={2}>
                {/* Business Name */}
                <Grid item xs={12}>
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      backgroundColor: colors.primary[500],
                      padding: 2,
                      borderRadius: 1,
                      border: `1px solid ${colors.blueAccent[700]}`,
                      mb: 2,
                    }}
                  >
                    <BusinessIcon sx={{ color: colors.blueAccent[300], marginRight: 1 }} />
                    <Typography variant="body1" fontWeight="bold">
                      Business Name: {selectedInvestmentRequest?.business_name}
                    </Typography>
                  </Box>
                </Grid>

                {/* Description */}
                <Grid item xs={12}>
                  <Box
                    sx={{
                      backgroundColor: colors.primary[500],
                      padding: 2,
                      borderRadius: 1,
                      border: `1px solid ${colors.blueAccent[700]}`,
                      mb: 2,
                    }}
                  >
                    <Typography variant="body1">
                      <strong>Description:</strong> {selectedInvestmentRequest?.description}
                    </Typography>
                  </Box>
                </Grid>

                {/* Requested Amount */}
                <Grid item xs={6}>
                  <Box
                    sx={{
                      backgroundColor: colors.primary[500],
                      padding: 2,
                      borderRadius: 1,
                      border: `1px solid ${colors.blueAccent[700]}`,
                      mb: 2,
                    }}
                  >
                    <MonetizationOnIcon sx={{ color: colors.blueAccent[300], marginBottom: 1 }} />
                    <Typography variant="body1">
                      <strong>Requested Amount:</strong> ${selectedInvestmentRequest?.requested_amount}
                    </Typography>
                  </Box>
                </Grid>

                {/* Proposed Share */}
                <Grid item xs={6}>
                  <Box
                    sx={{
                      backgroundColor: colors.primary[500],
                      padding: 2,
                      borderRadius: 1,
                      border: `1px solid ${colors.blueAccent[700]}`,
                      mb: 2,
                    }}
                  >
                    <TimerIcon sx={{ color: colors.blueAccent[300], marginBottom: 1 }} />
                    <Typography variant="body1">
                      <strong>Proposed Share (%):</strong> {selectedInvestmentRequest?.proposed_share}
                    </Typography>
                  </Box>
                </Grid>

                {/* Status */}
                <Grid item xs={6}>
                  <Box
                    sx={{
                      backgroundColor: colors.primary[500],
                      padding: 2,
                      borderRadius: 1,
                      border: `1px solid ${colors.blueAccent[700]}`,
                      mb: 2,
                    }}
                  >
                    <Typography variant="body1">
                      <strong>Status:</strong> {selectedInvestmentRequest?.status}
                    </Typography>
                  </Box>
                </Grid>

                {/* Request Date */}
                <Grid item xs={6}>
                  <Box
                    sx={{
                      backgroundColor: colors.primary[500],
                      padding: 2,
                      borderRadius: 1,
                      border: `1px solid ${colors.blueAccent[700]}`,
                      mb: 2,
                    }}
                  >
                    <Typography variant="body1">
                      <strong>Request Date:</strong> {new Date(selectedInvestmentRequest?.createdAt).toLocaleDateString()}
                    </Typography>
                  </Box>
                </Grid>

                {/* Request Name */}
                <Grid item xs={12}>
                  <Box
                    sx={{
                      backgroundColor: colors.primary[500],
                      padding: 2,
                      borderRadius: 1,
                      border: `1px solid ${colors.blueAccent[700]}`,
                      mb: 2,
                    }}
                  >
                    <AccountCircleIcon sx={{ color: colors.blueAccent[300], marginBottom: 1 }} />
                    <Typography variant="body1">
                      <strong>Requested By:</strong> {selectedInvestmentRequest?.user.name} (Email: {selectedInvestmentRequest?.user.email})
                    </Typography>
                  </Box>
                </Grid>
              </Grid>
            </Box>
          </Grid>

        </Grid>
      </Box>
      <Header title="Offer List" subtitle="" />
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
        }}
      >
        <DataGrid checkboxSelection rows={investmentOffers} columns={columns} />
      </Box>

      <ToastContainer />
    </Box>
  );
};

export default InvestmentRequestDetailsPage;
