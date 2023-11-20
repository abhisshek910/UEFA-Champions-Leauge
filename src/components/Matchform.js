import React from "react";
import { useState } from "react";
import "./Matchfrom.css";

const Matchform = () => {
  const [formData, setFormData] = useState({
    teamName1: "",
    teamName2: "",
    playing11_first_team: Array(11).fill(""),
    playing11_second_team: Array(11).fill(""),
    substitutes_first_team: Array(5).fill(""),
    substitutes_second_team: Array(5).fill(""),
    stadiumName: "",
    date: "",
    status: "Played",
    referee: "",
  });

  const [errorMessage, setErrorMessage] = useState("");

  const handleInputChange = (key, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [key]: value,
    }));
  };

  const handlePlaying11Change = (team, index, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [`${team}team`]: prevData[`${team}team`].map((item, i) =>
        i === index ? value : item
      ),
    }));
  };

  const sendData = async (e) => {
    e.preventDefault();

    const isAnyFieldEmpty =
      Object.values(formData).some((value) => value === "") ||
      formData.playing11_first_team.some((player) => player === "") ||
      formData.playing11_second_team.some((player) => player === "");

    if (isAnyFieldEmpty) {
      setErrorMessage("Please fill in all fields");
      return;
    }

    const res = await fetch("/api/matches", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });
    alert("Match Added Succesfully");
    const data = await res.json();
  };

  return (
    <>
      <h1 class="manrope-font center-align">UEFA Champions Leauge</h1>
      <div class="form-body">
        <div class="container">
          <div class="row">
            <div class="form-holder">
              <div class="form-content">
                <div class="form-items">
                  <h3>Add New Match</h3>
                  <p class="details">Fill in the data below.</p>
                  <p class="details">*Required Fields</p>
                  <form method="POST">
                    <div class="row">
                      <div class="col-5">
                        <label class=" mr-1">First Team </label>
                        <input
                          class="form-control"
                          type="text"
                          value={formData.teamName1}
                          onChange={(e) =>
                            handleInputChange("teamName1", e.target.value)
                          }
                          placeholder="Team Name"
                          required
                        />
                      </div>
                      <div class="col-5">
                        <label class=" mr-1"> Second Team </label>
                        <input
                          class="form-control"
                          type="text"
                          value={formData.teamName2}
                          onChange={(e) =>
                            handleInputChange("teamName2", e.target.value)
                          }
                          placeholder="Team Name"
                          required
                        />
                      </div>

                      <div class="col-6">
                        <div class="row">
                          <label class=" mr-1 mt-3">
                            Playing 11 First Team{" "}
                          </label>
                          {formData.playing11_first_team.map(
                            (player, index) => (
                              <div class="col-5">
                                <input
                                  class="form-control"
                                  type="text"
                                  value={player}
                                  key={index}
                                  onChange={(e) =>
                                    handlePlaying11Change(
                                      "playing11_first_",
                                      index,
                                      e.target.value
                                    )
                                  }
                                  placeholder="Player Name"
                                  required
                                />
                              </div>
                            )
                          )}
                        </div>
                      </div>

                      <div class="col-6">
                        <div class="row">
                          <label class=" mr-1 mt-3">
                            Playing 11 Second Team{" "}
                          </label>
                          {formData.playing11_second_team.map(
                            (player, index) => (
                              <div class="col-5">
                                <input
                                  class="form-control"
                                  type="text"
                                  value={player}
                                  key={index}
                                  onChange={(e) =>
                                    handlePlaying11Change(
                                      "playing11_second_",
                                      index,
                                      e.target.value
                                    )
                                  }
                                  placeholder="Player Name"
                                  required
                                />
                              </div>
                            )
                          )}
                        </div>
                      </div>

                      <div class="col-6">
                        <div class="row">
                          <label class=" mr-1 mt-3">
                            Substitue First Team{" "}
                          </label>
                          {formData.substitutes_first_team.map(
                            (player, index) => (
                              <div class="col-5">
                                <input
                                  class="form-control"
                                  type="text"
                                  value={player}
                                  key={index}
                                  onChange={(e) =>
                                    handlePlaying11Change(
                                      "substitutes_first_",
                                      index,
                                      e.target.value
                                    )
                                  }
                                  placeholder="Player Name"
                                  required
                                />
                              </div>
                            )
                          )}
                        </div>
                      </div>

                      <div class="col-6">
                        <div class="row">
                          <label class=" mr-1 mt-3">
                            Substitue Second Team{" "}
                          </label>
                          {formData.substitutes_second_team.map(
                            (player, index) => (
                              <div class="col-5">
                                <input
                                  class="form-control"
                                  type="text"
                                  value={player}
                                  key={index}
                                  onChange={(e) =>
                                    handlePlaying11Change(
                                      "substitutes_second_",
                                      index,
                                      e.target.value
                                    )
                                  }
                                  placeholder="Player Name"
                                  required
                                />
                              </div>
                            )
                          )}
                        </div>
                      </div>
                      <div class="col-4">
                        <label class=" mr-1 mt-3">Match Refree </label>
                        <input
                          class="form-control"
                          type="text"
                          value={formData.referee}
                          onChange={(e) =>
                            handleInputChange("referee", e.target.value)
                          }
                          placeholder="Refree Name"
                          required
                        />
                      </div>
                    </div>
                    <div class="col-4">
                      <label class=" mr-1 mt-3">Stadium Name </label>
                      <input
                        class="form-control"
                        type="text"
                        value={formData.stadiumName}
                        onChange={(e) =>
                          handleInputChange("stadiumName", e.target.value)
                        }
                        placeholder="Stadium Name"
                        required
                      />
                    </div>
                    <div class="col-4">
                      <label class=" mr-1 mt-3">Date </label>
                      <input
                        class="form-control mt-3"
                        type="date"
                        value={formData.date}
                        onChange={(e) =>
                          handleInputChange("date", e.target.value)
                        }
                        required
                      />
                    </div>
                    <div class="col-4">
                      <label class=" mr-1 mt-3">Status </label>
                      <select
                        value={formData.status}
                        onChange={(e) =>
                          handleInputChange("status", e.target.value)
                        }
                      >
                        <option value="Played">Played</option>
                        <option value="Ongoing">Ongoing</option>
                        <option value="Upcoming">Upcoming</option>
                      </select>
                    </div>
                    {errorMessage && (
                      <div style={{ color: "red" }}>{errorMessage}</div>
                    )}
                    <div class="form-button mt-3">
                      <button
                        id="submit"
                        type="submit"
                        class="btn btn-primary"
                        onClick={sendData}
                      >
                        Add Match
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Matchform;
