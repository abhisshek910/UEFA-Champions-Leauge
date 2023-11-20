import React, { useState, useEffect } from "react";
import "./Startmatch.css";
import { useLocation } from "react-router-dom";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import AccessTimeIcon from "@mui/icons-material/AccessTime";

function StartMatch() {
  const location = useLocation();
  const state = location.state;
  const id = state._id;
  const [errorGoalMessage, setErrorGoalMessage] = useState("");
  const [errorSubMessage, setErrorSubMessage] = useState("");
  const [errorFoulMessage, setErrorFoulMessage] = useState("");
  const [matches, setMatches] = useState([]);
  let currentMatch = {
    goals_first_team: [],
    goals_second_team: [],
    fouls_second_team: [],
    fouls_first_team: [],
    substitutesUsed_first_team: [],
    substitutesUsed_second_team: [],
  };
  const callData = async () => {
    try {
      const res = await fetch("http://localhost:3001/api/matches", {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      setMatches([data]);

      if (!res.status === 200) {
        const error = new Error(res.error);
        throw error;
      }
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    callData();
  }, []);

  matches.forEach((item) => {
    item.forEach((element) => {
      if (element._id === id) {
        currentMatch = element;
      }
    });
  });
  console.log(currentMatch);
  const [goalData, setGoalData] = useState({
    team: "first",
    scorer: "",
    assistant: "",
    time: "",
    matchId: { id },
  });

  const [substituteData, setSubstituteData] = useState({
    inn: "",
    out: "",
    time: "",
    matchId: { id },
    team: "first",
  });

  const [foulData, setFoulData] = useState({
    commitedby: "",
    commitedon: "",
    time: "",
    matchId: { id },
    team: "first",
    referee: "",
  });

  const handleGoalChange = (key, value) => {
    setGoalData((prevData) => ({
      ...prevData,
      [key]: value,
    }));
  };

  const handleSubstituteChange = (key, value) => {
    setSubstituteData((prevData) => ({
      ...prevData,
      [key]: value,
    }));
  };

  const handleFoulChange = (key, value) => {
    setFoulData((prevData) => ({
      ...prevData,
      [key]: value,
    }));
  };

  const sendGoal = async (e) => {
    e.preventDefault();
    const isAnyFieldEmpty = Object.values(goalData).some(
      (value) => value === ""
    );
    if (isAnyFieldEmpty) {
      setErrorGoalMessage("Please fill in all fields");
      return;
    }
    setErrorGoalMessage("");
    const res = await fetch("/api/matches/goals", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(goalData),
    });
    alert("Goal Added Succesfully");
    const data = await res.json();
  };

  const sendSubstitue = async (e) => {
    e.preventDefault();
    const isAnyFieldEmpty = Object.values(substituteData).some(
      (value) => value === ""
    );
    if (isAnyFieldEmpty) {
      setErrorSubMessage("Please fill in all fields");
      return;
    }
    setErrorSubMessage("");
    const res = await fetch("/api/matches/substitue", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(substituteData),
    });
    alert("Substitute Added Sucessfully");
    setSubstituteData({});
  };

  const sendFoul = async (e) => {
    e.preventDefault();
    const isAnyFieldEmpty = Object.values(foulData).some(
      (value) => value === ""
    );
    if (isAnyFieldEmpty) {
      setErrorFoulMessage("Please fill in all fields");
      return;
    }
    const res = await fetch("/api/matches/foul", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(foulData),
    });
    alert("Foul Added Sucessfully");
    setErrorFoulMessage("");
    setFoulData({});
  };

  return (
    <>
      {/* <div>{<Scoreboard item={state} />}</div> */}

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
          <p class="manrope-font small-font disp-blc mt-5 align-center">
            Match Referee :-{" "}
          </p>
          <p class="manrope-font small-font disp-blc mt-5 align-center">
            {state.referee}
          </p>
        </div>

        <div class="form-body">
          <div class="container">
            <div class="row">
              {/* Goal Management */}
              <div class="col-6">
                <div class="form-holder">
                  <div class="form-content2">
                    <div class="form-items">
                      <h3>Goal Management Form</h3>
                      <p class="details">
                        Fill in the data below to add a goal.
                      </p>
                      <p class="details">*Required Fields</p>
                      <form method="POST">
                        <div>
                          <label class=" mt-3">Goal Scored By Team </label>
                          <select
                            class="form-control"
                            value={goalData.team}
                            onChange={(e) =>
                              handleGoalChange("team", e.target.value)
                            }
                          >
                            <option value="first">{state.teamName1}</option>
                            <option value="second">{state.teamName2}</option>
                          </select>
                        </div>
                        <div>
                          <label class=" mt-3">Goal Scored By </label>
                          <input
                            class="form-control"
                            type="text"
                            value={goalData.scorer}
                            onChange={(e) =>
                              handleGoalChange("scorer", e.target.value)
                            }
                            placeholder="Player Name"
                            required
                          />
                        </div>
                        <div>
                          <label class=" mt-3"> Goal Assisted By </label>
                          <input
                            class="form-control"
                            type="text"
                            value={goalData.assistant}
                            onChange={(e) =>
                              handleGoalChange("assistant", e.target.value)
                            }
                            placeholder="Player Name"
                            required
                          />
                        </div>
                        <div>
                          <label class=" mt-3"> Time of the Goal </label>
                          <input
                            class="form-control mt-3"
                            type="time"
                            min={"00:00"}
                            max={"01:30"}
                            value={goalData.time}
                            onChange={(e) =>
                              handleGoalChange("time", e.target.value)
                            }
                            placeholder="Player Name"
                            required
                          />
                        </div>

                        <div class="form-button mt-3">
                          <button
                            id="submit"
                            type="submit"
                            class="btn btn-primary"
                            onClick={sendGoal}
                          >
                            Submit Goal
                          </button>
                        </div>
                        {errorGoalMessage && (
                          <div style={{ color: "red" }}>{errorGoalMessage}</div>
                        )}
                      </form>
                    </div>
                  </div>
                </div>
              </div>

              {/*Goal Details */}
              <div class="col-6">
                <div class="form-holder">
                  <div class="form-content2">
                    <div class="form-items">
                      <p class="title">Goal Details</p>
                      <div class="row">
                        <div class="col-6">
                          <p class="team-name">{state.teamName1}</p>

                          {currentMatch.goals_first_team.map((obj, index) => (
                            <p key={index} class="goal-name">
                              {obj.scorer}&nbsp;- &nbsp;{obj.time}
                            </p>
                          ))}
                        </div>
                        <div class="col-6">
                          <p class="team-name">{state.teamName2}</p>
                          {currentMatch.goals_second_team.map((obj, index) => (
                            <p key={index} class="goal-name">
                              {obj.scorer}&nbsp;&nbsp;- {obj.time}
                            </p>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div class="row">
              {/* Substitute Management */}
              <div class="col-6">
                <div class="form-holder">
                  <div class="form-content2">
                    <div class="form-items">
                      <h3>Substitute Management Form</h3>
                      <p class="details">
                        Fill in the data below to add a Substitue.
                      </p>
                      <p class="details">*Required Fields</p>
                      <form method="POST">
                        <div>
                          <label class=" mt-3">Substitute By Team </label>
                          <select
                            value={substituteData.team}
                            onChange={(e) =>
                              handleSubstituteChange("team", e.target.value)
                            }
                            class="form-control"
                          >
                            <option value="first">{state.teamName1}</option>
                            <option value="second">{state.teamName2}</option>
                          </select>
                        </div>
                        <div>
                          <label class=" mt-3">Substitute In </label>
                          <input
                            class="form-control"
                            type="text"
                            value={substituteData.inn}
                            onChange={(e) =>
                              handleSubstituteChange("inn", e.target.value)
                            }
                            placeholder="Player Name"
                            required
                          />
                        </div>
                        <div>
                          <label class=" mt-3"> Substitute Out </label>
                          <input
                            class="form-control"
                            type="text"
                            value={substituteData.out}
                            onChange={(e) =>
                              handleSubstituteChange("out", e.target.value)
                            }
                            placeholder="Player Name"
                            required
                          />
                        </div>
                        <div>
                          <label class=" mt-3"> Time of Substitute </label>
                          <input
                            class="form-control mt-3"
                            type="time"
                            min={"00:00"}
                            max={"01:30"}
                            value={substituteData.time}
                            onChange={(e) =>
                              handleSubstituteChange("time", e.target.value)
                            }
                            placeholder="Player Name"
                            required
                          />
                        </div>

                        <div class="form-button mt-3">
                          <button
                            id="submit"
                            type="submit"
                            class="btn btn-primary"
                            onClick={sendSubstitue}
                          >
                            Submit Substitute
                          </button>
                        </div>
                        {errorSubMessage && (
                          <div style={{ color: "red" }}>{errorSubMessage}</div>
                        )}
                      </form>
                    </div>
                  </div>
                </div>
              </div>

              {/*Substitue Details*/}
              <div class="col-6">
                <div class="form-holder">
                  <div class="form-content2">
                    <div class="form-items">
                      <p class="title">Substitute Details</p>
                      <div class="row">
                        <div class="col-6">
                          <p class="team-name">{state.teamName1}</p>
                          {currentMatch.substitutesUsed_first_team.map(
                            (obj, index) => (
                              <div class="mt-5">
                                <p key={index} class="goal-name2 inn">
                                  <ArrowUpwardIcon></ArrowUpwardIcon>
                                  {obj.inn}
                                </p>
                                <p key={index} class="goal-name2 out">
                                  <ArrowDownwardIcon></ArrowDownwardIcon>
                                  {obj.out}
                                </p>
                                <p key={index} class="goal-name">
                                  <AccessTimeIcon></AccessTimeIcon> &nbsp;:-
                                  &nbsp;
                                  {obj.time}
                                </p>
                              </div>
                            )
                          )}
                        </div>
                        <div class="col-6">
                          <p class="team-name">{state.teamName2}</p>
                          {currentMatch.substitutesUsed_second_team.map(
                            (obj, index) => (
                              <div class="mt-5">
                                <p key={index} class="goal-name2 inn">
                                  <ArrowUpwardIcon></ArrowUpwardIcon>
                                  {obj.inn}
                                </p>
                                <p key={index} class="goal-name2 out">
                                  <ArrowDownwardIcon></ArrowDownwardIcon>
                                  {obj.out}
                                </p>
                                <p key={index} class="goal-name">
                                  <AccessTimeIcon></AccessTimeIcon>&nbsp;:-
                                  &nbsp;
                                  {obj.time}
                                </p>
                              </div>
                            )
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div class="row">
              <div class="col-6">
                <div class="form-holder">
                  <div class="form-content2">
                    <div class="form-items">
                      <h3>Foul Management Form</h3>
                      <p class="details">
                        Fill in the data below to add a foul.
                      </p>
                      <p class="details">*Required Fields</p>
                      <form method="POST">
                        <div>
                          <label class=" mt-3">Foul Commited By Team </label>
                          <select
                            class="form-control"
                            value={foulData.team}
                            onChange={(e) =>
                              handleFoulChange("team", e.target.value)
                            }
                          >
                            <option value="first">{state.teamName1}</option>
                            <option value="second">{state.teamName2}</option>
                          </select>
                        </div>
                        <div>
                          <label class=" mt-3">Foul Commited By </label>
                          <input
                            class="form-control"
                            type="text"
                            value={foulData.commitedby}
                            onChange={(e) =>
                              handleFoulChange("commitedby", e.target.value)
                            }
                            placeholder="Player Name"
                            required
                          />
                        </div>
                        <div>
                          <label class=" mt-3"> Foul Commited On </label>
                          <input
                            class="form-control"
                            type="text"
                            placeholder="Player Name"
                            value={foulData.commitedon}
                            onChange={(e) =>
                              handleFoulChange("commitedon", e.target.value)
                            }
                            required
                          />
                        </div>
                        <div>
                          <label class=" mt-3"> Time of Foul </label>
                          <input
                            class="form-control mt-3"
                            type="time"
                            min={"00:00"}
                            max={"01:30"}
                            placeholder="Player Name"
                            value={foulData.time}
                            onChange={(e) =>
                              handleFoulChange("time", e.target.value)
                            }
                            required
                          />
                        </div>
                        <div>
                          <label class=" mt-3"> Referee's Decision </label>
                          <input
                            class="form-control"
                            type="text"
                            placeholder="Player Name"
                            value={foulData.referee}
                            onChange={(e) =>
                              handleFoulChange("referee", e.target.value)
                            }
                            required
                          />
                        </div>

                        <div class="form-button mt-3">
                          <button
                            id="submit"
                            type="submit"
                            class="btn btn-primary"
                            onClick={sendFoul}
                          >
                            Submit Foul
                          </button>
                        </div>
                        {errorFoulMessage && (
                          <div style={{ color: "red" }}>{errorFoulMessage}</div>
                        )}
                      </form>
                    </div>
                  </div>
                </div>
              </div>

              <div class="col-6">
                <div class="form-holder">
                  <div class="form-content2">
                    <div class="form-items">
                      <p class="title">Foul Details</p>
                      <div class="row">
                        <div class="col-6">
                          <p class="team-name">{state.teamName1}</p>
                          {currentMatch.fouls_first_team.map((obj, index) => (
                            <div class="mt-5">
                              <p key={index} class="goal-name2 inn ">
                                On&nbsp;:-&nbsp;
                                {obj.commitedon}
                              </p>
                              <p key={index} class="goal-name2 out">
                                By&nbsp;:-&nbsp;
                                {obj.commitedby}
                              </p>
                              <p key={index} class="goal-name">
                                <AccessTimeIcon></AccessTimeIcon>&nbsp;:- &nbsp;
                                {obj.time}
                              </p>
                              <p key={index} class="goal-name">
                                Referee's Decision
                              </p>
                              <p key={index} class="goal-name out">
                                {obj.referee}
                              </p>
                            </div>
                          ))}
                        </div>
                        <div class="col-6">
                          <p class="team-name">{state.teamName2}</p>
                          {currentMatch.fouls_second_team.map((obj, index) => (
                            <div class="mt-5">
                              <p key={index} class="goal-name2 inn">
                                On&nbsp;:-&nbsp;
                                {obj.commitedon}
                              </p>
                              <p key={index} class="goal-name2 out">
                                By&nbsp;:-&nbsp;
                                {obj.commitedby}
                              </p>
                              <p key={index} class="goal-name">
                                <AccessTimeIcon></AccessTimeIcon>&nbsp;:- &nbsp;
                                {obj.time}
                              </p>
                              <p key={index} class="goal-name">
                                Referee's Decision
                              </p>
                              <p key={index} class="goal-name out">
                                {obj.referee}
                              </p>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default StartMatch;
