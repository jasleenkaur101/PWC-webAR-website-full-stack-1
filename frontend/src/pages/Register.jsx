// frontend/src/pages/Register.jsx
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../api.js";
import AuthShell from "../components/AuthShell.jsx";
import StatusBanner from "../components/StatusBanner.jsx";
import "../legacy-styles/business-portal.css";

const QUESTION_BANK = [
  "What is the name of your first pet?",
  "What city were you born in?",
  "What is your favorite teacher’s name?",
  "What is your mother’s maiden name?",
  "What was the model of your first car?",
  "What is your favorite book?",
];

function strengthScore(pw) {
  return (
    (/\d/.test(pw) ? 1 : 0) +
    (/[a-z]/.test(pw) ? 1 : 0) +
    (/[A-Z]/.test(pw) ? 1 : 0) +
    (/[^\w\s]/.test(pw) ? 1 : 0) +
    (pw.length >= 8 ? 1 : 0)
  ); // 0..5
}

function PasswordStrength({ value }) {
  const score = strengthScore(value);
  const labels = ["Very weak", "Weak", "Okay", "Good", "Strong", "Great"];
  const colors = ["#fecaca","#fca5a5","#fde68a","#86efac","#4ade80","#22c55e"];
  return (
    <div className="muted" style={{ fontSize: 12, color: colors[score] }}>
      Strength: {labels[score] || "Very weak"}
    </div>
  );
}

export default function Register() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);

  const [q1, setQ1] = useState(QUESTION_BANK[0]);
  const [a1, setA1] = useState("");
  const [q2, setQ2] = useState(QUESTION_BANK[1]);
  const [a2, setA2] = useState("");

  const [submitting, setSubmitting] = useState(false);
  const [msg, setMsg] = useState("");

  const [emailAvailable, setEmailAvailable] = useState(null); // null | true | false
  const [checkingEmail, setCheckingEmail] = useState(false);

  function validate() {
    if (!email.trim()) return "Email is required.";
    if (!password) return "Password is required.";
    if (q1 === q2) return "Security questions must be different.";
    if (!a1.trim() || !a2.trim()) return "Please answer both security questions.";
    if (emailAvailable === false) return "This email is already registered.";
    return null;
  }

  async function onBlurEmail() {
    const v = email.trim();
    if (!v) { setEmailAvailable(null); return; }
    setCheckingEmail(true);
    try {
      const { exists } = await API.checkEmail(v);
      setEmailAvailable(!exists);
    } catch {
      setEmailAvailable(null);
    } finally {
      setCheckingEmail(false);
    }
  }

  async function onSubmit(e) {
    e.preventDefault();
    setMsg("");

    const err = validate();
    if (err) {
      setMsg(err);
      return;
    }

    setSubmitting(true);
    try {
      const { token } = await API.register({
        name: name.trim() || undefined,
        email: email.trim(),
        password,
        securityQuestion1: q1,
        securityAnswer1: a1,
        securityQuestion2: q2,
        securityAnswer2: a2,
      });
      localStorage.setItem("token", token);
      navigate("/Home");
    } catch (err) {
      const m = String(err.message || "");
      if (m.includes("409") || /already in use/i.test(m)) {
        setMsg("This email is already registered.");
      } else {
        setMsg(m || "Could not create your account.");
      }
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <AuthShell
      title="Create your account"
      subtitle="You’ll get a unique Experience ID on first login"
    >
      <form onSubmit={onSubmit} className="auth-form">
        {/* top-level status */}
        {msg && (
          <StatusBanner kind={/success|✅/i.test(msg) ? "success" : "error"}>
            {msg}
          </StatusBanner>
        )}

        <label className="form-label">Name</label>
        <input
          className="portal-input"
          type="text"
          placeholder="Your name"
          autoComplete="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <label className="form-label">Email</label>
        <input
          className={`portal-input ${email && emailAvailable ? "valid" : ""}`}
          type="email"
          placeholder="you@example.com"
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          onBlur={onBlurEmail}
        />
        {checkingEmail && (
          <div className="muted" style={{ fontSize: 12 }}>
            Checking email…
          </div>
        )}
        {email && emailAvailable === false && (
          <StatusBanner kind="error">This email is already in use.</StatusBanner>
        )}

        <label className="form-label">Password</label>
        <div className="input-with-toggle">
          <input
            className="portal-input has-toggle"
            type={showPw ? "text" : "password"}
            placeholder="••••••••"
            autoComplete="new-password" 
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
        <PasswordStrength value={password} />

        <div className="spacer-8" />

        <label className="form-label">Security Question 1</label>
        <select className="portal-input" value={q1} onChange={(e) => setQ1(e.target.value)}>
          {QUESTION_BANK.map((q) => (
            <option key={q} value={q}>{q}</option>
          ))}
        </select>
        <input
          className="portal-input"
          type="text"
          placeholder="Your answer"
          value={a1}
          onChange={(e) => setA1(e.target.value)}
        />

        <label className="form-label">Security Question 2</label>
        <select className="portal-input" value={q2} onChange={(e) => setQ2(e.target.value)}>
          {QUESTION_BANK.map((q) => (
            <option key={q} value={q}>{q}</option>
          ))}
        </select>
        <input
          className="portal-input"
          type="text"
          placeholder="Your answer"
          value={a2}
          onChange={(e) => setA2(e.target.value)}
        />

        <button className="btn btn-primary btn-block" disabled={submitting}>
          {submitting ? "Creating…" : "Create account"}
        </button>

        <div className="auth-links">
          <span className="muted">Already have an account?</span>
          <Link to="/login" className="link-ghost">Sign in</Link>
        </div>
      </form>
    </AuthShell>
  );
}
