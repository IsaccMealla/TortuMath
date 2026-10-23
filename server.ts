import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import sqlite3 from "sqlite3";
import crypto from "crypto";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

// Initialize SQLite database
const db = new sqlite3.Database("database.sqlite");

// Promise-based DB helpers
function dbRun(query: string, params: any[] = []): Promise<void> {
  return new Promise((resolve, reject) => {
    db.run(query, params, function (err) {
      if (err) reject(err);
      else resolve();
    });
  });
}

// Typing for SQLite rows
interface UserRow {
  id: number;
  email: string;
  password_hash: string;
  role: "student" | "admin";
  created_at: string;
}

interface CountRow {
  count: number;
}

function dbAll<T = any>(query: string, params: any[] = []): Promise<T[]> {
  return new Promise((resolve, reject) => {
    db.all(query, params, (err, rows) => {
      if (err) reject(err);
      else resolve(rows as T[]);
    });
  });
}

function dbGet<T = any>(query: string, params: any[] = []): Promise<T | undefined> {
  return new Promise((resolve, reject) => {
    db.get(query, params, (err, row) => {
      if (err) reject(err);
      else resolve(row as T);
    });
  });
}

function hashPassword(password: string): string {
  return crypto.createHash("sha256").update(password).digest("hex");
}

const initialStudents = [
  {
    id: "STU-001",
    name: "Sofía Ramos Ortiz",
    phone: "71234567",
    email: "sofia.ramos@gmail.com",
    subject: "Matemáticas Avanzadas",
    plan: "Plan TortuMath Semanal",
    schedule: "Lunes, Miércoles, Viernes - Turno Tarde (14:30 - 17:30)",
    meetLink: "https://meet.google.com/abc-defg-hij",
    paymentVerified: 1,
    registrationDate: "2026-05-28",
    amount: 195
  },
  {
    id: "STU-002",
    name: "Mateo Ignacio Flores",
    phone: "68912345",
    email: "mateo.flores@unifranz.edu.bo",
    subject: "Física Académica",
    plan: "Plan TortuPhysics Semanal",
    schedule: "Martes, Jueves, Sábado - Turno Mañana (09:00 - 12:00)",
    meetLink: "https://meet.google.com/xyz-pqrs-tuv",
    paymentVerified: 0,
    registrationDate: "2026-05-29",
    amount: 210
  },
  {
    id: "STU-003",
    name: "Isabella Méndez",
    phone: "73549210",
    email: "isa.mendez@outlook.com",
    subject: "Programación Inicial",
    plan: "Plan TortuCode Semanal",
    schedule: "Lunes, Miércoles, Viernes - Turno Noche (18:30 - 21:30)",
    meetLink: "https://meet.google.com/mno-klmn-opq",
    paymentVerified: 1,
    registrationDate: "2026-05-30",
    amount: 240
  },
  {
    id: "STU-004",
    name: "Lucas Andrés Ortiz",
    phone: "62345178",
    email: "lucas.ortiz@gmail.com",
    subject: "Robótica / Scratch",
    plan: "1 Hora de Tutoría Individual",
    schedule: "Sábado - Turno Tarde (14:30 - 17:30)",
    meetLink: "https://meet.google.com/def-ghij-klm",
    paymentVerified: 0,
    registrationDate: "2026-05-30",
    amount: 65
  },
  {
    id: "STU-005",
    name: "Joaquín Siles Mercado",
    phone: "74321987",
    email: "joaco.siles@unifranz.edu.bo",
    subject: "Electrónica Aplicada",
    plan: "Plan TortuProject Quincenal",
    schedule: "Martes, Jueves - Turno Tarde (15:00 - 18:00)",
    meetLink: "https://meet.google.com/rst-uvwx-yza",
    paymentVerified: 1,
    registrationDate: "2026-06-01",
    amount: 180
  }
];

