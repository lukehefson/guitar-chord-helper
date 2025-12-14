# Guitar Chord Helper

A web application that helps guitarists find easier alternative ways to play chords. Simply type in a chord name and get a list of simplified fingerings, with an optional setting to convert any chord to a power chord.

## Features

- 🎸 **Chord Input**: Type any chord name (e.g., F, Bm, C#maj7)
- 📊 **Easy Alternatives**: Get ranked list of easier ways to play the chord
- ⚡ **Power Chord Mode**: Toggle to always convert chords to power chords
- 📱 **Responsive Design**: Works on desktop, tablet, and mobile
- 🎨 **Visual Diagrams**: See chord fingerings with fretboard diagrams

## Project Status

✅ **Implemented and Ready!** The app is fully functional. See [PLAN.md](./PLAN.md) for the original implementation plan.

## Getting Started

1. Clone this repository
2. Open `index.html` in a web browser
3. Start searching for chords!

## Deployment to GitHub Pages

### Option 1: Automatic Deployment (Recommended)

1. Push your code to a GitHub repository
2. Go to repository Settings → Pages
3. Under "Source", select "GitHub Actions"
4. The workflow in `.github/workflows/deploy.yml` will automatically deploy on push to `main`

### Option 2: Manual Deployment

1. Push your code to a GitHub repository
2. Go to repository Settings → Pages
3. Under "Source", select the branch (usually `main`) and folder (`/ (root)`)
4. Click Save

The app will be available at: `https://[your-username].github.io/guitar-chord-helper/`

## Usage

1. **Enter a chord name** in the search box (e.g., "F", "Bm", "C#maj7")
2. **View alternatives** - The app shows easier ways to play the chord, sorted by difficulty
3. **Use Power Chord Mode** - Toggle in settings to always convert chords to power chords
4. **Customize display** - Settings allow you to:
   - Toggle power chord mode
   - Show/hide tab notation
   - Show/hide difficulty ratings
   - Switch to left-handed mode

## License

MIT