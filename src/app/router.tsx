import { createBrowserRouter } from 'react-router-dom';
import OsDesktop from '../components/OsDesktop/OsDesktop';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <OsDesktop />,
  },
]);