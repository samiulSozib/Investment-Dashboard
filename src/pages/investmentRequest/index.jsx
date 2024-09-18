import React, { useEffect, useState } from "react";
import { Box, IconButton, Menu, MenuItem, Toolbar } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import { tokens } from "../../theme";
import { useTheme } from "@mui/material";
import Header from '../../components/Header';
import { useDispatch, useSelector } from 'react-redux';
import { investementRequestList, deleteInvestmentRequest } from '../../redux/actions/investmentRequestActions';
import { ToastContainer } from "react-toastify";
import InvestmentRequestDetails from "./investmentRequestDetails";
import ChildDataGrid from "./childDataGrid";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";

const InvestmentRequest = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const extractId = (rowId) => {
    const parts = rowId.split("-");
    return parts.length > 1 ? parseInt(parts[1], 10) : null;
  };

  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedRowId, setSelectedRowId] = useState(null);
  const [openDetailsDialog, setOpenDetailsDialog] = useState(false);
  const [selectedInvestmentRequest, setSelectedInvestmentRequest] = useState(null);
  const [expandedRowId, setExpandedRowId] = useState(null);
  const [firstParentId, setFirstParentId] = useState(null);

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
    const id=extractId(selectedRowId)
    dispatch(deleteInvestmentRequest(id));
    handleMenuClose();
  };

  const handleDetails = () => {
    const id=extractId(selectedRowId)
    const investmentRequest = investmentRequests.find((inv) => inv.id === id);
    setSelectedInvestmentRequest(investmentRequest);
    console.log(selectedRowId)
    setOpenDetailsDialog(true);
    handleMenuClose();
  };

  const handleCloseDetailsDialog = () => {
    setOpenDetailsDialog(false);
    setSelectedInvestmentRequest(null);
  };

  const toggleExpand = (id) => {
    setExpandedRowId((prevExpandedRowId) =>
      prevExpandedRowId === id ? null : id
    );
  };

  const transformData = (requests) => {
    let rows = [];
    
    requests.forEach((request) => {
      const parentRow = {
        id: `request-${request.id}`,
        business_name: request.business_name,
        description: request.description,
        requested_amount: request.requested_amount,
        proposed_share: request.proposed_share,
        status: request.status,
        user_name: request.user.name,
        isParent: true,
      };
      rows.push(parentRow);
  
      if (expandedRowId === `request-${request.id}`) {
        request.investmentOffers.forEach((offer) => {
          rows.push({
            id: `offer-${offer.id}`,
            offer_id: offer.id,
            offered_amount: offer.offered_amount,
            offer_proposed_share: offer.proposed_share,
            offer_status: offer.status,
            parentId: `request-${request.id}`,
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
    { field: "description", headerName: "Description", flex: 1 },
    {
      field: "requested_amount",
      headerName: "Requested Amount",
      type: "number",
      headerAlign: "left",
      align: "left",
    },
    {
      field: "proposed_share",
      headerName: "Proposed Share (%)",
      type: "number",
      headerAlign: "left",
      align: "left",
    },
    {
      field: "status",
      headerName: "Status",
      flex: 1,
    },
    {
      field: "user_name",
      headerName: "Investor Name",
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

  const childColumns = [
    { field: "offer_id", headerName: "Offer ID", flex: 0.5 },
    { field: "offered_amount", headerName: "Offered Amount", flex: 1 },
    { field: "offer_proposed_share", headerName: "Proposed Share (%)", flex: 1 },
    { field: "offer_status", headerName: "Offer Status", flex: 1 },
  ];

  const dispatch = useDispatch();
  const { investmentRequests, loading, error } = useSelector((state) => state.investmentRequests);

  useEffect(() => {
    dispatch(investementRequestList());
  }, [dispatch]);

  const rows = transformData(investmentRequests);

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
      <Header title="Investment Requests" subtitle="List of Investment Requests" />
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
      <InvestmentRequestDetails open={openDetailsDialog} handleClose={handleCloseDetailsDialog} investmentRequestData={selectedInvestmentRequest} colors={colors} />
      <ToastContainer />
    </Box>
  );
};

export default InvestmentRequest;
