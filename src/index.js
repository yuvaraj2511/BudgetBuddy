import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ReactDOM from 'react-dom/client';
import Login from './Login';
import CashbookBudgetBuddy from './landing';
import Signup from './Signup';
import Forget from './Forget';
import About from './About';
import ContactUs from './ContactUs';
import Cashbook from './cashbook';
import BudgetTracker from './BudgetTracker';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Router>
      <Routes>
        <Route path="/" element={<CashbookBudgetBuddy />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/about" element={<About />} />
        <Route path="/cashbook" element={<Cashbook />} />
        <Route path="/Forget" element={<Forget />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/BudgetTracker" element={<BudgetTracker />} />
      </Routes>
    </Router>
);

