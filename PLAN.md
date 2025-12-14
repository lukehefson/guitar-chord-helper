# Guitar Chord Helper - Project Plan

## Project Overview
A web application that helps guitarists find easier alternative ways to play chords. Users can input a chord name and receive a list of simplified fingerings, with an optional setting to convert any chord to a power chord.

## Core Features

### 1. Chord Input
- Text input field for chord name (e.g., "F", "Bm", "C#maj7", "Dm7")
- Support for common chord notations:
  - Major chords: C, D, E, F, G, A, B
  - Minor chords: Cm, Dm, Em, Fm, Gm, Am, Bm
  - Sharp/Flat variations: C#, Db, F#, Gb, etc.
  - Extended chords: 7th, 9th, sus, add, etc.
- Real-time validation and suggestions

### 2. Easy Alternatives Display
- Show multiple simplified fingerings for the input chord
- Rank alternatives by difficulty/ease:
  - Open chords (easiest)
  - Barre chords with fewer fingers
  - Simplified voicings
  - Power chords
- Visual representation:
  - Chord diagrams (fretboard visualization)
  - Tab notation
  - Finger positions
  - Difficulty rating (1-5 stars or similar)

### 3. Power Chord Mode
- Toggle setting to always convert chords to power chords
- Power chord formula: Root + 5th (e.g., C5, D5, E5)
- Show multiple power chord positions on the fretboard
- Indicate which strings/frets to play

### 4. Additional Features
- Favorites/bookmarking system
- Chord history
- Responsive design for mobile/tablet/desktop
- Share functionality (copy chord diagram or link)

## Technical Architecture

### Frontend Stack
- **Framework**: Vanilla JavaScript (or React/Vue for more complex state management)
- **Styling**: CSS3 with modern features (Grid, Flexbox, CSS Variables)
- **Chord Visualization**: 
  - SVG-based fretboard diagrams
  - Canvas API for custom rendering (optional)
- **Build Tool**: Vite or Parcel (for bundling and optimization)
- **Deployment**: GitHub Pages (static site)

### Data Structure

#### Chord Database
```javascript
{
  chordName: "F",
  root: "F",
  quality: "major",
  intervals: [0, 4, 7], // semitones from root
  standardFingerings: [
    {
      name: "F (Barre)",
      difficulty: 4,
      frets: [1, 3, 3, 2, 1, 1],
      fingers: [1, 2, 3, 1, 1, 1],
      strings: [6, 5, 4, 3, 2, 1]
    },
    {
      name: "F (Easy - 3 strings)",
      difficulty: 2,
      frets: [null, null, 3, 3, 1, 1],
      fingers: [null, null, 2, 3, 1, 1],
      strings: [6, 5, 4, 3, 2, 1]
    }
  ],
  powerChord: {
    root: "F",
    positions: [
      { frets: [1, 3, 3, null, null, null], strings: [6, 5, 4, 3, 2, 1] },
      { frets: [null, null, 8, 10, 10, null], strings: [6, 5, 4, 3, 2, 1] }
    ]
  },
  alternatives: [
    {
      name: "Fmaj7 (easier)",
      difficulty: 2,
      frets: [null, null, 3, 2, 1, 0],
      // ... similar structure
    }
  ]
}
```

### Key Components

