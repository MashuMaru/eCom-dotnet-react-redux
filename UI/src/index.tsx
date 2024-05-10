import React from 'react'
import ReactDOM from 'react-dom/client'
import App from '../src/app/layout/App.tsx'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

ReactDOM.createRoot(document.getElementById('store-app')!).render(
    <React.StrictMode>
      <ToastContainer position="top-right" hideProgressBar theme="colored" />
        <App />
    </React.StrictMode>,
)
