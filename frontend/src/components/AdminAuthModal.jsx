import { useState } from "react";
import "../legacy-styles/business-portal.css";

export default function AdminAuthModal({ onAuthenticate }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const ADMIN_CREDENTIALS = [
    { username: "admin", password: "admin123" },
    { username: "taha", password: "taha123" },
    { username: "abhinandan", password: "abhi123" },
    { username: "surya", password: "surya123" },
    { username: "jasleen", password: "jasleen123" },
    { username: "rabail", password: "rabail123" },
    { username: "ibrahim", password: "ibrahim123" }
  ];

  function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setLoading(true);

    setTimeout(() => {
      const isValid = ADMIN_CREDENTIALS.some(
        (cred) => cred.username === username.trim() && cred.password === password
      );

      if (isValid) {
        sessionStorage.setItem("adminAuthenticated", "true");
        onAuthenticate();
      } else {
        setError("Invalid username or password");
        setPassword("");
      }
      setLoading(false);
    }, 500);
  }

  return (
    <div style={{
      position: "fixed",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: "rgba(0, 0, 0, 0.85)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      zIndex: 9999,
      padding: "20px"
    }}>
      <div style={{
        background: "var(--glass)",
        border: "1px solid var(--stroke)",
        borderRadius: "var(--r)",
        padding: "32px",
        maxWidth: "420px",
        width: "100%",
        boxShadow: "0 20px 60px rgba(0, 0, 0, 0.5)"
      }}>
        <div style={{ textAlign: "center", marginBottom: "24px" }}>
          <div style={{
            width: "60px",
            height: "60px",
            margin: "0 auto 16px",
            borderRadius: "12px",
            background: "linear-gradient(135deg, #FF1493, #FF69B4)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "28px"
          }}>
            <i className="fa-solid fa-lock"></i>
          </div>
          <h2 style={{ margin: "0 0 8px", fontSize: "22px" }}>Admin Access Required</h2>
          <p className="muted" style={{ margin: 0, fontSize: "14px" }}>
            Please enter your admin credentials to continue
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: "16px" }}>
            <label className="form-label">Username</label>
            <input
              className="portal-input"
              type="text"
              placeholder="Enter username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              autoComplete="username"
              disabled={loading}
              required
            />
          </div>

          <div style={{ marginBottom: "16px" }}>
            <label className="form-label">Password</label>
            <div style={{ position: "relative" }}>
              <input
                className="portal-input"
                type={showPassword ? "text" : "password"}
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
                disabled={loading}
                required
                style={{ paddingRight: "45px" }}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={{
                  position: "absolute",
                  right: "12px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  background: "none",
                  border: "none",
                  color: "var(--muted)",
                  cursor: "pointer",
                  padding: "4px 8px"
                }}
              >
                <i className={`fa-solid ${showPassword ? "fa-eye-slash" : "fa-eye"}`}></i>
              </button>
            </div>
          </div>

          {error && (
            <div style={{
              background: "rgba(255, 0, 0, 0.15)",
              border: "1px solid rgba(255, 0, 0, 0.4)",
              borderRadius: "8px",
              padding: "10px 12px",
              marginBottom: "16px",
              color: "#ffcccb",
              fontSize: "13px",
              textAlign: "center"
            }}>
              {error}
            </div>
          )}

          <button
            type="submit"
            className="btn btn-primary"
            disabled={loading}
            style={{ width: "100%" }}
          >
            {loading ? "Authenticating..." : "Access Admin Panel"}
          </button>
        </form>

        <div style={{
          marginTop: "20px",
          padding: "12px",
          background: "rgba(255, 255, 255, 0.05)",
          borderRadius: "8px",
          fontSize: "12px",
          color: "var(--muted)",
          textAlign: "center"
        }}>
          <i className="fa-solid fa-info-circle"></i> Contact your administrator for access credentials
        </div>
      </div>
    </div>
  );
}