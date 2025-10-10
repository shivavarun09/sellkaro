import React from "react";
import { Box, Avatar, Typography, Rating, Card } from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

// ✅ Reusable Banner image
const Banner = ({ name, src }) => (
  <img
    src={src}
    alt={name}
    style={{
      width: "100%",
      height: "350px",
      objectFit: "contain", // fit the image inside the box
      display: "block",     // remove default inline spacing
    }}
  />
);



// ✅ Main AboutUsPage with Swiper Carousel
const HomePageBannersSwipper = () => {
  const bannerImg = [
    {
      name: "Varun",
      src:
"https://user-gen-media-assets.s3.amazonaws.com/seedream_images/813ad4c4-0c70-4339-8db2-e5cf7c0ae910.png"  
  },
    {
      name: "Aditi",
      src: 
"https://user-gen-media-assets.s3.amazonaws.com/seedream_images/ed149f4c-65c7-4562-9d50-44f5ba992b8e.png"    },
    {
      name: "Rahul",
      src: 
"https://user-gen-media-assets.s3.amazonaws.com/seedream_images/cb23af77-eb7c-4464-8c2a-d4560ef16ba7.png"   },
   {
  name: "Nehal",
  src:
"https://user-gen-media-assets.s3.amazonaws.com/seedream_images/5047c564-8a70-4190-a8d2-9415b70ca857.png"
}

  ];

  return (
    <Box sx={{ py: 4, }}>
  
      <Swiper
      //If want Pagination add ,Pagination in modolue key array beside AutoPlay
        modules={[Autoplay]}
        spaceBetween={10}
        slidesPerView={1}
        pagination={{ clickable: true }}
        autoplay={{ delay: 2500, disableOnInteraction: false }}
        loop
        breakpoints={{
          600: { slidesPerView: 1 },
          900: { slidesPerView: 2 },
          1200: { slidesPerView: 3 }
        }}
        style={{ padding: "10px 20px" }}
      >
        {bannerImg.map((b, index) => (
          <SwiperSlide key={index}>
            <Banner {...b} />
          </SwiperSlide>
        ))}
      </Swiper>
    </Box>
  );
};

export default HomePageBannersSwipper;
