/** @format */

import React from "react";
import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import NotificationForm from "./components/NotificationForm";
import ProposalList from "./components/ProposalList";
import "./App.css";

const Home = () => <h2>Home Page</h2>;
const NotFound = () => <h2>404 - Not Found</h2>;

function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/notifications" element={<NotificationForm />} />
        <Route path="/proposals" element={<ProposalList />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
