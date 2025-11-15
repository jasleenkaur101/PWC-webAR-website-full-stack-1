import { useState, useMemo } from "react";
import { useSearchParams, Link } from "react-router-dom";
import API from "../api.js";

// simple strength scoring like your old code could be improved further
function scorePassword(pw) {
  let score = 0;
  if (!pw) return 0;
  if (pw.length >= 6) score += 30;
  if (pw.length >= 10) score += 30;
  if (/[A-Z]/.test(pw)) score += 10;
  if (/[0-9]/.test(pw)) score += 10;
  if (/[^A-Za-z0-9]/.test(pw)) score += 20;
  return Math.min(score, 100);
}

export default function ResetPassword() {
  const [params] = useSearchParams();
  const token = params.get("token") || "";

  const [pw1, setPw1] = useState("");
  const [pw2, setPw2] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [status, setStatus] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const strength = useMemo(() => scorePassword(pw1), [pw1]);
  const match = pw1 === pw2 && pw1.length > 0;

  async function handleSubmit(e) {
    e.preventDefault();
    setSubmitting(true);
    setStatus("");

    if (!match) {
      setStatus("Passwords do not match.");
      setSubmitting(false);
      return;
    }

    try {
      await API.resetPassword({ token, password: pw1 });
      setStatus("Password updated. You can now log in.");
    } catch (err) {
      setStatus("Reset failed. The link may be invalid or expired.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-surface text-textMain">
      <div className="w-full max-w-sm bg-panel/70 border border-border rounded-card p-6 shadow-xl shadow-black/40">
        <h1 className="text-lg font-semibold mb-2 text-textMain">
          Reset password
        </h1>
        <p className="text-xs text-textDim mb-4">
          Create a new password for your account.
        </p>

        <form onSubmit={handleSubmit}>
          <label className="block text-sm mb-4">
            <div className="text-textDim mb-1">New password</div>

            <div className="relative">
              <input
                className="w-full bg-panel/50 border border-border rounded-lg px-3 py-2 pr-10 text-textMain placeholder-textDim focus:outline-none focus:ring-2 focus:ring-accent/60 text-sm"
                type={showPw ? "text" : "password"}
                value={pw1}
                onChange={(e) => setPw1(e.target.value)}
                placeholder="••••••••"
              />
              <button
                type="button"
                className="absolute right-2 top-1/2 -translate-y-1/2 text-[11px] text-accent"
                onClick={() => setShowPw(!showPw)}
              >
                {showPw ? "Hide" : "Show"}
              </button>
            </div>

            {/* strength bar */}
            <div className="h-1 bg-border rounded mt-2">
              <div
                className="h-1 rounded bg-accent transition-all"
                style={{ width: `${strength}%` }}
              />
            </div>
            <div className="text-[10px] text-textDim mt-1">
              Strength: {strength} / 100
            </div>
          </label>

          <label className="block text-sm mb-4">
            <div className="text-textDim mb-1">Confirm password</div>

            <div className="relative">
              <input
                className="w-full bg-panel/50 border border-border rounded-lg px-3 py-2 pr-10 text-textMain placeholder-textDim focus:outline-none focus:ring-2 focus:ring-accent/60 text-sm"
                type={showPw ? "text" : "password"}
                value={pw2}
                onChange={(e) => setPw2(e.target.value)}
                placeholder="••••••••"
              />
              <button
                type="button"
                className="absolute right-2 top-1/2 -translate-y-1/2 text-[11px] text-accent"
                onClick={() => setShowPw(!showPw)}
              >
                {showPw ? "Hide" : "Show"}
              </button>
            </div>

            {!match && pw2.length > 0 && (
              <div className="text-[11px] text-red-400 mt-1">
                Passwords don't match
              </div>
            )}
          </label>

          <button
            disabled={submitting}
            className="w-full bg-accent text-surface font-semibold text-sm rounded-lg px-4 py-2 hover:brightness-110 active:scale-[.98] transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {submitting ? "Updating..." : "Update password"}
          </button>
        </form>

        {status && (
          <div className="text-[11px] text-green-400 mt-4">{status}</div>
        )}

        <div className="text-[11px] text-textDim text-center mt-6">
          <Link className="text-accent hover:underline" to="/login">
            Back to login
          </Link>
        </div>
      </div>
    </div>
  );
}
