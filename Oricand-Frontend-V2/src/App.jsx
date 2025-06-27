import { RouterProvider } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Lenis from "lenis";
import { useEffect } from "react";
import router from "./routes/router";
function App() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      smoothWheel: true,
    });

    // Make lenis instance globally available
    window.lenis = lenis;

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      window.lenis = null;
      lenis.destroy();
    };
  }, []);

  return (
    <>
      <RouterProvider router={router} />
      <Toaster position="top-center" toastOptions={{ duration: 2000 }} />
    </>
  );
}

export default App;
