// components/ProfileField.jsx
export default function ProfileField({
  label,
  value,
  editing,
  name,
  onChange,
}) {
  return (
    <div className="flex items-start space-x-3">
      <span className="text-gray-400 w-24 text-sm whitespace-nowrap border-b-2 border-transparent">
        {label}
      </span>
      {editing ? (
        <input
          name={name}
          value={value}
          onChange={onChange}
          className="text-gray-700 bg-transparent border-b border-gray-300 outline-none text-sm"
        />
      ) : (
        <span className="text-gray-700 text-sm border-b-2 border-transparent">
          {value || "N/A"}
        </span>
      )}
    </div>
  );
}
