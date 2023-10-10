import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Dashboard from './pages/Dashboard';
import ViewLocation from './pages/ViewLocation';
import { INotFound } from './utils/icons';
import Button from './components/Button';
import PrivateRoutes from './utils/PrivateRoutes';
import LocationDetails from './pages/LocationDetails';
import SubmitReport from './pages/SubmitReport';
import Home from './pages/Home';
import Login from './pages/Login';
import React from 'react';
import './App.css';

function App() {
  function ScrollToTop() {
    const { pathname } = useLocation();
  
    React.useEffect(() => {
      window.scrollTo(0, 0);
    }, [pathname]);
  
    return null;
  }

  return (
    <BrowserRouter>
    <div className="App">
    {/* The rest of your app goes here */}
    <Routes>
        <Route path="/" element={process.env.REACT_APP_USER === "admin" ? <Login /> : <Home />} />
        <Route path="/admin" element={<Login />} />
        <Route path="/report/submit" element={<SubmitReport />} />
      
       <Route element={<PrivateRoutes />}>
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='/reports' element={<ViewLocation />} />
        <Route path="/report/:reportId" element={<LocationDetails />} />
      </Route>

      <Route path='*' element={
        <div  className='flex flex-col items-center mt-20'>
          <img src={INotFound} style={{width: '300px', height: "250px"}} alt="Not found" />
        <h1 className='text-2xl'>PAGE NOT FOUND</h1>
        <Button 
            wrapperClass={"mt-10"}
            width={"260px"}
						value={"Go Back Home"}
            onClick={_=>window.location.href='/'}
            />
        </div>
      } />
      </Routes>
  <ScrollToTop/>
  </div>
  </BrowserRouter>
  );
}

export default App;
