import React, { useEffect } from "react";
import AppRoutes from "./routes/AppRoutes";

import "./styles/globals.css";

function App() {
  return (
    <div className="font-sans antialiased bg-white text-black">
      <AppRoutes />
    </div>
  );
}

export default App;
