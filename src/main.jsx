import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import {
  RouterProvider,
} from "react-router-dom";
import { router } from './assets/Routes/Routes.jsx';
import Authprovide from './assets/Hooks/useAutth/AuthProvider/Authprovide.jsx';
import {
 
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Authprovide>
    <QueryClientProvider client={queryClient}>
    <RouterProvider router={router} />

    </QueryClientProvider>
    </Authprovide>
  </React.StrictMode>,
)