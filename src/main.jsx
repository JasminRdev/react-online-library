import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { MovieProvider } from "./context/MovieContext"
import { BrowserRouter } from "react-router-dom";
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <MovieProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </MovieProvider>

  </StrictMode>,
)
