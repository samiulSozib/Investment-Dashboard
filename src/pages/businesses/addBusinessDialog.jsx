import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField } from '@mui/material';

const AddBusinessDialog = ({ open, handleClose, handleFormSubmit, formData, handleChange, categories, colors,isEditing }) => {
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
      {isEditing ? 'Edit Business' : 'Add Business'}
      </DialogTitle>

      <DialogContent sx={{ backgroundColor: colors.primary[400], color: colors.grey[100] }}>
        {/* Package Name Field */}
        <TextField
          autoFocus
          margin="dense"
          name="name"
          label="Business Name"
          type="text"
          fullWidth
          required
          variant="outlined"
          value={formData.name}
          onChange={handleChange}
          sx={{ 
            input: { color: colors.grey[100] },
            label: { fontSize: 12, color: colors.grey[100] },
            '& .MuiOutlinedInput-root': {
              '& fieldset': { borderColor: colors.grey[100] },
              '&:hover fieldset': { borderColor: colors.blueAccent[700] }
            }
          }}
        />

        {/* Dropdown for Category */}
        <TextField
          select
          margin="dense"
          name="category_id"
          label="Category"
          fullWidth
          required
          variant="outlined"
          value={formData.category_id}
          onChange={handleChange}
          SelectProps={{
            native: true,
          }}
          sx={{
            input: { color: colors.grey[100] },
            label: { color: colors.grey[100] },
            '& .MuiOutlinedInput-root': {
              '& fieldset': { borderColor: colors.grey[100] },
              '&:hover fieldset': { borderColor: colors.blueAccent[700] }
            }
          }}
        >
          <option value="">Select Category</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </TextField>

        {/* Min Investment */}
        <TextField
          margin="dense"
          name="min_investment"
          label="Min Investment"
          type="number"
          fullWidth
          required
          variant="outlined"
          value={formData.min_investment}
          onChange={handleChange}
          sx={{ 
            input: { color: colors.grey[100] },
            label: { color: colors.grey[100] },
            '& .MuiOutlinedInput-root': {
              '& fieldset': { borderColor: colors.grey[100] },
              '&:hover fieldset': { borderColor: colors.blueAccent[700] }
            }
          }}
        />

        {/* Max Investment */}
        <TextField
          margin="dense"
          name="max_investment"
          label="Max Investment"
          type="number"
          fullWidth
          required
          variant="outlined"
          value={formData.max_investment}
          onChange={handleChange}
          sx={{ 
            input: { color: colors.grey[100] },
            label: { color: colors.grey[100] },
            '& .MuiOutlinedInput-root': {
              '& fieldset': { borderColor: colors.grey[100] },
              '&:hover fieldset': { borderColor: colors.blueAccent[700] }
            }
          }}
        />

        {/* Min Investment Period */}
        <TextField
          margin="dense"
          name="min_investment_period"
          label="Min Investment Period (months)"
          type="number"
          fullWidth
          required
          variant="outlined"
          value={formData.min_investment_period}
          onChange={handleChange}
          sx={{ 
            input: { color: colors.grey[100] },
            label: { color: colors.grey[100] },
            '& .MuiOutlinedInput-root': {
              '& fieldset': { borderColor: colors.grey[100] },
              '&:hover fieldset': { borderColor: colors.blueAccent[700] }
            }
          }}
        />

        {/* Max Investment Period */}
        <TextField
          margin="dense"
          name="max_investment_period"
          label="Max Investment Period (months)"
          type="number"
          fullWidth
          required
          variant="outlined"
          value={formData.max_investment_period}
          onChange={handleChange}
          sx={{ 
            input: { color: colors.grey[100] },
            label: { color: colors.grey[100] },
            '& .MuiOutlinedInput-root': {
              '& fieldset': { borderColor: colors.grey[100] },
              '&:hover fieldset': { borderColor: colors.blueAccent[700] }
            }
          }}
        />

        {/* Profit Share Ratio */}
        <TextField
          margin="dense"
          name="profit_share_ratio"
          label="Profit Share Ratio (%)"
          type="number"
          fullWidth
          required
          variant="outlined"
          value={formData.profit_share_ratio}
          onChange={handleChange}
          sx={{ 
            input: { color: colors.grey[100] },
            label: { color: colors.grey[100] },
            '& .MuiOutlinedInput-root': {
              '& fieldset': { borderColor: colors.grey[100] },
              '&:hover fieldset': { borderColor: colors.blueAccent[700] }
            }
          }}
        />

        {/* Loss Share Ratio */}
        <TextField
          margin="dense"
          name="loss_share_ratio"
          label="Loss Share Ratio (%)"
          type="number"
          fullWidth
          required
          variant="outlined"
          value={formData.loss_share_ratio}
          onChange={handleChange}
          sx={{ 
            input: { color: colors.grey[100] },
            label: { color: colors.grey[100] },
            '& .MuiOutlinedInput-root': {
              '& fieldset': { borderColor: colors.grey[100] },
              '&:hover fieldset': { borderColor: colors.blueAccent[700] }
            }
          }}
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

export default AddBusinessDialog;
