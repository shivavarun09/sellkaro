import '@fontsource/inter';
import {} from "@mui/joy/styles";
import {BrowserRouter} from 'react-router-dom'
import RouterAdapter from './pages/UserPages/Home';
import AdminGcSingleCard from './pages/UserPages/AdminGCSingleCard';

function App() {
  return (
    <>
    <BrowserRouter>
          <RouterAdapter />
</BrowserRouter>
      {/* <AdminGcSingleCard /> */}
    </>
  );
}

export default App;
