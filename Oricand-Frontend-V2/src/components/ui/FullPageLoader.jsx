import { useEffect, useState } from "react";

export default function FullPageLoader({ message = "Loading..." }) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShow(true), 200);
    return () => clearTimeout(timer);
  }, []);

  if (!show) return null;

  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-4">
      <div className="flex flex-col items-center gap-3">
        <div className="animate-spin h-8 w-8 border-2 border-t-transparent border-gray-500 rounded-full"></div>
        <span className="text-gray-500 text-sm tracking-wide">{message}</span>
      </div>
    </div>
  );
}
