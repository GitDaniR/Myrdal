import './App.css'
import {createBrowserRouter, createRoutesFromElements, Route, RouterProvider} from 'react-router-dom'
import LoginForm from './components/LoginForm'
import RegistrationForm from './components/RegistrationForm'
import BasePage from './pages/BasePage'

function App() {

  const router = createBrowserRouter(createRoutesFromElements(
    <>
      <Route index element={<BasePage><LoginForm/></BasePage>} />
      <Route path='/register' element={<BasePage><RegistrationForm/></BasePage>}/>
    </>
  ))

  return (
    <RouterProvider router={router} />
  )
}

export default App
