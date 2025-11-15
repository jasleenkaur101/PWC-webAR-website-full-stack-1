export default function Button({ children, onClick, type="button", className="" }) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={
        "w-full bg-accent text-surface font-semibold text-sm rounded-lg px-4 py-2 hover:brightness-110 active:scale-[.98] transition " +
        className
      }
    >
      {children}
    </button>
  )
}
