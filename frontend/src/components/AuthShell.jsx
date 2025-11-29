import { Link } from "react-router-dom";
import "../legacy-styles/business-portal.css";

export default function AuthShell({ title, subtitle, children }) {
  return (
    <div className="auth-shell">
      {/* Top-left corner logo */}
      <Link to="/" className="auth-page-logo" title="Back to Home">
        <span className="auth-page-logo-text">PWC</span>
        <span className="auth-page-logo-accent">WebAR</span>
      </Link>

      <div className="auth-card glass">
        {/* Logo inside card */}
        <Link to="/" className="auth-logo" title="Back to Home">
          <span className="auth-logo-text">PWC</span>
          <span className="auth-logo-accent">WebAR</span>
        </Link>

        <div className="auth-head">
          <h1 className="auth-title">{title}</h1>
          {subtitle && <p className="auth-subtitle">{subtitle}</p>}
        </div>
        <div className="auth-body">{children}</div>
      </div>
      <footer className="auth-footer">
        <span>AI Business Card Portal</span>
      </footer>
    </div>
  );
}