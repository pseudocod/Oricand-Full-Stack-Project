export default function ProductFilter({
  categories,
  selectedCategory,
  sortOption,
  onCategoryChange,
  onSortChange,
}) {
  const handleCategoryChange = (e) => {
    onCategoryChange(e.target.value);
  };

  const handleSortChange = (e) => {
    onSortChange(e.target.value);
  };

  return (
    <div className="flex flex-col gap-6 w-full max-w-[300px]">
      <div className="space-y-2">
        <div className="h-[1px] bg-white/50"></div>
        <div className="relative">
          <label className="text-white/70 text-sm">Filter by Category</label>
          <select
            value={selectedCategory}
            onChange={handleCategoryChange}
            className="w-full bg-transparent text-white border-none focus:ring-0 py-2"
          >
            <option value="1" className="text-black">
              All
            </option>
            {categories.map((category) => (
              <option
                key={category.id}
                value={category.id}
                className="text-black"
              >
                {category.name}
              </option>
            ))}
          </select>
        </div>
        <div className="h-[1px] bg-white/50"></div>
      </div>

      <div className="space-y-2">
        <div className="h-[1px] bg-white/50"></div>
        <div className="relative">
          <label className="text-white/70 text-sm">Sort by</label>
          <select
            value={sortOption}
            onChange={handleSortChange}
            className="w-full bg-transparent text-white border-none focus:ring-0 py-2"
          >
            <option value="default" className="text-black">
              Default
            </option>
            <option value="nameAsc" className="text-black">
              Name (A-Z)
            </option>
            <option value="nameDesc" className="text-black">
              Name (Z-A)
            </option>
            <option value="priceAsc" className="text-black">
              Price, low to high
            </option>
            <option value="priceDesc" className="text-black">
              Price, high to low
            </option>
            <option value="dateAsc" className="text-black">
              Oldest First
            </option>
            <option value="dateDesc" className="text-black">
              Newest First
            </option>
          </select>
        </div>
        <div className="h-[1px] bg-white/50"></div>
      </div>
    </div>
  );
}
