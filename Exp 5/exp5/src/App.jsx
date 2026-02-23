import './App.css'
import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Navbar from "./components/Navbar";

const Home = lazy(() => import("./components/Home"));
const Profile = lazy(() => import("./components/Profile"));
const Contact = lazy(() => import("./components/Contact"));
const About = lazy(() => import("./components/About"));
const Dashboard = lazy(() => import("./components/dashboard"));

function App() {
  return (
    <BrowserRouter>

      <Navbar />

      <Suspense fallback={<h2>Loading...</h2>}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/about" element={<About />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </Suspense>

    </BrowserRouter>
  );
}

export default App;