import React from "react";
import AppRoutes from "./routes/AppRoutes";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Toastify styles
import { AuthProvider } from "./context/AuthContext";
import { Provider } from "react-redux";
import store from "./app/store"; // Make sure path matches your project

import "./styles/globals.css";

function App() {
  return (
    <Provider store={store}>
      <AuthProvider>
        <div className="font-sans antialiased bg-white text-black overflow-hidden">
          <AppRoutes />

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
    </Provider>
  );
}

export default App;
