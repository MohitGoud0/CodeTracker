import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function Problems() {

  const [problems, setProblems] = useState([]);
  const [search, setSearch] = useState("");
  const [difficulty, setDifficulty] = useState("All");
  const [platform, setPlatform] = useState("All");
  const [topic, setTopic] = useState("All");
  const [editingProblem, setEditingProblem] = useState(null);

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

  const deleteProblem = async (id) => {

    try {

      await axios.delete(
        `http://localhost:8080/api/problems/${id}`
      );

      alert("Problem deleted!");

      getProblems();

    } catch (error) {

      console.log(error);

      alert("Failed to delete problem");

    }
  };

  const updateProblem = async () => {

    try {

      await axios.put(
        `http://localhost:8080/api/problems/${editingProblem.id}`,
        editingProblem
      );

      alert("Problem updated!");

      setEditingProblem(null);

      getProblems();

    } catch (error) {

      console.log(error);

      alert("Failed to update problem");

    }
  };

  const filteredProblems = problems.filter((problem) => {

    const matchSearch =
      problem.title &&
      problem.title
        .toLowerCase()
        .includes(search.toLowerCase());

    const matchDifficulty =
      difficulty === "All" ||
      problem.difficulty === difficulty;

    const matchPlatform =
      platform === "All" ||
      problem.platform === platform;

    const matchTopic =
      topic === "All" ||
      problem.topic === topic;

    return (
      matchSearch &&
      matchDifficulty &&
      matchPlatform &&
      matchTopic
    );

  });

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

            <h1>My Problems</h1>

            <p className="subtitle">
              Track, organize and improve your coding practice.
            </p>

          </div>

          <Link to="/add-problem">

            <button className="add-button">
              + Add Problem
            </button>

          </Link>

        </div>

        <div className="problem-filters">

          <input
            className="search-input"
            type="text"
            placeholder="🔍 Search problems..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <select
            value={difficulty}
            onChange={(e) => setDifficulty(e.target.value)}
          >

            <option>All</option>
            <option>Easy</option>
            <option>Medium</option>
            <option>Hard</option>

          </select>

          <select
            value={platform}
            onChange={(e) => setPlatform(e.target.value)}
          >

            <option>All</option>
            <option>LeetCode</option>
            <option>CodeChef</option>
            <option>HackerRank</option>
            <option>GeeksforGeeks</option>

          </select>

          <select
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
          >

            <option>All</option>
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

        <div className="problem-count">

          Showing <strong>{filteredProblems.length}</strong> problems

        </div>

        <div className="section">

          {filteredProblems.length === 0 ? (

            <div className="empty">

              <h3>No problems found</h3>

              <p>
                Try changing your search or filters.
              </p>

            </div>

          ) : (

            filteredProblems.map((problem) => (

              <div
                className="problem-row"
                key={problem.id}
              >

                <div className="problem-title">

                  <h3>{problem.title}</h3>

                  <p>
                    {problem.platform}
                    {" • "}
                    {problem.topic || "No topic"}
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

                  {problem.link && (

                    <a
                      href={problem.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="visit-button"
                    >
                      Visit Problem ↗
                    </a>

                  )}

                  <button
                    className="edit-button"
                    onClick={() =>
                      setEditingProblem({
                        ...problem
                      })
                    }
                  >
                    Edit
                  </button>

                  <button
                    className="delete-button"
                    onClick={() =>
                      deleteProblem(problem.id)
                    }
                  >
                    Delete
                  </button>

                </div>

              </div>

            ))

          )}

        </div>

        {editingProblem && (

          <div className="edit-section">

            <div className="section-header">

              <div>

                <h2>Edit Problem</h2>

                <p>
                  Update your problem details.
                </p>

              </div>

            </div>

            <div className="edit-form">

              <input
                type="text"
                value={editingProblem.title || ""}
                onChange={(e) =>
                  setEditingProblem({
                    ...editingProblem,
                    title: e.target.value
                  })
                }
                placeholder="Problem title"
              />

              <select
                value={editingProblem.difficulty || "Easy"}
                onChange={(e) =>
                  setEditingProblem({
                    ...editingProblem,
                    difficulty: e.target.value
                  })
                }
              >

                <option>Easy</option>
                <option>Medium</option>
                <option>Hard</option>

              </select>

              <select
                value={editingProblem.platform || "LeetCode"}
                onChange={(e) =>
                  setEditingProblem({
                    ...editingProblem,
                    platform: e.target.value
                  })
                }
              >

                <option>LeetCode</option>
                <option>CodeChef</option>
                <option>HackerRank</option>
                <option>GeeksforGeeks</option>

              </select>

              <select
                value={editingProblem.topic || ""}
                onChange={(e) =>
                  setEditingProblem({
                    ...editingProblem,
                    topic: e.target.value
                  })
                }
              >

                <option value="">
                  Select Topic
                </option>

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

              <select
                value={editingProblem.status || "Solved"}
                onChange={(e) =>
                  setEditingProblem({
                    ...editingProblem,
                    status: e.target.value
                  })
                }
              >

                <option>Solved</option>
                <option>Unsolved</option>

              </select>

              <div className="edit-actions">

                <button
                  className="add-button"
                  onClick={updateProblem}
                >
                  Save Changes
                </button>

                <button
                  className="cancel-button"
                  onClick={() =>
                    setEditingProblem(null)
                  }
                >
                  Cancel
                </button>

              </div>

            </div>

          </div>

        )}

      </main>

    </div>
  );
}

export default Problems;