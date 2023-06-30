import React, { useState } from "react";
import { Box, TextField, Button, Typography, Grid, Container } from "@mui/material";

const Calculate = () => {
  
  const [amount, setAmount] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [resultAmount, setResultAmount] = useState("");

  const handleAmountChange = (event) => {
    setAmount(event.target.value);
  };

  const handleStartDateChange = (event) => {
    const selectedDate = event.target.value;
    const newStartDate = new Date(selectedDate);
    newStartDate.setDate(19);

    setStartDate(newStartDate.toISOString().split("T")[0]);
  };

  const handleEndDateChange = (event) => {
    setEndDate(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // Calculate result amount based on conditions
    const selectedStartDate = new Date(startDate);
    const selectedEndDate = new Date(endDate);

    const nextMonthStartDate = new Date(
      selectedStartDate.getFullYear(),
      selectedStartDate.getMonth() + 1,
      20
    );
    const nextMonthEndDate = new Date(
      selectedStartDate.getFullYear(),
      selectedStartDate.getMonth() + 2,
      20 
    );

    const SixMonthEndDate = new Date(
      selectedStartDate.getFullYear(),
      selectedStartDate.getMonth() + 6,
      20
    );
    const TwelveMonthEndDate = new Date(
      selectedStartDate.getFullYear(),
      selectedStartDate.getMonth() + 12,
      20
    );

    if (selectedEndDate <= nextMonthStartDate) {
      setResultAmount(amount - 0);
    } else if (
      selectedEndDate > nextMonthStartDate &&
      selectedEndDate <= nextMonthEndDate
    ) {
      setResultAmount(amount - 100);
    } else if (
      selectedEndDate > nextMonthEndDate &&
      selectedEndDate <= SixMonthEndDate
    ) {
      setResultAmount(amount - 300);
    } else if (
      selectedEndDate > SixMonthEndDate &&
      selectedEndDate <= TwelveMonthEndDate
    ) {
      setResultAmount(amount - 601.0);
    } else {
      setResultAmount(amount - 902);
    }

    setSubmitted(true);
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
          display: "flex",
          flexDirection: "column",
          padding: "60px",
          background: "#f1f1f1f1",
          position: "relative",
          border: "5px solid #344D87",
          borderRadius: "20px",
          boxShadow: "0 0 20px #344D87",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: "100%",
            left: 0,
            right: 0,
            height: "100%",
            background: "rgba(255, 255, 255, 0.25)",
            backdropFilter: "blur(8px)",
            zIndex: -1,
            borderRadius: "20px",
          }}
        />

        <form onSubmit={handleSubmit}>
          <TextField
            label="Amount "
            value={amount}
            onChange={handleAmountChange}
            fullWidth
            required
            sx={{ marginBottom: "30px", bgcolor: "white" }}
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
            sx={{ marginBottom: "30px", bgcolor: "white" }}
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
            sx={{ marginBottom: "30px", bgcolor: "white" }}
          />
          <Button type="submit" variant="contained" color="primary">
            Calculate
          </Button>
        </form>
        {submitted && (
            <Container maxWidth="lg" bgcolor="white">
            <div>
            <Typography variant="h6" component="h3">
              Submitted Values:
            </Typography>
            <Typography component="p">Amount: {amount}</Typography>
            <Typography component="p">Start Date: {startDate}</Typography>
            <Typography component="p">End Date: {endDate}</Typography>
            <Typography component="p">Result Amount: {resultAmount}</Typography>
          </div>
          </Container>
        )}
      </div>
    </Box>
  );
};

export default Calculate;
