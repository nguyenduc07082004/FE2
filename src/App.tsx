import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import './App.css';
import AdminLayout from './components/admin/AdminLayout';
import Dashboard from './components/admin/Dashboard';
import ProductList from './components/admin/ProductList';
import CategoryList from './components/admin/CategoryList';
import UserList from './components/admin/UserList';
import OrderList from './components/admin/OrderList';
import BrandList from './components/admin/BrandList';
import ReportList from './components/admin/ReportDashboard';

const router = createBrowserRouter([
  {
    path: "/",
    element: <AdminLayout />,
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
  },
  {
    path: "/products",
    element: <ProductList />,
  },
  {
    path: "/categories",
    element: <CategoryList />,
  },
  {
    path: "/users",
    element: <UserList />,
  },
  {
    path: "/orders",
    element:<OrderList/>
  },
  {
    path: "/brands",
    element:<BrandList/>
  },
  {
    path: "/reports",
    element:<ReportList/>
  }
]);

function App() {
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;