const initialMaterials = [
  {
    id: "MAT-1",
    studentId: "STU-001",
    title: "Guía de Matrices y Determinantes Grado 2",
    type: "Guía de Ejercicios (PDF)",
    instructions: "Resolver los primeros 5 ejercicios prácticos utilizando el método de cofactores.",
    assignedAt: "2026-06-25",
    status: "pendiente",
    score: null,
    maxScore: null,
    observation: null
  },
  {
    id: "MAT-2",
    studentId: "STU-001",
    title: "Mini Reto de Álgebra Lineal",
    type: "Mini-Prueba Interactiva",
    instructions: "Completar la autoevaluación interactiva de determinantes 2x2.",
    assignedAt: "2026-06-28",
    status: "realizando",
    score: null,
    maxScore: null,
    observation: null
  },
  {
    id: "MAT-3",
    studentId: "STU-002",
    title: "Problemas de MRUV y Caída Libre",
    type: "Tarea para el Cuaderno",
    instructions: "Resolver los problemas de la página 4 y subir fotografía de las resoluciones manuscritas.",
    assignedAt: "2026-06-29",
    status: "entregado",
    score: null,
    maxScore: null,
    observation: null
  },
  {
    id: "MAT-4",
    studentId: "STU-003",
    title: "Autoevaluación de Bucles Python",
    type: "Mini-Prueba Interactiva",
    instructions: "Resolver las preguntas sobre for/while anidados.",
    assignedAt: "2026-07-01",
    status: "calificado",
    score: 100,
    maxScore: 100,
    observation: "Lógica de control impecable. La estructura for anidada genera la pirámide de estrellas correctamente."
  }
];

const initialSubmissions = [
  {
    id: "SUB-101",
    studentId: "STU-001",
    title: "Práctica de Despejes algebraicos",
    subject: "Matemáticas",
    submittedAt: "2026-06-30 14:15",
    status: "pendiente",
    observation: null,
    notebookContent: JSON.stringify([
      "Sofía Ramos Ortiz - 5to de Secundaria",
      "Tema: Despejes y Ecuaciones Cuadráticas",
      "--------------------------------------------------",
      "Ejercicio 1: x² - 5x + 6 = 0",
      "  Fórmula: x = [-b ± √(b² - 4ac)] / 2a",
      "  Reemplazo: x = [5 ± √(25 - 24)] / 2",
      "  x = [5 ± 1] / 2",
      "  x1 = 3  (Correcto)",
      "  x2 = 2  (Correcto)",
      "",
      "Ejercicio 2: 2x² - 8 = 0",
      "  2x² = 8   =>   x² = 4",
      "  x = √4   =>   x = 2 (Olvidé la solución negativa x=-2)"
    ])
  },
  {
    id: "SUB-102",
    studentId: "STU-002",
    title: "Diagrama de Caída Libre con Rozamiento",
    subject: "Física",
    submittedAt: "2026-07-01 11:30",
    status: "pendiente",
    observation: null,
    notebookContent: JSON.stringify([
      "Mateo Flores - Física Avanzada",
      "Tema: Lanzamiento de proyectil con ángulo",
      "--------------------------------------------------",
      "Lanzamiento inicial: v0 = 20 m/s a 30°",
      "  vox = v0 * cos(30) = 20 * 0.866 = 17.32 m/s",
      "  voy = v0 * sin(30) = 20 * 0.50 = 10.0 m/s",
      "  Tiempo subida: t = voy / g = 10 / 9.8 = 1.02 s",
      "  Altura máx: h = voy * t - 0.5 * g * t²",
      "  h = 10 * 1.02 - 4.9 * (1.02)² = 5.10 metros",
      "  (Se grafica el vector fuerza con fricción opuesta)"
    ])
  },
  {
    id: "SUB-103",
    studentId: "STU-003",
    title: "Algoritmo de Bucles Anidados",
    subject: "Programación",
    submittedAt: "2026-07-01 18:45",
    status: "aprobado",
    observation: "Lógica de control impecable. La estructura for anidada genera la pirámide de estrellas correctamente.",
    notebookContent: JSON.stringify([
      "Isabella Méndez - TortuCode",
      "Tema: Bucles en Python",
      "--------------------------------------------------",
      "for i in range(1, 4):",
      "    for j in range(1, i + 1):",
      "        print('*', end='')",
      "    print()",
      "",
      "Resultado visual:",
      " *",
      " **",
      " ***",
      "Desarrollado en cuaderno para entender traza de memoria."
    ])
  }
];

