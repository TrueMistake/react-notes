import ReactDOM from 'react-dom/client';
import {BrowserRouter} from "react-router-dom";
import App from './App.tsx'
import './index.css'
import {CssBaseline} from "@mui/material";

ReactDOM.createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <CssBaseline />
    <App />
  </BrowserRouter>,
)
