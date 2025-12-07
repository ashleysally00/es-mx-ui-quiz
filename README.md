# es-mx-ui-quiz

A lightweight, zero-dependency Vanilla JS quiz app for learning **Mexican/US Spanish (es-MX / es-US)** terminology used in UI/UX, software localization, and AI/tech product wording.

The quiz teaches how to distinguish preferred professional translations from regional variants, Spanglish forms, or misleading alternatives.

## Live Demo

**[Launch the App](https://ashleysally00.github.io/es-mx-ui-quiz/)**

## Features

* **Contextual Learning:** Differentiates between everyday Spanish and proper "App UI Spanish."
* **Two Difficulty Levels:**
  * **Level 1:** Basic UI terms and buttons (Save, Submit, Settings)
  * **Level 2:** UX microcopy, friction/error messages, AI/ML phrasing, and permission dialogs
* **Zero Dependencies:** Runs entirely in the browser.
* **Immediate Feedback:** Explains *why* the professional translation is preferred.

## Technical Overview

* **Architecture:** Zero-dependency Single Page Application (SPA)
* **Stack:** HTML5, CSS3, Vanilla JavaScript (ES6+)
* **State Management:** Lightweight local state for score tracking and level progression
* **Performance:** Instant load time; no bundlers or frameworks

## How It Works

Each quiz question is generated through:

* **Shuffling:** Pulls random items from `dataLevel1` and `dataLevel2`
* **Randomization:** Distractors are randomized on every question
* **Context Hints:** Reinforces correct UI usage (e.g., button text, OS dialogs, onboarding)
* **State Tracking:** Handles scoring and progression for the level

## Usage

Clone or download the repository:

```bash
git clone https://github.com/ashleysally00/es-mx-ui-quiz.git
```

Open the project and launch the quiz:

```bash
# macOS
open index.html

# Windows
start index.html
```

Or simply drag `index.html` into your browser.

## Contributing

Contributions are welcome! Feel free to open issues or submit pull requests to expand the question bank or improve the UI.

## License

This project is open source and available under the MIT License.
