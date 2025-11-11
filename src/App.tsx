import { RouterProvider  } from 'react-router';

import { router } from './Routes/routes';

import './App.css'

function App() {
  return <RouterProvider router={router} />
};

export default App;
