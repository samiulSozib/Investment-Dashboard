import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Box, Typography, Grid } from '@mui/material';
import BusinessIcon from '@mui/icons-material/Business';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import TimerIcon from '@mui/icons-material/Timer';
import CategoryIcon from '@mui/icons-material/Category';
import 'react-responsive-carousel/lib/styles/carousel.min.css'; 
import { Carousel } from 'react-responsive-carousel';

const BusinessDetailsDialog = ({ open, handleClose, business, colors }) => {
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
        Business Details
      </DialogTitle>


      {/* Image Carousel */}
  
      {business && business.business_images && business.business_images.length > 0 ? (
        <Carousel
          showThumbs={false}
          showStatus={false}
          infiniteLoop
          useKeyboardArrows
          autoPlay
          dynamicHeight={false}
          sx={{ marginBottom: 3 }}
        >
          {business.business_images.map((image, index) => (
            <div key={index}>
              <img src={image.image_url} alt={`business-image-${index}`} />
            </div>
          ))}
        </Carousel>
      ) : (
        <Typography variant="body1" color="text.secondary">
         
        </Typography>
      )}



      <DialogContent>
        {business ? (
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
              <BusinessIcon sx={{ color: colors.blueAccent[300] }} />
              <Typography variant="h6" fontWeight="bold">
                {business.name}
              </Typography>
            </Box>

            <Grid container spacing={2}>
              {/* Min and Max Investment Section */}
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
                    <strong>Min Investment:</strong> {business.min_investment}
                  </Typography>
                </Box>
              </Grid>
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
                    <strong>Max Investment:</strong> {business.max_investment}
                  </Typography>
                </Box>
              </Grid>

              {/* Min and Max Investment Period */}
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
                    <strong>Min Investment Period:</strong> {business.min_investment_period}
                  </Typography>
                </Box>
              </Grid>
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
                    <strong>Max Investment Period:</strong> {business.max_investment_period}
                  </Typography>
                </Box>
              </Grid>

              {/* Profit and Loss Share Ratios */}
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
                    <strong>Profit Share Ratio:</strong> {business.profit_share_ratio}
                  </Typography>
                </Box>
              </Grid>
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
                    <strong>Loss Share Ratio:</strong> {business.loss_share_ratio}
                  </Typography>
                </Box>
              </Grid>

              {/* Category */}
              <Grid item xs={12}>
                <Box
                  sx={{
                    backgroundColor: colors.primary[500],
                    padding: 2,
                    borderRadius: 1,
                    border: `1px solid ${colors.blueAccent[700]}`,
                  }}
                >
                  <CategoryIcon sx={{ color: colors.blueAccent[300], marginBottom: 1 }} />
                  <Typography variant="body1">
                    <strong>Category:</strong> {business.category ? business.category.name : "N/A"}
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

export default BusinessDetailsDialog;
