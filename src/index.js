import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter,RouterProvider } from 'react-router-dom';
import ZakatCalculator from "./Components/ZakatCal/ZakatCal";
import './index.css';
import Root from './Root';
import App from './App';
import Error from './Pages/Error/Error';






const Route =createBrowserRouter([

  {
    path: '/',
    element: <Root />,
    children: [
      {
        path: '/app',
        element: <App />,
      },
      {
        path: '/zakat-calculator',
        element:<ZakatCalculator/>
      },
      {
        path: '*',
        element: <Error />,
      }
    ]

    }
])



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <>
  <React.StrictMode>
    <RouterProvider router={Route}/>
  </React.StrictMode>
  </>
);

