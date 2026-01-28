import { useState } from 'react' 
import reactLogo from './assets/react.svg' 
import viteLogo from '/vite.svg' 
import './App.css'
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

function Home() {
  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        gap: "20px"
      }}
    >
      <h1>Hi! I'm Aamarsh :)</h1>

      <div style={{ display: "flex", gap: "10px" }}>
        <Link to="/"><button>Home</button></Link>
        <Link to="/profile"><button>Profile</button></Link>
        <Link to="/contact"><button>Contact</button></Link>
        <Link to="/about"><button>About</button></Link>
        <Link to="/dashboard"><button>Dashboard</button></Link>
      </div>
    </div>
  );
}

function Contact() {
  return (
    <div style={{ padding: "40px", textAlign: "center" }}>
      <h1>You can reach me at my E-mail and Contact Number provided below</h1>
      <Link to="/"><button>Home</button></Link>
    </div>
  );
}

function About() {
  return (
    <div style={{ padding: "40px", textAlign: "center" }}>
      <h1>I am an aspiring student aiming to work at Google as an ML Engineer!</h1>
      <Link to="/"><button>Home</button></Link>
    </div>
  );
}

function Dashboard() {
  return (
    <div style={{ padding: "40px", textAlign: "center" }}>
      <h1>Projects: OCR based app, AI Healthcare Chatbot</h1>
      <Link to="/"><button>Home</button></Link>
    </div>
  );
}

function Profile() {
  return (
    <div style={{ padding: "40px", textAlign: "center" }}>
      <marquee loop="5">
        <h1>This is my Profile Page</h1>
      </marquee>
      <h2>Your Name</h2>
      <h2>FSD</h2>
      <Link to="/"><button>Home</button></Link>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/about" element={<About />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
