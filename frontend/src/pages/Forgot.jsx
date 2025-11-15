// frontend/src/pages/Forgot.jsx
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../api.js";
import AuthShell from "../components/AuthShell.jsx";
import StatusBanner from "../components/StatusBanner.jsx";
import "../legacy-styles/business-portal.css";

export default function Forgot() {
  const navigate = useNavigate();

  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [q1, setQ1] = useState("");
  const [q2, setQ2] = useState("");
  const [a1, setA1] = useState("");
  const [a2, setA2] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [msg, setMsg] = useState("");
  const [msgKind, setMsgKind] = useState("error"); // "success" | "error" | "info"
  const [busy, setBusy] = useState(false);

  async function fetchQuestions(e) {
    e.preventDefault();
    setMsg("");
    setMsgKind("error");

    if (!email.trim()) {
      setMsg("Enter your email.");
      return;
    }

    setBusy(true);
    try {
      const res = await API.getSecurityQuestions(email.trim());
      setQ1(res.securityQuestion1);
      setQ2(res.securityQuestion2);
      setA1("");
      setA2("");
      setMsg("");
      setStep(2);
    } catch (err) {
      const m = String(err.message || "");
      if (m.includes("404")) {
        setMsg("We couldn’t find that email.");
      } else {
        setMsg("Could not load security questions. Try again.");
      }
      setMsgKind("error");
    } finally {
      setBusy(false);
    }
  }

  async function resetPassword(e) {
    e.preventDefault();
    setMsg("");
    setMsgKind("error");

    if (!a1.trim() || !a2.trim() || !newPassword) {
      setMsg("Please answer both questions and choose a new password.");
      return;
    }

    setBusy(true);
    try {
      await API.resetWithSecurityAnswers({
        email: email.trim(),
        answer1: a1,
        answer2: a2,
        newPassword,
      });
      setMsg("✅ Password changed successfully. Redirecting to sign in…");
      setMsgKind("success");
      setTimeout(() => navigate("/login"), 900);
    } catch (err) {
      const m = String(err.message || "");
      if (m.includes("401")) {
        setMsg("One or both security answers are incorrect.");
      } else {
        setMsg("Could not reset password. Please try again.");
      }
      setMsgKind("error");
    } finally {
      setBusy(false);
    }
  }

  return (
    <AuthShell
      title="Reset your password"
      subtitle={
        step === 1
          ? "Enter your email to load your security questions"
          : "Answer both questions and set a new password"
      }
    >
      {/* Top status banner (shared) */}
      {msg && <StatusBanner kind={msgKind}>{msg}</StatusBanner>}

      {step === 1 && (
        <form onSubmit={fetchQuestions} className="auth-form">
          <label className="form-label">Email</label>
          <input
            className="portal-input"
            type="email"
            placeholder="you@example.com"
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <button className="btn btn-primary btn-block" disabled={busy}>
            {busy ? "Loading…" : "Continue"}
          </button>

          <div className="auth-links">
            <Link to="/login" className="link-ghost">Back to sign in</Link>
          </div>
        </form>
      )}

      {step === 2 && (
        <form onSubmit={resetPassword} className="auth-form">
          <div className="muted" style={{ fontSize: 13, marginBottom: 6 }}>{q1}</div>
          <input
            className="portal-input"
            type="text"
            placeholder="Your answer"
            value={a1}
            onChange={(e) => setA1(e.target.value)}
          />

          <div className="muted" style={{ fontSize: 13, marginTop: 10, marginBottom: 6 }}>{q2}</div>
          <input
            className="portal-input"
            type="text"
            placeholder="Your answer"
            value={a2}
            onChange={(e) => setA2(e.target.value)}
          />

          <label className="form-label" style={{ marginTop: 10 }}>New password</label>
          <div className="input-with-toggle">
            <input
              className="portal-input has-toggle"
              type={showPw ? "text" : "password"}
              placeholder="••••••••"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
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

          <button className="btn btn-primary btn-block" disabled={busy}>
            {busy ? "Saving…" : "Reset password"}
          </button>

          <div className="auth-links">
            <Link to="/login" className="link-ghost">Back to sign in</Link>
          </div>
        </form>
      )}
    </AuthShell>
  );
}
