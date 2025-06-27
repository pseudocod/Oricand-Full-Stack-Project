export default function TabButton({ isActive, onClick, children }) {
  return (
    <button
      onClick={onClick}
      className={`cursor-pointer pb-4 text-md font-light tracking-wide ${
        isActive
          ? "text-black border-b-2 border-black"
          : "text-gray-500 hover:text-gray-700"
      }`}
    >
      {children}
    </button>
  );
} 