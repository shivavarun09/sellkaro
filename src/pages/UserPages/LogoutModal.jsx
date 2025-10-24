import React, { useState, useContext } from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { UserContext } from "./UserContext";

const LogoutConfirm = () => {
  const [open, setOpen] = useState(true);
  const navigate = useNavigate();
  const { clearData } = useContext(UserContext); // <-- get clearData from context

  const handleClose = () => {
    setOpen(false);
    navigate(-1); // go back
  };

  const handleLogout = () => {
    setOpen(false);
    clearData(); // clears profile, bankAccounts, localStorage
    navigate("/login"); // redirect to login page
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Confirm Logout</DialogTitle>
      <DialogContent>Are you sure you want to log out?</DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="secondary" variant="outlined">
          Cancel
        </Button>
        <Button onClick={handleLogout} color="error" variant="contained">
          Logout
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default LogoutConfirm;
