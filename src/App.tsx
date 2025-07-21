import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import './App.css';
import AdminLayout from './components/admin/AdminLayout';
import Dashboard from './components/admin/Dashboard';
import ProductList from './components/admin/ProductList';
import CategoryList from './components/admin/CategoryList';

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
]);

function App() {
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;