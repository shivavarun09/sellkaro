import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  CssBaseline,
  Typography,
  TextField,
  Button,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Paper,
  Box,
} from "@mui/material";
import SellGiftCatdTC from "./SellGiftCardTC";
export default function SellGiftCard() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    gcbrand: "Amazon",
    gccode: "",
    gcpin: "",
    gcvalue: "",
    gcexpiry: "",
  });

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  // Handle input changes (generic for all fields)
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Submit form
  const handleSubmit = async (e) => {
    e.preventDefault();

      const token = JSON.parse(localStorage.getItem("userToken") || "{}")?.token;
    if (!token) {
      setMessage("⚠️ Please login first");
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      const { data } = await axios.post(
        "http://localhost:5000/giftcards/sell",
        formData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setMessage(data.message || "Gift card listed successfully 🎉");
      navigate("/user"); // redirect after success
    } catch (err) {
      setMessage(err.response?.data?.message || "❌ Failed to list gift card");
    } finally {
      setLoading(false);
    }
  };
// Conditons for fee
const feeMap = {
  "Amazon": { name: "Amazon", fee: 10 },
  "Flipkart": { name: "Flipkart", fee: 15 },
};
// console.log(formData.gcbrand)
// console.log(feeMap[formData.gcbrand] )
let selected = feeMap[formData.gcbrand] || { name: "Amazon", fee: 10 };

  return (
    <>
      <CssBaseline />
      <Box
        component="main"
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          bgcolor: "background.default",
          p: 2,
        }}
      >
        <Paper
          component="form"
          onSubmit={handleSubmit}
          elevation={3}
          sx={{
            width: 350,
            p: 3,
            display: "flex",
            flexDirection: "column",
            gap: 2,
            borderRadius: 2,
          }}
        >
          <Typography variant="h5" component="h1" gutterBottom fontWeight="bold">
            Sell Gift Card
          </Typography>

          {/* Brand Select */}
          <FormControl fullWidth>
            <InputLabel id="brand-label" sx={{mb:0}}>Brand</InputLabel>
            <Select
              labelId="brand-label"
              name="gcbrand"
              value={formData.gcbrand}
              onChange={handleChange}
              required
            >
              {["Amazon", "Flipkart", "Myntra", "Yatra"].map((brand) => (
                <MenuItem key={brand} value={brand}>
                  {brand}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
{/* Fee for different cards */}
<Typography variant="body2" color="text.secondary" sx={{ m: 0 }}>
  {`Fee:${selected.fee}% of the ${selected.name} giftcard value`}
</Typography>



          {/* Reusable input fields */}
          <TextField
            name="gccode"
            label="Gift Card Code"
            value={formData.gccode}
            onChange={handleChange}
            required
            fullWidth
          />

          <TextField
            name="gcpin"
            label="Gift Card PIN"
            value={formData.gcpin}
            onChange={handleChange}
            required
            fullWidth
          />

          <TextField
            name="gcvalue"
            label="Gift Card Value"
            type="number"
            value={formData.gcvalue}
            onChange={handleChange}
            required
            fullWidth
          />

          <TextField
            name="gcexpiry"
            label="Expiry Date"
            type="date"
            InputLabelProps={{ shrink: true }}
            value={formData.gcexpiry}
            onChange={handleChange}
            required
            fullWidth
          />

          {/* Submit button */}
          <Button
            type="submit"
            variant="contained"
            disabled={loading}
            sx={{ mt: 0 }}
          >
            {loading ? "Submitting..." : "Submit"}
          </Button>

          {/* Feedback message */}
          {message && (
            <Typography
              variant="body2"
              align="center"
              sx={{ color: message.includes("❌") ? "error.main" : "success.main", mt: 1 }}
            >
              {message}
            </Typography>
          )}
        </Paper>
      </Box>
      <Box sx={{
        m:2
      }}>
        <Typography variant="h5" sx={{mb:1}}>
          FAQS
        </Typography>
      <SellGiftCatdTC />

      </Box>
    </>
  );
}
