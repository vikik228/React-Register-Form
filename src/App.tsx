import { createBrowserRouter, RouterProvider } from "react-router-dom"
import { RegisterPage } from "./pages/registerPage/RegisterPage.tsx";
import LoginPage from "./pages/loginPage/LoginPage.tsx";
import {Toaster} from "react-hot-toast";
import AuthPage from "./pages/authPage/AuthPage.tsx";

const router = createBrowserRouter(
    [
      {
        path: "/",
        element: <RegisterPage />
      },
      {
        path: "/login",
        element: <LoginPage />
      },
        {
            path: "/Auth",
            element: <AuthPage />
        }
    ],
    {
        basename: "/React-Register-Form"
    }
);

function App() {
  return (
      <div>
        <RouterProvider router={router}/>
          <Toaster position={"top-center"} reverseOrder={false}/>
      </div>
  )
}

export default App;
