import React, {useEffect, useRef, useState} from "react";
import {detectFaces, drawResults} from "../../helpers/faceApi";

import "./SelectedImage.css";
import Results from "../Results/Results";
import axios from "axios";

const SelectedImage = ({img}) => {
  const selected = useRef();
  const canvas = useRef();
  const [label, setLabel] = useState('neutral');

  const [processing, setProcessing] = useState(true);
  // const [results, setResults] = useState([]);

  const getFaces = async () => {
    setProcessing(true);
    const faces = await detectFaces(selected.current);
    // setResults(faces);
    drawResults(selected.current, canvas.current, faces, "box");
    drawResults(selected.current, canvas.current, faces, "landmarks");
    // Get the image data from the canvas as a base64-encoded string
    axios.post('http://127.0.0.1:8000/api/v1/detection/img-detection-post/', {'imageData':img}).then((response)=>{
      setLabel(response?.data?.data?.toLowerCase());
      setProcessing(false);
    })
  };

  useEffect(() => {
    getFaces();
    //eslint-disable-next-line
  }, [img]);

  return (
    <div className="selected-image">
      <div className="selected-image__wrapper">
        <img
          ref={selected}
          src={img}
          alt="selected"
          className="selected-image__image"
        />
        <canvas className="selected-image__overlay" ref={canvas} />
      </div>
      <div className="results__container">
        <Results label={label} processing={processing} />
      </div>
    </div>
  );
};

export default SelectedImage;
