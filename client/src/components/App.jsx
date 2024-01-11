import React, { useEffect } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import About from "./About";
import Contact from "./Contact";
import Directory from "./Directory";
import LoginPage from "./LoginPage";
import Home from "./Home";
import Admin from "./Admin";
import SignupPage from "./Signup";
import Patient_Portal from "./Patient_Portal";
import PatientProfile from "./PatientProfile";
import { AuthProvider} from "./AuthContext";
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
      path: "/signup",
      element: <SignupPage />
    },
    {
      path: "/admin",
      element: <Admin />
    },
    {
      path: "/patient_portal",
      element: <Patient_Portal />
    },
    {
      path: "/patient_profile/:id",
      element: <PatientProfile />
    }
  ]
const router = createBrowserRouter(routes);

  return (
  <div className='App'>
    <AuthProvider>
    <RouterProvider router={router}/>
    </AuthProvider>
    </div>
  )
}

export default App;
