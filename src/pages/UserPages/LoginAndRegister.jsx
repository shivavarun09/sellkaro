import React, { useState } from "react";
import { Container, Box, Typography, Link, CssBaseline } from "@mui/material";
import Login from "./Login.jsx";
import Register from "./Register.jsx";

export default function LoginAndRegister({ setUserRole }) {
  const [formType, setFormType] = useState(true); 

  const handleFormType = () => setFormType((prev) => !prev);

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
        {formType ? (
          <Login setUserRole={setUserRole} />
        ) : (
          <Register setUserRole={setUserRole} />
        )}

        <Typography variant="body2" sx={{ mt: 1 }}>
          {formType
            ? "Don't have an account? "
            : "Already have an account? "}
          <Link
            variant="body2"
            onClick={handleFormType}
            sx={{ cursor: "pointer", ml: 0.5 }}
          >
            {formType ? "Sign Up" : "Log In"}
          </Link>
        </Typography>
      </Box>
    </Container>
  );
}
