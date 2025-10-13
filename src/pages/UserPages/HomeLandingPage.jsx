import SellGiftCatdTC from "./SellGiftCardTC";
import React from 'react'
import {Box,
Typography ,
Button,

} from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ReviewSwipper from "./UserReviewSwipper";
import UserReviewSwipper from "./UserReviewSwipper";
import HomePageBannersSwipper from "./HomePageBannersSwipper";
import API from './RenderBaseApi.js'
const HomeLandingPage = () => {
  return (
    <>
<HomePageBannersSwipper/>
      <Box sx={{m:2,mb:0,p:2,textAlign:"center",   backgroundColor: "#f1f5f9"}}>
      <Typography variant="h4" sx={{mb:1}}>
        Have a Giftcard?
      </Typography>
      <Typography sx={{mb:1}}>
        Don't need your gift card? Sell it on SellKaro in 3 easy steps and get money in your bank account!
      </Typography>
    <Button variant="contained" href={`https://sellkaro.vercel.app/login`}>
  Sell Now
</Button>

    </Box>

  {/* user Reviews  */}
      <UserReviewSwipper/>
    

    <Box sx={{mt:0,m:2}}>
      <Typography variant="h5" sx={{mb:1}}>
        FAQs
      </Typography>
      <SellGiftCatdTC/>
    </Box>

  <Box sx={{ m: 2 }}>
  <table style={{ width: "100%" }}>
    <tbody>
    
      <tr>
        <td
          style={{
            padding: "24px 32px",
            backgroundColor: "#f1f5f9",
            color: "#6b7280",
            fontSize: "12px",
            textAlign: "center",
            lineHeight: 1.5,
          }}
        >
          <Typography variant="body2" sx={{mb:1}}>
            SellKaro Pvt Ltd. &bull; Hyderabad, India.
          </Typography>
        <Typography 
         variant="body2" 
       sx={{ display: "flex", justifyContent: "center", alignItems: "center", mb: 1, gap: 0.5 }}
         >
        Made with Love <FavoriteIcon color="error" fontSize="small" />
        </Typography>

          <Typography variant="body2"  sx={{mb:1}}>
            © 2025 SellKaro. All rights reserved.

          </Typography>
        </td>
      </tr>
    </tbody>
  </table>
</Box>

    </>
  )
}

export default HomeLandingPage
