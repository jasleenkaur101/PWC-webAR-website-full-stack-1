export default function Card({ title, children, footer }) {
  return (
    <div className="bg-panel/70 border border-border rounded-card p-6 shadow-xl shadow-black/40">
      {title && (
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-textMain">{title}</h2>
        </div>
      )}
      <div className="text-sm text-textMain">{children}</div>
      {footer && <div className="mt-4 text-xs text-textDim">{footer}</div>}
    </div>
  )
}
