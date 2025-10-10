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
const UserReviewSwipper = () => {
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
      avatar: "https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcRAxpJywA4UhMr9Zi2gkxqtd_IUQUv1W59l8IB7vQ41K0-j4can_c-lfXJTXfogFtee4L3W2_BfHkwGjjfQZhEvOxxdhE_JWi-YygU-avo",
      rating: 4.5,
      review:"I had a few unused Myntra gift cards lying around, so I tried SellKaro. The whole process was super easy — uploaded the card, and got paid straight to my account within minutes. Such a convenient way to get quick cash as a student!"
    },
    {
      name: "Rahul",
      avatar: "https://static.wikitide.net/deathbattlewiki/1/10/Portrait.satorugojo.png",
      rating: 5,
      review:
"I sold my Flipkart gift card on SellKaro after reading good reviews, and I must say it’s totally worth it. The interface is clean, the steps are simple, and I got my money almost instantly. Highly recommended for anyone who shops online often!" 
   },
   {
  name: "Nehal",
  avatar: "https://m.media-amazon.com/images/I/71V7EyCBtiL.jpg",
  rating: 5,
  review:
    "I had an unused Amazon gift card and decided to try SellKaro. The process was super fast and smooth — got my payment within minutes! Totally reliable and user-friendly platform."
}

  ];

  return (
    <Box sx={{ py: 4, }}>
      <Typography variant="h5" textAlign="center" sx={{ mb: 0,fontWeight:"bold" }}>
        What Our Users Say ❤️
      </Typography>

      <Swiper
      //If want Pagination add ,Pagination in modolue key array beside AutoPlay
        modules={[Autoplay]}
        spaceBetween={20}
        slidesPerView={1}
        pagination={{ clickable: true }}
        autoplay={{ delay: 2500, disableOnInteraction: false }}
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

export default UserReviewSwipper;
