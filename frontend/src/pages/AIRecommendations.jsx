import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function AIRecommendations() {

  const [recommendation, setRecommendation] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getRecommendation();
  }, []);

  const getRecommendation = async () => {

    try {

      const user = JSON.parse(localStorage.getItem("user"));

      if (!user) {
        return;
      }

      const response = await axios.get(
        `http://localhost:8080/api/ai/recommendation?userId=${user.id}`
      );

      setRecommendation(response.data);

    } catch (error) {

      console.log(error);
      setRecommendation("Unable to get AI recommendation.");

    } finally {

      setLoading(false);

    }
  };

  return (
    <div className="dashboard">

      <nav className="navbar">

        <h2>CodeTracker</h2>

        <div className="nav-links">
          <Link to="/dashboard">Dashboard</Link>
          <Link to="/problems">Problems</Link>
          <Link to="/add-problem">Add Problem</Link>
          <Link to="/progress">Progress</Link>
          <Link to="/ai-recommendations">AI Recommendations</Link>
        </div>

      </nav>

      <main className="dashboard-content">

        <div className="welcome-section">

          <div>
            <p className="small-text">AI POWERED</p>

            <h1>🤖 AI Recommendations</h1>

            <p className="subtitle">
              Personalized coding guidance based on your progress.
            </p>
          </div>

        </div>

        <div className="section">

          <div className="section-header">

            <div>
              <h2>Your Recommendation</h2>
              <p>AI analyzed your coding progress.</p>
            </div>

          </div>

          <div className="ai-recommendation-card">

            <div className="ai-icon">
              🤖
            </div>

            <div>

              <h3>What should you focus on?</h3>

              {loading ? (
                <p>Analyzing your coding progress...</p>
              ) : (
                <p>{recommendation}</p>
              )}

            </div>

          </div>

        </div>

      </main>

    </div>
  );
}

export default AIRecommendations;