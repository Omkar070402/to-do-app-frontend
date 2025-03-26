import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import '../node_modules/bootstrap/dist/js/bootstrap.min.js'
import { ToastContainer, toast } from 'react-toastify';
import { TaskProvider } from './Context/TaskContext.jsx'

createRoot(document.getElementById('root')).render(

  <TaskProvider>
    <ToastContainer />
    <App />
  </TaskProvider>

)
