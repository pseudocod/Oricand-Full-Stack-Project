export default function FormInput({
  label,
  id,
  name,
  type = "text",
  value,
  onChange,
  required = false,
  autoComplete,
}) {
  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={id} className="text-base font-medium text-gray-700">
        {label}
      </label>
      <input
        id={id}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        required={required}
        autoComplete={autoComplete}
        className="px-4 py-2 border border-gray-300 rounded-xs shadow-sm bg-offwhite focus:outline-none focus:ring-2 focus:ring-richblack transition"
      />
    </div>
  );
}
