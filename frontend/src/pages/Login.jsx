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
    <div>

      <h1>CodeTracker Login</h1>

      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <br /><br />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <br /><br />

      <button onClick={login}>
        Login
      </button>

      <p>
        Don't have an account?{" "}
        <Link to="/signup">
          Sign Up
        </Link>
      </p>

    </div>
  );
}

export default Login;