import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function Login() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const login = async () => {

    try {

      const response = await axios.post(
        "http://localhost:8080/api/users/login",
        {
          email: email,
          password: password
        }
      );

      if (response.data) {

        localStorage.setItem(
          "user",
          JSON.stringify(response.data)
        );

        alert("Login successful!");

        navigate("/dashboard");

      } else {

        alert("Invalid email or password");

      }

    } catch (error) {

      alert("Login failed!");
      console.log(error);

    }
  };

  return (
    <div className="auth-container">

      <div className="auth-card">

        <h1>CodeTracker</h1>

        <p>
          Login to continue tracking your coding progress.
        </p>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button onClick={login}>
          Login
        </button>

        <p className="auth-link">
          Don't have an account?{" "}
          <Link to="/signup">
            Sign Up
          </Link>
        </p>

      </div>

    </div>
  );
}

export default Login;