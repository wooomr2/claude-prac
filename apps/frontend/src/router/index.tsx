import { createBrowserRouter } from 'react-router-dom';
import DashboardPage from '@/pages/Dashboard';

const router = createBrowserRouter([
  {
    path: '/',
    element: <DashboardPage />,
  },
]);

export default router;
