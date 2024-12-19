import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import App from './App.tsx'
import store from "./redux/store.ts"
import { Provider } from 'react-redux'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
   <Provider store={store} children={ <App />}>
   </Provider>
  </StrictMode>,
)