// frontend/src/pages/Login.jsx
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../api.js";
import AuthShell from "../components/AuthShell.jsx";
import StatusBanner from "../components/StatusBanner.jsx";
import "../legacy-styles/business-portal.css";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [remember, setRemember] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [msg, setMsg] = useState("");
  const [msgKind, setMsgKind] = useState("error"); // "success" | "error" | "info"

  async function onSubmit(e) {
    e.preventDefault();
    setMsg("");
    setMsgKind("error");

    if (!email.trim() || !password) {
      setMsg("Please enter your email and password.");
      return;
    }

    setSubmitting(true);
    try {
      const { token } = await API.login({ email: email.trim(), password });
      if (remember) localStorage.setItem("token", token);
      else sessionStorage.setItem("token", token);
      setMsg(""); // clear any old error
      navigate("/Home");
    } catch (err) {
      const m = String(err.message || "");
      if (m.includes("401") || /invalid/i.test(m)) {
        setMsg("Invalid email or password.");
      } else {
        setMsg("Could not sign in. Please try again.");
      }
      setMsgKind("error");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <AuthShell
      title="Welcome back"
      subtitle="Sign in to manage your Convai & avatar experience"
    >
      {/* Top status banner */}
      {msg && <StatusBanner kind={msgKind}>{msg}</StatusBanner>}

      <form onSubmit={onSubmit} className="auth-form">
        <label className="form-label">Email</label>
        <input
          className="portal-input"
          type="email"
          placeholder="you@example.com"
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <label className="form-label">Password</label>
        <div className="input-with-toggle">
          <input
            className="portal-input has-toggle"
            type={showPw ? "text" : "password"}
            placeholder="••••••••"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            type="button"
            className="toggle-eye"
            aria-label={showPw ? "Hide password" : "Show password"}
            onClick={() => setShowPw((s) => !s)}
          >
            {showPw ? "Hide" : "Show"}
          </button>
        </div>

        <div className="auth-row">
          <label className="remember">
            <input
              id="remember"
              type="checkbox"
              checked={remember}
              onChange={(e) => setRemember(e.target.checked)}
            />
            <span>Remember me</span>
          </label>
          <div className="spacer" />
          <Link to="/forgot" className="link-ghost" style={{ fontSize: 13 }}>
            Forgot password?
          </Link>
        </div>

        <button className="btn btn-primary btn-block" disabled={submitting}>
          {submitting ? "Signing in…" : "Sign in"}
        </button>

        <div className="auth-links">
          <span className="muted">No account?</span>
          <Link to="/register" className="link-ghost">Create one</Link>
        </div>
      </form>
    </AuthShell>
  );
}
