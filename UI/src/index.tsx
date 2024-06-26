import React from 'react'
import ReactDOM from 'react-dom/client'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import {RouterProvider} from "react-router-dom";
import {router} from "./app/router/Routes.tsx";
import {Provider} from "react-redux";
import {store} from "./app/store/configureStore.ts";

ReactDOM.createRoot(document.getElementById('store-app')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
    <ToastContainer position="top-right" hideProgressBar theme="colored" />
  </React.StrictMode>,
)
