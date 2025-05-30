import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { AliveScope } from 'react-activation'
import './app.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <AliveScope>
      <App />
    </AliveScope>
  </BrowserRouter>,
)
