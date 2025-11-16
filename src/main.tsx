
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { CartProvider } from './context/CartContext.tsx'
import AOS from 'aos'
import 'aos/dist/aos.css'

// AOS
AOS.init({
  duration: 800,
  easing: 'ease-in-out',
  once: true,
  offset: 100,
})

createRoot(document.getElementById('root')!).render(
 
    <CartProvider>
      <App />
    </CartProvider>
)
