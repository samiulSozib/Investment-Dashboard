import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Box, Typography, Grid } from '@mui/material';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import TimerIcon from '@mui/icons-material/Timer';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import BusinessIcon from '@mui/icons-material/Business';

const InvestmentDetails = ({ open, handleClose, investment, colors }) => {
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
        Investment Details
      </DialogTitle>
      <DialogContent>
        {investment ? (
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
                Investment ID: {investment.id}
              </Typography>
            </Box>

            <Grid container spacing={2}>
              {/* Amount */}
              <Grid item xs={6} key="amount">
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
                    <strong>Amount:</strong> ${investment.amount}
                  </Typography>
                </Box>
              </Grid>

              {/* Expected Return */}
              <Grid item xs={6} key="expected_return">
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
                    <strong>Expected Return:</strong> ${investment.expected_return}
                  </Typography>
                </Box>
              </Grid>

              {/* Investment Period */}
              <Grid item xs={6} key="investment_period">
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
                    <strong>Investment Period:</strong> {investment.investment_period} months
                  </Typography>
                </Box>
              </Grid>

              {/* Status */}
              <Grid item xs={6} key="status">
                <Box
                  sx={{
                    backgroundColor: colors.primary[500],
                    padding: 2,
                    borderRadius: 1,
                    border: `1px solid ${colors.blueAccent[700]}`,
                  }}
                >
                  <Typography variant="body1">
                    <strong>Status:</strong> {investment.status}
                  </Typography>
                </Box>
              </Grid>

              {/* Investor */}
              <Grid item xs={6} key="investor">
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
                    <strong>Investor:</strong> {investment.user.name} (Email: {investment.user.email})
                  </Typography>
                </Box>
              </Grid>

              {/* Business */}
              <Grid item xs={6} key="business">
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
                    <strong>Business:</strong> {investment.business.name}
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

export default InvestmentDetails;
