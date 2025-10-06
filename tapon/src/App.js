import React from "react";
import AppRoutes from "./routes/AppRoutes";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // ✅ important!
import { AuthProvider } from "./context/AuthContext"; // ✅ wrap with AuthProvider

import "./styles/globals.css";

function App() {
  return (
    <React.StrictMode>
      <AuthProvider>
        <div className="font-sans antialiased bg-white text-black">
          <AppRoutes />

          {/* ✅ Toast notifications container */}
          <ToastContainer
            position="top-right"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
          />
        </div>
      </AuthProvider>
    </React.StrictMode>
  );
}

export default App;