const initialQuizLogs = [
  { id: "Q-1", studentId: "STU-001", quizTitle: "Ecuaciones Cuadráticas Básicas", score: 100, maxScore: 100, date: "2026-06-29", status: "aprobado" },
  { id: "Q-2", studentId: "STU-002", quizTitle: "Cinemática y Vectores", score: 75, maxScore: 100, date: "2026-06-30", status: "aprobado" },
  { id: "Q-3", studentId: "STU-003", quizTitle: "Ecuaciones Cuadráticas Básicas", score: 100, maxScore: 100, date: "2026-07-01", status: "aprobado" },
  { id: "Q-4", studentId: "STU-004", quizTitle: "Despejes Simples Álgebra", score: 50, maxScore: 100, date: "2026-07-02", status: "repaso" },
  { id: "Q-5", studentId: "STU-005", quizTitle: "Circuitos en Serie y Paralelo", score: 85, maxScore: 100, date: "2026-07-02", status: "aprobado" }
];

async function seedDatabaseData() {
  const adminHash = hashPassword("admin123");
  await dbRun("INSERT OR IGNORE INTO users (email, password_hash, role) VALUES (?, ?, ?)", ["admin@tortumath.com", adminHash, "admin"]);

  const studentHash = hashPassword("student123");
  for (const student of initialStudents) {
    await dbRun("INSERT OR IGNORE INTO users (email, password_hash, role) VALUES (?, ?, ?)", [student.email, studentHash, "student"]);

    const user = await dbGet<UserRow>("SELECT * FROM users WHERE email = ?", [student.email]);
    if (!user) continue;

    await dbRun(`
      INSERT OR IGNORE INTO students (id, user_id, name, phone, subject, plan, schedule, meet_link, payment_verified, registration_date, amount)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `, [
      student.id,
      user.id,
      student.name,
      student.phone,
      student.subject,
      student.plan,
      student.schedule,
      student.meetLink,
      student.paymentVerified,
      student.registrationDate,
      student.amount
    ]);
  }

  for (const mat of initialMaterials) {
    await dbRun(`
      INSERT OR IGNORE INTO materials (id, student_id, title, type, instructions, assigned_at, status, score, max_score, observation)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `, [mat.id, mat.studentId, mat.title, mat.type, mat.instructions, mat.assignedAt, mat.status, mat.score, mat.maxScore, mat.observation]);
  }

  for (const sub of initialSubmissions) {
    await dbRun(`
      INSERT OR IGNORE INTO submissions (id, student_id, title, subject, submitted_at, status, observation, notebook_content)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `, [sub.id, sub.studentId, sub.title, sub.subject, sub.submittedAt, sub.status, sub.observation, sub.notebookContent]);
  }

  for (const q of initialQuizLogs) {
    await dbRun(`
      INSERT OR IGNORE INTO quiz_logs (id, student_id, quiz_title, score, max_score, date, status)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `, [q.id, q.studentId, q.quizTitle, q.score, q.maxScore, q.date, q.status]);
  }
}

