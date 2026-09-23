import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function Signup() {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const signup = async () => {

    try {

      await axios.post(
        "http://localhost:8080/api/users/signup",
        {
          name: name,
          email: email,
          password: password
        }
      );

      alert("Signup successful!");

      navigate("/");

    } catch (error) {

      alert("Signup failed!");
      console.log(error);

    }
  };

  return (

    <div className="auth-container">

      <div className="auth-card">

        <h1>CodeTracker</h1>

        <p>
          Create an account and start tracking your coding journey.
        </p>

        <input
          type="text"
          placeholder="Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

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

        <button onClick={signup}>
          Create Account
        </button>

        <div className="auth-link">

          <p>
            Already have an account?{" "}
            <Link to="/">
              Login
            </Link>
          </p>

        </div>

      </div>

    </div>
  );
}

export default Signup;