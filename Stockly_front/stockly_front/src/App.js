import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/dashboard/Home';
import Dashboard from './pages/dashboard/Dashboard';
import Products from './pages/dashboard/Products/Products';
import AddProduct from './pages/dashboard/Products/AddProduct';
import Categories from './pages/dashboard/Products/Categories';
import NewCategory from './pages/dashboard/Products/Newcategory';
import Sales from './pages/dashboard/Sales/Sales';
import Newsale from './pages/dashboard/Sales/Newsale';
import Orders from './pages/dashboard/Orders/Orders';
import Neworder from './pages/dashboard/Orders/Neworder';
import Employees from './pages/dashboard/Employees/Employees';
import Newemployee from './pages/dashboard/Employees/Newemployee';




function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<Home />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="products" element={<Products />} />
          <Route path="addproduct" element={<AddProduct/>} />
          <Route path="categories" element={<Categories />} />
          <Route path="addcategory" element={<NewCategory/>} />
          <Route path="sales" element={<Sales />} />
          <Route path="newsale" element={<Newsale />} />
          <Route path="orders" element={<Orders />} />
          <Route path="neworder" element={<Neworder/>} />
        </Route>

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
