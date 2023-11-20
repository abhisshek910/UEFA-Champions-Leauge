import React from "react";
import { useLocation } from "react-router-dom";
export default function Showdetails() {
  const location = useLocation();
  const state = location.state;
  let winner = "";
  if (state.goals_first_team > state.goals_second_team) {
    winner = state.teamName1;
  } else if (state.goals_first_team < state.goals_second_team) {
    winner = state.teamName2;
  }

  state.goals_first_team.sort((a, b) => {
    // Convert the time strings to Date objects for comparison
    const timeA = new Date(`1970-01-01T${a.time}`);
    const timeB = new Date(`1970-01-01T${b.time}`);

    // Compare the Date objects
    return timeA - timeB;
  });
  state.goals_second_team.sort((a, b) => {
    // Convert the time strings to Date objects for comparison
    const timeA = new Date(`1970-01-01T${a.time}`);
    const timeB = new Date(`1970-01-01T${b.time}`);

    // Compare the Date objects
    return timeA - timeB;
  });

  return (
    <div class="main-div">
      <div>
        <h1 class="manrope-font center-align">UEFA Champions Leauge</h1>
      </div>
      <div class="background-div">
        <p class="manrope-font xx-large-font align-center">Match Details</p>
        <p class="manrope-font-light small-font align-center">
          {state.stadiumName}
        </p>
        <p class="manrope-font-light small-font align-center">{state.date}</p>
        <p class="manrope-font-light4 small-font align-center">
          Winner {winner}
        </p>
        <p>Hello</p>
        <div class="row">
          <div class="col-5">
            <p class="manrope-font large-font align-center2">
              {state.teamName1}
            </p>
          </div>
          <div class="col-2">
            <p class="manrope-font small-font align-center">VS</p>
          </div>
          <div class="col-5">
            <p class="manrope-font large-font align-center3">
              {state.teamName2}
            </p>
          </div>
        </div>
        <div class="row mt-4">
          <div class="col-6">
            <div class="row">
              <div class="col-6">
                <p class="manrope-font small-font">Lineups</p>
                <div class="mt-4"></div>
                {state.playing11_first_team.map((obj) => (
                  <p class="manrope-font-light2 extra-small-font">{obj}</p>
                ))}
              </div>
              <div class="col-6">
                <p class="manrope-font small-font">Substitue</p>
                <div class="mt-4"></div>
                {state.substitutes_first_team.map((obj) => (
                  <p class="manrope-font-light2 extra-small-font ">{obj}</p>
                ))}
              </div>
            </div>
          </div>
          <div class="col-6">
            <div class="row">
              <div class="col-6">
                <p class="manrope-font small-font">Lineups</p>
                <div class="mt-4"></div>
                {state.playing11_second_team.map((obj) => (
                  <p class="manrope-font-light3 extra-small-font">{obj}</p>
                ))}
              </div>
              <div class="col-6">
                <p class="manrope-font small-font">Substitue</p>
                <div class="mt-4"></div>
                {state.substitutes_second_team.map((obj) => (
                  <p class="manrope-font-light3 extra-small-font">{obj}</p>
                ))}
              </div>
            </div>
          </div>
        </div>
        <p class="manrope-font small-font  mt-3 align-center">Match Referee</p>
        <p class="manrope-font-light small-font  align-center">
          {state.referee}
        </p>
        <p class="manrope-font xx-large-font align-center mt-5">Goal Details</p>
        <div class="row">
          <div class="col-6">
            <p class="team-name2">{state.teamName1}</p>

            {state.goals_first_team.map((obj, index) => (
              <p key={index} class="goal-name">
                {obj.scorer}&nbsp;- &nbsp;{obj.time}
              </p>
            ))}
          </div>
          <div class="col-6">
            <p class="team-name2">{state.teamName2}</p>
            {state.goals_second_team.map((obj, index) => (
              <p key={index} class="goal-name">
                {obj.scorer}&nbsp;&nbsp;- {obj.time}
              </p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
