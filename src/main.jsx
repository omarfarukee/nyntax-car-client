import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import routes from './Routes/Routes.jsx'
import { RouterProvider } from 'react-router-dom'
import { ToastProvider } from 'react-toast-notifications'
import  { QueryClient, QueryClientProvider } from '@tanstack/react-query'
const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')).render(
  <QueryClientProvider client={queryClient}>
  <React.StrictMode>
     <ToastProvider  
    autoDismiss
    autoDismissTimeout={6000}>
    <RouterProvider router={routes} />
    </ToastProvider>
  </React.StrictMode>
  </QueryClientProvider>,
)
