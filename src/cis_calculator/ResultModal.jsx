import React, { useState } from 'react';
import { TextField, Button, Typography } from '@mui/material';

const MyForm = () => {
  const [amount, setAmount] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [resultAmount, setResultAmount] = useState('');

  const handleAmountChange = (event) => {
    setAmount(event.target.value);
  };

  const handleStartDateChange = (event) => {
    setStartDate(event.target.value);
  };

  const handleEndDateChange = (event) => {
    setEndDate(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // Calculate result amount based on conditions
    const selectedStartDate = new Date(startDate);
    const selectedEndDate = new Date(endDate);

    const nextMonthStartDate = new Date(selectedStartDate.getFullYear(), selectedStartDate.getMonth() + 1, 19);
    const nextMonthEndDate = new Date(selectedStartDate.getFullYear(), selectedStartDate.getMonth() + 2, 19);

    if (selectedEndDate <= nextMonthStartDate) {
      setResultAmount(amount - 0);
    } else if (selectedEndDate > nextMonthStartDate && selectedEndDate <= nextMonthEndDate) {
      setResultAmount(amount - 100);
    } else {
      setResultAmount(amount - 200);
    }

    setSubmitted(true);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Amount for Omny"
          value={amount}
          onChange={handleAmountChange}
          fullWidth
          required
        />
        <TextField
          label="Start Date"
          type="date"
          value={startDate}
          onChange={handleStartDateChange}
          InputLabelProps={{
            shrink: true,
          }}
          fullWidth
          required
        />
        <TextField
          label="End Date"
          type="date"
          value={endDate}
          onChange={handleEndDateChange}
          InputLabelProps={{
            shrink: true,
          }}
          fullWidth
          required
        />
        <Button type="submit" variant="contained" color="primary">
          Submit
        </Button>
      </form>
      {submitted && (
        <div>
          <Typography variant="h6">Submitted Values:</Typography>
          <Typography>Amount: {amount}</Typography>
          <Typography>Start Date: {startDate}</Typography>
          <Typography>End Date: {endDate}</Typography>
          <Typography>Result Amount: {resultAmount}</Typography>
        </div>
      )}
    </div>
  );
};

export default MyForm;
