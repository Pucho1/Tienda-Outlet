import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { injectSpeedInsights } from '@vercel/speed-insights';

import './index.css'
import App from './App.tsx'
import { AuthProvider } from './context/AuthContext.tsx'
import { AlertProvider } from './context/AlertContext.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AlertProvider>
      <AuthProvider>
        <App />
      </AuthProvider>
    </AlertProvider>
  </StrictMode>,
)

injectSpeedInsights()
