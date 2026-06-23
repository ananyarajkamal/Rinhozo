# Rinhozo

Rinhozo is a gamified, multilingual learning companion designed to make education accessible to every student, regardless of language, neurodiversity, or device constraints, through bite-sized, swipeable micro-lessons.

## Core Features

- **Hinglish-First Design**: Custom conceptual translation designed for students who naturally mix Hindi and English in their everyday conversations.
- **Multilingual Selection**: Support for Hinglish, English, Hindi, and Tamil interface and lesson content.
- **Adaptive Learning Styles**: Visual layouts, direct concept definitions, story-based analogies, and audio reading adapt dynamically to user preferences.
- **Physical Gesture Mechanics**: Tactile card-swipe interfaces built with Framer Motion, enabling single-concept focus for neurodivergent learners.
- **Offline-First Resilience**: Full offline capability. Caches assets using a Progressive Web App service worker and persists student data inside local IndexedDB.
- **Interactive Companion**: Features Rin, an animated jellyfish companion that responds emotionally to correct quiz responses or learning struggle points.

## Technology Stack

- **Framework**: React 19, Vite, TypeScript
- **Styling**: Tailwind CSS v4
- **Animations**: Framer Motion
- **Database Layer**: Local IndexedDB wrapper with Firebase Client SDK integration capability
- **PWA Service Worker**: vite-plugin-pwa

## Getting Started

Follow these steps to run the application locally:

### Prerequisites

Ensure you have Node.js and npm installed on your machine:
- Node.js (v24 or higher recommended)
- npm (v11 or higher recommended)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/ananyarajkamal/Rinhozo.git
   cd Rinhozo
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

### Running Locally

To start the development server with Hot Module Replacement:
```bash
npm run dev
```

The application will run locally at http://localhost:5173.

### Production Build

To compile the TypeScript project and generate the production bundle with PWA service workers:
```bash
npm run build
```

This will check types and produce build files inside the `dist` directory.
