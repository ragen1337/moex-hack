import React from 'react'
import ReactDOM from 'react-dom/client'
import {App} from './app.tsx'

import "primereact/resources/themes/lara-light-indigo/theme.css";
import "./styles.css";
import "primeicons/primeicons.css";
import {BrowserRouter} from 'react-router-dom';


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
)
