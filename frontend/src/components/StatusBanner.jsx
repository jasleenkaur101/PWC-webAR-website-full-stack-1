export default function StatusBanner({ kind = "info", children }) {
  const cls = {
    success: "alert alert-success",
    error: "alert alert-error",
    info: "alert",
  }[kind] || "alert";
  return <div className={cls}>{children}</div>;
}