import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Box, Typography, TextField, Button } from "@mui/material";

const CalculatorMain = () => {
    const [taxAmount, setTaxAmount] = useState(0);
    const [taxPeriod, setTaxPeriod] = useState(null);
    const [filingDate, setFilingDate] = useState(null);
    const [lateDays, setLateDays] = useState(0);
    const [addTax, setAddTax] = useState(0);
    const [penalty, setPenalty] = useState(0);
    const [deadlineDate, setDeadlineDate] = useState(null);

    const [result, setResult] = useState("");
    const [showResult, setShowResult] = useState(false);

    const handleCalculate = (event) => {
        event.preventDefault();

        if (taxPeriod === null || filingDate === null) {
            alert("Please select the tax period and filing date.");
            return;
        }

        // Step 3: Calculate deadline_date
        let deadlineDate = new Date(
            taxPeriod.getFullYear(),
            taxPeriod.getMonth(), // Use the same month of the taxPeriod
            19
        );

        deadlineDate.setMonth(deadlineDate.getMonth() + 1); // Increment the month by 1

        if (deadlineDate.getMonth() === 0) {
            // If the new month is January, adjust the year accordingly
            deadlineDate.setFullYear(deadlineDate.getFullYear() + 1);
        }
        // Step 4: Input filing_date
        const filingDateObj = new Date(filingDate);
        filingDateObj.setHours(0, 0, 0, 0);

        // Step 5: Calculate lateDays
        const deadlineDateWithoutTime = new Date(
            deadlineDate.getFullYear(),
            deadlineDate.getMonth(),
            deadlineDate.getDate(),
            0, 0, 0, 0
        );

        const diffInTime = filingDateObj.getTime() - deadlineDateWithoutTime.getTime();
        const calculatedLateDays = Math.ceil(diffInTime / (1000 * 3600 * 24));



        const calculatedAddTax = 0.05 * taxAmount;

        let calculatedResult = parseInt(taxAmount);

        // Step 7: Calculate penalty
        let calculatedPenalty = 0;

        if (calculatedLateDays > 0) {
            calculatedPenalty += 100;
        }

        if (calculatedLateDays > 60) {
            calculatedPenalty += 200;
        }

        if (calculatedLateDays > 181) {
            if (calculatedAddTax > 300) {
                calculatedPenalty += calculatedAddTax;
            } else {
                calculatedPenalty += 300;
            }
        }

        if (calculatedLateDays > 364) {
            if (calculatedAddTax > 300) {
                calculatedPenalty += calculatedAddTax;
            } else {
                calculatedPenalty += 300;
            }
        }

        setLateDays(calculatedLateDays);
        setAddTax(calculatedAddTax);
        setPenalty(calculatedPenalty);

        calculatedResult -= calculatedPenalty;
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
                    display: "flex",
                    flexDirection: "column",
                    padding: "60px",
                    background: "#f1f1f1",
                    position: "relative",
                    boxShadow: "0 0 20px rgba(0, 0, 0, 0.2)",
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
                        zIndex: -1,
                        borderRadius: "20px",
                    }}
                />

                <form
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        width: "100%",
                        maxWidth: "500px",
                    }}
                    onSubmit={handleCalculate}
                >

                    <TextField
                        label="Amount"
                        variant="outlined"
                        value={taxAmount}
                        onChange={(e) => setTaxAmount(Number(e.target.value))}
                        inputProps={{ min: 0, step: 1 }}
                        sx={{ marginBottom: "20px", bgcolor: "white" }}
                    />


                    <TextField
                        label="Tax Period"
                        type="month"
                        value={taxPeriod ? taxPeriod.toISOString().slice(0, 7) : ""}
                        onChange={(e) => setTaxPeriod(new Date(e.target.value))}
                        InputLabelProps={{
                            shrink: true,
                        }}
                        fullWidth
                        required
                        sx={{ marginBottom: "20px", bgcolor: "white" }}
                    />



                    <TextField
                        label="Filing Date"
                        type="date"
                        value={filingDate ? filingDate.toISOString().slice(0, 10) : ""}
                        onChange={(e) => setFilingDate(new Date(e.target.value))}
                        InputLabelProps={{
                            shrink: true,
                        }}
                        fullWidth
                        required
                        sx={{ marginBottom: "20px", bgcolor: "white" }}
                    />


                    <Button
                        variant="contained"
                        onClick={handleCalculate}
                        type="submit"
                        style={{ marginBottom: "20px" }}
                    >
                        Calculate
                    </Button>
                </form>

                {showResult && (
                    <div>
                        <p>
                            User Selected Tax Period:{" "}
                            {taxPeriod.toLocaleDateString("default", {
                                month: "long",
                                year: "numeric",
                            })}
                        </p>
                        <p>Deadline of this tax period: {deadlineDate}</p>
                        <p>User Actual Filing Date: {filingDate.toLocaleDateString()}</p>
                        <p>Number of Late Days: {lateDays}</p>
                        <p>Penalty Amount: {penalty}</p>
                        <p>Result: {result}</p>
                    </div>
                )}
            </div>
        </Box>
    );
};

export default CalculatorMain;
