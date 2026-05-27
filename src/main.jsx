import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import { AuthProvider } from '../src/providers/AuthProvider.jsx'
import i18n from '../i18n.js'
import { I18nextProvider } from 'react-i18next';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AppProvider } from './providers/AppProvider.jsx'
const queryClient = new QueryClient();

createRoot(document.getElementById('root')).render(
   <StrictMode>
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <I18nextProvider i18n={i18n}>
          <AuthProvider>
            <AppProvider>
              <App />
            </AppProvider>
          </AuthProvider>
        </I18nextProvider>
      </QueryClientProvider>
    </BrowserRouter>
  </StrictMode>,
)
