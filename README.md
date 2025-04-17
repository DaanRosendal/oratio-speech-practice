# Oratio - Speech Practice Platform

Oratio is a web application designed to support public speaking practice sessions, specifically created for the SpeakEasy community at Microsoft NL. The application provides a user-friendly interface for different types of speech practice with timing and topic generation capabilities.

## Features

- **Three Practice Modes**:

  - **Impromptu** (2.5 minutes): Practice spontaneous speaking with randomly generated topics
  - **Prepared** (7 minutes): Practice structured presentations with your own prepared content
  - **Evaluative** (2.5 minutes): Practice giving feedback and evaluations

- **Topic Generator**: Generate random topics across different themes.

- **Interactive Timer**:
  - Visual countdown with color indicators
  - Pause/resume functionality
  - Option to hide numeric display for reduced pressure
  - Fullscreen mode for focused practice

## Technology Stack

- **Frontend**: React with TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Build Tool**: Vite

## Getting Started

### Prerequisites

- Node.js (v14.0 or higher)
- npm or yarn

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/oratio-speech-practice.git
   cd oratio-speech-practice
   ```

2. Install dependencies:

   ```bash
   npm install
   # or
   yarn
   ```

3. Start the development server:

   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. Open your browser and navigate to `http://localhost:5173/`

### Building for Production

```bash
npm run build
# or
yarn build
```

## Usage Guide

1. **Select a Practice Mode**: Choose between Impromptu, Prepared, or Evaluative speech practice
2. **For Impromptu Speeches**: Select a theme and generate topics, then choose one to practice with
3. **Start the Timer**: Use the play button to begin your practice session
4. **During Practice**:
   - The timer will change colors as you approach different time thresholds
   - You can pause/resume as needed
   - Toggle the numeric display if you prefer a less pressure-inducing indicator
   - Use fullscreen mode for an immersive experience

## Contributing

Contributions to Oratio are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- SpeakEasy community at Microsoft NL for inspiring this project
- All contributors who have helped shape and improve Oratio

---

Created with ❤️ for the SpeakEasy community at Microsoft NL.
