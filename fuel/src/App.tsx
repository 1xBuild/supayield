import { Outlet } from "react-router-dom";
import Footer from "./components/sections/Footer";
import Header from "./components/sections/Header";
import "./globals.css";

function App() {
  return (
    <>
      <Header />
      <main className="main-content" aria-label="Main content">
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default App;
