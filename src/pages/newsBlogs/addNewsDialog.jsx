import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField } from '@mui/material';

const AddNewsDialog = ({ open, handleClose, handleFormSubmit, formData, handleChange, colors,isEditing }) => {
  return (
    <Dialog 
      open={open} 
      onClose={handleClose}
      sx={{
        "& .MuiPaper-root": {
          backgroundColor: colors.primary[400],
          color: colors.grey[100],
        }
      }}
    >
      <DialogTitle sx={{ backgroundColor: colors.blueAccent[700], color: colors.grey[100] }}>
      {isEditing ? 'Edit News' : 'Add News'}
      </DialogTitle>

      <DialogContent sx={{ backgroundColor: colors.primary[400], color: colors.grey[100] }}>
        {/* Package Name Field */}
        <TextField
            label="Title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            fullWidth
            margin="dense"
          />
          <TextField
            label="Content"
            name="content"
            value={formData.content}
            onChange={handleChange}
            fullWidth
            margin="dense"
            multiline
            rows={4}
          />
      </DialogContent>

      <DialogActions sx={{ backgroundColor: colors.primary[400] }}>
        <Button 
          onClick={handleClose} 
          sx={{ 
            backgroundColor: colors.redAccent[700],
            color: colors.grey[100],
            fontSize: "14px",
            fontWeight: "bold",
            padding: "10px 20px",
            "&:hover": {
              backgroundColor: colors.redAccent[800],
            }
          }}
        >
          Cancel
        </Button>
        <Button 
          onClick={handleFormSubmit} 
          sx={{ 
            backgroundColor: colors.greenAccent[700],
            color: colors.grey[100],
            fontSize: "14px",
            fontWeight: "bold",
            padding: "10px 20px",
            "&:hover": {
              backgroundColor: colors.greenAccent[800],
            }
          }}
        >
           {isEditing ? 'Save Changes' : 'Create'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddNewsDialog;
