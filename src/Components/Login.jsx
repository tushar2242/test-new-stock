import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FrappeApp } from "frappe-js-sdk";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    if (isLoggedIn === "true") {
      navigate("/scaner");
    }
  }, []);

  const handleLogin = async () => {
    try {
      const frappe = new FrappeApp("http://194.31.55.40:14000");
      const auth = frappe.auth();
      await auth.loginWithUsernamePassword({ username, password });
      console.log("Logged in");

      localStorage.setItem("isLoggedIn", true);

      navigate("/scaner");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div
      style={{ height: "100vh", backgroundColor: "#f8f9fa" }}
      className="d-flex align-items-center justify-content-center py-4"
    >
      <main
        className="form-signin"
        style={{
          maxWidth: "400px",
          padding: "20px",
          borderRadius: "10px",
          boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
        }}
      >
        <form>
          <h1 className="h1 mb-1 fw-center text-center">STOCK TRANSFER</h1>
          <h1 className="h3 mb-3 fw-normal text-center">Please sign in</h1>

          <div className="form-floating">
            <input
              type="email"
              className="form-control"
              id="floatingInput"
              placeholder="name@example.com"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              style={{ borderRadius: "10px" }}
            />
            <label htmlFor="floatingInput">Email address</label>
          </div>
          <div className="form-floating">
            <input
              type="password"
              className="form-control"
              id="floatingPassword"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{ borderRadius: "10px" }}
            />
            <label htmlFor="floatingPassword">Password</label>
          </div>

          <div className="form-check text-start my-3">
            <input
              className="form-check-input"
              type="checkbox"
              value="remember-me"
              id="flexCheckDefault"
            />
            <label className="form-check-label" htmlFor="flexCheckDefault">
              Remember me
            </label>
          </div>
          <button
            className="btn btn-primary w-100 py-2"
            type="button"
            onClick={handleLogin}
            style={{ borderRadius: "10px" }}
          >
            Sign in
          </button>
          <p className="mt-5 mb-3 text-body-secondary text-center">
            © 2023-2024
          </p>
        </form>
      </main>
    </div>
  );
}

export default Login;
