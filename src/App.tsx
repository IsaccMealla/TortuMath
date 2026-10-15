import React, { useState, useEffect, useRef } from "react";
import Navbar from "./components/shared/Navbar";
import Hero from "./components/landing/Hero";
import SubjectGrid from "./components/landing/SubjectGrid";
import DashboardPreview from "./components/landing/DashboardPreview";
import SuccessStats from "./components/landing/SuccessStats";
import TeamSection from "./components/landing/TeamSection";
import FaqSection from "./components/landing/FaqSection";
import Footer from "./components/shared/Footer";
import LoginModal from "./components/shared/LoginModal";
import StudentDashboard from "./components/student/StudentDashboard";
import AdminDashboard from "./components/admin/AdminDashboard";

import { StudentRegistration, AssignedMaterial, HomeworkSubmission, QuizLog } from "./types";


export default function App() {
  const [loginOpen, setLoginOpen] = useState(false);
  const [user, setUser] = useState<{ email: string } | null>(null);
  const [role, setRole] = useState<"student" | "admin" | null>(null);

  // Unified global states
  const [students, setStudents] = useState<StudentRegistration[]>([]);
  const [assignedMaterials, setAssignedMaterials] = useState<AssignedMaterial[]>([]);
  const [submissions, setSubmissions] = useState<HomeworkSubmission[]>([]);
  const [quizScores, setQuizScores] = useState<QuizLog[]>([]);

  // Refs for tracking sync
  const lastSyncedStudents = useRef<StudentRegistration[]>([]);
  const lastSyncedMaterials = useRef<AssignedMaterial[]>([]);
  const lastSyncedSubmissions = useRef<HomeworkSubmission[]>([]);
  const lastSyncedQuizScores = useRef<QuizLog[]>([]);

  // Fetch initial data when user logs in or mounts
  useEffect(() => {
    if (!user || !role) {
      setStudents([]);
      setAssignedMaterials([]);
      setSubmissions([]);
      setQuizScores([]);
      lastSyncedStudents.current = [];
      lastSyncedMaterials.current = [];
      lastSyncedSubmissions.current = [];
      lastSyncedQuizScores.current = [];
      return;
    }

    const loadData = async () => {
      try {
        if (role === "admin") {
          // Admin: fetch all
          const studentsRes = await fetch("http://localhost:5000/api/students");
          const studentsData = await studentsRes.json();
          setStudents(studentsData);
          lastSyncedStudents.current = studentsData;

          const materialsRes = await fetch("http://localhost:5000/api/materials");
          const materialsData = await materialsRes.json();
          setAssignedMaterials(materialsData);
          lastSyncedMaterials.current = materialsData;

          const submissionsRes = await fetch("http://localhost:5000/api/submissions");
          const submissionsData = await submissionsRes.json();
          setSubmissions(submissionsData);
          lastSyncedSubmissions.current = submissionsData;

          const quizzesRes = await fetch("http://localhost:5000/api/quizzes");
          const quizzesData = await quizzesRes.json();
          setQuizScores(quizzesData);
          lastSyncedQuizScores.current = quizzesData;
        } else {
          // Student: fetch only self
          const studentsRes = await fetch(`http://localhost:5000/api/students?email=${user.email}`);
          const studentsData = await studentsRes.json();
          setStudents(studentsData);
          lastSyncedStudents.current = studentsData;

          if (studentsData.length > 0) {
            const studentId = studentsData[0].id;

            const materialsRes = await fetch(`http://localhost:5000/api/materials?studentId=${studentId}`);
            const materialsData = await materialsRes.json();
            setAssignedMaterials(materialsData);
            lastSyncedMaterials.current = materialsData;

            const submissionsRes = await fetch(`http://localhost:5000/api/submissions?studentId=${studentId}`);
            const submissionsData = await submissionsRes.json();
            setSubmissions(submissionsData);
            lastSyncedSubmissions.current = submissionsData;

            const quizzesRes = await fetch(`http://localhost:5000/api/quizzes?studentId=${studentId}`);
            const quizzesData = await quizzesRes.json();
            setQuizScores(quizzesData);
            lastSyncedQuizScores.current = quizzesData;
          }
        }
      } catch (err) {
        console.error("Error loading data from backend:", err);
      }
    };

    loadData();
  }, [user, role]);

  // Sync Students state changes to the database
  useEffect(() => {
    if (lastSyncedStudents.current.length === 0 && students.length === 0) return;

    students.forEach(async (student) => {
      const prev = lastSyncedStudents.current.find(s => s.id === student.id);
      if (!prev) {
        // Create new
        try {
          await fetch("http://localhost:5000/api/students", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(student)
          });
        } catch (err) {
          console.error("Error creating student:", err);
        }
      } else if (JSON.stringify(prev) !== JSON.stringify(student)) {
        // Update existing
        try {
          await fetch(`http://localhost:5000/api/students/${student.id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(student)
          });
        } catch (err) {
          console.error("Error updating student:", err);
        }
      }
    });

    lastSyncedStudents.current = students;
  }, [students]);

  // Sync Materials state changes to the database
  useEffect(() => {
    if (lastSyncedMaterials.current.length === 0 && assignedMaterials.length === 0) return;

    // 1. Create or Update
    assignedMaterials.forEach(async (mat) => {
      const prev = lastSyncedMaterials.current.find(m => m.id === mat.id);
      if (!prev) {
        // Create new
        try {
          await fetch("http://localhost:5000/api/materials", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(mat)
          });
        } catch (err) {
          console.error("Error creating material:", err);
        }
      } else if (JSON.stringify(prev) !== JSON.stringify(mat)) {
        // Update existing
        try {
          await fetch(`http://localhost:5000/api/materials/${mat.id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(mat)
          });
        } catch (err) {
          console.error("Error updating material:", err);
        }
      }
    });

    // 2. Detect deletions
    lastSyncedMaterials.current.forEach(async (prev) => {
      const exists = assignedMaterials.find(m => m.id === prev.id);
      if (!exists) {
        try {
          await fetch(`http://localhost:5000/api/materials/${prev.id}`, {
            method: "DELETE"
          });
        } catch (err) {
          console.error("Error deleting material:", err);
        }
      }
    });

    lastSyncedMaterials.current = assignedMaterials;
  }, [assignedMaterials]);

  // Sync Submissions state changes to the database
  useEffect(() => {
    if (lastSyncedSubmissions.current.length === 0 && submissions.length === 0) return;

    submissions.forEach(async (sub) => {
      const prev = lastSyncedSubmissions.current.find(s => s.id === sub.id);
      if (!prev) {
        // Create new
        try {
          await fetch("http://localhost:5000/api/submissions", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(sub)
          });
        } catch (err) {
          console.error("Error creating submission:", err);
        }
      } else if (JSON.stringify(prev) !== JSON.stringify(sub)) {
        // Update existing
        try {
          await fetch(`http://localhost:5000/api/submissions/${sub.id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(sub)
          });
        } catch (err) {
          console.error("Error updating submission:", err);
        }
      }
    });

    lastSyncedSubmissions.current = submissions;
  }, [submissions]);

  // Sync Quiz logs state changes to the database
  useEffect(() => {
    if (lastSyncedQuizScores.current.length === 0 && quizScores.length === 0) return;

    quizScores.forEach(async (q) => {
      const prev = lastSyncedQuizScores.current.find(item => item.id === q.id);
      if (!prev) {
        // Create new log
        try {
          await fetch("http://localhost:5000/api/quizzes", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(q)
          });
        } catch (err) {
          console.error("Error logging quiz score:", err);
        }
      }
    });

    lastSyncedQuizScores.current = quizScores;
  }, [quizScores]);

  const handleLoginSuccess = (email: string, userRole: "student" | "admin") => {
    setUser({ email });
    setRole(userRole);
    localStorage.setItem("tortumath_user", email);
    localStorage.setItem("tortumath_role", userRole);
  };

  const handleLogout = () => {
    setUser(null);
    setRole(null);
    localStorage.removeItem("tortumath_user");
    localStorage.removeItem("tortumath_role");
  };

  // Conditional Rendering depending on active routing role
  if (user && role === "student") {
    return (
      <StudentDashboard
        userEmail={user.email}
        onLogout={handleLogout}
        students={students}
        setStudents={setStudents}
        assignedMaterials={assignedMaterials}
        setAssignedMaterials={setAssignedMaterials}
        submissions={submissions}
        setSubmissions={setSubmissions}
        quizScores={quizScores}
        setQuizScores={setQuizScores}
      />
    );
  }

  if (user && role === "admin") {
    return (
      <AdminDashboard
        userEmail={user.email}
        onLogout={handleLogout}
        students={students}
        setStudents={setStudents}
        assignedMaterials={assignedMaterials}
        setAssignedMaterials={setAssignedMaterials}
        submissions={submissions}
        setSubmissions={setSubmissions}
        quizScores={quizScores}
        setQuizScores={setQuizScores}
      />
    );
  }

  return (
    <div className="font-sans min-h-screen bg-[#F8F9FA] text-[#1E293B] antialiased">
      {/* Translucent Backdrop Sticky Header Navigation row */}
      <Navbar onOpenLogin={() => setLoginOpen(true)} />

      {/* Hero section */}
      <Hero />

      {/* Main Subjects grid Section */}
      <SubjectGrid />

      {/* Interactive student dashboard and tools preview */}
      <DashboardPreview />

      {/* Succesful metric counters */}
      <SuccessStats />

      {/* Team Section presenting high-authority founders & tutors */}
      <TeamSection />

      {/* Frequently Asked Questions accordion */}
      <FaqSection />

      {/* Institutional academic footer */}
      <Footer />

      {/* Login Modal component overlay */}
      <LoginModal
        isOpen={loginOpen}
        onClose={() => setLoginOpen(false)}
        onLoginSuccess={handleLoginSuccess}
      />
    </div>
  );
}

