import '@fontsource/inter';
import {} from "@mui/joy/styles";
import {BrowserRouter} from 'react-router-dom'
import RouterAdapter from './pages/UserPages/Home';
import AdminGcSingleCard from './pages/UserPages/AdminGCSingleCard';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <>
    <BrowserRouter>
          <RouterAdapter />
            <ToastContainer position="top-right" autoClose={3000} />
</BrowserRouter>
      {/* <AdminGcSingleCard /> */}
    </>
  );
}

export default App;
