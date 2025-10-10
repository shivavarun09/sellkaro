import React from "react";
import { Box, Avatar, Typography, Rating, Card } from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

// ✅ Reusable Review Card
const ReviewCard = ({ name, avatar, rating, review }) => (
  <Card sx={{ p: 2, mx: "auto",border:"none" }}>
    <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 1 }}>
      <Avatar alt={name} src={avatar} sx={{ width: 56, height: 56 }} />
      <Typography variant="body2" fontWeight="bold">
        {name}
      </Typography>
      <Rating name="read-only" value={rating} precision={0.5} readOnly />
      <Typography variant="body2" textAlign="center">
        {review}
      </Typography>
    </Box>
  </Card>
);

// ✅ Main AboutUsPage with Swiper Carousel
const AboutUsPage = () => {
  const reviews = [
    {
      name: "Varun",
      avatar:
        "https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcQaVRf8iWltuMzYDYY5h2AohB1Ov9e-IjGJZFtyo_BSqCtJynNdko41Ee0qn6oZFOrjGQ4uQqm2bAFYy4Sg_EyqBHKWauGk-52qhrqXxA",
      rating: 5,
      review:
        "I recently registered on SellKaro and submitted my unused Myntra gift card. The process was super simple and smooth. My card was verified quickly, and I received the payment directly. Highly recommend SellKaro!"
    },
    {
      name: "Aditi",
      avatar: "https://randomuser.me/api/portraits/women/65.jpg",
      rating: 4.5,
      review:
        "Great experience selling my Flipkart gift card. The verification and payment were quick and easy!"
    },
    {
      name: "Rahul",
      avatar: "https://randomuser.me/api/portraits/men/32.jpg",
      rating: 5,
      review:
        "Super easy to use! Got my Amazon card sold within minutes. Awesome and reliable platform!"
    }
  ];

  return (
    <Box sx={{ py: 4, }}>
      <Typography variant="h5" textAlign="center" sx={{ mb: 3, fontWeight: "bold" }}>
        What Our Users Say ❤️
      </Typography>

      <Swiper
      //If want Pagination add ,Pagination in modolue key array beside AutoPlay
        modules={[Autoplay]}
        spaceBetween={20}
        slidesPerView={1}
        pagination={{ clickable: true }}
        autoplay={{ delay: 2000, disableOnInteraction: false }}
        loop
        breakpoints={{
          600: { slidesPerView: 1 },
          900: { slidesPerView: 1 },
          1200: { slidesPerView: 1 }
        }}
        style={{ padding: "10px 20px" }}
      >
        {reviews.map((r, index) => (
          <SwiperSlide key={index}>
            <ReviewCard {...r} />
          </SwiperSlide>
        ))}
      </Swiper>
    </Box>
  );
};

export default AboutUsPage;
