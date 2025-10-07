import SellGiftCatdTC from "./SellGiftCardTC";
import React from 'react'
import {Box,
Typography ,
Button,

} from '@mui/material'
const HomeLandingPage = () => {
  return (
    <>
<Box sx={{ m: 2 , h:5}}>
  <img
    src='../assets/AllGCBrands.png'
    alt="All Brands Img"
    style={{ width: '100%', height: 'auto' }}
  />
</Box>


      <Box sx={{m:2,p:2,textAlign:"center", backgroundColor:"beige"}}>
      <Typography variant="h4" sx={{mb:1}}>
        Have a Giftcard?
      </Typography>
      <Typography sx={{mb:1}}>
        Don't need your gift card? Sell it on SellKaro in 3 easy steps and get money in your bank account!
      </Typography>
      <Button variant="contained">
       Sell Now
      </Button>
    </Box>

    <Box sx={{m:2}}>
      <Typography variant="h5" sx={{mb:1}}>
        FAQs
      </Typography>
      <SellGiftCatdTC/>
    </Box>

    <Box sx={{m:2}}>
<Typography variant="h1">
  this is reviews box
</Typography>
    </Box>
    </>
  )
}

export default HomeLandingPage
