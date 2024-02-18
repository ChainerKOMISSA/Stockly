import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/dashboard/Home';
import Dashboard from './pages/dashboard/Dashboard';
import Products from './pages/dashboard/Products/Products';
import Categories from './pages/dashboard/Products/Categories';
import Sales from './pages/dashboard/Sales/Sales';
import Newsale from './pages/dashboard/Sales/Newsale';
import Orders from './pages/dashboard/Orders/Orders';
import Neworder from './pages/dashboard/Orders/Neworder';
import Employees from './pages/dashboard/Employees/Employees';
import Newemployee from './pages/dashboard/Employees/Newemployee';
import Deliveries from './pages/dashboard/Deliveries/Deliveries';
import Newdelivery from './pages/dashboard/Deliveries/Newdelivery';
import Suppliers from './pages/dashboard/Suppliers/Suppliers';
import Newsupplier from './pages/dashboard/Suppliers/Newsupplier';
import Incidents from './pages/dashboard/Incidents';
import Depenses from './pages/dashboard/Depenses';




function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<Home />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="products" element={<Products />} />
          <Route path="categories" element={<Categories />} />
          <Route path="sales" element={<Sales />} />
          <Route path="newsale" element={<Newsale />} />
          <Route path="orders" element={<Orders />} />
          <Route path="neworder" element={<Neworder/>} />
          <Route path="deliveries" element={<Deliveries />} />
          <Route path="newdelivery" element={<Newdelivery/>} />
          <Route path="suppliers" element={<Suppliers />} />
          <Route path="newsupplier" element={<Newsupplier/>} />
          <Route path="employees" element={<Employees />} />
          <Route path="newemployee" element={<Newemployee/>} />
          <Route path="incidents" element={<Incidents />} />
          <Route path="depenses" element={<Depenses/>} />
        </Route>

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
