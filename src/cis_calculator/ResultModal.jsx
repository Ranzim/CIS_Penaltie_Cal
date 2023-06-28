import React from 'react';
import { Box, Modal, Typography } from '@mui/material';

const ResultModal = ({ open, handleClose, amount, startDate, endDate, result }) => {
  return (
    <Modal open={open} onClose={handleClose}>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            padding: '60px',
            background: '#f1f1f1f1',
            position: 'relative',
            boxShadow: '0 0 20px rgba(0, 0, 0, 0.2)',
            overflow: 'hidden',
          }}
        >
          <div
            style={{
              position: 'absolute',
              top: '100%',
              left: 0,
              right: 0,
              height: '100%',
              background: 'rgba(255, 255, 255, 0.25)',
              backdropFilter: 'blur(8px)',
              zIndex: -1,
            }}
          />

          <Typography variant="h5" style={{ marginBottom: '20px' }}>
            Result
          </Typography>

          <Typography variant="body1" style={{ marginBottom: '20px' }}>
            Amount: {amount}
          </Typography>

          <Typography variant="body1" style={{ marginBottom: '20px' }}>
            Start Date: {startDate}
          </Typography>

          <Typography variant="body1" style={{ marginBottom: '20px' }}>
            End Date: {endDate}
          </Typography>

          <Typography variant="body1">Result: {result}</Typography>
        </div>
      </Box>
    </Modal>
  );
};

export default ResultModal;
