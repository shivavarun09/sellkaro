import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter} from "react-router-dom"
import './index.css'
import App from './App.jsx'

import {CssVarsProvider} from "@mui/joy/styles"
//app wide theme

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
    <CssVarsProvider>
        <App />
    </CssVarsProvider>
    </BrowserRouter>
  </StrictMode>,
)
