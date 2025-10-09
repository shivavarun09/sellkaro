import * as React from "react";
import CardGiftcardIcon from '@mui/icons-material/CardGiftcard';
import FiberPinIcon from '@mui/icons-material/FiberPin';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import DateRangeIcon from '@mui/icons-material/DateRange';
import HourglassTopIcon from '@mui/icons-material/HourglassTop';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardActions,
  Chip,
  Divider,
  Typography,
} from "@mui/material";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";

export default function SingleGiftCard({ card }) {
  console.log(card)
  if (!card) {
    return null; // Or some fallback UI
  }

  return (
    <Card variant="outlined">
      <CardContent>
        <Chip size="small" variant="outlined" label={card.gcbrand || "Gift Card"} sx={{ mb: 1 }} />
        <Typography variant="h6" gutterBottom>
          {`OrderId: #${card.orderId}` || "Gift Card Name"}
        </Typography>
        <Divider sx={{ my: 1 }} />
        <Typography variant="body1"  sx={{ mt: 1, display: "flex", alignItems: "center", gap: 0.5 }}>
          <CardGiftcardIcon/>  {card.gccode}
        </Typography>
            <Typography variant="body1"  sx={{ mt: 1, display: "flex", alignItems: "center", gap: 0.5 }}>
          <FiberPinIcon/>    {card.gcpin}
        </Typography>
          <Typography variant="body1"  sx={{ mt: 1, display: "flex", alignItems: "center", gap: 0.5 }}>
          <CurrencyRupeeIcon/> {card.gcvalue}
        </Typography>
          <Typography variant="body1"  sx={{ mt: 1, display: "flex", alignItems: "center", gap: 0.5 }}>
          <DateRangeIcon/> {card.gcexpiry.slice(0,10)}
        </Typography>
        <Typography variant="body2" color="text.secondary"  sx={{ mt: 1, display: "flex", alignItems: "center", gap: 0.5 }}>
          <HourglassTopIcon/> {card.gcstatus || "N/A"}
        </Typography>
      </CardContent>
      <Divider />
      <CardActions sx={{ justifyContent: "space-between", px: 2 }}>
        <Typography variant="h6" sx={{display:"flex", alignItems:"center"}}>
      Payout After Fee<CurrencyRupeeIcon/>{card.gcUserPayout}
        </Typography>
        {/* <Button
          variant="contained"
          color="primary"
          endIcon={<KeyboardArrowRightIcon />}
          // You might want to add a click handler here, e.g., to view details
        >
          View Details
        </Button> */}
      </CardActions>
    </Card>
  );
}