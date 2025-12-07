# es-mx-ui-quiz

A lightweight Vanilla JS quiz app for learning Mexican/US Spanish (`es-MX`/`es-US`) terminology used in UI/UX and software localization. The quiz tests recognition of preferred terms versus regional variants, Spanglish forms, or ambiguous alternatives.

## Live Demo
Try the live demo [here](https://ashleysally00.github.io/es-mx-ui-quiz/).

## Technical Overview
* **Architecture:** Zero-dependency Single Page Application (SPA).
* **Stack:** HTML5, CSS3, Vanilla JavaScript (ES6+).
* **State Management:** Simple local state handling for scoring and progression.
* **Styling:** CSS Variables and Flexbox/Grid for a responsive layout.
* **Performance:** No build steps or heavy frameworks; instant load time.

## How It Works
The app shuffles a dataset of key/value pairs and generates DOM elements on the fly. It includes logic for:
* Randomizing answer distractors.
* Immediate visual feedback (CSS class toggling).
* Score tracking.

## Usage
1. Clone the repo (or download the files).
2. Open `index.html` in your browser.

*Note: You can modify the dataset by editing the `database` const array in the script tag.*
