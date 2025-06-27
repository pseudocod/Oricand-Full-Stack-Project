export default function ActiveFilters({ filters }) {
  if (!filters || Object.keys(filters).length === 0) return null;

  return (
    <div className="text-white space-y-2">
      <h3 className="text-2xl font-light">Filters:</h3>
      {Object.entries(filters).map(([key, value]) => (
        <div key={key} className="text-sm font-light">
          {key}: {Array.isArray(value) ? value.join(', ') : value}
        </div>
      ))}
    </div>
  );
} 