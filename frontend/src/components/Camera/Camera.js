import React, { useState, useEffect, useRef } from "react";
import classnames from "classnames";

import { detectFaces, drawResults } from "../../helpers/faceApi";

import Button from "../Button/Button";
import Gallery from "../Gallery/Gallery";
import Results from "../Results/Results";
import Webcam from "react-webcam";

import "./Camera.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Camera = ({ photoMode, socket }) => {
  const camera = useRef();
  const cameraCanvas = useRef();

  const [photo, setPhoto] = useState(undefined);
  const [showGallery, setShowGallery] = useState(false);
  const [photos, setPhotos] = useState([]);
  const [results, setResults] = useState([]);
  const [label, setLabel] = useState("neutral");
  const [processing, setProcessing] = useState(false);
  const [count, setCount] = useState(0);
  const getFaces = async () => {
    if (camera.current !== null && socket.readyState === WebSocket.OPEN) {
      const canvas = document.createElement("canvas");
      const context = canvas.getContext("2d");
      canvas.width = camera.current.video.videoWidth;
      canvas.height = camera.current.video.videoHeight;

      // Draw the current video frame on the canvas
      context.drawImage(
        camera.current.video,
        0,
        0,
        canvas.width,
        canvas.height
      );
      // Get the image data from the canvas as a base64-encoded string
      const imageData = canvas.toDataURL("image/png");
      socket.send(imageData);
      const faces = await detectFaces(camera.current.video);
      await drawResults(
        camera?.current?.video,
        cameraCanvas?.current,
        faces,
        "boxLandmarks"
      );
      setResults(faces);
      await new Promise((resolve) => {
        socket.onmessage = async (event) => {
          setLabel(event.data.toLowerCase());
          setCount((count) => count + 1);
          if (event.data != null) {
            // await getFaces();
          }
          resolve();
        };
      });
    }
  };

  useEffect(() => {
    if (socket) {
      socket.addEventListener("message", async (event) => {
        // Process the response from the server if needed
        setProcessing(false);
        setLabel(event.data.toLowerCase());
        await getFaces();
      });

      socket.addEventListener("open", () => {
        let count = 1;
        if (count < 2) {
          count = count + 1;
          getFaces();
        }
      });
    }
  }, [socket]);

  const clearOverlay = (canvas) => {
    canvas.current
      .getContext("2d")
      .clearRect(0, 0, canvas.width, canvas.height);
  };

  useEffect(() => {
    if (!photoMode && camera !== null) {
      const ticking = setInterval(async () => {
        // await getFaces();
      }, 80);
      return () => {
        clearOverlay(cameraCanvas);
        clearInterval(ticking);
      };
    } else {
      return clearOverlay(cameraCanvas);
    }
  }, [photoMode]);

  const toggleGallery = () => setShowGallery(!showGallery);

  const capture = () => {
    const imgSrc = camera.current.getScreenshot();
    const newPhotos = [...photos, imgSrc];
    setPhotos(newPhotos);
    setPhoto(imgSrc);
    setShowGallery(true);
  };
  const reset = () => {
    setPhoto(undefined);
    setPhotos([]);
    setShowGallery(false);
  };

  const deleteImage = (target) => {
    const newPhotos = photos.filter((photo) => {
      return photo !== target;
    });
    setPhotos(newPhotos);
  };

  return (
    <div className="camera">
      <p className="scroll_down">Scroll down for results ↓</p>
      <div className="camera__wrapper">
        <Webcam audio={false} ref={camera} width="100%" height="auto" />
        <canvas
          className={classnames(
            "webcam-overlay",
            photoMode && "webcam-overlay--hidden"
          )}
          ref={cameraCanvas}
        />
      </div>

      {photoMode ? (
        <>
          <div className="camera__button-container">
            {photos.length > 0 && (
              <Button onClick={toggleGallery}>
                {showGallery ? "Hide " : "Show "} Gallery
              </Button>
            )}
            <Button onClick={capture} className="camera__button--snap">
              <FontAwesomeIcon icon="camera" size="lg" />
            </Button>
            {photos.length > 0 && <Button onClick={reset}>Reset</Button>}
          </div>

          {photos.length > 0 && (
            <Gallery
              photos={photos}
              selected={photo}
              show={showGallery}
              deleteImage={deleteImage}
            />
          )}
        </>
      ) : (
        <>
          <div className="results__container">
            <Results label={label} processing={processing} />
          </div>
        </>
      )}
    </div>
  );
};

export default Camera;
