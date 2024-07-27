import './App.css'
import { useState } from "react";
import {createBrowserRouter, createRoutesFromElements, Route, RouterProvider} from 'react-router-dom'
import LoginForm from './components/LoginForm'
import RegistrationForm from './components/RegistrationForm'
import BasePage from './pages/BasePage'
import ToastList from './components/ToastList'
import ToastContext from './contexts/ToastContext'

function App() {
  const [toasts, setToasts] = useState([]);

  const showToast = (type, message) => {
    const toast = {
      'id': Date.now(),
      'type': type,
      'message': message,
    }

    setTimeout(() => {
      removeToast(toast.id)
    }, 100000); // 10 seconds

    setToasts((prevToasts) => [...prevToasts, toast]);
  }

  const removeToast = (id) => {
    setToasts((prevToasts) => prevToasts.filter(toast => toast.id !== id) )
  }

  const router = createBrowserRouter(createRoutesFromElements(
    <>
      <Route index element={<BasePage><LoginForm/></BasePage>} />
      <Route path='/register' element={<BasePage><RegistrationForm/></BasePage>}/>
    </>
  ))

  return (
      <ToastContext.Provider value={showToast}>
      <RouterProvider router={router} />
      <ToastList data={toasts} removeToast={removeToast}/>
      </ToastContext.Provider>
  );
}

export default App
