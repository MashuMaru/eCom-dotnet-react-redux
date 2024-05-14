import React from 'react'
import ReactDOM from 'react-dom/client'
import App from '../src/app/layout/App.tsx'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';


ReactDOM.createRoot(document.getElementById('store-app')!).render(
  <React.StrictMode>
    <ToastContainer position="top-right" hideProgressBar theme="colored" />
    <App />
  </React.StrictMode>,
)
