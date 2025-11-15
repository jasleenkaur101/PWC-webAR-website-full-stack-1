export default function Input({ label, value, onChange, type="text", placeholder }) {
  return (
    <label className="block text-sm mb-4">
      <div className="text-textDim mb-1">{label}</div>
      <input
        className="w-full bg-panel/50 border border-border rounded-lg px-3 py-2 text-textMain placeholder-textDim focus:outline-none focus:ring-2 focus:ring-accent/60 focus:border-accent/60 text-sm"
        value={value}
        onChange={e => onChange(e.target.value)}
        type={type}
        placeholder={placeholder}
      />
    </label>
  )
}
