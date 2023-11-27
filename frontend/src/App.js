import React from "react";

import { loadModels } from "./helpers/faceApi";
import { createFaLibrary } from "./helpers/icons";

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
    </>
  );
}

export default App;
