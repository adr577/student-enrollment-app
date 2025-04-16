import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import StudentLogin from "./pages/StudentLogin";
import TeacherLogin from "./pages/TeacherLogin";
import StudentDashboard from "./pages/StudentDashboard";
import TeacherDashboard from "./pages/TeacherDashboard";
import NotFound from "./pages/NotFound";
import Register from "./pages/RegisterPage";
import TeacherCourseDetail from "./pages/CourseDetails";

function App() {
  const [currentMode, setCurrentMode] = useState("light");

  return (
    <Router>
      <Routes>
        {/* Home + Auth */}
        <Route path="/" element={<Home />} />
        <Route path="/login/student" element={<StudentLogin />} />
        <Route path="/login/teacher" element={<TeacherLogin />} />
        <Route path="/register" element={<Register />} />

        {/* Dashboards */}
        <Route
          path="/student"
          element={
            <StudentDashboard
              currentMode={currentMode}
              toggleMode={() => setCurrentMode(prev => (prev === "light" ? "dark" : "light"))}
            />
          }
        />
        <Route
          path="/teacher"
          element={
            <TeacherDashboard
              currentMode={currentMode}
              toggleMode={() =>
                setCurrentMode((prev) =>
                  prev === "light" ? "dark" : "light"
                )
              }
            />
          }
        />
        <Route
          path="/teacher/course/:classId"
          element={<TeacherCourseDetail mode={currentMode} />}
        />

        {/* Fallback */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
