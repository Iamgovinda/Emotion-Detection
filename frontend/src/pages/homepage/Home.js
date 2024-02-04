import React, { useEffect, useState } from "react";


import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Switch from "react-switch";
import Camera from "../../components/Camera/Camera";
import { useNavigate } from "react-router-dom";
import toast from 'react-hot-toast';
const Home = () => {
  const [mode, setMode] = useState(true); //true = photo mode; false = video mode
  const [socket, setSocket] = useState(null);
  const navigate = useNavigate();
  let token = localStorage.getItem("token");

  const handleSwitch = () => {
    if (!mode && socket) {
      socket.close();
    } else if (mode) {
      const socketRef = new WebSocket("ws://127.0.0.1:8000/ws/video-capture/");
      setSocket(socketRef);
    }
    setMode((prev) => !prev);
  };


  useEffect(()=>{
    console.log("here")
    if(!token){
      navigate('/')
    }
  })
  return (
    <div className="App">
      <header>
        <div className="App__header">
          <h1>
            <span>Emotion-Detection</span>
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
            {
              token && <p className="logout" style={{marginLeft:'1rem', padding:'2rem', borderRadius:'1rem', color:'blue', cursor:'pointer'}} onClick={()=>{
                localStorage.removeItem('token');
                navigate("/");
                toast.success("logged out.");
              }}>Logout</p>
            }
          </div>



        </div>
      </header>
      <Camera photoMode={mode} socket={socket} />
    </div>
  );
};

export default Home;
