import Scoreboard from "../components/Scoreboard";
import Matchform from "../components/Matchform";
import "./Home.css";
import { useEffect, useState } from "react";

function Home() {
  const [matches, setMatches] = useState([]);
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

  return (
    <>
      <div className="main-div">
        <Matchform></Matchform>
      </div>
      <div>
        <h1 class="manrope-font2 center-align">Match Fixtures</h1>
      </div>
      <div class="main-div">
        {matches.map((item) =>
          item.map((element) => <Scoreboard item={element}></Scoreboard>)
        )}
      </div>
    </>
  );
}

export default Home;
