import './App.css'
import {createBrowserRouter, createRoutesFromElements, Route, RouterProvider} from 'react-router-dom'
import RegistrationPage from './pages/RegistrationPage'
import LoginForm from './components/LoginForm'
import BasePage from './pages/BasePage'

function App() {

  const router = createBrowserRouter(createRoutesFromElements(
    <>
      <Route index element={<BasePage><LoginForm/></BasePage>} />
      <Route path='/register' element={<RegistrationPage />}/>
    </>
  ))

  return (
    <RouterProvider router={router} />
  )
}

export default App
