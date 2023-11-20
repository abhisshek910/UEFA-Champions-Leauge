import React from "react";
import { useNavigate } from "react-router-dom";
import "./Scoreboard.css";
const Scoreboard = ({ item }) => {
  const navigate = useNavigate();
  const startMatch = () => {
    navigate("/start-match", { state: item });
  };

  const showDetails = () => {
    navigate("/show-details", { state: item });
  };
  return (
    <div class="container Scoreboard">
      <div class="row fix-height">
        <div class="col-4">
          <p class="manrope-font large-font">{item.teamName1}</p>
          <p class="manrope-font small-font">VS</p>
          <p class="manrope-font large-font">{item.teamName2}</p>
          <p class="manrope-font extra-small-font">{item.date}</p>
        </div>
        <div class="col-4">
          <div class="v1"></div>
        </div>
        <div class="col-4">
          <p class=" small-font sallmon-color">{item.status}</p>
          <button
            type="button"
            class="btn btn-secondary button-scorecard btn-sm"
            onClick={startMatch}
          >
            Start Match
          </button>
          <button
            type="button"
            class="btn btn-secondary button-scorecard btn-sm"
            onClick={showDetails}
          >
            Show Details
          </button>
        </div>
      </div>
    </div>
  );
};

export default Scoreboard;
