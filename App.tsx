import React, { useState } from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { Home } from './pages/Home';
import { Explore } from './pages/Explore';
import { Events } from './pages/Events';
import { BusinessDetail } from './pages/BusinessDetail';
import { Login } from './pages/Login';
import { AdminDashboard } from './pages/AdminDashboard';
import { UserRole } from './types';
import CommerceManager from './pages/CommerceManager';

function App() {
  // Simulate auth state
  const [userRole, setUserRole] = useState<UserRole>(UserRole.GUEST);

  return (
    <Router>
      <div className="flex flex-col min-h-screen bg-slate-50">
        <Navbar currentUserRole={userRole} />
        
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/admin/comercios" element={<CommerceManager />} />
            <Route path="/explore" element={<Explore />} />
            <Route path="/events" element={<Events />} />
            <Route path="/business/:id" element={<BusinessDetail />} />
            <Route 
              path="/login" 
              element={
                userRole !== UserRole.GUEST 
                  ? <Navigate to="/" /> 
                  : <Login setRole={setUserRole} />
              } 
            />
            <Route 
              path="/admin" 
              element={
                userRole === UserRole.ADMIN 
                  ? <AdminDashboard /> 
                  : <Navigate to="/login" />
              } 
            />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </Router>
  );
}

export default App;
