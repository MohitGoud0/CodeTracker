import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid
} from "recharts";

function Progress() {

  const [problems, setProblems] = useState([]);

  useEffect(() => {
    getProblems();
  }, []);

  const getProblems = async () => {

    try {

      const user = JSON.parse(
        localStorage.getItem("user")
      );

      if (!user) {
        return;
      }

      const response = await axios.get(
        `http://localhost:8080/api/problems?userId=${user.id}`
      );

      setProblems(response.data);

    } catch (error) {

      console.log(error);

    }
  };

  const solved = problems.filter(
    (problem) => problem.status === "Solved"
  ).length;

  const easy = problems.filter(
    (problem) =>
      problem.difficulty === "Easy" &&
      problem.status === "Solved"
  ).length;

  const medium = problems.filter(
    (problem) =>
      problem.difficulty === "Medium" &&
      problem.status === "Solved"
  ).length;

  const hard = problems.filter(
    (problem) =>
      problem.difficulty === "Hard" &&
      problem.status === "Solved"
  ).length;

  const unsolved = problems.filter(
    (problem) => problem.status === "Unsolved"
  ).length;


  /* =========================
     DIFFICULTY DATA
  ========================= */

  const difficultyData = [
    { name: "Easy", value: easy },
    { name: "Medium", value: medium },
    { name: "Hard", value: hard }
  ];


  /* =========================
     TOPIC DATA
  ========================= */

  const topicMap = {};

  problems.forEach((problem) => {

    const topic = problem.topic || "No Topic";

    if (topicMap[topic]) {
      topicMap[topic]++;
    } else {
      topicMap[topic] = 1;
    }

  });

  const topicData = Object.keys(topicMap).map((topic) => ({
    topic: topic,
    problems: topicMap[topic]
  }));


  /* =========================
     SOLVED TOPIC DATA
  ========================= */

  const solvedTopicMap = {};

  problems.forEach((problem) => {

    if (problem.status !== "Solved") {
      return;
    }

    const topic = problem.topic || "No Topic";

    if (solvedTopicMap[topic]) {
      solvedTopicMap[topic]++;
    } else {
      solvedTopicMap[topic] = 1;
    }

  });

  const solvedTopicData = Object.keys(solvedTopicMap).map(
    (topic) => ({
      topic: topic,
      problems: solvedTopicMap[topic]
    })
  );


  return (

    <div className="dashboard">

      <nav className="navbar">

        <h2>CodeTracker</h2>

        <div className="nav-links">

          <Link to="/dashboard">
            Dashboard
          </Link>

          <Link to="/problems">
            Problems
          </Link>

          <Link to="/add-problem">
            Add Problem
          </Link>

          <Link to="/progress">
            Progress
          </Link>

        </div>

      </nav>


      <main className="dashboard-content">

        <div className="welcome-section">

          <div>

            <p className="small-text">
              CODING ANALYTICS
            </p>

            <h1>
              My Progress
            </h1>

            <p className="subtitle">
              Track your coding performance and DSA progress.
            </p>

          </div>

        </div>


        {/* =========================
            STAT CARDS
        ========================= */}

        <div className="stats">

          <div className="stat-card">

            <p>
              Total Problems
            </p>

            <h2>
              {problems.length}
            </h2>

            <span>
              Problems tracked
            </span>

          </div>


          <div className="stat-card">

            <p>
              Solved
            </p>

            <h2>
              {solved}
            </h2>

            <span>
              Problems solved
            </span>

          </div>


          <div className="stat-card">

            <p>
              Unsolved
            </p>

            <h2>
              {unsolved}
            </h2>

            <span>
              Problems remaining
            </span>

          </div>


          <div className="stat-card">

            <p>
              Completion
            </p>

            <h2>

              {problems.length === 0
                ? 0
                : Math.round(
                    (solved / problems.length) * 100
                  )
              }%

            </h2>

            <span>
              Overall progress
            </span>

          </div>

        </div>


        {/* =========================
            CHARTS
        ========================= */}

        <div className="progress-grid">

          <div className="chart-card">

            <h2>
              Difficulty Breakdown
            </h2>

            <p>
              Solved problems by difficulty
            </p>

            {solved === 0 ? (

              <div className="chart-empty">
                No solved problems yet.
              </div>

            ) : (

              <PieChart
                width={400}
                height={300}
              >

                <Pie
                  data={difficultyData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  label
                >

                  {difficultyData.map(
                    (entry, index) => {

                      const colors = [
                        "#22c55e",
                        "#f59e0b",
                        "#ef4444"
                      ];

                      return (
                        <Cell
                          key={index}
                          fill={colors[index]}
                        />
                      );

                    }
                  )}

                </Pie>

                <Tooltip />

                <Legend />

              </PieChart>

            )}

          </div>


          <div className="chart-card">

            <h2>
              Topic Progress
            </h2>

            <p>
              Problems by DSA topic
            </p>

            {topicData.length === 0 ? (

              <div className="chart-empty">
                No topic data available.
              </div>

            ) : (

              <BarChart
                width={500}
                height={300}
                data={topicData}
              >

                <CartesianGrid />

                <XAxis
                  dataKey="topic"
                  angle={-25}
                  textAnchor="end"
                  height={80}
                />

                <YAxis />

                <Tooltip />

                <Bar
                  dataKey="problems"
                />

              </BarChart>

            )}

          </div>

        </div>


        {/* =========================
            DSA TOPIC PROGRESS
        ========================= */}

        <div className="section topic-progress-section">

          <div className="section-header">

            <div>

              <h2>
                DSA Topic Progress
              </h2>

              <p>
                Track the number of problems solved in each topic.
              </p>

            </div>

          </div>


          {solvedTopicData.length === 0 ? (

            <div className="empty">

              <h3>
                No solved topics yet
              </h3>

              <p>
                Solve some problems to see your topic progress.
              </p>

            </div>

          ) : (

            <div className="topic-progress-list">

              {solvedTopicData.map((item) => {

                const percentage =
                  solved === 0
                    ? 0
                    : Math.round(
                        (item.problems / solved) * 100
                      );

                return (

                  <div
                    className="topic-progress-item"
                    key={item.topic}
                  >

                    <div className="topic-progress-header">

                      <strong>
                        {item.topic}
                      </strong>

                      <span>
                        {item.problems} solved
                      </span>

                    </div>


                    <div className="topic-progress-bar">

                      <div
                        className="topic-progress-fill"
                        style={{
                          width: `${percentage}%`
                        }}
                      >
                      </div>

                    </div>


                    <div className="topic-progress-footer">

                      <span>
                        {percentage}% of solved problems
                      </span>

                    </div>

                  </div>

                );

              })}

            </div>

          )}

        </div>


        {/* =========================
            DIFFICULTY SUMMARY
        ========================= */}

        <div className="section progress-summary">

          <div className="section-header">

            <div>

              <h2>
                Difficulty Summary
              </h2>

              <p>
                Your solved problem distribution
              </p>

            </div>

          </div>


          <div className="difficulty-summary">

            <div>

              <span className="difficulty easy">
                Easy
              </span>

              <strong>
                {easy}
              </strong>

            </div>


            <div>

              <span className="difficulty medium">
                Medium
              </span>

              <strong>
                {medium}
              </strong>

            </div>


            <div>

              <span className="difficulty hard">
                Hard
              </span>

              <strong>
                {hard}
              </strong>

            </div>

          </div>

        </div>

      </main>

    </div>
  );
}

export default Progress;