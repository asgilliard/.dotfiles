import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router'
import { router } from './app/routes'
import { CategoryProvider } from './app/context/CategoryContext'
import './styles/index.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <CategoryProvider>
      <RouterProvider router={router} />
    </CategoryProvider>
  </StrictMode>
)
