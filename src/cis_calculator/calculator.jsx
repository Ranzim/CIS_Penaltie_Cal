import React, { useState } from 'react';
import { Box, TextField, Button } from '@mui/material';

const Calculator = () => {
  const [amount, setAmount] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [result, setResult] = useState('');
  const [showResult, setShowResult] = useState(false);

  const handleCalculate = () => {
    const formattedStartDate = new Date(startDate);
    const formattedEndDate = new Date(endDate);
  
    const monthDiff = (formattedEndDate.getMonth() - formattedStartDate.getMonth()) +
      12 * (formattedEndDate.getFullYear() - formattedStartDate.getFullYear());
    
    let calculatedResult = parseInt(amount);
    
    if (monthDiff < 1) {
      calculatedResult -= 0;
    } else if (monthDiff < 6) {
      calculatedResult -= 100;
    } else {
      calculatedResult -= 200;
    }
    
    setResult(calculatedResult.toString());
    setShowResult(true);
  };

  return (
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
            borderRadius: '20px'
          }}
        />
      
        <form style={{ display: 'flex', flexDirection: 'column', width: '100%', maxWidth: '500px' }}>
          <TextField
            label="Amount"
            variant="outlined"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            sx={{ marginBottom: '20px', bgcolor: 'white' }}
          />
      
          <TextField
            label="Start Date"
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            sx={{ marginBottom: '20px', bgcolor: 'white' }}
          />
          
          <TextField
            label="End Date"
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            sx={{ marginBottom: '20px', bgcolor: 'white' }}
          />
          
          <Button variant="contained" onClick={handleCalculate} style={{ marginBottom: '20px' }}>
            Calculate
          </Button>
        </form>
        
        {showResult && (
          <div>
            <p>Start Date: {startDate}</p>
            <p>End Date: {endDate}</p>
            <p>Amount: {amount}</p>
            <p>Result: {result}</p>
          </div>
        )}
      </div>
    </Box>
  );
};

export default Calculator;
