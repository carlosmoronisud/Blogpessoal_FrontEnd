/* eslint-disable no-irregular-whitespace */
// src/main.tsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { GoogleOAuthProvider } from "@react-oauth/google";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'; // Mantenha se ainda usar QueryClient
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'; // Mantenha se ainda usar Devtools


const queryClient = new QueryClient(); // Se não usar React Query, pode remover isso e o QueryClientProvider

// HARDCODED PARA TESTE: SEU CLIENT_ID AQUI.
const GOOGLE_CLIENT_ID = "323883270092-ke6bscn6njau06ssposa02vtsto0rdv7.apps.googleusercontent.com";


ReactDOM.createRoot(document.getElementById('root')!).render(

<React.StrictMode>
    <QueryClientProvider client={queryClient}> {/* Mantenha ou remova */}
        <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
            <App />
        </GoogleOAuthProvider>
    <ReactQueryDevtools initialIsOpen={false} /> {/* Mantenha ou remova */}
    </QueryClientProvider>
    <ToastContainer />
</React.StrictMode>,
);