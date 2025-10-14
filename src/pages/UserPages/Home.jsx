import * as React from 'react';
import {useState,useEffect} from 'react'
import { createTheme } from '@mui/material/styles';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import LogoutIcon from '@mui/icons-material/Logout';
import HistoryIcon from '@mui/icons-material/History';
import ContactPageIcon from '@mui/icons-material/ContactPage';
import EmailIcon from '@mui/icons-material/Email';
import HomeIcon from '@mui/icons-material/Home';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import InfoIcon from '@mui/icons-material/Info';
import CardGiftcardIcon from '@mui/icons-material/CardGiftcard';
import DescriptionIcon from '@mui/icons-material/Description';
import LayersIcon from '@mui/icons-material/Layers';
import { AppProvider } from '@toolpad/core/AppProvider';
import { DashboardLayout } from '@toolpad/core/DashboardLayout';
import { BrowserRouter, Routes, Route, useLocation, useNavigate, href } from 'react-router-dom';
import { Box, Typography } from '@mui/material';
import Login from './Login'
import Register from './Register'
import SellGiftCardForm from "./SellGiftCardForm"
import SellHistory from './GiftcardSellHistory'
import ProfilePage from './ProfilePage';
import HomeLandingPage from './HomeLandingPage';
import AboutUsPage from './AboutUsPage'


// const adminNav = [
//     {
//     kind: 'header',
//     title: 'Giftcard orders',
//   },
//   { segment: 'all', title: 'All', icon: <LogoutIcon /> },
//   { segment: 'pending', title: 'Pending', icon: <LogoutIcon /> },
//   { segment: 'rejected', title: 'Rejected', icon: <LogoutIcon /> },
//   { segment: 'accepted', title: 'Accepted', icon: <LogoutIcon /> },
//     { kind: 'divider' },
// ];

// if (loggedInUserRole === 'admin') {
//   // Insert adminNav at 3rd position (index 2)
//   NAVIGATION.splice(4, 0, ...adminNav);
// }


// const nav = ["aboutUs","sellgiftcards","orderhistory","giftCards"]; // segments to remove
// if (loggedInUserRole === 'admin') {
//   NAVIGATION = NAVIGATION.filter(item => !nav.includes(item.segment)&& !nav.includes(item.title));
// }

// Theme configuration
const demoTheme = createTheme({
  cssVariables: {
    colorSchemeSelector: 'data-toolpad-color-scheme',
  },
  colorSchemes: { light: true, dark: true },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 600,
      lg: 1200,
      xl: 1536,
    },
  },
});

// Components for each route
function EmailRedirect() {
  React.useEffect(() => {
    window.location.href = "mailto:contactus@sellkaro.com"; // Mail
  }, []);
  return <Typography sx={{ p: 4 }}>Opening Email…</Typography>;
}

function WhatsAppRedirect() {
  React.useEffect(() => {
    const phoneNumber = "000000000"; // Whatsapp Number
    const message = "Hello, I am interested in selling my gift cards"; // message
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
      window.open(url, "_blank", "noopener,noreferrer");
  }, []);

  return <Typography sx={{ p: 4 }}>Opening WhatsApp…</Typography>;
}
function AboutUs() {
  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4">This is AboutUs page</Typography>
      <Typography>This is aboutUs</Typography>
    </Box>
  );
}






// Router adapter for AppProvider
function  RouterAdapter() {
  const location = useLocation();
  const navigate = useNavigate();

  const router = {
    pathname: location.pathname,
    navigate: (path) => navigate(path),
  };

    const [userRole, setUserRole] = useState("");
  useEffect(() => {
  // This effect runs whenever userRole changes
  // or when you manually read from localStorage
  const storedRole = JSON.parse(localStorage.getItem("userToken") || "{}")?.role || null;
  if(setUserRole!=userRole){
    setUserRole(storedRole);
  }
}, [userRole]); // dependency array


 let NAVIGATION = [
    { kind: "header", title: "Personal Panel" },
    { segment: "home", title: "Home", icon: <HomeIcon /> },
    { segment: "profile", title: "Profile", icon: <AccountBoxIcon /> },
    { kind: "divider" },
    ...(userRole === "admin"
      ? [
          { kind: "header", title: "Admin Panel" },
          { segment: "all", title: "All Orders", icon: <LogoutIcon /> },
        ]
      : [
          { kind: "header", title: "GiftCards" },
          { segment: "sellgiftcards", title: "Sell GiftCards", icon: <CardGiftcardIcon /> },
          { segment: "orderhistory", title: "Orders", icon: <HistoryIcon /> },
            { kind: "divider" },
    { kind: "header", title: "Others" },
    {
      title: "ContactUs",
      icon: <ContactPageIcon />,
      children: [
        { title: "Email", icon: <EmailIcon />, segment: "email" },
        { title: "WhatsApp", icon: <WhatsAppIcon />, segment: "whatsapp" },
      ],
    },
    // { segment: "aboutUs", title: "About Us", icon: <InfoIcon /> },
        ]),
        
    !userRole && { segment: "login", title: "Login", icon: <LogoutIcon /> },
  ].filter(Boolean); // remove null/false entries

if (userRole === "admin") {
  NAVIGATION = NAVIGATION.filter(item => item.segment !== "home");
}


  return (
    <AppProvider navigation={NAVIGATION} router={router}     theme={demoTheme}  branding={{title:"SellKaro", logo:<CardGiftcardIcon />}} >
      <DashboardLayout>
        <Routes>
          <Route path="/login" element={<Login setUserRole={setUserRole}/>} />
          <Route path="/home" element={<HomeLandingPage />} />
          <Route path="/profile" element={<ProfilePage userRole={userRole}/>} />
          <Route path="/sellgiftcards" element={<SellGiftCardForm />} />
          <Route path="/orderhistory" element={<SellHistory userRole={userRole}/>} />
          <Route path="/all" element={<SellHistory userRole={userRole}/>} />
          <Route path="/email" element={<EmailRedirect />} />
          <Route path="/whatsapp" element={<WhatsAppRedirect />} />
          <Route path="/aboutus" element={<AboutUsPage />} />
          <Route path="/register" element={<Register />} />  
          <Route path="*" element={<HomeLandingPage />} /> {/* Fallback route */}
        </Routes>
      </DashboardLayout>
    </AppProvider>
  );
}


export default RouterAdapter;