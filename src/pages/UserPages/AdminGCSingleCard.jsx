import React, { useState } from "react";
import axios from "axios";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardActions,
  Chip,
  Divider,
  Typography,
  Modal,
  Select,
  MenuItem,
} from "@mui/material";
import {
  CardGiftcard as CardGiftcardIcon,
  FiberPin as FiberPinIcon,
  CurrencyRupee as CurrencyRupeeIcon,
  DateRange as DateRangeIcon,
  KeyboardArrowRight as KeyboardArrowRightIcon,
} from "@mui/icons-material";

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 350,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 3,
  borderRadius: 2,
};

export default function SingleGiftCard({ card }) {
  const [payoutModal, setPayoutModal] = useState(false);
  const [verifyModal, setVerifyModal] = useState(false);
  const [userBankDetails, setUserBankDetails] = useState(null);
  const [status, setStatus] = useState(card?.gcstatus || "Under Review");
  const [loading, setLoading] = useState(false);

  if (!card) return null;

  const InfoRow = ({ icon: Icon, value }) => (
    <Typography sx={{ mt: 1, display: "flex", alignItems: "center", gap: 0.5 }}>
      <Icon /> {value || "N/A"}
    </Typography>
  );

  // Open Payout Modal & fetch bank details
  const handleOpenPayoutModal = async () => {
    try {
      const token = JSON.parse(localStorage.getItem("userToken") || "{}")?.token;
      if (!token) throw new Error("Please login first");

      const res = await axios.get(`http://localhost:5000/admin/bankaccount/${card.user}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
    
      setUserBankDetails(res.data.data);
      setPayoutModal(true);
    } catch (error) {
      console.error("Error fetching bank account details:", error);
      alert(error.response?.data?.message || error.message);
    }
  };

  const handleClosePayoutModal = () => setPayoutModal(false);
  const handleOpenVerifyModal = () => setVerifyModal(true);
  const handleCloseVerifyModal = () => setVerifyModal(false);

  // Update gift card status
  const handleStatusChange = async (e) => {
    const newStatus = e.target.value;
    setStatus(newStatus);
    setLoading(true);

    try {
      const token = JSON.parse(localStorage.getItem("userToken") || "{}")?.token;
      if (!token) throw new Error("Unauthorized");

      const res = await axios.put(
        `http://localhost:5000/admin/giftcards/${card._id}/status`,
        { status: newStatus },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setStatus(res.data.data.gcstatus);
    } catch (error) {
      alert(error.response?.data?.message || error.message || "Failed to update status");
      setStatus(card.gcstatus);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Card variant="outlined" sx={{ mb: 2 }}>
        <CardContent>
          <Chip size="small" variant="outlined" label={card.gcbrand || "Gift Card"} sx={{ mb: 1 }} />
          <Typography variant="h6" gutterBottom>{`OrderId: #${card.orderId}`}</Typography>
          <Divider sx={{ my: 1 }} />

          <InfoRow icon={CardGiftcardIcon} value={card.gccode} />
          <InfoRow icon={FiberPinIcon} value={card.gcpin} />
          <InfoRow icon={CurrencyRupeeIcon} value={card.gcvalue} />
          <InfoRow icon={DateRangeIcon} value={card.gcexpiry?.slice(0, 10)} />
          <Typography variant="body2" color="text.secondary" sx={{ mt: 1, display: "flex", alignItems: "center", gap: 0.5 }}>
            Payout <CurrencyRupeeIcon /> {card.gcUserPayout || "N/A"}
          </Typography>

          <Select
            value={status}
            onChange={handleStatusChange}
            sx={{ mt: 1, width: "100%" }}
            disabled={loading}
          >
            {["Under Review", "Rejected", "Payout Released"].map((s) => (
              <MenuItem key={s} value={s}>{s}</MenuItem>
            ))}
          </Select>
        </CardContent>

        <Divider />
        <CardActions sx={{ justifyContent: "space-between", px: 2 }}>
          <Button onClick={handleOpenVerifyModal} variant="contained" color="primary" endIcon={<KeyboardArrowRightIcon />}>
            Verify Gc
          </Button>
          <Button onClick={handleOpenPayoutModal} variant="contained" color="primary" endIcon={<KeyboardArrowRightIcon />}>
            Make Payout
          </Button>
        </CardActions>
      </Card>

      {/* Payout Modal */}
      <Modal open={payoutModal} onClose={handleClosePayoutModal}>
        <Box sx={modalStyle}>
          <Typography><strong>Account Holder:</strong> {userBankDetails?.accountHolderName}</Typography>
          <Typography><strong>Bank Name:</strong> {userBankDetails?.bankName}</Typography>
          <Typography><strong>Account Number:</strong> {userBankDetails?.accountNumber}</Typography>
          <Typography><strong>IFSC Code:</strong> {userBankDetails?.ifscCode}</Typography>
          <Typography><strong>Payout Rupees:</strong> {card.gcUserPayout || "N/A"}</Typography>

          <Button variant="outlined" onClick={handleClosePayoutModal} sx={{ mt: 4, width: "100%" }}>
            Make Payment
          </Button>
        </Box>
      </Modal>

      {/* Verify GC Modal */}
      <Modal open={verifyModal} onClose={handleCloseVerifyModal}>
        <Box sx={modalStyle}>
          <Typography variant="h6">Verify Gift Card</Typography>
          <Typography sx={{ mb: 2 }}>
            Check Giftcard details and verify
          </Typography>
            <Typography >
            {card.gccode}
          </Typography>
            <Typography>
            {card.gcpin}
          </Typography>
            <Typography >
            {card.gcvalue}
          </Typography>
          
          <Button variant="contained" color="primary" sx={{ mt: 2, width: "100%" }} onClick={() => {
            alert("Gift Card Verified!");
            handleCloseVerifyModal();
          }}>
            Confirm Verify
          </Button>
          <Button variant="outlined" sx={{ mt: 1, width: "100%" }} onClick={handleCloseVerifyModal}>
            Cancel
          </Button>
        </Box>
      </Modal>
    </>
  );
}
