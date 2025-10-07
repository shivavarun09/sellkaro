import React, { useState } from "react";
import { Box, Button, TextField, Typography } from "@mui/material";
import axios from "axios";

export default function BankForm({ onClose,bankAccounts }) {
  const [formData, setFormData] = useState({
    accountHolderName: "",
    accountNumber: "",
    ifscCode: "",
    bankName: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = JSON.parse(localStorage.getItem("userToken") || "{}")?.token;
      await axios.post("http://localhost:5000/bankaccount/addaccount", formData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert("Bank details added successfully ✅");
      onClose(); // close modal after success
    } catch (err) {
      console.error("Error saving bank details:", err);
      alert("Failed to add bank details ❌");
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
      <Typography variant="h6">{`${bankAccounts?"Update Bank account Details":"Add Bank Account"}`}</Typography>
      <TextField
        label="Account Holder Name"
        name="accountHolderName"
        value={formData.accountHolderName}
        onChange={handleChange}
        required
      />
      <TextField
        label="Account Number"
        name="accountNumber"
        value={formData.accountNumber}
        onChange={handleChange}
        required
      />
      <TextField
        label="IFSC Code"
        name="ifscCode"
        value={formData.ifscCode}
        onChange={handleChange}
        required
      />
      <TextField
        label="Bank Name"
        name="bankName"
        value={formData.bankName}
        onChange={handleChange}
        required
      />
      <Box display="flex" justifyContent="space-between">
        <Button onClick={onClose} variant="outlined">Cancel</Button>
        <Button type="submit" variant="contained">Save</Button>
      </Box>
    </Box>
  );
}
