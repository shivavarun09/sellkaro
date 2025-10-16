import API from "./RenderBaseApi.js";
import React, { useState } from "react";
import { Box, Button, MenuItem, Select, TextField, Typography } from "@mui/material";
import axios from "axios";
import { toast } from "react-toastify";

const BANKS = ["HDFC BANK", "ICICI BANK", "AXIS BANK", "SBI BANK", "KOTAK BANK"];

export default function BankForm({ onClose, bankAccounts, isBankDetailUpdated, setIsBankDetailsUpdated }) {
  const [formData, setFormData] = useState({
    accountHolderName: "",
    accountNumber: "",
    ifscCode: "",
    bankName: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const token = JSON.parse(localStorage.getItem("userToken") || "{}")?.token;
      const res = await axios.post(`${API}/bankaccount/addaccount`, formData, {
        headers: { Authorization: `Bearer ${token}` },
      });

      toast.success(res.data.message);
      setIsBankDetailsUpdated(!isBankDetailUpdated);
      onClose();
    } catch (err) {
      console.error("Error saving bank details:", err);
      toast.error(err.response?.data?.message || "Request Failed, try later");
    } finally {
      setLoading(false);
    }
  };

  const { accountHolderName, accountNumber, ifscCode, bankName } = formData;

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
      <Typography variant="h6">{bankAccounts ? "Update Bank Account Details" : "Add Bank Account"}</Typography>

      <TextField
        label="Account Holder Name"
        name="accountHolderName"
        value={accountHolderName}
        onChange={handleChange}
        required
      />
      <TextField
        label="Account Number"
        name="accountNumber"
        value={accountNumber}
        onChange={handleChange}
        required
      />
      <TextField
        label="IFSC Code"
        name="ifscCode"
        value={ifscCode}
        onChange={handleChange}
        required
      />

      <Select
        name="bankName"
        value={bankName}
        onChange={handleChange}
        displayEmpty
        required
      >
        <MenuItem value="" disabled>
          Select Bank
        </MenuItem>
        {BANKS.map((b) => (
          <MenuItem key={b} value={b}>
            {b}
          </MenuItem>
        ))}
      </Select>

      <Box display="flex" justifyContent="space-between">
        <Button onClick={onClose} variant="outlined">
          Cancel
        </Button>
        <Button type="submit" variant="contained" disabled={loading}>
          {loading ? "Saving..." : "Save"}
        </Button>
      </Box>
    </Box>
  );
}
