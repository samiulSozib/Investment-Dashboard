// AddNewsDialog.js
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
  Chip
} from '@mui/material';

const AddNewsDialog = ({
  open,
  handleClose,
  handleFormSubmit,
  formData,
  handleChange,
  handleImageChange,
  handleRemoveImage,
  colors,
  isEditing,
  news_blogs_images,
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
        {isEditing ? 'Edit News' : 'Add News'}
      </DialogTitle>

      <DialogContent sx={{ backgroundColor: colors.primary[400], color: colors.grey[100] }}>
        {/* Title Field */}
        <TextField
          label="Title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          fullWidth
          margin="dense"
          variant="outlined"
          sx={{
            input: { color: colors.grey[100] },
            label: { color: colors.grey[100] },
            '& .MuiOutlinedInput-root': {
              '& fieldset': { borderColor: colors.grey[100] },
              '&:hover fieldset': { borderColor: colors.blueAccent[700] }
            }
          }}
        />

        {/* Content Field */}
        <TextField
          label="Content"
          name="content"
          value={formData.content}
          onChange={handleChange}
          fullWidth
          margin="dense"
          multiline
          rows={4}
          variant="outlined"
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
          {isEditing && news_blogs_images && news_blogs_images.length > 0 && (
            <Box mt={2}>
              <Typography variant="subtitle1" gutterBottom>
                Existing Images
              </Typography>
              <Box display="flex" flexWrap="wrap" gap={2}>
                {news_blogs_images.map((image_obj, index) => (
                  <Box key={index} position="relative">
                    <img
                      src={image_obj.image_url} // Correctly accessing the image URL
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

export default AddNewsDialog;
