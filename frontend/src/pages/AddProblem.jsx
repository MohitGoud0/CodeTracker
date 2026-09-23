import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function AddProblem() {

  const [title, setTitle] = useState("");
  const [difficulty, setDifficulty] = useState("Easy");
  const [platform, setPlatform] = useState("LeetCode");
  const [status, setStatus] = useState("Solved");
  const [topic, setTopic] = useState("Arrays");

  const addProblem = async () => {

    try {

      const user = JSON.parse(
        localStorage.getItem("user")
      );

      if (!user) {
        alert("Please login first");
        return;
      }

      await axios.post(
        "http://localhost:8080/api/problems",
        {
          title: title,
          difficulty: difficulty,
          platform: platform,
          status: status,
          topic: topic,
          user: user
        }
      );

      alert("Problem added successfully!");

      setTitle("");
      setDifficulty("Easy");
      setPlatform("LeetCode");
      setStatus("Solved");
      setTopic("Arrays");

    } catch (error) {

      alert("Failed to add problem");
      console.log(error);

    }
  };

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
              PROBLEM TRACKER
            </p>

            <h1>
              Add Problem
            </h1>

            <p className="subtitle">
              Add a coding problem to your tracker.
            </p>

          </div>

        </div>

        <div className="form-container">

          <h1>
            Problem Details
          </h1>

          <p>
            Enter the details of the problem you solved or want to practice.
          </p>

          <div className="form-group">

            <label>
              Problem Name
            </label>

            <input
              type="text"
              placeholder="Example: Two Sum"
              value={title}
              onChange={(e) =>
                setTitle(e.target.value)
              }
            />

          </div>

          <div className="form-group">

            <label>
              Difficulty
            </label>

            <select
              value={difficulty}
              onChange={(e) =>
                setDifficulty(e.target.value)
              }
            >
              <option>Easy</option>
              <option>Medium</option>
              <option>Hard</option>
            </select>

          </div>

          <div className="form-group">

            <label>
              Platform
            </label>

            <select
              value={platform}
              onChange={(e) =>
                setPlatform(e.target.value)
              }
            >
              <option>LeetCode</option>
              <option>CodeChef</option>
              <option>HackerRank</option>
              <option>GeeksforGeeks</option>
            </select>

          </div>

          <div className="form-group">

            <label>
              Topic
            </label>

            <select
              value={topic}
              onChange={(e) =>
                setTopic(e.target.value)
              }
            >
              <option>Arrays</option>
              <option>Strings</option>
              <option>Linked List</option>
              <option>Stack</option>
              <option>Queue</option>
              <option>HashMap</option>
              <option>Binary Search</option>
              <option>Trees</option>
              <option>BST</option>
              <option>Heap</option>
              <option>Graphs</option>
              <option>Greedy</option>
              <option>Backtracking</option>
              <option>Dynamic Programming</option>
              <option>Bit Manipulation</option>
            </select>

          </div>

          <div className="form-group">

            <label>
              Status
            </label>

            <select
              value={status}
              onChange={(e) =>
                setStatus(e.target.value)
              }
            >
              <option>Solved</option>
              <option>Unsolved</option>
            </select>

          </div>

          <button
            className="add-button"
            onClick={addProblem}
          >
            Add Problem
          </button>

        </div>

      </main>

    </div>
  );
}

export default AddProblem;