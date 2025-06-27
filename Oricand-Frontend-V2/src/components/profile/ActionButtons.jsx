export default function ActionButtons({ editing, handleEdit, handleSave, logout, activeTab }) {
  return (
    <div className="mt-5 flex space-x-6 text-xs tracking-wide">
      {activeTab === "profile" && (
        <>
          {!editing ? (
            <button
              onClick={handleEdit}
              className="text-gray-700 text-lg hover:text-black underline underline-offset-4 decoration-[1px] cursor-pointer"
            >
              edit profile
            </button>
          ) : (
            <button
              onClick={handleSave}
              className="text-gray-700 text-lg hover:text-black underline underline-offset-4 decoration-[1px] cursor-pointer"
            >
              save changes
            </button>
          )}
        </>
      )}
      <button
        onClick={async () => await logout()}
        className="text-gray-700 text-lg hover:text-black underline underline-offset-4 decoration-[1px] cursor-pointer"
      >
        logout
      </button>
    </div>
  );
} 