import * as React from 'react';
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
import GiftCardCard from './SingleGiftCard';
import ProfilePage from './ProfilePage';

 const token = localStorage.getItem("token"); // check if user logged in
// Navigation configuration
const NAVIGATION = [
  {
    kind: 'header',
    title: 'Main items',
  },
  {
    segment: 'home',
    title: 'Home',
    icon: <HomeIcon />,
  },
   {
    segment: 'profile',
    title: 'Profile',
    icon: <AccountBoxIcon />,
  },
  {
    kind: 'divider',
  },
  {
    kind: 'header',
    title: 'giftCards',
  },
    {
    segment: 'allgiftcards',
    title: 'Allgiftcards',
    icon: <CardGiftcardIcon />,
  },
  {
    kind: 'header',
    title: 'filter Giftcards',
  },
  {
  title: 'ContactUs',
  icon: <ContactPageIcon />,
  children: [
    {
      title: 'pending',
      icon: <EmailIcon />,
segment:'email',
    },
    {
      title: 'rejected',
      icon: <WhatsAppIcon />,
segment:"whatsapp",
    },
      {
      title: 'successfull',
      icon: <WhatsAppIcon />,
segment:"whatsapp",
    },
  ],
},
  {
    segment: 'aboutUs',
    title: 'AboutUs',
    icon: <InfoIcon />,
  },
 !token &&{ segment: 'login', title: 'Login', icon: <InfoIcon /> }
    
,
];

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

function Dashboard() {
  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4">Dashboard Page</Typography>
      <Typography>Welcome to the main dashboard!</Typography>
    </Box>
  );
}


// Router adapter for AppProvider
function  AdminDashboard() {
  const location = useLocation();
  const navigate = useNavigate();

  const router = {
    pathname: location.pathname,
    navigate: (path) => navigate(path),
  };

  return (
    <AppProvider navigation={NAVIGATION} router={router}     theme={demoTheme}  branding={{title:"SellKaro", logo:<CardGiftcardIcon />}} >
      <DashboardLayout>
        <Routes>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/sellgiftcards" element={<SellGiftCardForm />} />
          <Route path="/orderhistory" element={<SellHistory />} />
          <Route path="/integrations" element={<Integrations />} />
          <Route path="/email" element={<EmailRedirect />} />
          <Route path="/whatsapp" element={<WhatsAppRedirect />} />
          <Route path="/aboutus" element={<AboutUs />} />
<Route path="/login" element={<Login />} />
<Route path="/register" element={<Register />} />  
          <Route path="*" element={<Dashboard />} /> {/* Fallback route */}
        </Routes>
      </DashboardLayout>
    </AppProvider>
  );
}



export default AdminDashboard;