// Database Seeding and Setup
async function setupDatabase() {
  // Create tables
  await dbRun(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      email TEXT UNIQUE NOT NULL,
      password_hash TEXT NOT NULL,
      role TEXT NOT NULL CHECK(role IN ('student', 'admin')),
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  await dbRun(`
    CREATE TABLE IF NOT EXISTS students (
      id TEXT PRIMARY KEY,
      user_id INTEGER UNIQUE REFERENCES users(id),
      name TEXT NOT NULL,
      phone TEXT,
      subject TEXT NOT NULL,
      plan TEXT NOT NULL,
      schedule TEXT NOT NULL,
      meet_link TEXT,
      payment_verified BOOLEAN DEFAULT 0,
      registration_date TEXT NOT NULL,
      amount REAL DEFAULT 0
    )
  `);

  // Check if materials table has old check constraint on type
  const materialsTable = await dbGet("SELECT sql FROM sqlite_master WHERE type='table' AND name='materials'");
  if (materialsTable && materialsTable.sql && materialsTable.sql.includes("CHECK(type IN")) {
    console.log("Upgrading materials table schema...");
    await dbRun("DROP TABLE IF EXISTS materials");
  }

  await dbRun(`
    CREATE TABLE IF NOT EXISTS materials (
      id TEXT PRIMARY KEY,
      student_id TEXT REFERENCES students(id) ON DELETE CASCADE,
      title TEXT NOT NULL,
      type TEXT NOT NULL,
      instructions TEXT,
      assigned_at TEXT NOT NULL,
      status TEXT NOT NULL CHECK(status IN ('pendiente', 'realizando', 'entregado', 'calificado')),
      score INTEGER,
      max_score INTEGER,
      observation TEXT
    )
  `);

  await dbRun(`
    CREATE TABLE IF NOT EXISTS submissions (
      id TEXT PRIMARY KEY,
      student_id TEXT REFERENCES students(id) ON DELETE CASCADE,
      title TEXT NOT NULL,
      subject TEXT NOT NULL,
      submitted_at TEXT NOT NULL,
      status TEXT NOT NULL CHECK(status IN ('pendiente', 'aprobado', 'observado')),
      observation TEXT,
      notebook_content TEXT
    )
  `);

  await dbRun(`
    CREATE TABLE IF NOT EXISTS quiz_logs (
      id TEXT PRIMARY KEY,
      student_id TEXT REFERENCES students(id) ON DELETE CASCADE,
      quiz_title TEXT NOT NULL,
      score INTEGER NOT NULL,
      max_score INTEGER NOT NULL,
      date TEXT NOT NULL,
      status TEXT NOT NULL CHECK(status IN ('aprobado', 'repaso'))
    )
  `);

  await seedDatabaseData();
}

// REST APIs
// ----------------------------------------------------

// Auth Login
app.post("/api/auth/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await dbGet<UserRow>("SELECT * FROM users WHERE email = ?", [email]);
    if (!user) {
      return res.status(401).json({ error: "Credenciales inválidas" });
    }
    const hash = hashPassword(password);
    if (user.password_hash !== hash) {
      return res.status(401).json({ error: "Credenciales inválidas" });
    }
    res.json({ email: user.email, role: user.role });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// Students API
app.get("/api/students", async (req, res) => {
  const { email } = req.query;
  try {
    if (email) {
      // Find single student details
      const student = await dbGet(`
        SELECT s.*, u.email 
        FROM students s 
        JOIN users u ON s.user_id = u.id 
        WHERE u.email = ?
      `, [email]);
      if (!student) {
        return res.status(404).json({ error: "Estudiante no encontrado" });
      }
      return res.json([student]); // Return as array for compatibility
    } else {
      // Return all students (for Admin)
      const studentsList = await dbAll(`
        SELECT s.*, u.email 
        FROM students s 
        JOIN users u ON s.user_id = u.id
      `);
      res.json(studentsList);
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

app.post("/api/students", async (req, res) => {
  const { id, name, phone, email, subject, plan, schedule, meetLink, paymentVerified, amount } = req.body;
  try {
    // Check if user exists
    let user = await dbGet<UserRow>("SELECT * FROM users WHERE email = ?", [email]);
    if (!user) {
      const defaultHash = hashPassword("student123");
      await dbRun("INSERT INTO users (email, password_hash, role) VALUES (?, ?, ?)", [email, defaultHash, "student"]);
      user = await dbGet<UserRow>("SELECT * FROM users WHERE email = ?", [email]);
    }

    if (!user) throw new Error("No se pudo crear el usuario");

    await dbRun(`
      INSERT INTO students (id, user_id, name, phone, subject, plan, schedule, meet_link, payment_verified, registration_date, amount)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `, [
      id,
      user.id,
      name,
      phone,
      subject,
      plan,
      schedule,
      meetLink || "",
      paymentVerified ? 1 : 0,
      new Date().toISOString().split("T")[0],
      amount || 0
    ]);

    const created = await dbGet("SELECT s.*, u.email FROM students s JOIN users u ON s.user_id = u.id WHERE s.id = ?", [id]);
    res.status(201).json(created);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// Create student with user account (for admin CRUD)
app.post("/api/students/create-with-user", async (req, res) => {
  const { name, phone, email, password, subject, plan, schedule, meetLink, amount } = req.body;
  try {
    // Validate required fields
    if (!name || !email || !password || !subject || !plan || !schedule) {
      return res.status(400).json({ error: "Faltan campos obligatorios" });
    }

    // Check if email already exists
    const existingUser = await dbGet<UserRow>("SELECT * FROM users WHERE email = ?", [email]);
    if (existingUser) {
      return res.status(409).json({ error: "Ya existe un usuario con ese email" });
    }

    // Create user
    const passwordHash = hashPassword(password);
    await dbRun("INSERT INTO users (email, password_hash, role) VALUES (?, ?, ?)", [email, passwordHash, "student"]);
    const newUser = await dbGet<UserRow>("SELECT * FROM users WHERE email = ?", [email]);
    if (!newUser) throw new Error("No se pudo crear el usuario");

    // Generate student ID
    const countResult = await dbGet<CountRow>("SELECT COUNT(*) as count FROM students");
    const nextNum = (countResult?.count || 0) + 1;
    const studentId = `STU-${String(nextNum).padStart(3, "0")}`;

    // Create student record
    await dbRun(`
      INSERT INTO students (id, user_id, name, phone, subject, plan, schedule, meet_link, payment_verified, registration_date, amount)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `, [
      studentId,
      newUser.id,
      name,
      phone || "",
      subject,
      plan,
      schedule,
      meetLink || "",
      0,
      new Date().toISOString().split("T")[0],
      amount || 0
    ]);

    const created = await dbGet("SELECT s.*, u.email FROM students s JOIN users u ON s.user_id = u.id WHERE s.id = ?", [studentId]);
    res.status(201).json(created);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// Update student (with optional email/password change)
app.put("/api/students/:id", async (req, res) => {
  const { id } = req.params;
  const { name, phone, email, password, subject, plan, schedule, meetLink, paymentVerified, amount } = req.body;
  try {
    // Update student fields
    await dbRun(`
      UPDATE students 
      SET name = ?, phone = ?, subject = ?, plan = ?, schedule = ?, meet_link = ?, payment_verified = ?, amount = ?
      WHERE id = ?
    `, [
      name,
      phone,
      subject,
      plan,
      schedule,
      meetLink,
      paymentVerified ? 1 : 0,
      amount,
      id
    ]);

    // Update user email if provided
    if (email) {
      const student = await dbGet<{ user_id: number }>("SELECT user_id FROM students WHERE id = ?", [id]);
      if (student) {
        // Check email uniqueness (excluding current user)
        const conflict = await dbGet<UserRow>("SELECT * FROM users WHERE email = ? AND id != ?", [email, student.user_id]);
        if (conflict) {
          return res.status(409).json({ error: "Ya existe otro usuario con ese email" });
        }
        await dbRun("UPDATE users SET email = ? WHERE id = ?", [email, student.user_id]);
      }
    }

    // Update password if provided
    if (password) {
      const student = await dbGet<{ user_id: number }>("SELECT user_id FROM students WHERE id = ?", [id]);
      if (student) {
        const newHash = hashPassword(password);
        await dbRun("UPDATE users SET password_hash = ? WHERE id = ?", [newHash, student.user_id]);
      }
    }

    const updated = await dbGet("SELECT s.*, u.email FROM students s JOIN users u ON s.user_id = u.id WHERE s.id = ?", [id]);
    res.json(updated);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// Delete student and associated user
app.delete("/api/students/:id", async (req, res) => {
  const { id } = req.params;
  try {
    // Get user_id before deleting student
    const student = await dbGet<{ user_id: number }>("SELECT user_id FROM students WHERE id = ?", [id]);
    if (!student) {
      return res.status(404).json({ error: "Estudiante no encontrado" });
    }

    // Delete related data first (cascade manually)
    await dbRun("DELETE FROM materials WHERE student_id = ?", [id]);
    await dbRun("DELETE FROM submissions WHERE student_id = ?", [id]);
    await dbRun("DELETE FROM quiz_logs WHERE student_id = ?", [id]);
    await dbRun("DELETE FROM students WHERE id = ?", [id]);
    await dbRun("DELETE FROM users WHERE id = ?", [student.user_id]);

    res.json({ message: "Alumno y usuario eliminados correctamente" });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});


// Materials API
app.get("/api/materials", async (req, res) => {
  const { studentId } = req.query;
  try {
    if (studentId) {
      const items = await dbAll("SELECT * FROM materials WHERE student_id = ? ORDER BY assigned_at DESC", [studentId]);
      res.json(items);
    } else {
      const allItems = await dbAll("SELECT * FROM materials ORDER BY assigned_at DESC");
      res.json(allItems);
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

app.post("/api/materials", async (req, res) => {
  const { id, studentId, title, type, instructions, assignedAt, status } = req.body;
  try {
    await dbRun(`
      INSERT INTO materials (id, student_id, title, type, instructions, assigned_at, status, score, max_score, observation)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `, [id, studentId, title, type, instructions, assignedAt, status, null, null, null]);
    const created = await dbGet("SELECT * FROM materials WHERE id = ?", [id]);
    res.status(201).json(created);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

app.put("/api/materials/:id", async (req, res) => {
  const { id } = req.params;
  const { status, score, maxScore, observation } = req.body;
  try {
    await dbRun(`
      UPDATE materials 
      SET status = ?, score = ?, max_score = ?, observation = ?
      WHERE id = ?
    `, [status, score, maxScore, observation, id]);
    const updated = await dbGet("SELECT * FROM materials WHERE id = ?", [id]);
    res.json(updated);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

app.delete("/api/materials/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await dbRun("DELETE FROM materials WHERE id = ?", [id]);
    res.json({ message: "Material eliminado correctamente" });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// Submissions API
app.get("/api/submissions", async (req, res) => {
  const { studentId } = req.query;
  try {
    if (studentId) {
      const list = await dbAll(`
        SELECT sub.*, s.name as studentName 
        FROM submissions sub 
        JOIN students s ON sub.student_id = s.id 
        WHERE sub.student_id = ? 
        ORDER BY sub.submitted_at DESC
      `, [studentId]);
      res.json(list.map(row => ({ ...row, notebookContent: JSON.parse(row.notebook_content || "[]") })));
    } else {
      const list = await dbAll(`
        SELECT sub.*, s.name as studentName 
        FROM submissions sub 
        JOIN students s ON sub.student_id = s.id 
        ORDER BY sub.submitted_at DESC
      `);
      res.json(list.map(row => ({ ...row, notebookContent: JSON.parse(row.notebook_content || "[]") })));
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

app.post("/api/submissions", async (req, res) => {
  const { id, studentId, title, subject, submittedAt, status, notebookContent } = req.body;
  try {
    await dbRun(`
      INSERT INTO submissions (id, student_id, title, subject, submitted_at, status, observation, notebook_content)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `, [id, studentId, title, subject, submittedAt, status, null, JSON.stringify(notebookContent || [])]);
    const created = await dbGet("SELECT * FROM submissions WHERE id = ?", [id]);
    res.status(201).json({ ...created, notebookContent: JSON.parse(created.notebook_content || "[]") });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

app.put("/api/submissions/:id", async (req, res) => {
  const { id } = req.params;
  const { status, observation } = req.body;
  try {
    await dbRun(`
      UPDATE submissions 
      SET status = ?, observation = ?
      WHERE id = ?
    `, [status, observation, id]);
    const updated = await dbGet("SELECT * FROM submissions WHERE id = ?", [id]);
    res.json({ ...updated, notebookContent: JSON.parse(updated.notebook_content || "[]") });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// Quiz Logs API
app.get("/api/quizzes", async (req, res) => {
  const { studentId } = req.query;
  try {
    if (studentId) {
      const list = await dbAll(`
        SELECT q.*, s.name as studentName 
        FROM quiz_logs q 
        JOIN students s ON q.student_id = s.id 
        WHERE q.student_id = ? 
        ORDER BY q.date DESC
      `, [studentId]);
      res.json(list);
    } else {
      const list = await dbAll(`
        SELECT q.*, s.name as studentName 
        FROM quiz_logs q 
        JOIN students s ON q.student_id = s.id 
        ORDER BY q.date DESC
      `);
      res.json(list);
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

app.post("/api/quizzes", async (req, res) => {
  const { id, studentId, quizTitle, score, maxScore, date, status } = req.body;
  try {
    await dbRun(`
      INSERT INTO quiz_logs (id, student_id, quiz_title, score, max_score, date, status)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `, [id, studentId, quizTitle, score, maxScore, date, status]);
    const created = await dbGet("SELECT * FROM quiz_logs WHERE id = ?", [id]);
    res.status(201).json(created);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// Alias for /api/quiz_logs requested for textbook integration
app.post("/api/quiz_logs", async (req, res) => {
  const { id, studentId, quizTitle, score, maxScore, date, status } = req.body;
  try {
    await dbRun(`
      INSERT INTO quiz_logs (id, student_id, quiz_title, score, max_score, date, status)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `, [id, studentId, quizTitle, score, maxScore, date, status]);
    const created = await dbGet("SELECT * FROM quiz_logs WHERE id = ?", [id]);
    res.status(201).json(created);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});


// Setup DB and start server
setupDatabase().then(() => {
  app.listen(PORT, () => {
    console.log(`Backend server successfully running on port ${PORT}`);
  });
}).catch(err => {
  console.error("Error setting up SQLite database:", err);
});
