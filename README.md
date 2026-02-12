# VeritasAI - Cross-Platform Misinformation Intelligence System

A fully responsive React frontend for detecting scams, phishing, and misinformation across emails, messages, links, and news articles using simulated AI analysis.

## 🚀 Features

### Detection Capabilities
- **Email Scanner**: Detect phishing emails with domain analysis, linguistic patterns, and sender verification
- **Message Scanner**: Identify scams and social engineering in text messages with behavioral analysis
- **Link Scanner**: Analyze URLs for malicious domains, typosquatting, and hidden redirects
- **Fake News Detector**: Verify news articles with content analysis and source verification

### Technical Features
- **Explainable AI Results**: Detailed technical breakdowns with confidence scores and metrics
- **Real-time Analysis**: Simulated 2-second ML processing with loading animations
- **Interactive Visualizations**: Charts, graphs, and highlighted text analysis
- **Analytics Dashboard**: Track scans, threats, and trends over time

### Design System
- **Cybersecurity Aesthetic**: Dark theme with neon accents (cyan, purple, blue)
- **Glassmorphism UI**: Transparent cards with blur effects
- **Smooth Animations**: Fast micro-interactions (200-300ms) using Framer Motion
- **Responsive Design**: Mobile-first approach with touch-friendly interfaces
- **Accessibility**: ARIA labels, keyboard navigation, and focus indicators

## 🛠️ Tech Stack

- **React 18** with Vite
- **Tailwind CSS** for styling
- **Framer Motion** for animations
- **React Router** for navigation
- **Recharts** for data visualization
- **react-tsparticles** for subtle background effects
- **Inter Font** from Google Fonts

## 📦 Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

## 🎨 Design Highlights

### Color Palette
- Deep Matte Black: `#0B0F14`
- Neon Cyan: `#00F5FF`
- Electric Purple: `#8A2BE2`
- Soft Blue: `#1E90FF`
- Risk Red: `#FF4C4C`
- Risk Amber: `#FFA500`
- Risk Green: `#00FF88`

### Animation Guidelines
- **Button Hover**: Scale 1.05 + glow effect (200ms)
- **Card Hover**: Lift 4px + border glow (200ms)
- **Page Transitions**: Fade + slide (200-300ms)
- **Result Reveal**: Sequential animation (badge → circle → explanations → charts)

## 🔍 Result Analysis Sequence

When analysis completes, components animate in this exact order:

1. **Loading Spinner** dissolves (200ms fade out)
2. **Risk Badge** slides up from bottom (200ms)
3. **Confidence Circle** appears and counts up (300ms)
4. **Explanation Bullets** appear one-by-one (150ms stagger)
5. **Feature Scores Chart** animates last (300ms)

## 📊 Mock Data

All analysis is simulated using `src/utils/mockApi.js`:
- 2-second delay to mimic ML processing
- Varied responses based on input keywords
- Technical explanations with confidence scores
- Realistic threat detection patterns

## 🎯 Key Components

### Core Components
- `Navbar`: Fixed navigation with sliding underline animation
- `RiskBadge`: Consistent risk level indicator (HIGH RISK/SUSPICIOUS/SAFE)
- `ConfidenceCircle`: Animated circular progress with count-up
- `ExplanationPanel`: Technical analysis with staggered animations
- `HighlightedText`: Keyword highlighting with tooltips
- `RiskBarChart`: Animated horizontal bar chart with Recharts

### Pages
- `Home`: Hero section with features and CTAs
- `EmailDetection`: Email phishing analysis
- `MessageDetection`: Text message scam detection
- `LinkDetection`: URL and domain analysis
- `NewsDetection`: Fake news and misinformation detection
- `Dashboard`: Analytics and statistics overview
- `SignIn`: Simple authentication (localStorage only)

## 🎭 Animation Specifications

### Micro-interactions
```css
/* Button hover */
transform: scale(1.05);
box-shadow: 0 0 20px rgba(0, 245, 255, 0.5);
transition: all 0.2s ease;

/* Card hover */
transform: translateY(-4px);
border-color: rgba(0, 245, 255, 0.5);
transition: all 0.2s ease;
```

### Framer Motion Variants
```javascript
// Page transitions
const pageVariants = {
  initial: { opacity: 0, x: -20 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: 20 }
};

// Staggered list
const listVariants = {
  visible: {
    transition: { staggerChildren: 0.15 }
  }
};
```

## 🔐 Security Note

This is a **frontend-only demonstration** with no real backend or ML models. All analysis is simulated using mock data and setTimeout delays. Do not use for actual security analysis.

## 📱 Responsive Breakpoints

- Mobile: < 640px
- Tablet: 640px - 1024px
- Desktop: > 1024px

## ♿ Accessibility

- Semantic HTML elements
- ARIA labels on interactive elements
- Keyboard navigation support
- Focus indicators with neon glow
- Screen reader friendly

## 🎓 Hackathon Project

Built as a demonstration of modern web development practices:
- Component-based architecture
- Responsive design principles
- Smooth animations and micro-interactions
- Professional UI/UX design
- Clean, maintainable code

## 📄 License

MIT License - Built for educational and demonstration purposes.

---

**VeritasAI** - Truth through AI-powered intelligence.
