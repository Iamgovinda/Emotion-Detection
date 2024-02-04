import React from "react";

import { loadModels } from "./helpers/faceApi";
import { createFaLibrary } from "./helpers/icons";
// import  ToastContainer, toast  from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
import toast, { Toaster } from 'react-hot-toast';

import "./App.css";
import { BrowserRouter } from "react-router-dom";
import Routers from "./routers/Routers";
createFaLibrary();
loadModels();
function App() {
  return (
    <>
      <BrowserRouter>
        <Routers />
      </BrowserRouter>
      <Toaster position="bottom"/>
    </>
  );
}

export default App;
