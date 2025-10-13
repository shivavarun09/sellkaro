import  API  from "./RenderBaseApi.js"; //Base API
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Container,
  Box,
  Typography,
  TextField,
  Button,
  Link,
  CssBaseline,
} from "@mui/material";

export default function Register() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
console.log(API)
  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        // http://localhost:5000/auth/register
        `${API}/auth/register`,
        formData
      );
      setMessage(res.data.message);
      // navigate("/login");
    } catch (err) {
      setMessage(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          p: 3,
          boxShadow: 3,
          borderRadius: 2,
        }}
      >
        <Typography component="h1" variant="h5">
          Welcome!
        </Typography>
        <Typography variant="body2" sx={{ mb: 0 }}>
          Sign up to continue.
        </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 0 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="name"
            label="Name"
            name="name"
            autoComplete="name"
            autoFocus
            onChange={handleChange}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            onChange={handleChange}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="new-password"
            onChange={handleChange}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 0, mb: 2 }}
          >
            Register
          </Button>
        </Box>
        <Typography variant="body2">
          Already have an account?{" "}
          <Link href="/login" variant="body2">
            Log in
          </Link>
        </Typography>
        {message && (
          <Typography
            variant="body2"
            color="success.main"
            sx={{ mt: 2, textAlign: "center" }}
          >
            {message}
          </Typography>
        )}
      </Box>
    </Container>
  );
}