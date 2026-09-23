import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

function Dashboard() {
  const [problems, setProblems] = useState([]);
  const [streak, setStreak] = useState({
    currentStreak: 0,
    longestStreak: 0,
    todaySolved: 0
  });
  const [dailyGoal, setDailyGoal] = useState(3);
  const [goalInput, setGoalInput] = useState(3);
  const [potd, setPotd] = useState(null);

  useEffect(() => {
    getProblems();
    getStreak();
    getGoal();
    getPotd();
  }, []);

  const getProblems = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));

      if (!user) return;

      const r = await axios.get(
        `http://localhost:8080/api/problems?userId=${user.id}`
      );

      setProblems(r.data);
    } catch (e) {
      console.log(e);
    }
  };

  const getStreak = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));

      if (!user) return;

      const r = await axios.get(
        `http://localhost:8080/api/streak?userId=${user.id}`
      );

      setStreak(r.data);
    } catch (e) {
      console.log(e);
    }
  };

  const getGoal = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));

      if (!user) return;

      const r = await axios.get(
        `http://localhost:8080/api/goal?userId=${user.id}`
      );

      setDailyGoal(r.data);
      setGoalInput(r.data);
    } catch (e) {
      console.log(e);
    }
  };

  const getPotd = async () => {
    try {
      const r = await axios.get("http://localhost:8080/api/potd");

      setPotd(r.data);
    } catch (e) {
      console.log(e);
    }
  };

  const setGoal = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));

      if (!user) return;

      const goal = Number(goalInput);

      if (goal < 1) {
        alert("Goal must be at least 1");
        return;
      }

      await axios.put(
        `http://localhost:8080/api/goal?userId=${user.id}&goal=${goal}`
      );

      setDailyGoal(goal);

      alert("Daily goal updated!");
    } catch (e) {
      console.log(e);

      alert("Failed to update goal");
    }
  };

  const solved = problems.filter(
    (p) => p.status === "Solved"
  ).length;

  const easy = problems.filter(
    (p) => p.difficulty === "Easy" && p.status === "Solved"
  ).length;

  const medium = problems.filter(
    (p) => p.difficulty === "Medium" && p.status === "Solved"
  ).length;

  const hard = problems.filter(
    (p) => p.difficulty === "Hard" && p.status === "Solved"
  ).length;

  const goalPercentage = Math.min(
    Math.round((streak.todaySolved / dailyGoal) * 100),
    100
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

          <Link to="/ai-recommendations">
            🤖 AI
          </Link>

        </div>

      </nav>

      <main className="dashboard-content">

        <div className="welcome-section">

          <div>

            <p className="small-text">
              WELCOME BACK
            </p>

            <h1>
              Hi, Mohit 👋
            </h1>

            <p className="subtitle">
              Keep solving problems and improve your coding skills.
            </p>

          </div>

          <Link to="/add-problem">

            <button className="add-button">
              + Add Problem
            </button>

          </Link>

        </div>

        <div className="stats">

          <div className="stat-card">
            <p>🔥 Current Streak</p>
            <h2>{streak.currentStreak}</h2>
            <span>Days</span>
          </div>

          <div className="stat-card">
            <p>🏆 Longest Streak</p>
            <h2>{streak.longestStreak}</h2>
            <span>Days</span>
          </div>

          <div className="stat-card">
            <p>📅 Today</p>
            <h2>{streak.todaySolved}</h2>
            <span>Problems solved</span>
          </div>

          <div className="stat-card">
            <p>Total Solved</p>
            <h2>{solved}</h2>
            <span>Problems completed</span>
          </div>

        </div>

        <div className="daily-goal-card">

          <div className="daily-goal-header">

            <div>

              <p className="small-text">
                DAILY TARGET
              </p>

              <h2>
                🎯 Daily Goal
              </h2>

              <p>
                Set how many problems you want to solve every day.
              </p>

            </div>

            <div className="goal-setting">

              <input
                type="number"
                min="1"
                value={goalInput}
                onChange={(e) => setGoalInput(e.target.value)}
              />

              <button
                className="add-button"
                onClick={setGoal}
              >
                Set Goal
              </button>

            </div>

          </div>

          <div className="goal-progress">

            <div className="goal-progress-text">

              <strong>
                Today's Progress
              </strong>

              <span>
                {streak.todaySolved} / {dailyGoal}
              </span>

            </div>

            <div className="progress-bar">

              <div
                className="progress-fill"
                style={{
                  width: `${goalPercentage}%`
                }}
              />

            </div>

            <div className="goal-bottom">

              <span>
                {goalPercentage}% completed
              </span>

              {streak.todaySolved >= dailyGoal ? (
                <strong>
                  🎉 Daily Goal Completed!
                </strong>
              ) : (
                <span>
                  {dailyGoal - streak.todaySolved} more to go
                </span>
              )}

            </div>

          </div>

        </div>

        {potd && (
          <div className="potd-card">

            <div className="potd-header">

              <p className="small-text">
                DAILY CHALLENGE
              </p>

              <h2>
                🔥 Problem of the Day
              </h2>

              <p>
                Solve one problem today and keep improving.
              </p>

            </div>

            <div className="potd-content">

              <div>

                <h3>
                  {potd.title}
                </h3>

                <div className="potd-details">

                  <span>
                    {potd.platform}
                  </span>

                  <span>
                    {potd.difficulty}
                  </span>

                  <span>
                    {potd.topic}
                  </span>

                </div>

              </div>

              <a
                href={potd.link}
                target="_blank"
                rel="noopener noreferrer"
                className="potd-button"
              >
                Solve Problem ↗
              </a>

            </div>

          </div>
        )}

        <div className="stats">

          <div className="stat-card">

            <p>Easy</p>

            <h2>
              {easy}
            </h2>

            <span>
              Easy problems
            </span>

          </div>

          <div className="stat-card">

            <p>Medium</p>

            <h2>
              {medium}
            </h2>

            <span>
              Medium problems
            </span>

          </div>

          <div className="stat-card">

            <p>Hard</p>

            <h2>
              {hard}
            </h2>

            <span>
              Hard problems
            </span>

          </div>

        </div>

        <div className="section">

          <div className="section-header">

            <div>

              <h2>
                Recent Problems
              </h2>

              <p>
                Your recently tracked coding problems
              </p>

            </div>

            <Link to="/problems">
              View All →
            </Link>

          </div>

          <div className="problem-list">

            {problems.length === 0 ? (

              <div className="empty">

                <h3>
                  No problems yet
                </h3>

                <p>
                  Start tracking your coding journey.
                </p>

                <Link to="/add-problem">

                  <button className="add-button">
                    Add Your First Problem
                  </button>

                </Link>

              </div>

            ) : (

              problems
                .slice(-5)
                .reverse()
                .map((problem) => (

                  <div
                    className="problem-row"
                    key={problem.id}
                  >

                    <div>

                      <h3>
                        {problem.title}
                      </h3>

                      <p>
                        {problem.platform}
                      </p>

                    </div>

                    <div className="problem-info">

                      <span
                        className={`difficulty ${
                          problem.difficulty
                            ? problem.difficulty.toLowerCase()
                            : ""
                        }`}
                      >
                        {problem.difficulty}
                      </span>

                      <span className="status">
                        ✓ {problem.status}
                      </span>

                    </div>

                  </div>

                ))

            )}

          </div>

        </div>

      </main>

    </div>
  );
}

export default Dashboard;