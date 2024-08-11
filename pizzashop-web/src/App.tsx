import './global.css'

import { Helmet, HelmetProvider } from 'react-helmet-async'
import { RouterProvider } from 'react-router-dom'

import { routes } from './routes'

export function App() {
  return (
    <HelmetProvider>
      <Helmet titleTemplate="%s | pizza.shop" />
      <RouterProvider router={routes} />
    </HelmetProvider>
  )
}
// %s => means: where every page title will be replaced it
// | pizza.shop => will be display in all pages
