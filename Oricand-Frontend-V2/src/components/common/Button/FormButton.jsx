import React from "react";

export default function FormButton({
  type = "submit",
  disabled = false,
  loading = false,
  loadingText,
  children,
}) {
  return (
    <button
      type={type}
      disabled={disabled || loading}
      className="w-full py-2 px-4 bg-richblack text-offwhite font-medium rounded-xs hover:bg-offwhite hover:text-richblack transition-all duration-500 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
    >
      {loading ? loadingText : children}
    </button>
  );
}
