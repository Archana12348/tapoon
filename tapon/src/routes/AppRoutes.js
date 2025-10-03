import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../pages/Home/Home";
// import About from "./pages/About";
import MainLayout from "../components/layout/MainLayout";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Home Page */}
        <Route
          path="/"
          element={
            <MainLayout>
              <Home />
            </MainLayout>
          }
        />

        {/* About Page */}
        {/* <Route
          path="/about"
          element={
            <MainLayout>
              <About />
            </MainLayout>
          }
        /> */}
      </Routes>
    </BrowserRouter>
  );
}
