import React, { useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Box,
  Typography,
  Chip,
} from '@mui/material';

const AddBusinessDialog = ({
  open,
  handleClose,
  handleFormSubmit,
  formData,
  handleChange,
  categories,
  colors,
  isEditing,
  business_images,
  handleImageChange,
  handleRemoveImage,
  handleRemoveExistingImage,
}) => {
  
  // Cleanup object URLs to prevent memory leaks
  useEffect(() => {
    return () => {
      if (formData.images) {
        formData.images.forEach((file) => URL.revokeObjectURL(file.preview));
      }
    };
  }, [formData.images]);

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      sx={{
        '& .MuiPaper-root': {
          backgroundColor: colors.primary[400],
          color: colors.grey[100],
        },
      }}
    >
      <DialogTitle
        sx={{ backgroundColor: colors.blueAccent[700], color: colors.grey[100] }}
      >
        {isEditing ? 'Edit Business' : 'Add Business'}
      </DialogTitle>

      <DialogContent sx={{ backgroundColor: colors.primary[400], color: colors.grey[100] }}>
        {/* Business Name Field */}
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
            label: { color: colors.grey[100] },
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

        {/* Image Upload Field */}
        <Box mt={2}>
          <Typography variant="subtitle1" gutterBottom>
            Upload Images
          </Typography>
          <Button
            variant="contained"
            component="label"
            sx={{
              backgroundColor: colors.blueAccent[700],
              color: colors.grey[100],
              '&:hover': { backgroundColor: colors.blueAccent[800] },
              mb: 2
            }}
          >
            Choose Images
            <input
              type="file"
              hidden
              multiple
              accept="image/*"
              onChange={handleImageChange}
            />
          </Button>

          {/* Display Existing Images (if editing) */}
          {isEditing && business_images && business_images.length > 0 && (
            <Box mt={2}>
              <Typography variant="subtitle1" gutterBottom>
                Existing Images
              </Typography>
              <Box display="flex" flexWrap="wrap" gap={2}>
                {business_images.map((image_obj, index) => (
                  <Box key={index} position="relative">
                    <img
                      src={image_obj.image_url}
                      alt={`existing-${index}`}
                      style={{ width: 100, height: 100, objectFit: 'cover', borderRadius: '8px' }}
                    />
                    <Chip
                      label="Remove"
                      color="error"
                      size="small"
                      onClick={() => handleRemoveExistingImage(index)}
                      sx={{ position: 'absolute', top: 5, right: 5 }}
                    />
                  </Box>
                ))}
              </Box>
            </Box>
          )}

          {/* Display Newly Selected Images */}
          <Box mt={2}>
            <Typography variant="subtitle1" gutterBottom>
              Selected Images
            </Typography>
            <Box display="flex" flexWrap="wrap" gap={2}>
              {formData.images && formData.images.length > 0 ? (
                Array.from(formData.images).map((file, index) => (
                  <Box key={index} position="relative">
                    <img
                      src={URL.createObjectURL(file)}
                      alt={`preview-${index}`}
                      style={{ width: 100, height: 100, objectFit: 'cover', borderRadius: '8px' }}
                    />
                    <Chip
                      label="Remove"
                      color="error"
                      size="small"
                      onClick={() => handleRemoveImage(index)}
                      sx={{ position: 'absolute', top: 5, right: 5 }}
                    />
                  </Box>
                ))
              ) : (
                <Typography variant="body2" color="text.secondary">
                  No images selected.
                </Typography>
              )}
            </Box>
          </Box>
        </Box>
      </DialogContent>

      <DialogActions sx={{ backgroundColor: colors.primary[400] }}>
        <Button
          onClick={handleClose}
          sx={{
            backgroundColor: colors.redAccent[700],
            color: colors.grey[100],
            fontSize: '14px',
            fontWeight: 'bold',
            padding: '10px 20px',
            '&:hover': {
              backgroundColor: colors.redAccent[800],
            },
          }}
        >
          Cancel
        </Button>
        <Button
          onClick={handleFormSubmit}
          sx={{
            backgroundColor: colors.greenAccent[700],
            color: colors.grey[100],
            fontSize: '14px',
            fontWeight: 'bold',
            padding: '10px 20px',
            '&:hover': {
              backgroundColor: colors.greenAccent[800],
            },
          }}
        >
          {isEditing ? 'Save Changes' : 'Create'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddBusinessDialog;
