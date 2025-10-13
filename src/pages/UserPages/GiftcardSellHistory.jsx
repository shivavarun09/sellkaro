import  API  from "./RenderBaseApi.js"; //Base API
import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { Box, Typography, Container, CircularProgress, Button, Stack, Pagination } from "@mui/material";
import SingleGiftCard from "./UserGCSingleCard";
import AdminGCSinglecard from "./AdminGCSingleCard";
import API from "./RenderBaseApi.js";

const SellHistory = ({ userRole }) => {
  const [giftcards, setGiftcards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [gcStatusFilter, setGcStatusFilter] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const token = JSON.parse(localStorage.getItem("userToken") || "{}")?.token;

  const fetchGiftCards = useCallback(async () => {
    if (!token) {
      setMessage("Please login first");
      setLoading(false);
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      const API =
        userRole === "admin"
          ? gcStatusFilter
            ? `${API}/admin/allgc?gcstatus=${gcStatusFilter}&page=${page}&limit=6`
            : `${API}/admin/allgc?page=${page}&limit=6`
          : `${API}/giftcards/sellhistory?page=${page}&limit=6`;

      const res = await axios.get(API, {
        headers: { Authorization: `Bearer ${token}` },
      });
console.log("API Response:", res.data);

      setGiftcards(res.data.data || []);
      setTotalPages(res.data.totalPages || 1);
    } catch (err) {
      setMessage(err.response?.data?.message || "Failed to fetch history");
      setGiftcards([]);
    } finally {
      setLoading(false);
    }
  }, [token, userRole, gcStatusFilter, page]);

  useEffect(() => {
    fetchGiftCards();
  }, [fetchGiftCards]);

  const renderAdminFilters = () => (
    <Stack direction="row" spacing={1} justifyContent="center" mb={2} >
      {["All", "Under Review", "Rejected", "Payout Released"].map((status) => (
        <Button
        size="small"
        
          key={status}
          variant={gcStatusFilter === status || (status === "All" && !gcStatusFilter) ? "contained" : "outlined"}
          color={status === "Rejected" ? "error" : status === "Payout Released" ? "success" : "secondary"}
          onClick={() => {
            setPage(1); // reset to first page on filter change
            setGcStatusFilter(status === "All" ? "" : status);
          }}
        >
          {status}
        </Button>
      ))}
    </Stack>
  );

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Box sx={{position:"sticky",top:0,backgroundColor:"white",zIndex:5,paddingBottom:1}}>
  <Typography variant="h4" gutterBottom align="center">
        {userRole === "admin" ? "All Gift Card Orders" : "My Gift Card Sell History"}
      </Typography>

      {userRole === "admin" && renderAdminFilters()}

      </Box>
    

      <Box
        sx={{
          display: "grid",
          gap: 2,
          gridTemplateColumns: { xs: "1fr", sm: "repeat(auto-fill, minmax(300px, 1fr))" },
          justifyContent: "center",
          p: 2,
        }}
      >
        {loading ? (
          <Box sx={{ display: "flex", justifyContent: "center", width: "100%", mt: 4 }}>
            <CircularProgress />
          </Box>
        ) : message ? (
          <Typography color="error" align="center">
            {message}
          </Typography>
        ) : giftcards.length === 0 ? (
          <Typography align="center" variant="subtitle1">
            No gift cards found.
          </Typography>
        ) : (
          giftcards.map((card) =>
            userRole === "admin" ? (
              <AdminGCSinglecard key={card._id} card={card} />
            ) : (
              <SingleGiftCard key={card._id} card={card} />
            )
          )
        )}
      </Box>

      {/* MUI Pagination */}
      {totalPages > 1 && (
        <Stack spacing={2} alignItems="center" mt={0} mb={3} >
          <Pagination
            count={totalPages}
            page={page}
            color="primary"
            onChange={(e, value) => setPage(value)}
          />
        </Stack>
      )}
    </Container>
  );
};

export default SellHistory;
