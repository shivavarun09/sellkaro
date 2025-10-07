import React, { useEffect, useState } from "react";
import axios from "axios";
import { Box, Typography, Container, CircularProgress } from '@mui/material';
import SingleGiftCard from "./SingleGiftCard";
import AdminGCSinglecard from "../AdminPages/AdminGCSingleCard"
const SellHistory = () => {
  const [giftcards, setGiftcards] = useState([]);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
      const token = JSON.parse(localStorage.getItem("userToken") || "{}")?.token;

        if (!token) {
          setMessage("Please login first");
          setLoading(false);
          return;
        }

        const res = await axios.get("http://localhost:5000/giftcards/sellhistory", {
          headers: { Authorization: `Bearer ${token}` },
        });

        setGiftcards(res.data.data || []);
      } catch (err) {
        setMessage(err.response?.data?.message || "Failed to fetch history");
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, []);

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom align="center">
        My Gift Card Sell History
      </Typography>
      <Box
        sx={{
          display: 'grid',
          gap: 2,
          gridTemplateColumns: {
            xs: '1fr',
            sm: 'repeat(auto-fill, minmax(300px, 1fr))',
          },
          justifyContent: 'center',
          p: 2
        }}
      >
        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', width: '100%', mt: 4 }}>
            <CircularProgress />
          </Box>
        ) : message ? (
          <Typography color="error" align="center">{message}</Typography>
        ) : giftcards.length === 0 ? (
          <Typography align="center" variant="subtitle1">No gift cards found.</Typography>
        ) : (
          giftcards.map((card) => (
            
            // <SingleGiftCard key={card._id} card={card} />
            <AdminGCSinglecard key={card._id} card={card}/>
          ))
        )}
      </Box>
    </Container>
  );
};

export default SellHistory;