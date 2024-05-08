import React from 'react'
import ReactDOM from 'react-dom/client'
import App from '../src/app/layout/App.tsx'

ReactDOM.createRoot(document.getElementById('store-app')!).render(
    <React.StrictMode>
        <App />
    </React.StrictMode>,
)
