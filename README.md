# 📊 GPA & CGPA Calculation System

### A Human-Computer Interaction (HCI) Project for Academic Performance Analysis

---

<div align="center">

![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![Vercel](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)

[![HCI Project](https://img.shields.io/badge/Domain-Human%20Computer%20Interaction-blueviolet?style=flat-square)](https://github.com)
[![Educational](https://img.shields.io/badge/Purpose-Educational-green?style=flat-square)](https://github.com)
[![Web Application](https://img.shields.io/badge/Type-Web%20Application-orange?style=flat-square)](https://github.com)
[![Live Status](https://img.shields.io/badge/Status-Live-success?style=flat-square)](https://gpa-cgpa-calculation-web.vercel.app/)

</div>

---

## 📖 Project Overview

The **GPA & CGPA Calculation System** is a modern web-based application designed to streamline academic performance tracking for university students. Built with a strong emphasis on **Human-Computer Interaction (HCI) principles**, this system provides an intuitive, accessible, and efficient interface for calculating Grade Point Averages (GPA) and Cumulative Grade Point Averages (CGPA).

This project demonstrates the practical application of user-centered design methodologies, cognitive ergonomics, and usability engineering principles. By leveraging contemporary web technologies including React and TypeScript, the system delivers a responsive, type-safe, and performant user experience that minimizes cognitive load while maximizing task efficiency.

The application addresses common pain points students face when manually calculating academic performance metrics, offering real-time validation, error prevention mechanisms, and clear visual feedback throughout the interaction process.

---

## 🌐 Live Application

**Access the deployed system here:**  
🔗 **[https://gpa-cgpa-calculation-web.vercel.app/](https://gpa-cgpa-calculation-web.vercel.app/)**

---

## ✨ Key Features

- 🎯 **Automated GPA/CGPA Calculation** – Instant computation with dynamic credit hour weighting
- 🧠 **Cognitive Load Reduction** – Simplified input forms with progressive disclosure patterns
- ♿ **Accessibility Compliance** – WCAG-compliant interface with keyboard navigation support
- 📱 **Responsive Design** – Mobile-first approach ensuring cross-device compatibility
- ⚡ **Real-Time Validation** – Immediate feedback mechanisms preventing user errors
- 🎨 **Intuitive Visual Hierarchy** – Clear information architecture with semantic color coding
- 💾 **Persistent Data Storage** – Local storage integration for session continuity
- 🔄 **Dynamic Course Management** – Add, edit, and remove courses with smooth transitions
- 📊 **Visual Performance Indicators** – Graphical representation of academic standing
- 🚀 **Fast Load Times** – Optimized build pipeline with Vite for sub-second interactions

---

## 🏗️ System Architecture

### Component Hierarchy

```
GPA-CGPA-System/
│
├── UI Layer (React Components)
│   ├── CourseInputForm
│   ├── GradeCalculator
│   ├── ResultsDisplay
│   └── NavigationBar
│
├── Business Logic Layer (TypeScript)
│   ├── Calculation Engine
│   ├── Validation Services
│   └── Data Management
│
├── State Management
│   ├── React Hooks (useState, useEffect)
│   └── Context API
│
└── Data Persistence Layer
    └── LocalStorage API
```

### Data Flow Diagram

```mermaid
graph LR
    A[User Input] --> B[Validation Layer]
    B --> C[Calculation Engine]
    C --> D[State Management]
    D --> E[Results Display]
    D --> F[Local Storage]
    F --> D
```

---

## 🛠️ Technology Stack & Tools

| Category | Technology | Purpose |
|----------|-----------|---------|
| **Frontend Framework** | React 18.x | Component-based UI architecture |
| **Programming Language** | TypeScript | Type safety and enhanced developer experience |
| **Build Tool** | Vite | Lightning-fast HMR and optimized production builds |
| **Styling** | CSS3 | Custom responsive styling with modern layout techniques |
| **Markup** | HTML5 | Semantic structure and accessibility foundations |
| **Deployment** | Vercel | Continuous deployment with edge network distribution |
| **Version Control** | Git/GitHub | Source code management and collaboration |
| **Package Manager** | npm/yarn | Dependency management |

---

## 🔧 Core Functional Modules

### 1. **Course Input Module**
- Dynamic form generation for multiple courses
- Input fields: Course Name, Credit Hours, Grade Points
- Inline validation with error messaging
- Add/Remove course functionality

### 2. **Calculation Engine**
- Weighted average computation algorithm
- Semester GPA calculation
- Cumulative CGPA aggregation across multiple semesters
- Precision handling for decimal places

### 3. **Results Visualization**
- Real-time display of calculated metrics
- Color-coded performance indicators
- Comparative analytics (semester vs cumulative)
- Exportable result summaries

### 4. **Data Persistence Layer**
- Browser-based local storage implementation
- Session recovery mechanisms
- Data serialization/deserialization
- Privacy-conscious client-side storage

---

## 👥 User-Centered Design Principles Applied

### 🧩 Cognitive Load Reduction
- **Chunking Information**: Course data grouped logically by semester
- **Progressive Disclosure**: Advanced options hidden until needed
- **Recognition over Recall**: Pre-filled dropdown menus for common grade values
- **Consistent Patterns**: Uniform input field layouts across all forms

### ♿ Accessibility Features
- **Keyboard Navigation**: Full tab-index implementation
- **Screen Reader Support**: ARIA labels and semantic HTML
- **Color Contrast**: WCAG AA compliance (4.5:1 minimum ratio)
- **Focus Indicators**: Clear visual feedback for interactive elements
- **Responsive Text Scaling**: Supports browser zoom up to 200%

### 🎯 Simplicity & Clarity
- **Minimal Interface**: Clean, distraction-free layout
- **Clear Action Items**: Prominent call-to-action buttons
- **Instant Feedback**: Real-time validation and error messages
- **Visual Affordances**: Button styling indicates clickability

---

## 🚀 Deployment & Hosting

### Vercel Deployment Pipeline

The application is deployed on **Vercel**, leveraging:
- **Automatic Git Integration**: Continuous deployment from GitHub repository
- **Edge Network CDN**: Global distribution for minimal latency
- **HTTPS by Default**: Secure connections with automatic SSL certificates
- **Preview Deployments**: Branch-based staging environments
- **Zero-Config Setup**: Optimized build detection for Vite projects

**Deployment URL**: [https://gpa-cgpa-calculation-web.vercel.app/](https://gpa-cgpa-calculation-web.vercel.app/)

---

## 🧪 Testing & Evaluation

### Usability Testing Methodology
- **Heuristic Evaluation**: Nielsen's 10 usability heuristics assessment
- **Task Analysis**: Timed completion of core calculation workflows
- **User Feedback**: Post-interaction surveys (SUS - System Usability Scale)
- **Accessibility Audit**: WAVE tool and manual screen reader testing

### Performance Metrics
- **First Contentful Paint**: < 1.2s
- **Time to Interactive**: < 2.5s
- **Lighthouse Score**: 90+ (Performance, Accessibility, Best Practices)
- **Cross-Browser Compatibility**: Tested on Chrome, Firefox, Safari, Edge

---

## ⚡ Performance & Usability Considerations

| Aspect | Implementation | Benefit |
|--------|---------------|---------|
| **Code Splitting** | Vite dynamic imports | Reduced initial bundle size |
| **Lazy Loading** | React.lazy() for components | Faster page loads |
| **Memoization** | useMemo/useCallback hooks | Prevents unnecessary re-renders |
| **Form Optimization** | Debounced validation | Smooth user experience |
| **Error Boundaries** | React error handling | Graceful failure recovery |
| **Semantic HTML** | Proper tag usage | Improved SEO and accessibility |

---

## 🎓 Educational Outcomes

This project demonstrates proficiency in:

✅ **HCI Principles**: User-centered design, cognitive ergonomics, interaction design patterns  
✅ **Frontend Development**: Modern React architecture with TypeScript  
✅ **Accessibility Standards**: WCAG compliance and inclusive design  
✅ **Usability Engineering**: Iterative design, user testing, heuristic evaluation  
✅ **Performance Optimization**: Build optimization, lazy loading, efficient rendering  
✅ **Deployment Practices**: CI/CD pipelines, cloud hosting, version control  

---

## 🔄 Limitations & Future Improvements

### Current Limitations
- **Grade Scale Variability**: Currently supports 4.0 scale only
- **Offline Functionality**: Requires internet connection for initial load
- **Data Export**: Limited export format options (no PDF generation)
- **Multi-User Support**: No account system or cloud synchronization

### Planned Enhancements
- 🌍 **Internationalization**: Support for multiple grading systems (UK, EU, Asian scales)
- 📥 **Data Import/Export**: CSV upload and PDF report generation
- 📊 **Advanced Analytics**: Trend analysis, predictive performance modeling
- ☁️ **Cloud Sync**: Optional account creation for cross-device access
- 🎨 **Theme Customization**: Dark mode and custom color schemes
- 📱 **Progressive Web App (PWA)**: Offline-first architecture with service workers

---

## 🛡️ Ethical & Academic Considerations

### Academic Integrity
This project is designed as an **educational tool** for academic performance tracking. It should be used to:
- ✅ Plan course selection strategically
- ✅ Monitor academic progress independently
- ✅ Set realistic GPA improvement goals

**Important**: This tool does **not** replace official university grade reports and should not be used for:
- ❌ Falsifying academic records
- ❌ Unauthorized grade manipulation claims
- ❌ Circumventing institutional policies

### Data Privacy
- All calculations are performed **client-side**
- No personal data is transmitted to external servers
- Local storage can be cleared at any time by the user
- No tracking or analytics integrated

---

## 📄 License & Usage

### Academic Use License

This project is developed for **educational purposes** as part of a university Human-Computer Interaction (HCI) course.

**Permitted Uses**:
- ✅ Academic research and study
- ✅ Personal GPA/CGPA calculation
- ✅ Learning HCI principles and web development
- ✅ Code reference for educational projects (with attribution)

**Restrictions**:
- ❌ Commercial redistribution without permission
- ❌ Plagiarism or direct submission as original work
- ❌ Removal of attribution or license information

For collaboration or specific usage inquiries, please contact the project maintainer.

---

<div align="center">

### 🎓 Developed as an HCI Academic Project

**Built with 💡 innovation, 🎨 design thinking, and ⚡ modern web technologies**

---



**Human-Computer Interaction | User-Centered Design | Web Engineering**


[![University](https://img.shields.io/badge/Institution-University_of_Wah-blue.svg)](#)
[![Department](https://img.shields.io/badge/Department-Cybersecurity-purple.svg)](#)
[![Course](https://img.shields.io/badge/Course-Human_Computer_Interaction-teal.svg)](#)
[![Semester](https://img.shields.io/badge/Semester-5th-green.svg)](#)
[![Project](https://img.shields.io/badge/Type-Research_Project-orange.svg)](#)

---

**⭐ Star this repository if it helped your cybersecurity learning journey!**

**Human-Computer Interaction | User-Centered Design | Web Engineering**

</div>
