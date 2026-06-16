import { createBrowserRouter, RouterProvider } from 'react-router'
import SurveyForm from './pages/Form.jsx'
import SurveyTable from './pages/Table.jsx'

const router = createBrowserRouter([
    {
      path:'/',
      element: <SurveyForm/>
    },
    {
      path:'/show',
      element: <SurveyTable/>
    }
])

function App() {
  return (
    <>
      <RouterProvider router={router}/>
    </>
  )
}

export default App