import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import { AuthProvider } from '../src/providers/AuthProvider.jsx'
import i18n from '../i18n.js'
import { I18nextProvider } from 'react-i18next';

createRoot(document.getElementById('root')).render(
  <StrictMode>
      <I18nextProvider i18n={i18n}>
      <BrowserRouter>
      <AuthProvider>
        <App />
        </AuthProvider>
      </BrowserRouter>
    </I18nextProvider>
  </StrictMode>,
)