1. **Chord Parser**
   - Parse chord names (e.g., "C#m7" → root: C#, quality: minor, extension: 7th)
   - Handle enharmonic equivalents (C# = Db)
   - Validate input

2. **Chord Database/API**
   - Pre-built database of common chords
   - Algorithm to generate fingerings from chord theory
   - Difficulty calculation based on:
     - Number of fingers required
     - Barre requirements
     - Stretch distance
     - Open strings available

3. **Fretboard Renderer**
   - SVG component to draw guitar fretboard
   - Display finger positions
   - Show string numbers and fret numbers
   - Highlight played strings

4. **Alternative Finder**
   - Algorithm to find easier voicings:
     - Drop notes (remove extensions)
     - Use open strings
     - Simplify fingerings
     - Find capo positions
   - Sort by difficulty score

5. **Power Chord Converter**
   - Extract root note from chord
   - Generate power chord positions
   - Show multiple positions across fretboard

## UI/UX Design

### Layout
```
┌─────────────────────────────────────┐
│  Guitar Chord Helper                │
│  [Settings Icon]                    │
├─────────────────────────────────────┤
│                                     │
│  Enter chord name:                  │
│  [________________] [Search/Go]     │
│                                     │
│  💡 Suggestions: F, Fm, F7...       │
├─────────────────────────────────────┤
│                                     │
│  Easy Alternatives for "F":         │
│                                     │
│  ┌─────────┐  ┌─────────┐          │
│  │ F (Easy)│  │ Fmaj7   │          │
│  │ ⭐⭐    │  │ ⭐      │          │
│  │ [Diagram]│  │ [Diagram]│         │
│  └─────────┘  └─────────┘          │
│                                     │
│  ┌─────────┐  ┌─────────┐          │
│  │ F (Barre)│ │ F Power │          │
│  │ ⭐⭐⭐⭐ │  │ ⭐⭐    │          │
│  │ [Diagram]│  │ [Diagram]│         │
│  └─────────┘  └─────────┘          │
│                                     │
└─────────────────────────────────────┘
```

### Settings Panel
- Toggle: "Always show power chords"
- Toggle: "Show tab notation"
- Toggle: "Show difficulty ratings"
- Option: Left-handed mode
- Option: Number of strings (6-string default)

## Implementation Phases

### Phase 1: Foundation (Week 1)
- [ ] Set up project structure
- [ ] Create basic HTML/CSS layout
- [ ] Implement chord name input field
- [ ] Create basic chord parser
- [ ] Set up GitHub Pages deployment

### Phase 2: Chord Database (Week 1-2)
- [ ] Create chord data structure
- [ ] Build database of common chords (50+ chords)
- [ ] Implement chord lookup function
- [ ] Add chord validation

### Phase 3: Visualization (Week 2)
- [ ] Create SVG fretboard component
- [ ] Implement chord diagram renderer
- [ ] Add finger position indicators
- [ ] Style chord diagrams

### Phase 4: Alternative Finder (Week 2-3)
- [ ] Implement difficulty scoring algorithm
- [ ] Create alternative chord finder
- [ ] Add sorting by difficulty
- [ ] Display multiple alternatives

### Phase 5: Power Chord Feature (Week 3)
- [ ] Implement power chord converter
- [ ] Add power chord positions database
- [ ] Create power chord toggle setting
- [ ] Integrate with main display

### Phase 6: Polish & Enhancement (Week 3-4)
- [ ] Add responsive design
- [ ] Implement favorites/history
- [ ] Add error handling
- [ ] Performance optimization
- [ ] Testing across browsers
- [ ] Documentation

## File Structure
```
guitar-chord-helper/
├── index.html
├── css/
│   ├── styles.css
│   └── chord-diagram.css
├── js/
│   ├── main.js
│   ├── chord-parser.js
│   ├── chord-database.js
│   ├── fretboard-renderer.js
│   ├── alternative-finder.js
│   └── power-chord-converter.js
├── data/
│   └── chords.json (optional)
├── assets/
│   └── images/ (if needed)
├── README.md
├── PLAN.md
└── .github/
    └── workflows/
        └── deploy.yml (for GitHub Actions)
```

## GitHub Pages Deployment

### Setup Steps
1. Create `gh-pages` branch or use `main` branch
2. Configure GitHub Pages in repository settings
3. (Optional) Set up GitHub Actions for automatic deployment
4. Ensure all paths are relative (no absolute paths)

### GitHub Actions Workflow (Optional)
```yaml
name: Deploy to GitHub Pages
on:
  push:
    branches: [ main ]
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Deploy
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./
```

## Technologies & Libraries

### Core
- HTML5
- CSS3 (with CSS Grid/Flexbox)
- Vanilla JavaScript (ES6+)

### Optional Enhancements
- **Chord Theory Library**: Use existing library for chord calculations (if available)
- **SVG Library**: Consider D3.js or Snap.svg for advanced visualizations
- **State Management**: If using React/Vue, use their state management

### No External Dependencies (Recommended)
- Keep it lightweight for fast loading
- Self-contained for easy GitHub Pages deployment

## Data Sources

### Chord Fingerings
- Manual entry of common chords
- Reference: Ultimate Guitar, Chordify, or similar
- Focus on most common 50-100 chords initially

### Difficulty Ratings
- Based on:
  - Number of fingers: 1-2 fingers = easy, 3-4 = medium, 5+ = hard
  - Barre requirement: No barre = easier
  - Stretch: Small stretch = easier
  - Open strings: More open strings = easier

## Future Enhancements (Post-MVP)
- Capo suggestions
- Chord progressions helper
- Audio playback of chords
- Metronome integration
- Practice mode
- User accounts and saved progressions
- Chord transposition
- Multiple tunings (Drop D, Open G, etc.)

## Success Metrics
- Fast load time (< 2 seconds)
- Works on mobile devices
- Accurate chord representations
- Intuitive user interface
- Helpful alternative suggestions

