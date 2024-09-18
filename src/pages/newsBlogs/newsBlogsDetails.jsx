import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Box, Typography } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const NewsBlogDetails = ({ open, handleClose, newsBlog, colors }) => {
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
        News Blog Details
      </DialogTitle>
      <DialogContent>
        {newsBlog ? (
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: 3,
            }}
          >
            {/* Blog Title */}
            <Typography
              variant="h4"
              sx={{
                fontWeight: 'bold',
                marginBottom: 2,
                color: colors.blueAccent[100],
              }}
            >
              {newsBlog.title}
            </Typography>

            {/* Blog Author */}
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 1,
                marginBottom: 3,
              }}
            >
              <AccountCircleIcon sx={{ color: colors.blueAccent[300], fontSize: 28 }} />
              <Typography variant="body1" color={colors.grey[100]}>
                <strong>By:</strong> {newsBlog.author.name} &nbsp;
                <span style={{ fontStyle: 'italic' }}>({newsBlog.author.email})</span>
              </Typography>
            </Box>

            {/* Blog Content */}
            <Typography
              variant="body1"
              sx={{
                lineHeight: 1.8,
                textAlign: 'justify',
                color: colors.grey[200],
                paddingBottom: 2,
                borderBottom: `1px solid ${colors.blueAccent[700]}`,
              }}
            >
              {newsBlog.content}
            </Typography>
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

export default NewsBlogDetails;
