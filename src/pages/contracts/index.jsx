import React, { useEffect, useState } from "react";
import { Box, IconButton, Menu, MenuItem, Typography, Popover } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import { useTheme } from "@mui/material";
import { useDispatch, useSelector } from 'react-redux';
import { contractList, deleteContract,updateContractStatus } from '../../redux/actions/contractActions';
import ContractDetails from "./contractDetails";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const Contracts = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedRowId, setSelectedRowId] = useState(null);
  const [statusAnchorEl, setStatusAnchorEl] = useState(null);
  const [hoveredRowId, setHoveredRowId] = useState(null);

  const [openDetailsDialog, setOpenDetailsDialog] = useState(false);
  const [selectedContract, setSelectedContract] = useState(null);

  const dispatch = useDispatch();
  const { loading, error, contracts } = useSelector((state) => state.contracts);

  useEffect(() => {
    dispatch(contractList());
  }, [dispatch]);

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
    dispatch(deleteContract(selectedRowId));
    handleMenuClose();
  };

  const handleDetails = () => {
    const contract = contracts.find((cont) => cont.id === selectedRowId);
    setSelectedContract(contract);
    setOpenDetailsDialog(true);
    handleMenuClose();
  };

  const handleCloseDetailsDialog = () => {
    setOpenDetailsDialog(false);
    setSelectedContract(null);
  };

  const handleStatusMenuOpen = (event, id) => {
    setHoveredRowId(id);
    setStatusAnchorEl(event.currentTarget);
  };

  const handleStatusMenuClose = () => {
    setStatusAnchorEl(null);
    setHoveredRowId(null);
  };

  const handleStatusChange = (id, status) => {
    dispatch(updateContractStatus(id, status));
    handleStatusMenuClose();
  };

  const columns = [
    { field: "id", headerName: "ID", flex: 0.5 },
    {
      field: "investment.amount",
      headerName: "Amount",
      flex: 1,
      renderCell: (params) => `$${params.row.investment.amount}`,
    },
    {
      field: "investment.investment_period",
      headerName: "Investment Period (Months)",
      type: "number",
      headerAlign: "left",
      align: "left",
      renderCell: (params) => `${params.row.investment.investment_period} months`,
    },
    {
      field: "investment.expected_return",
      headerName: "Expected Return",
      flex: 1,
      renderCell: (params) => `$${params.row.investment.expected_return}`,
    },
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
          onMouseEnter={(event) => handleStatusMenuOpen(event, params.row.id)}
          onMouseLeave={handleStatusMenuClose}
        >
          <Typography>{params.value}</Typography>
          <Popover
            open={Boolean(statusAnchorEl) && hoveredRowId === params.row.id}
            anchorEl={statusAnchorEl}
            onClose={handleStatusMenuClose}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'left',
            }}
          >
            <MenuItem onClick={() => handleStatusChange(params.row.id, 'active')}>Active</MenuItem>
            <MenuItem onClick={() => handleStatusChange(params.row.id, 'completed')}>Completed</MenuItem>
            <MenuItem onClick={() => handleStatusChange(params.row.id, 'terminated')}>Terminated</MenuItem>
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

  return (
    <Box m="20px">
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="Contracts" subtitle="Contracts List" />
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
        }}
      >
        <DataGrid
          rows={contracts}
          columns={columns}
          components={{ Toolbar: GridToolbar }}
        />
      </Box>

      <ContractDetails open={openDetailsDialog} handleClose={handleCloseDetailsDialog} contract={selectedContract} colors={colors} />
      <ToastContainer />
    </Box>
  );
};

export default Contracts;
