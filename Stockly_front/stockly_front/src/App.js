import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './pages/dashboard/Home';
import Login from './pages/Login';
import Sales from './pages/dashboard/Sales/Sales';
import Orders from './pages/dashboard/Orders/Orders';
import Register from './pages/Register';
import Products from './pages/dashboard/Products/Products';
import Depenses from './pages/dashboard/Depenses';
import Incidents from './pages/dashboard/Incidents';
import Dashboard from './pages/dashboard/Dashboard';
import Employees from './pages/dashboard/Employees/Employees';
import Suppliers from './pages/dashboard/Suppliers/Suppliers';
import Categories from './pages/dashboard/Products/Categories';
import Deliveries from './pages/dashboard/Deliveries/Deliveries';
import Liquidation from './pages/dashboard/Liquidation';
import Rupture from './pages/dashboard/Rupture';
import SalesDetails from './pages/dashboard/Sales/SalesDetails';
import ListeProduitsGenerator from './pages/dashboard/Products/ListeProduitsGenerator';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        {/* <Route path="/register" element={<Register />} /> */}
        <Route path="products/liste" element={<ListeProduitsGenerator />} />
        <Route path="/" element={<Home />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="products" element={<Products />} />
          <Route path="categories" element={<Categories />} />
          <Route path="sales" element={<Sales />} />
          <Route path='sales/details/:id' element={<SalesDetails />} />
          <Route path="orders" element={<Orders />} />
          <Route path="deliveries" element={<Deliveries />} />
          <Route path="suppliers" element={<Suppliers />} />
          <Route path="employees" element={<Employees />} />
          <Route path="incidents" element={<Incidents />} />
          <Route path="depenses" element={<Depenses />} />
          <Route path="liquidation" element={<Liquidation />} />
          <Route path="rupture" element={<Rupture />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
