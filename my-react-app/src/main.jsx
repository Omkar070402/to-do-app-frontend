import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

import { ToastContainer, toast } from 'react-toastify';
import { TaskProvider } from './Context/TaskContext.jsx'

createRoot(document.getElementById('root')).render(

  <TaskProvider>
    <ToastContainer />
    <App />
  </TaskProvider>

)
