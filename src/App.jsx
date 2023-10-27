import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './pages/Home';
import Landing from './pages/Landing';


function App() {
  const router = createBrowserRouter([
    {
      path: '*',
      element: <div>404 Not Found</div>
    },
    {
      path: '/',
      element: <Landing />
    },
    {
      path: '/home',
      element: <Home />
    },
  ])

  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App
