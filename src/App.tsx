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
import ProductCreate from './components/admin/ProductCreate';
import ProductEdit from './components/admin/ProductEdit';
import ProductDetail from './components/admin/ProductDetail';
import ClientLayout from './components/client/ClientLayout';
import ProductListClient from './components/client/ProductListClient';
import OrderPage from './components/client/OrderPage';
import ContactPage from './components/client/ContactPage';
import AboutPage from './components/client/AboutPage';

const router = createBrowserRouter([
  {
    path: "/admin",
    element: <AdminLayout />,
  },
  {
    path: "/",
    element: <ClientLayout />,
    children :[{
      index:true,
      element :<ProductListClient/>
    }]
  },
  {
    path: "/productsl",
    element: <ProductListClient />,
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
  },
  {
    path:"/create",
    element: <ProductCreate />, 
  },
  {
    path:"/edit/:id",
    element: <ProductEdit />, 
  },
  {
    path:"/detail/:id",
    element: <ProductDetail />, 
  },
  {
  path: "/ordersl",
  element: <OrderPage />
},
{
  path: "/contact",
  element: <ContactPage />
},
{
  path: "/about",
  element: <AboutPage />
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