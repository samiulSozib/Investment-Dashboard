import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Box,
  Typography,
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
        />

        {/* Image Upload Field */}
        <Box mt={2}>
          <Typography variant="subtitle1" gutterBottom>
            Upload Images
          </Typography>
          <input
            accept="image/*"
            id="news-blog-images"
            type="file"
            multiple
            onChange={handleImageChange}
            style={{ display: 'none' }}
          />
          <label htmlFor="news-blog-images">
            <Button
              variant="contained"
              component="span"
              sx={{
                backgroundColor: colors.blueAccent[700],
                color: colors.grey[100],
                '&:hover': { backgroundColor: colors.blueAccent[800] },
              }}
            >
              Choose Images
            </Button>
          </label>

          {/* Display Existing Images (if editing) */}
          {isEditing && news_blogs_images && news_blogs_images.length > 0 && (
            <Box mt={2}>
              <Typography variant="subtitle1" gutterBottom>
                Existing Images
              </Typography>
              <Box display="flex" flexWrap="wrap" gap={2}>
                {news_blogs_images.map((imageUrl, index) => (
                  <Box key={index} position="relative">
                    <img
                      src={imageUrl}
                      alt={`existing-${index}`}
                      style={{ width: 100, height: 100, objectFit: 'cover', borderRadius: '8px' }}
                    />
                    <Box
                      position="absolute"
                      top={0}
                      right={0}
                      bgcolor="rgba(0,0,0,0.5)"
                      borderRadius="50%"
                      width={24}
                      height={24}
                      display="flex"
                      alignItems="center"
                      justifyContent="center"
                      cursor="pointer"
                      onClick={() => handleRemoveExistingImage(index)}
                    >
                      <Typography variant="body2" color="#fff">×</Typography>
                    </Box>
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
                    <Box
                      position="absolute"
                      top={0}
                      right={0}
                      bgcolor="rgba(0,0,0,0.5)"
                      borderRadius="50%"
                      width={24}
                      height={24}
                      display="flex"
                      alignItems="center"
                      justifyContent="center"
                      cursor="pointer"
                      onClick={() => handleRemoveImage(index)}
                    >
                      <Typography variant="body2" color="#fff">×</Typography>
                    </Box>
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
