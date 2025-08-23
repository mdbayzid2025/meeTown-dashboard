import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router-dom'
import router from './routes/routes.tsx'
import ReduxProvider from './redux/lib/ReduxProvider.tsx'
import { ToastContainer } from 'react-toastify'
import { AntdRegistry } from '@ant-design/nextjs-registry';


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ReduxProvider>
      <ToastContainer position='top-right' autoClose={2000}/>        
    <RouterProvider router={router}/>    
    </ReduxProvider>
  </StrictMode>,
)
