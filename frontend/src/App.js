import React, { useState, useRef } from "react";

import { loadModels } from "./helpers/faceApi";
import { createFaLibrary } from "./helpers/icons";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Switch from "react-switch";
import Camera from "./components/Camera/Camera";

import "./App.css";
createFaLibrary();
loadModels();
function App() {
  const [mode, setMode] = useState(true); //true = photo mode; false = video mode
  const [socket, setSocket] = useState(null);

  const handleSwitch = () => {
    if (!mode && socket) {
      socket.close();
    } else if(mode) {
      const socketRef = new WebSocket("ws://127.0.0.1:8000/ws/video-capture/");
      setSocket(socketRef);
    }
    setMode((prev) => !prev);
  };
  return (
    <div className="App">
      <header>
        <div className="App__header">
          <h1>
            <span>Emotion-Analysis</span>
          </h1>
          <div className="App__switcher">
            <FontAwesomeIcon
              icon="camera"
              color={mode ? "#007c6c" : "#cccccc"}
            />
            <Switch
              onChange={() => handleSwitch()}
              uncheckedIcon={false}
              checkedIcon={false}
              checked={!mode}
              className="App__switcher-switch"
            />
            <FontAwesomeIcon
              icon="video"
              color={!mode ? "#007c6c" : "#cccccc"}
            />
          </div>
        </div>
      </header>
      <Camera photoMode={mode} socket={socket} />
    </div>
  );
}

export default App;
