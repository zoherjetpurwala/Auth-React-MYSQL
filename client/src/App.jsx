import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import axios from "axios";
import SignUpForm from "@/pages/auth/SignUpForm";
import LoginForm from "@/pages/auth/LoginForm";
import HomePage from "@/pages/auth/HomePage";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(true); // Add a loading state

  useEffect(() => {
    checkAuthentication();
  }, []);

  const checkAuthentication = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/v1/user/checkauth", {
        withCredentials: true,
      });
      setIsLoggedIn(response.data.isLoggedIn);
      setUsername(response.data.username);
    } catch (error) {
      setIsLoggedIn(false);
      setUsername(""); // Ensure username is cleared if authentication fails
    } finally {
      setLoading(false); // Set loading to false after the check is complete
    }
  };

  if (loading) {
    return <div>Loading...</div>; // Show a loading indicator while checking authentication
  }
  return (
    <Router>
      <Routes>
        <Route path="/" element={isLoggedIn ? <Navigate to="/home" /> : <Navigate to="/login" />} />
        <Route path="/signup" element={<SignUpForm />} />
        <Route path="/login" element={<LoginForm setIsLoggedIn={setIsLoggedIn} setUsername={setUsername} />} />
        <Route path="/home" element={isLoggedIn ? <HomePage username={username} setIsLoggedIn={setIsLoggedIn} setUsername={setUsername}  /> : <Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}

export default App;