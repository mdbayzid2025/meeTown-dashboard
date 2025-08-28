import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import './index.css'
import ReduxProvider from './redux/lib/ReduxProvider.tsx'
import router from './routes/routes.tsx'


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ReduxProvider>
      <ToastContainer position='top-right' autoClose={2000}/>        
    <RouterProvider router={router}/>    
    </ReduxProvider>
  </StrictMode>,
)
