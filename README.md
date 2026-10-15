# 🐢 TortuMath - Plataforma Educativa Interactiva y Síncrona

¡Bienvenidos al repositorio oficial de **TortuMath**! Una plataforma de aprendizaje de alto rendimiento diseñada específicamente para el mercado de Bolivia. TortuMath integra ciencias exactas (Matemáticas y Física) con tecnologías aplicadas (Programación y Electrónica / Robótica) a través de simuladores visuales interactivos 2D y 3D en tiempo real.

---

## 🚀 Tecnologías y Frameworks Utilizados

El ecosistema digital de TortuMath está construido con herramientas web modernas de alto rendimiento:

1. **Frontend (SPA):**
   - **React 19:** Biblioteca principal para la creación de componentes interactivos y manejo de estados fluidos.
   - **Vite 6:** Motor de desarrollo ultra-rápido para empaquetado optimizado, HMR y compilación eficiente.
   - **TypeScript 5:** Superconjunto de JavaScript que garantiza tipado estricto, autocompletado y robustez de código.
2. **Estilos y Animaciones:**
   - **Tailwind CSS v4:** Framework de utilidades CSS de última generación para una UI limpia, responsiva y de carga instantánea.
   - **Framer Motion (v12):** Motor de animación declarativo (importado desde `motion/react`) que da vida a las transiciones, acordeones (FAQs) y elevación visual de tarjetas.
   - **Lucide React:** Colección de íconos vectoriales modernos y estilizados que representan cada materia y herramienta.
3. **Servidor y API (Ecosistema Full-Stack):**
   - **Express.js (Node.js):** Backend robusto de baja latencia para enrutamiento API y soporte opcional de endpoints de IA.
   - **@google/genai SDK:** SDK moderno para integración segura de modelos de lenguaje Gemini en el servidor.

---

## 🗂️ Estructura del Proyecto

El código fuente está modularizado de forma intuitiva para facilitar el mantenimiento y escalabilidad del proyecto:

```bash
├── /assets/                # Recursos estáticos y logotipos oficiales
├── /src/
│   ├── main.tsx            # Punto de entrada principal de React y montaje en DOM
│   ├── index.css           # Estilos globales y directivas @import de Tailwind CSS v4
│   ├── App.tsx             # Componente raíz que maneja el flujo principal de vistas (Landing vs Dashboards)
│   └── /components/        # Componentes reutilizables de UI y secciones:
│       ├── Logo.tsx        # Representación visual del icónico logo de TortuMath
│       ├── Navbar.tsx      # Barra de navegación adaptable (Desktop / Mobile) con enlaces interactivos
│       ├── Hero.tsx        # Sección de impacto visual con llamado a la acción inmediata
│       ├── SubjectGrid.tsx # Cuadrícula de materias interactivas de TortuMath
│       ├── DashboardPreview.tsx # Vista previa del Dashboard estudiantil (Mini-Quiz, Biblioteca y Simulador 2D)
│       ├── SuccessStats.tsx     # Bloque horizontal con contadores y métricas de éxito académico
│       ├── TeamSection.tsx      # Presentación premium de los fundadores: Isacc Leonardo y Jhosue Ameth
│       ├── FaqSection.tsx       # Acordeón interactivo para resolver dudas comunes de alumnos y padres
│       ├── Footer.tsx           # Pie de página unificado con enlaces de contacto y redes sociales
│       ├── LoginModal.tsx       # Ventana emergente con validación para roles (Estudiante, Admin)
│       ├── EnrollmentModal.tsx  # Modal interactivo con selector de horarios dinámicos y pasarela QR
│       ├── StudentDashboard.tsx # Portal estudiantil completo (Clases, Notas, Biblioteca, Simulador, Config)
│       └── AdminDashboard.tsx   # Panel de control de administrador para coordinar tutores, clases y estudiantes
├── package.json            # Scripts de compilación y declaración de dependencias de Node.js
├── tsconfig.json           # Configuración de compilación para el compilador de TypeScript
├── vite.config.ts          # Configuración del servidor de desarrollo Vite y plugins de React
├── requirements.txt        # Dependencias de investigación (IA, Visión por Computadora, Robótica)
└── metadata.json           # Configuración de permisos e identificadores del Applet
```

---

## 🧭 Flujo de Enrutamiento y Navegación

A diferencia de los sistemas tradicionales con múltiples páginas pesadas, TortuMath utiliza un **enrutador interno basado en estados reactivos** dentro del archivo `App.tsx` para una transición instantánea y fluida entre paneles:

1. **Modo Landing Page (Default):**
   - El estudiante navega a través de anclajes de sección suaves (`#materias`, `#laboratorio-preview`, `#equipo-tutor`, `#faqs`).
   - El botón **"Ingresar"** abre el `LoginModal`, permitiendo autenticar credenciales.
2. **Modo Estudiante (`activeDashboard === "student"`):**
   - Carga un panel dinámico y seguro controlado por el estado `activeTab` en `StudentDashboard.tsx`:
     - **Inicio:** Resumen de horas de estudio, TortuPuntos acumulados y próxima clase síncrona.
     - **Horarios & Agenda:** Cronograma interactivo con enlaces directos a Google Meet con el tutor.
     - **Material de Estudio:** Repositorio de guías, ejercicios resueltos y PDFs clasificados.
     - **Laboratorio Científico:** Simulador 2D interactivo del Plano Inclinado con Fricción y modelo 3D dinámico de un átomo con rotación espacial.
     - **Configuración:** Personalización de temas visuales guardados en `localStorage` (**Tema Tortuga**, **Modo Matrix / Terminal** y **Cyber Deep Blue**).
3. **Modo Administrador (`activeDashboard === "admin"`):**
   - Acceso al panel `AdminDashboard.tsx` para la gestión de alumnos inscritos, reasignación de tutores a materias, aprobación de inscripciones pendientes enviadas desde el `EnrollmentModal`, y control de métricas globales.

---

## 🛠️ Instrucciones de Ejecución Local

Sigue estos pasos para levantar el entorno de desarrollo localmente en tu máquina:

### 1. Clonar el repositorio e instalar dependencias de Node.js:
```bash
npm install
```

### 2. Ejecutar el servidor de desarrollo en modo local:
```bash
npm run dev
```
*El servidor de Vite se iniciará por defecto en el puerto `3000` con bind de red para visualización local instantánea.*

### 3. Ejecutar el análisis estático (Linter) de TypeScript:
```bash
npm run lint
```

### 4. Compilar la aplicación para producción:
```bash
npm run build
```
*Esto generará los archivos optimizados dentro del directorio `/dist` listos para ser desplegados en servidores de archivos estáticos o Cloud Run.*

---

## 🔬 Dependencias de Investigación Científica (`requirements.txt`)

Para los módulos avanzados fuera de la web (tales como la programación de microcontroladores en el proyecto de Robótica aplicada, la visión computacional en el Robot Submarino ROV o algoritmos predictivos de IA), los requerimientos están documentados en el archivo `requirements.txt`. Estos incluyen:
- `google-genai` para el procesamiento síncrono del backend cognitivo.
- `opencv-python` para la detección de residuos y visión de cámaras robóticas.
- `numpy` y `scipy` para los cálculos vectoriales y trayectorias físicas complejas del laboratorio.

---

**TortuMath: Innovación y Tecnología Educativa Boliviana para Construir el Futuro.**
