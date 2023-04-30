import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import AddAssignment from "./Components/AddAssignment";
import AddMarks from "./Components/AddMarks";
import Submition from "./Components/Submition";
import { AssigmentList } from "./Components/AssigmentList";
import SubmitionList from "./Components/SubmitionList";
import MarkSheetList from "./Components/MarkSheetList";



function App() {
  return (
    <Router>
      <Routes>
        <Route path="/AddAssignment" element={<AddAssignment />} />
        <Route path="/AddMarks" element={<AddMarks />} />
        <Route path="/Submition" element={<Submition />} />
        <Route path="/AssigmentList" element={<AssigmentList />} />
        <Route path="/SubmitionList" element={<SubmitionList />} />
        <Route path="/MarkSheetList" element={<MarkSheetList />} />

      </Routes>
    </Router>
  );
}

export default App;
