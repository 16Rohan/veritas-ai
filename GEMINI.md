# VeritasAI - Cross-Platform Misinformation Intelligence System

## Project Overview

VeritasAI is a fully responsive React frontend designed for detecting scams, phishing, and misinformation across various platforms like emails, messages, links, and news articles. It simulates AI analysis to provide detailed insights.

**Key Technologies:**
*   **Frontend Framework:** React 18 with Vite
*   **Styling:** Tailwind CSS
*   **Animations:** Framer Motion
*   **Navigation:** React Router
*   **Data Visualization:** Recharts
*   **Background Effects:** react-tsparticles
*   **Font:** Inter Font (Google Fonts)

**Architecture:**
This project is a frontend-only demonstration. All AI analysis and processing are simulated using mock data (`src/utils/mockApi.js`) and `setTimeout` delays, without a real backend or actual machine learning models.

## Building and Running

To set up and run the VeritasAI project, follow these steps:

### Installation

Install the project dependencies:
```bash
npm install
```

### Development Server

Start the development server. The application will be accessible at `http://localhost:1000`.
```bash
npm run dev
```

### Build for Production

Build the project for production deployment:
```bash
npm run build
```

## Development Conventions

### Design System

The project adheres to a "Cybersecurity Aesthetic" with a dark theme and neon accents (cyan, purple, blue). It utilizes a "Glassmorphism UI" with transparent cards and blur effects. Responsive design is prioritized with a mobile-first approach.

**Color Palette:**
*   Deep Matte Black: `#0B0F14`
*   Neon Cyan: `#00F5FF`
*   Electric Purple: `#8A2BE2`
*   Soft Blue: `#1E90FF`
*   Risk Red: `#FF4C4C`
*   Risk Amber: `#FFA500`
*   Risk Green: `#00FF88`

### Animations

Framer Motion is used for smooth animations and micro-interactions (200-300ms). Key animation sequences include:

*   **Button Hover:** Scale 1.05 + glow effect (200ms)
*   **Card Hover:** Lift 4px + border glow (200ms)
*   **Page Transitions:** Fade + slide (200-300ms)
*   **Result Reveal:** Sequential animation (badge → circle → explanations → charts)

### Mock Data Simulation

All analysis results are simulated using `src/utils/mockApi.js`. This file introduces a 2-second delay to mimic ML processing and provides varied responses based on input keywords, including technical explanations, confidence scores, and realistic threat detection patterns.

### Accessibility

The project incorporates accessibility best practices, including semantic HTML, ARIA labels on interactive elements, keyboard navigation support, focus indicators with neon glow, and screen reader friendliness.

### Security Note

It is crucial to understand that this is a **frontend-only demonstration** for educational and hackathon purposes. It does **not** feature a real backend or actual ML models for security analysis. Therefore, it should **not** be used for genuine security analysis.

## Key Components and Pages

**Core Components:**
*   `Navbar`: Fixed navigation.
*   `RiskBadge`: Consistent risk level indicator.
*   `ConfidenceCircle`: Animated circular progress.
*   `ExplanationPanel`: Technical analysis display.
*   `HighlightedText`: Keyword highlighting.
*   `RiskBarChart`: Animated horizontal bar chart.

**Pages:**
*   `Home`: Hero section with features and CTAs.
*   `EmailDetection`: Email phishing analysis.
*   `MessageDetection`: Text message scam detection.
*   `LinkDetection`: URL and domain analysis.
*   `NewsDetection`: Fake news detection.
*   `Dashboard`: Analytics and statistics overview.
*   `SignIn`: Simple authentication.
