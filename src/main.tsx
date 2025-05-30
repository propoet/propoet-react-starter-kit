import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './app.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
)
