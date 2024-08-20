// External dependencies
import { useState } from "react";
import {createBrowserRouter, createRoutesFromElements, Route, RouterProvider} from 'react-router-dom';

// Utils
import ToastContext from './utils/ToastContext';
import ProtectedRoutes from './utils/ProtectedRoutes';

// Components
import LoginForm from './components/LoginForm';
import RegistrationForm from './components/RegistrationForm';
import ToastList from './components/ToastList';

// Pages
import BasePage from './pages/BasePage';
import DashboardPage from "./pages/DashboardPage";
import NotFoundPage from './pages/NotFoundPage';
import SettingsPage from "./pages/SettingsPage";
import ErrorPage from "./pages/ErrorPage";

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
    }, 10000); // 10 seconds

    setToasts((prevToasts) => [...prevToasts, toast]);
  }

  const removeToast = (id) => {
    setToasts((prevToasts) => prevToasts.filter(toast => toast.id !== id) )
  }

  const router = createBrowserRouter(createRoutesFromElements(
    <Route errorElement={<ErrorPage/>}>
      <Route index element={<BasePage><LoginForm/></BasePage>} />
      <Route path="/register" element={<BasePage><RegistrationForm/></BasePage>}/>
      <Route element={<ProtectedRoutes/>}>
        <Route path="/dashboard" element={<DashboardPage/>}/>
        <Route path="/settings" element={<SettingsPage/>}/>
      </Route>
      <Route path="*" element={<NotFoundPage/>} />
    </Route>
  ))

  return (
      <ToastContext.Provider value={showToast}>
        <RouterProvider router={router} />
        <ToastList data={toasts} removeToast={removeToast}/>
      </ToastContext.Provider>
  );
}

export default App
