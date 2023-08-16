import React from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Spinner from "../Spinner/Spinner";

import { mapExpressionToEmoji } from "../../helpers/emojis";

import "./Results.css";

const Results = ({ results, processing, label }) => {
  if (processing) {
    return <Spinner />;
  }
  return (
    <div className="results">
      {results?.length > 1 ? (
        <div>
          <p>I think...</p>
          {results.map((result, i) => (
            <div className="results__wrapper" key={i}>
              <div style={{ width: "300px" }}>
                <p>
                  One of you is probably {result.gender}, is looking{" "}
                  {result.expressions.asSortedArray()[0].expression} and looks
                  around {Math.round(result.age)}
                </p>
              </div>
              <FontAwesomeIcon
                icon={mapExpressionToEmoji(
                  result.expressions.asSortedArray()[0].expression
                )}
                size="4x"
              />
              <FontAwesomeIcon
                icon={mapExpressionToEmoji(result.gender)}
                size="4x"
              />
            </div>
          ))}
        </div>
      ) : (
        <div className="results__wrapper">
          <div>
            <p>You look {label}</p>
            {/* <p>You seem to be {Math.round(results[0]?.age??0)} years old</p> */}
            {/* <p>I think you are a {results[0]?.gender}</p> */}
          </div>
          <div className="results__emoji">
            <FontAwesomeIcon icon={mapExpressionToEmoji(label)} size="4x" />
            {/* <FontAwesomeIcon icon={mapExpressionToEmoji(results[0]?.gender)} size="4x" /> */}
          </div>
        </div>
      )}
    </div>
  );
};

export default Results;
