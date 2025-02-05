import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import RecipeList from './components/RecipeList';
import RecipeDetail from './components/RecipeDetail';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./pages/ProtectedRoute"; // Import the ProtectedRoute component

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/recipe/:id" element={[<Header />, <RecipeDetail />, <Footer />]} />
        <Route path="/sign-in" element={[<Header />, <SignIn />, <Footer />]} />
        <Route path="/sign-up" element={[<Header />, <SignUp />, <Footer />]} />

        {/* Protected Routes */}
        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={[<Header />, <Dashboard />, <Footer />]} />
        </Route>

        {/* Redirect all other routes to home */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;