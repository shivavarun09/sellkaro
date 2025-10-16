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
import { toast } from "react-toastify";

export default function Login({setUserRole}) {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [message, setMessage] = useState("");
  const [loading,setLoading] = useState(false)
  const navigate = useNavigate();

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true)
      // http://localhost:5000/auth/login
      const res = await axios.post(`${API}/auth/login`, formData);

      const { token, role } = res.data.data;

      // ✅ Store token + role
      // Store token + role + expiry (1 hour = 60 * 60 * 1000 ms)
const expiryTime = Date.now() + 60 * 60 * 1000;
      localStorage.setItem("userToken", JSON.stringify({ token, role ,expiry: expiryTime}));
setUserRole(role)
toast.success(res.data.message)
      // setMessage(res.data.message);
      // Navigate after 2-3 seconds to show success message
    setTimeout(() => {
      if (role === "admin") {
        navigate("/all");
      } else {
        navigate("/profile");
      }
    }, 2000); // 2 seconds
  
    } catch (err) {
  toast.error(err.response?.data?.message || "Login failed");  
  setLoading(false) 
     // setMessage(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      {/* <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          p: 3,
          boxShadow: 3,
          borderRadius: 2,
        }}
      > */}
        <Typography component="h1" variant="h5">
          Welcome!
        </Typography>
        <Typography variant="body2" sx={{ mb: 0 }}>
          Sign in to continue.
        </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 0 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
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
            autoComplete="current-password"
            onChange={handleChange}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            disabled={loading}
            sx={{ mt: 1, mb: 2 }}
          >
            {loading ? "Signing In..." : "Sign In"}

          </Button>
        </Box>
        {/* <Typography variant="body2" sx={{ mt: 0 }}>
          Don&apos;t have an account?{" "}
          <Link href="/register" variant="body2">
            Sign up
          </Link>
        </Typography> */}
        {/* {message && (
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ mt: 2, textAlign: "center" }}
          >
            {message}
          </Typography>
        )} */}
      {/* </Box> */}
    </Container>
  );
}
