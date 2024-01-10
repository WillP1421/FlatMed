import React, { useEffect } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import About from "./About";
import Contact from "./Contact";
import Directory from "./Directory";
import LoginPage from "./LoginPage";
import Home from "./Home";
import Admin from "./Admin";
  

const App = () => {
  

const routes = [
    {
      path: "/",
      element: <Home />
    },
    {
      path: "/about",
      element: <About />
    },
    {
      path: "/contact",
      element: <Contact />
    },
    {
      path: "/directory",
      element: <Directory />
    },
    {
      path: "/login",
      element: <LoginPage />
    },
    {
      path: "/admin",
      element: <Admin />
    }
  ]
const router = createBrowserRouter(routes);

  return (
  <div className='App'>
    <RouterProvider router={router}/>
    </div>
  )
}

export default App;
