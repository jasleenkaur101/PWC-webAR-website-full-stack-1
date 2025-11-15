import "../legacy-styles/business-portal.css";

export default function AuthShell({ title, subtitle, children }) {
  return (
    <div className="auth-shell">
      <div className="auth-card glass">
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
