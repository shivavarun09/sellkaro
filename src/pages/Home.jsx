import * as React from 'react';
import { createTheme } from '@mui/material/styles';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
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
import Login from '../pages/Login'
import Register from '../pages/Register'


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
    segment: 'sellgiftcards',
    title: 'SellGiftCards',
    icon: <CardGiftcardIcon />,
  },
    {
    segment: 'orders',
    title: 'Orders',
    icon: <ShoppingCartIcon />,
  },
  {
    kind: 'header',
    title: 'Others',
  },
  {
  title: 'ContactUs',
  icon: <ContactPageIcon />,
  children: [
    {
      title: 'Email',
      icon: <EmailIcon />,
segment:'email',
    },
    {
      title: 'WhatsApp',
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
    {
    segment: 'login',
    title: 'Login',
    icon: <InfoIcon />,
  },
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

// Components for each route
function EmailRedirect() {
  React.useEffect(() => {
    window.location.href = "mailto:yourmail@example.com"; // Mail
  }, []);
  return <Typography sx={{ p: 4 }}>Opening Email…</Typography>;
}

function WhatsAppRedirect() {
  React.useEffect(() => {
    const phoneNumber = "919876543210"; // Whatsapp Number
    const message = "Hello, I am interested in selling my gift cards"; // message
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
      window.open(url, "_blank", "noopener,noreferrer");
  }, []);

  return <Typography sx={{ p: 4 }}>Opening WhatsApp…</Typography>;
}




function Dashboard() {
  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4">Dashboard Page</Typography>
      <Typography>Welcome to the main dashboard!</Typography>
    </Box>
  );
}

function Profile() {
  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4">Profile Page</Typography>
      <Typography>This is Profile Page</Typography>
    </Box>
  );
}

function SellGiftCards() {
  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4">Sell Gift Page form</Typography>
      <Typography>This is sell Gift card Page</Typography>
    </Box>
  );
}
function Orders() {
  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4">Orders Page</Typography>
      <Typography>View your listed orders here.</Typography>
    </Box>
  );
}



function AboutUs() {
  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4">This is AboutUs page</Typography>
      <Typography>This is aboutUs</Typography>
    </Box>
  );
}

function Integrations() {
  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4">Integrations</Typography>
      <Typography>Manage third-party integrations.</Typography>
    </Box>
  );
}

// Router adapter for AppProvider
function RouterAdapter() {
  const location = useLocation();
  const navigate = useNavigate();

  const router = {
    pathname: location.pathname,
    navigate: (path) => navigate(path),
  };

  return (
    <AppProvider navigation={NAVIGATION} router={router} theme={demoTheme} branding={{title:"SellKaro", logo:<CardGiftcardIcon />}} >
      <DashboardLayout>
        <Routes>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/sellgiftcards" element={<SellGiftCards />} />
          <Route path="/orders" element={<Orders />} />
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

function DashboardLayoutBasic() {
  return (
      <RouterAdapter />
  );
}

export default DashboardLayoutBasic;