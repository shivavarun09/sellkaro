import * as React from 'react';
import { createTheme } from '@mui/material/styles';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import BarChartIcon from '@mui/icons-material/BarChart';
import DescriptionIcon from '@mui/icons-material/Description';
import LayersIcon from '@mui/icons-material/Layers';
import { AppProvider } from '@toolpad/core/AppProvider';
import { DashboardLayout } from '@toolpad/core/DashboardLayout';
import { BrowserRouter, Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import { Box, Typography } from '@mui/material';

// Navigation configuration
const NAVIGATION = [
  {
    kind: 'header',
    title: 'Main items',
  },
  {
    segment: 'dashboard',
    title: 'Dashboard',
    icon: <DashboardIcon />,
  },
  {
    segment: 'orders',
    title: 'Orders',
    icon: <ShoppingCartIcon />,
  },
  {
    kind: 'divider',
  },
  {
    kind: 'header',
    title: 'Analytics',
  },
  {
    segment: 'reports',
    title: 'Reports',
    icon: <BarChartIcon />,
    children: [
      {
        segment: 'sales',
        title: 'Sales',
        icon: <DescriptionIcon />,
      },
      {
        segment: 'traffic',
        title: 'Traffic',
        icon: <DescriptionIcon />,
      },
    ],
  },
  {
    segment: 'integrations',
    title: 'Integrations',
    icon: <LayersIcon />,
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
function Dashboard() {
  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4">Dashboard Page</Typography>
      <Typography>Welcome to the main dashboard!</Typography>
    </Box>
  );
}

function Orders() {
  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4">Orders Page</Typography>
      <Typography>View and manage your orders here.</Typography>
    </Box>
  );
}

function Sales() {
  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4">Sales Reports</Typography>
      <Typography>Analyze sales data and trends.</Typography>
    </Box>
  );
}

function Traffic() {
  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4">Traffic Reports</Typography>
      <Typography>Monitor website traffic statistics.</Typography>
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
    <AppProvider navigation={NAVIGATION} router={router} theme={demoTheme}>
      <DashboardLayout>
        <Routes>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/reports/sales" element={<Sales />} />
          <Route path="/reports/traffic" element={<Traffic />} />
          <Route path="/integrations" element={<Integrations />} />
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