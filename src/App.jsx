import { Routes, Route } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Home from "./pages/Home";
import '@fontsource/inter';
import Test from "./pages/test";
import {} from "@mui/joy/styles"
import DashboardLayoutBasic from './pages/Home'

function App() {
  return (
<DashboardLayoutBasic/>
    // <Routes>
    
    //   <Route path="*" element={<Home />} />
    //   <Route path="/register" element={<Register />} />
    //   <Route path="/login" element={<Login />} />
    // </Routes>
  );
}

export default App;
