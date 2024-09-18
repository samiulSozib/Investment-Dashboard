import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Box, Typography, Grid } from '@mui/material';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import TimerIcon from '@mui/icons-material/Timer';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import BusinessIcon from '@mui/icons-material/Business';

const InvestmentRequestDetails = ({ open, handleClose, investmentRequestData, colors }) => {
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth="md"
      fullWidth
      sx={{
        "& .MuiPaper-root": {
          backgroundColor: colors.primary[400],
          color: colors.grey[100],
        },
      }}
    >
      <DialogTitle
        sx={{
          backgroundColor: colors.blueAccent[700],
          color: colors.grey[100],
          fontWeight: 'bold',
          fontSize: '20px',
        }}
      >
        Investment Request Details
      </DialogTitle>
      <DialogContent>
        {investmentRequestData ? (
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: 3,
              padding: 2,
            }}
          >
            <Box
              sx={{
                display: 'flex',
                gap: 2,
                backgroundColor: colors.primary[500],
                padding: 2,
                borderRadius: 1,
                border: `1px solid ${colors.blueAccent[700]}`,
              }}
            >
              <Typography variant="h6" fontWeight="bold">
                Request ID: {investmentRequestData.id}
              </Typography>
            </Box>

            <Grid container spacing={2}>
              {/* Business Name */}
              <Grid item xs={12}>
                <Box
                  sx={{
                    backgroundColor: colors.primary[500],
                    padding: 2,
                    borderRadius: 1,
                    border: `1px solid ${colors.blueAccent[700]}`,
                  }}
                >
                  <BusinessIcon sx={{ color: colors.blueAccent[300], marginBottom: 1 }} />
                  <Typography variant="body1">
                    <strong>Business Name:</strong> {investmentRequestData.business_name}
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
                  }}
                >
                  <Typography variant="body1">
                    <strong>Description:</strong> {investmentRequestData.description}
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
                  }}
                >
                  <MonetizationOnIcon sx={{ color: colors.blueAccent[300], marginBottom: 1 }} />
                  <Typography variant="body1">
                    <strong>Requested Amount:</strong> ${investmentRequestData.requested_amount}
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
                  }}
                >
                  <TimerIcon sx={{ color: colors.blueAccent[300], marginBottom: 1 }} />
                  <Typography variant="body1">
                    <strong>Proposed Share (%):</strong> {investmentRequestData.proposed_share}
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
                  }}
                >
                  <Typography variant="body1">
                    <strong>Status:</strong> {investmentRequestData.status}
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
                  }}
                >
                  <Typography variant="body1">
                    <strong>Request Date:</strong> {new Date(investmentRequestData.createdAt).toLocaleDateString()}
                  </Typography>
                </Box>
              </Grid>

              {/* Investor Name */}
              <Grid item xs={6}>
                <Box
                  sx={{
                    backgroundColor: colors.primary[500],
                    padding: 2,
                    borderRadius: 1,
                    border: `1px solid ${colors.blueAccent[700]}`,
                  }}
                >
                  <AccountCircleIcon sx={{ color: colors.blueAccent[300], marginBottom: 1 }} />
                  <Typography variant="body1">
                    <strong>Request By:</strong> {investmentRequestData.user.name} (Email: {investmentRequestData.user.email})
                  </Typography>
                </Box>
              </Grid>
            </Grid>
          </Box>
        ) : (
          <Typography>No details available.</Typography>
        )}
      </DialogContent>
      <DialogActions>
        <Button
          onClick={handleClose}
          sx={{
            backgroundColor: colors.blueAccent[700],
            color: colors.grey[100],
            fontSize: "14px",
            fontWeight: "bold",
            padding: "10px 20px",
            "&:hover": {
              backgroundColor: colors.blueAccent[800],
            },
          }}
        >
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default InvestmentRequestDetails;
