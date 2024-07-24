import './App.css'
import {createBrowserRouter, createRoutesFromElements, Route, RouterProvider} from 'react-router-dom'
import RegistrationPage from './pages/RegistrationPage'
import LoginPage from './pages/LoginPage'

function App() {

  const router = createBrowserRouter(createRoutesFromElements(
    <>
      <Route index element={<LoginPage />} />
      <Route path='/register' element={<RegistrationPage />}/>
    </>
  ))

  return (
    <RouterProvider router={router} />
  )
}

export default App
