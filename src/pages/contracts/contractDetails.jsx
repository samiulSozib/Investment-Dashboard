import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Box, Typography, Grid } from '@mui/material';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import TimerIcon from '@mui/icons-material/Timer';
import DateRangeIcon from '@mui/icons-material/DateRange';
import BusinessIcon from '@mui/icons-material/Business';
import PersonIcon from '@mui/icons-material/Person';

const ContractDetails = ({ open, handleClose, contract, investorName, businessName, colors }) => {
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
        Contract Details
      </DialogTitle>
      <DialogContent>
        {contract ? (
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
                Contract ID: {contract.id}
              </Typography>
            </Box>

            <Grid container spacing={2}>
              {/* Terms */}
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
                    <strong>Terms:</strong> {contract.terms}
                  </Typography>
                </Box>
              </Grid>

              {/* Start Date */}
              <Grid item xs={6}>
                <Box
                  sx={{
                    backgroundColor: colors.primary[500],
                    padding: 2,
                    borderRadius: 1,
                    border: `1px solid ${colors.blueAccent[700]}`,
                  }}
                >
                  <DateRangeIcon sx={{ color: colors.blueAccent[300], marginBottom: 1 }} />
                  <Typography variant="body1">
                    <strong>Start Date:</strong> {new Date(contract.start_date).toLocaleDateString()}
                  </Typography>
                </Box>
              </Grid>

              {/* End Date */}
              <Grid item xs={6}>
                <Box
                  sx={{
                    backgroundColor: colors.primary[500],
                    padding: 2,
                    borderRadius: 1,
                    border: `1px solid ${colors.blueAccent[700]}`,
                  }}
                >
                  <DateRangeIcon sx={{ color: colors.blueAccent[300], marginBottom: 1 }} />
                  <Typography variant="body1">
                    <strong>End Date:</strong> {new Date(contract.end_date).toLocaleDateString()}
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
                    <strong>Status:</strong> {contract.status}
                  </Typography>
                </Box>
              </Grid>

              {/* Investment Amount */}
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
                    <strong>Investment Amount:</strong> ${contract.investment.amount}
                  </Typography>
                </Box>
              </Grid>

              {/* Investment Period */}
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
                    <strong>Investment Period:</strong> {contract.investment.investment_period} months
                  </Typography>
                </Box>
              </Grid>

              {/* Expected Return */}
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
                    <strong>Expected Return:</strong> ${contract.investment.expected_return}
                  </Typography>
                </Box>
              </Grid>

              {/* Investor */}
              {/* <Grid item xs={6}>
                <Box
                  sx={{
                    backgroundColor: colors.primary[500],
                    padding: 2,
                    borderRadius: 1,
                    border: `1px solid ${colors.blueAccent[700]}`,
                  }}
                >
                  <PersonIcon sx={{ color: colors.blueAccent[300], marginBottom: 1 }} />
                  <Typography variant="body1">
                    <strong>Investor:</strong> {investorName}
                  </Typography>
                </Box>
              </Grid> */}

              {/* Business */}
              {/* <Grid item xs={6}>
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
                    <strong>Business:</strong> {businessName}
                  </Typography>
                </Box>
              </Grid> */}
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

export default ContractDetails;
