import * as React from "react";
import { useContext } from "react";
import { createTheme } from "@mui/material/styles";
import { Box, Typography } from "@mui/material";
import { AppProvider } from "@toolpad/core/AppProvider";
import { DashboardLayout } from "@toolpad/core/DashboardLayout";
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";

import AccountBoxIcon from "@mui/icons-material/AccountBox";
import LogoutIcon from "@mui/icons-material/Logout";
import HistoryIcon from "@mui/icons-material/History";
import ContactPageIcon from "@mui/icons-material/ContactPage";
import EmailIcon from "@mui/icons-material/Email";
import HomeIcon from "@mui/icons-material/Home";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import CardGiftcardIcon from "@mui/icons-material/CardGiftcard";
import LoginIcon from "@mui/icons-material/Login";

import Login from "./Login";
import Register from "./Register";
import SellGiftCardForm from "./SellGiftCardForm";
import SellHistory from "./GiftcardSellHistory";
import ProfilePage from "./ProfilePage";
import HomeLandingPage from "./HomeLandingPage";
import AboutUsPage from "./AboutUsPage";
import LoginAndRegister from "./LoginAndRegister";
import LogoutConfirm from "./LogoutModal";

import { UserContext, UserProvider } from "./UserContext";

const demoTheme = createTheme({
  cssVariables: { colorSchemeSelector: "data-toolpad-color-scheme" },
  colorSchemes: { light: true, dark: true },
  breakpoints: { values: { xs: 0, sm: 600, md: 600, lg: 1200, xl: 1536 } },
});

function EmailRedirect() {
  React.useEffect(() => {
    window.location.href = "mailto:contactus@sellkaro.com";
  }, []);
  return <Typography sx={{ p: 4 }}>Opening Email…</Typography>;
}

function WhatsAppRedirect() {
  React.useEffect(() => {
    const phoneNumber = "000000000";
    const message = "Hello, I am interested in selling my gift cards";
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank", "noopener,noreferrer");
  }, []);
  return <Typography sx={{ p: 4 }}>Opening WhatsApp…</Typography>;
}

function RouterAdapter() {
  const location = useLocation();
  const navigate = useNavigate();
  const { userRole, clearData } = useContext(UserContext);

  const router = { pathname: location.pathname, navigate: (path) => navigate(path) };

  // Navigation array dynamically updates based on userRole
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
        ]),
    !userRole && { segment: "login", title: "Login", icon: <LoginIcon /> },
    userRole && { segment: "logout", title: "Logout", icon: <LogoutIcon /> },
  ].filter(Boolean);

  if (userRole === "admin") NAVIGATION = NAVIGATION.filter((item) => item.segment !== "home");

  return (
    <AppProvider
      navigation={NAVIGATION}
      router={router}
      theme={demoTheme}
      branding={{ title: "SellKaro", logo: <CardGiftcardIcon /> }}
    >
      <DashboardLayout>
        <Routes>
          <Route path="/login" element={<LoginAndRegister />} />
          <Route path="/home" element={<HomeLandingPage />} />
          <Route path="/profile" element={<ProfilePage userRole={userRole} />} />
          <Route path="/sellgiftcards" element={<SellGiftCardForm />} />
          <Route path="/orderhistory" element={<SellHistory />} />
          <Route path="/all" element={<SellHistory />} />
          <Route path="/email" element={<EmailRedirect />} />
          <Route path="/whatsapp" element={<WhatsAppRedirect />} />
          <Route path="/aboutus" element={<AboutUsPage />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/logout"
            element={
              <LogoutConfirm
                onLogout={() => {
                  clearData(); // clears userRole & token
                  navigate("/login");
                }}
              />
            }
          />
          <Route path="*" element={<HomeLandingPage />} />
        </Routes>
      </DashboardLayout>
    </AppProvider>
  );
}

export default function AppRouterWrapper() {
  return (
    <UserProvider>
      <RouterAdapter />
    </UserProvider>
  );
}
