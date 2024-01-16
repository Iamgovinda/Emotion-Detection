import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "../pages/homepage/Home";
import Login from "../pages/Login/Login";
import SignUp from "../pages/SignUp/SignUp";

const Routers = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/homepage" element={<Home />} />
    </Routes>
  );
};

export default Routers;
